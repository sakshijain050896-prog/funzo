# Funzo cloud accounts (Supabase)

Sign-in is email + password via Supabase Auth. Player progress is stored in
`public.player_progress`, protected by Row Level Security (each player can only
read/write their own row). Admin rights live in `public.app_admins`, which no
client can read or write.

## Setup
1. Run `migrations/001_funzo_secure_auth.sql` in the Supabase SQL editor.
2. Auth → URL Configuration: Site URL `https://funzo-ten.vercel.app`,
   and add it to Redirect URLs (needed for password-reset emails).
3. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (see `.env.example`).
4. Make yourself admin (SQL editor), after creating your account in the app:

   ```sql
   insert into public.app_admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```

Never put the `service_role` key in the app; only the anon key is public.
