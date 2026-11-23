import React, { useMemo } from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { sound } from '../../lib/soundEffects';
import { getAllAccounts, getCurrentUser } from '../../lib/authService';

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

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats, onBackToHome }) => {
  const currentAvatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];

  // Compute real leaderboard entries from registered accounts and active session
  const leaderboardList = useMemo<LeaderboardEntry[]>(() => {
    const accounts = getAllAccounts();
    const currentUser = getCurrentUser();
    const list: LeaderboardEntry[] = [];

    // Map all real registered accounts
    Object.values(accounts).forEach((acc) => {
      const accStats = acc.stats || stats;
      const avatarObj = CARTOON_AVATARS.find((a) => a.id === acc.avatarId) || CARTOON_AVATARS[0];
      const pts = (accStats.totalGamesWon * 1000) + (accStats.coins * 50) + (accStats.level * 100);
      const isCurrent = currentUser ? currentUser.id === acc.id : acc.username === stats.username;

      list.push({
        rank: 0,
        id: acc.id,
        name: acc.username || 'Player',
        avatar: avatarObj.emoji,
        level: accStats.level || 1,
        points: pts,
        streak: accStats.streak || 0,
        gamesWon: accStats.totalGamesWon || 0,
        coins: accStats.coins || 0,
        isUser: isCurrent,
      });
    });

    // Ensure the current active user is present in the list
    const hasCurrentUser = list.some((item) => item.isUser);
    if (!hasCurrentUser) {
      const currentPts = (stats.totalGamesWon * 1000) + (stats.coins * 50) + (stats.level * 100);
      list.push({
        rank: 0,
        id: 'active_session_player',
        name: stats.username || 'Player 1',
        avatar: currentAvatar.emoji,
        level: stats.level || 1,
        points: currentPts,
        streak: stats.streak || 0,
        gamesWon: stats.totalGamesWon || 0,
        coins: stats.coins || 0,
        isUser: true,
      });
    }

    // Sort descending by points, then assign rank numbers
    list.sort((a, b) => b.points - a.points);
    return list.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [stats, currentAvatar]);

  const top1 = leaderboardList[0];
  const top2 = leaderboardList[1];
  const top3 = leaderboardList[2];

  return (
    <div className="w-full flex flex-col gap-5 animate-fade-in pb-12">
      {/* Header Banner - Mario Tactile Banner */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#e52521] via-[#d3261f] to-[#fcd116] border-4 border-[#9e100e] shadow-[4px_4px_0_#000] flex items-center justify-between">
        <div>
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-black text-white hover:text-yellow-200 flex items-center gap-1.5 mb-2 transition font-['Fredoka']"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> ← Back to Games
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl sm:text-3xl">🏆</span>
            <h2 className="text-xl sm:text-3xl font-black text-white font-['Fredoka'] drop-shadow">
              Player Leaderboard &amp; Rankings
            </h2>
          </div>
          <p className="text-xs text-yellow-100 mt-1 font-['Fredoka']">
            Real players and verified rankings. Win rounds and earn coins to climb the ranks!
          </p>
        </div>
      </div>

      {/* Podium for Top Players */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto w-full items-end pt-2">
        {/* Rank 2 (Silver) if 2 or more players */}
        {top2 ? (
          <div className="p-4 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] text-center flex flex-col items-center shadow-[4px_4px_0_#000] order-2 sm:order-1">
            <span className="text-3xl mb-1">{top2.avatar}</span>
            <span className="w-6 h-6 rounded-md bg-slate-400 text-white font-black text-xs flex items-center justify-center mb-1 font-pixel">
              2
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white truncate w-full font-['Fredoka']">
              {top2.name} {top2.isUser && '(You)'}
            </h4>
            <span className="text-xs font-pixel font-bold text-slate-700 dark:text-slate-300">
              {top2.points.toLocaleString()} pts
            </span>
          </div>
        ) : null}

        {/* Rank 1 (Gold Star) */}
        {top1 ? (
          <div className={`p-5 rounded-3xl bg-gradient-to-b from-[#fcd116] to-[#f59e0b] border-4 border-[#855e00] shadow-[4px_4px_0_#522a00] text-center flex flex-col items-center ${top2 ? '-translate-y-2' : ''} order-1 sm:order-2`}>
            <span className="text-2xl animate-bounce mb-1">⭐</span>
            <span className="text-4xl mb-1">{top1.avatar}</span>
            <span className="w-7 h-7 rounded-md bg-[#e52521] text-white font-black text-sm flex items-center justify-center mb-1 font-pixel">
              1
            </span>
            <h4 className="text-sm font-black text-slate-950 truncate w-full font-['Fredoka']">
              {top1.name} {top1.isUser && '(You)'}
            </h4>
            <span className="text-sm font-pixel font-black text-amber-950">
              {top1.points.toLocaleString()} pts
            </span>
            <span className="text-[10px] font-bold text-amber-900 font-['Fredoka'] mt-0.5">
              {top1.gamesWon} Wins • {top1.coins} Coins
            </span>
          </div>
        ) : null}

        {/* Rank 3 (Bronze) if 3 or more players */}
        {top3 ? (
          <div className="p-4 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] text-center flex flex-col items-center shadow-[4px_4px_0_#000] order-3">
            <span className="text-3xl mb-1">{top3.avatar}</span>
            <span className="w-6 h-6 rounded-md bg-[#d97706] text-white font-black text-xs flex items-center justify-center mb-1 font-pixel">
              3
            </span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white truncate w-full font-['Fredoka']">
              {top3.name} {top3.isUser && '(You)'}
            </h4>
            <span className="text-xs font-pixel font-bold text-amber-700 dark:text-amber-500">
              {top3.points.toLocaleString()} pts
            </span>
          </div>
        ) : null}
      </div>

      {/* Real Player Leaderboard Roster Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="p-4 border-b-2 border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-black uppercase text-[#e52521] font-pixel">
          <span>Rank &amp; Player</span>
          <span>Score &amp; Stats</span>
        </div>

        <div className="divide-y-2 divide-slate-100 dark:divide-white/5">
          {leaderboardList.map((player) => (
            <div
              key={player.id}
              className={`p-3.5 flex items-center justify-between transition ${
                player.isUser 
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-l-4 border-l-[#e52521]' 
                  : 'hover:bg-slate-50 dark:hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-7 font-pixel font-black text-xs ${
                  player.rank === 1 ? 'text-[#e52521]' : 'text-slate-400'
                }`}>
                  #{player.rank}
                </span>
                <span className="text-2xl">{player.avatar}</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] flex items-center gap-1.5">
                    <span>{player.name}</span>
                    {player.isUser && (
                      <span className="px-1.5 py-0.2 rounded-md bg-[#e52521] text-white text-[9px] font-pixel">
                        YOU
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-pixel">
                    Level {player.level} • {player.streak}d Streak • {player.gamesWon} Won
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-pixel font-black text-xs sm:text-sm text-slate-900 dark:text-white block">
                  {player.points.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-['Fredoka']">
                  {player.coins} coins
                </span>
              </div>
            </div>
          ))}
        </div>

        {leaderboardList.length <= 1 && (
          <div className="p-4 bg-slate-50 dark:bg-[#1f2438] text-center border-t border-slate-200 dark:border-white/10">
            <p className="text-xs text-slate-600 dark:text-slate-300 font-['Fredoka'] flex items-center justify-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>You are currently the top player! Create more profiles or log in to see friends here.</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
