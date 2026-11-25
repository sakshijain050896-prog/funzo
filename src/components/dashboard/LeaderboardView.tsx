import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Trophy, Crown } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { sound } from '../../lib/soundEffects';
import { fetchLeaderboard, isCloudEnabled, useAuthUser, LeaderboardRow } from '../../lib/authService';

interface LeaderboardViewProps {
  stats: PlayerStats;
  onBackToHome: () => void;
}

interface LeaderboardEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  streak: number;
  gamesWon: number;
  coins: number;
  isUser: boolean;
}

const pointsFor = (won: number, coins: number, level: number) => won * 1000 + coins * 50 + level * 100;
const emojiFor = (avatarId: string) => (CARTOON_AVATARS.find((a) => a.id === avatarId) || CARTOON_AVATARS[0]).emoji;

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats, onBackToHome }) => {
  const { user } = useAuthUser();
  const [remote, setRemote] = useState<LeaderboardRow[] | null>(null);
  const [loading, setLoading] = useState(isCloudEnabled);

  // Global leaderboard from the server (all signed-in players)
  useEffect(() => {
    if (!isCloudEnabled) return;
    let alive = true;
    setLoading(true);
    fetchLeaderboard(50).then((rows) => {
      if (!alive) return;
      setRemote(rows);
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [user?.id]);

  const leaderboardList = useMemo<LeaderboardEntry[]>(() => {
    const me: LeaderboardEntry = {
      rank: 0,
      id: 'me',
      name: stats.username || 'Player',
      avatar: emojiFor(stats.avatarId),
      level: stats.level || 1,
      points: pointsFor(stats.totalGamesWon || 0, stats.coins || 0, stats.level || 1),
      streak: stats.streak || 0,
      gamesWon: stats.totalGamesWon || 0,
      coins: stats.coins || 0,
      isUser: true,
    };
    const list: LeaderboardEntry[] = (remote || [])
      .filter((r) => !r.is_me) // the live local copy of "me" is fresher than the last cloud save
      .map((r, i) => ({
        rank: 0,
        id: `p${i}`,
        name: r.username || 'Player',
        avatar: emojiFor(r.avatar_id),
        level: r.level || 1,
        points: Number(r.points) || 0,
        streak: r.streak || 0,
        gamesWon: r.wins || 0,
        coins: r.coins || 0,
        isUser: false,
      }));
    list.push(me);
    list.sort((a, b) => b.points - a.points);
    return list.map((e, i) => ({ ...e, rank: i + 1 }));
  }, [remote, stats]);

  const top1 = leaderboardList[0];
  const top2 = leaderboardList[1];
  const top3 = leaderboardList[2];

  const podium = [
    { p: top2, place: 2, ring: 'from-slate-200 to-slate-400', h: 'sm:h-40', medal: 'text-slate-300' },
    { p: top1, place: 1, ring: 'from-amber-200 via-amber-400 to-orange-500', h: 'sm:h-48', medal: 'text-amber-300' },
    { p: top3, place: 3, ring: 'from-orange-300 to-amber-700', h: 'sm:h-36', medal: 'text-orange-400' },
  ];

  return (
    <div className="w-full flex flex-col gap-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="relative rounded-[1.75rem] overflow-hidden isolate p-5 sm:p-8 text-white border border-white/10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_100%_at_100%_0%,rgba(34,211,238,.45),transparent_60%)]" />
        <Trophy className="absolute -right-6 -bottom-8 w-48 h-48 text-white/15 -z-10 rotate-[-10deg]" strokeWidth={1.2} />
        <button
          onClick={() => { sound.playTap(); onBackToHome(); }}
          className="h-8 px-3 -ml-1 mb-4 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-semibold flex items-center gap-1.5 transition w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Games
        </button>
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Season rankings</p>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Player Leaderboard</h2>
        <p className="text-sm text-white/85 mt-2 max-w-lg">
          Real players and verified rankings. Win rounds and earn coins to climb the ranks.
        </p>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto w-full items-end pt-2">
        {podium.map(({ p, place, ring, h, medal }) => (
          <div key={place} className={`${p ? '' : 'invisible'}`}>
            {p && (
              <div className={`fz-card ${place === 1 ? 'shadow-glow' : ''} p-3 sm:p-4 ${h} flex flex-col items-center justify-end text-center relative`}>
                {place === 1 && <Crown className="w-6 h-6 text-amber-300 absolute -top-3 drop-shadow-[0_4px_10px_rgba(251,191,36,.6)]" />}
                <span className={`relative inline-flex rounded-full p-[3px] bg-gradient-to-tr ${ring} mb-2`}>
                  <span className={`${place === 1 ? 'w-14 h-14 sm:w-16 sm:h-16 text-3xl sm:text-4xl' : 'w-11 h-11 sm:w-12 sm:h-12 text-2xl'} rounded-full bg-white dark:bg-[#14162b] flex items-center justify-center`}>
                    {p.avatar}
                  </span>
                  <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-tr ${ring} text-[11px] font-extrabold text-slate-950 flex items-center justify-center ring-2 ring-white dark:ring-[#14162b]`}>
                    {place}
                  </span>
                </span>
                <h4 className="mt-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate w-full">
                  {p.name}{p.isUser && ' (You)'}
                </h4>
                <span className={`font-display text-xs sm:text-sm font-bold tabular-nums ${medal}`}>
                  {p.points.toLocaleString()} pts
                </span>
                {place === 1 && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {p.gamesWon} wins · {p.coins} coins
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Roster */}
      <div className="fz-card overflow-hidden">
        <div className="px-4 sm:px-5 py-3 border-b border-slate-900/5 dark:border-white/[0.06] flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
          <span>Rank &amp; Player</span>
          <span>Score</span>
        </div>

        <div className="divide-y divide-slate-900/5 dark:divide-white/[0.05]">
          {leaderboardList.map((player) => (
            <div
              key={player.id}
              className={`px-4 sm:px-5 py-3 flex items-center justify-between gap-3 transition ${
                player.isUser
                  ? 'bg-gradient-to-r from-violet-500/15 via-fuchsia-500/5 to-transparent'
                  : 'hover:bg-slate-900/[0.02] dark:hover:bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 shrink-0 font-display font-bold text-sm tabular-nums ${
                  player.rank === 1 ? 'text-amber-400' : player.rank === 2 ? 'text-slate-300' : player.rank === 3 ? 'text-orange-400' : 'text-slate-400'
                }`}>
                  #{player.rank}
                </span>
                <span className="w-10 h-10 rounded-full bg-slate-900/5 dark:bg-white/[0.06] flex items-center justify-center text-xl shrink-0">{player.avatar}</span>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="truncate">{player.name}</span>
                    {player.isUser && (
                      <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[9px] font-bold shrink-0">
                        YOU
                      </span>
                    )}
                  </h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    Lvl {player.level} · {player.streak}d streak · {player.gamesWon} won
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white block tabular-nums">
                  {player.points.toLocaleString()}
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {player.coins} coins
                </span>
              </div>
            </div>
          ))}
        </div>

        {(loading || !user || leaderboardList.length <= 1) && (
          <div className="px-4 py-4 border-t border-slate-900/5 dark:border-white/[0.06] text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {loading
                  ? 'Loading players…'
                  : !isCloudEnabled
                  ? 'Showing this device only. Global rankings arrive with cloud accounts.'
                  : !user
                  ? 'You are shown from this device. Sign in (Profile) to join the global rankings.'
                  : 'You are the only ranked player so far. Invite friends to compete!'}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
