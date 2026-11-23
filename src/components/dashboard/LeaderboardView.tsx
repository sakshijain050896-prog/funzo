import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { sound } from '../../lib/soundEffects';

interface LeaderboardViewProps {
  stats: PlayerStats;
  onBackToHome: () => void;
}

const GLOBAL_LEADERBOARD = [
  { rank: 1, name: 'Princess Peach 👑', level: 84, points: 98450, streak: 42, avatar: '👑', isUser: false },
  { rank: 2, name: 'Super Luigi 🟢', level: 79, points: 87320, streak: 31, avatar: '🟢', isUser: false },
  { rank: 3, name: 'Dino Yoshi 🦖', level: 71, points: 76900, streak: 28, avatar: '🦖', isUser: false },
  { rank: 4, name: 'Bowser King 🐢', level: 65, points: 64200, streak: 19, avatar: '🐢', isUser: false },
  { rank: 5, name: 'Speedy Toad 🍄', level: 58, points: 53100, streak: 15, avatar: '🍄', isUser: false },
  { rank: 6, name: 'Wario Gold 💰', level: 52, points: 47800, streak: 14, avatar: '💰', isUser: false },
  { rank: 7, name: 'Rosalina Star ⭐', level: 46, points: 39500, streak: 11, avatar: '⭐', isUser: false },
  { rank: 8, name: 'Ghost Boo 👻', level: 41, points: 34200, streak: 9, avatar: '👻', isUser: false },
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats, onBackToHome }) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const userPoints = (stats.totalGamesWon * 1000) + (stats.coins * 50);
  const userRank = 9;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in pb-12">
      {/* Header Banner - Mario Grand Prix Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#e52521] via-[#d3261f] to-[#fcd116] border-4 border-[#9e100e] shadow-[4px_4px_0_#000] flex items-center justify-between">
        <div>
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-black text-white hover:text-yellow-200 flex items-center gap-1.5 mb-2 transition font-pixel"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> WORLD MAP
          </button>
          <div className="flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Fredoka'] drop-shadow">
              Mushroom Kingdom High Scores
            </h2>
          </div>
          <p className="text-xs text-yellow-100 mt-1 font-['Fredoka']">
            Clear stages and collect Mario coins to climb the World Rank!
          </p>
        </div>
      </div>

      {/* Top 3 Mario Podium */}
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto w-full items-end pt-4">
        {/* Rank 2 (Luigi Silver) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] text-center flex flex-col items-center shadow-[4px_4px_0_#000]">
          <span className="text-3xl mb-1">{GLOBAL_LEADERBOARD[1].avatar}</span>
          <span className="w-6 h-6 rounded-md bg-[#00a859] text-white font-black text-xs flex items-center justify-center mb-1 font-pixel">
            2
          </span>
          <h4 className="text-xs font-black text-slate-900 dark:text-white truncate w-full font-['Fredoka']">{GLOBAL_LEADERBOARD[1].name}</h4>
          <span className="text-xs font-pixel font-bold text-emerald-700 dark:text-emerald-400">{GLOBAL_LEADERBOARD[1].points.toLocaleString()}</span>
        </div>

        {/* Rank 1 (Mario Gold Star) */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#fcd116] to-[#f59e0b] border-4 border-[#855e00] shadow-[4px_4px_0_#522a00] text-center flex flex-col items-center -translate-y-3">
          <span className="text-2xl animate-bounce mb-1">⭐</span>
          <span className="text-4xl mb-1">{GLOBAL_LEADERBOARD[0].avatar}</span>
          <span className="w-7 h-7 rounded-md bg-[#e52521] text-white font-black text-sm flex items-center justify-center mb-1 font-pixel">
            1
          </span>
          <h4 className="text-sm font-black text-slate-950 truncate w-full font-['Fredoka']">{GLOBAL_LEADERBOARD[0].name}</h4>
          <span className="text-sm font-pixel font-black text-amber-950">{GLOBAL_LEADERBOARD[0].points.toLocaleString()}</span>
        </div>

        {/* Rank 3 (Yoshi Bronze) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] text-center flex flex-col items-center shadow-[4px_4px_0_#000]">
          <span className="text-3xl mb-1">{GLOBAL_LEADERBOARD[2].avatar}</span>
          <span className="w-6 h-6 rounded-md bg-[#d97706] text-white font-black text-xs flex items-center justify-center mb-1 font-pixel">
            3
          </span>
          <h4 className="text-xs font-black text-slate-900 dark:text-white truncate w-full font-['Fredoka']">{GLOBAL_LEADERBOARD[2].name}</h4>
          <span className="text-xs font-pixel font-bold text-amber-700 dark:text-amber-500">{GLOBAL_LEADERBOARD[2].points.toLocaleString()}</span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] overflow-hidden">
        <div className="p-4 border-b-2 border-slate-200 dark:border-white/10 flex items-center justify-between text-xs font-black uppercase text-[#e52521] font-pixel">
          <span>Rank &amp; Hero</span>
          <span>Score</span>
        </div>

        <div className="divide-y-2 divide-slate-100 dark:divide-white/5">
          {GLOBAL_LEADERBOARD.slice(3).map((player) => (
            <div key={player.rank} className="p-3.5 flex items-center justify-between hover:bg-red-50/20 dark:hover:bg-white/5 transition">
              <div className="flex items-center gap-3">
                <span className="w-6 font-pixel font-black text-xs text-slate-400">#{player.rank}</span>
                <span className="text-2xl">{player.avatar}</span>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white font-['Fredoka']">{player.name}</h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-pixel">Level {player.level} • {player.streak}d Streak</span>
                </div>
              </div>
              <span className="font-pixel font-bold text-xs text-slate-900 dark:text-white">{player.points.toLocaleString()}</span>
            </div>
          ))}

          {/* Current User Row - Mario Player 1 */}
          <div className="p-3.5 bg-red-100 dark:bg-red-950/60 border-t-3 border-[#e52521] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 font-pixel font-black text-xs text-[#e52521]">#{userRank}</span>
              <span className="text-2xl">{avatar.emoji}</span>
              <div>
                <h4 className="text-xs font-black text-[#e52521] dark:text-red-400 flex items-center gap-1.5 font-['Fredoka']">
                  <span>{stats.username || 'Mario'} (Active Hero)</span>
                  <span className="px-1.5 py-0.2 rounded-md bg-[#e52521] text-white text-[9px] font-pixel">P1</span>
                </h4>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 font-pixel">Level {stats.level} • {stats.streak}d Streak • {stats.totalGamesWon} Cleared</span>
              </div>
            </div>
            <span className="font-pixel font-black text-sm text-[#e52521] dark:text-red-400">{userPoints.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
