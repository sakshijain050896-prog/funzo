-- =====================================================================
-- Funzo: secure player progress + admin roles (Supabase Auth, email+password)
-- Safe to run more than once.
--
-- Security model
--   * Every player can read/write ONLY their own progress row (RLS).
--   * Admins are listed in public.app_admins, which no client can read or
--     write (RLS on, no policies). Add admins from the SQL editor only:
--       insert into public.app_admins (user_id)
--       select id from auth.users where email = 'owner@example.com';
--   * The public leaderboard is served by a function that exposes only
--     display name, avatar and game stats (never emails or user ids).
-- =====================================================================

-- The old demo table allowed anyone to read/overwrite every row. Remove it.
drop table if exists public.funzo_users;

-- ---------------------------------------------------------------------
-- Player progress (one row per signed-in user)
-- ---------------------------------------------------------------------
create table if not exists public.player_progress (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  username    text not null default 'Player'
              check (char_length(username) between 1 and 24),
  avatar_id   text not null default 'fox'
              check (char_length(avatar_id) <= 32),
  stats       jsonb not null default '{}'::jsonb,
  arrow_level integer not null default 1 check (arrow_level between 1 and 10000),
  game_state  jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.player_progress enable row level security;

-- ---------------------------------------------------------------------
-- Admin roster (no client access at all)
-- ---------------------------------------------------------------------
create table if not exists public.app_admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.app_admins enable row level security;
revoke all on public.app_admins from anon, authenticated;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.app_admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------------------------------------------------------------------
-- Row Level Security policies
-- ---------------------------------------------------------------------
drop policy if exists "progress: owner or admin can read" on public.player_progress;
create policy "progress: owner or admin can read"
  on public.player_progress for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "progress: owner can create own row" on public.player_progress;
create policy "progress: owner can create own row"
  on public.player_progress for insert
  to authenticated
  with check (user_id = auth.uid());

drop policy if exists "progress: owner or admin can update" on public.player_progress;
create policy "progress: owner or admin can update"
  on public.player_progress for update
  to authenticated
  using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists "progress: admin can delete" on public.player_progress;
create policy "progress: admin can delete"
  on public.player_progress for delete
  to authenticated
  using (public.is_admin());

revoke all on public.player_progress from anon;
grant select, insert, update, delete on public.player_progress to authenticated;

-- Keep updated_at honest (server clock, not the client's)
create or replace function public.touch_player_progress()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists player_progress_touch on public.player_progress;
create trigger player_progress_touch
  before insert or update on public.player_progress
  for each row execute function public.touch_player_progress();

-- ---------------------------------------------------------------------
-- Public leaderboard (no emails / ids exposed)
-- ---------------------------------------------------------------------
create or replace function public.get_leaderboard(limit_n integer default 50)
returns table (
  username  text,
  avatar_id text,
  level     integer,
  wins      integer,
  coins     integer,
  streak    integer,
  points    bigint,
  is_me     boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.username,
    p.avatar_id,
    coalesce((p.stats->>'level')::int, 1),
    coalesce((p.stats->>'totalGamesWon')::int, 0),
    coalesce((p.stats->>'coins')::int, 0),
    coalesce((p.stats->>'streak')::int, 0),
    coalesce((p.stats->>'totalGamesWon')::bigint, 0) * 1000
      + coalesce((p.stats->>'coins')::bigint, 0) * 50
      + coalesce((p.stats->>'level')::bigint, 1) * 100,
    p.user_id = auth.uid()
  from public.player_progress p
  order by 7 desc
  limit greatest(1, least(coalesce(limit_n, 50), 200));
$$;
grant execute on function public.get_leaderboard(integer) to anon, authenticated;

-- ---------------------------------------------------------------------
-- Admin: list every player with email (admins only)
-- ---------------------------------------------------------------------
create or replace function public.admin_list_players()
returns table (
  user_id     uuid,
  email       text,
  username    text,
  avatar_id   text,
  stats       jsonb,
  arrow_level integer,
  game_state  jsonb,
  created_at  timestamptz,
  updated_at  timestamptz,
  last_sign_in_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'admin only' using errcode = '42501';
  end if;
  return query
    select p.user_id, u.email::text, p.username, p.avatar_id, p.stats,
           p.arrow_level, p.game_state, p.created_at, p.updated_at, u.last_sign_in_at
    from public.player_progress p
    join auth.users u on u.id = p.user_id
    order by p.updated_at desc;
end;
$$;
revoke all on function public.admin_list_players() from public, anon;
grant execute on function public.admin_list_players() to authenticated;
