import React from 'react';
import { Crown, ArrowLeft } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { sound } from '../../lib/soundEffects';

interface LeaderboardViewProps {
  stats: PlayerStats;
  onBackToHome: () => void;
}

const GLOBAL_LEADERBOARD = [
  { rank: 1, name: 'GameQueen 👑', level: 84, points: 98450, streak: 42, avatar: '👧', isUser: false },
  { rank: 2, name: 'PlayMaster007', level: 79, points: 87320, streak: 31, avatar: '🧑', isUser: false },
  { rank: 3, name: 'FunPlayer', level: 71, points: 76900, streak: 28, avatar: '🦊', isUser: false },
  { rank: 4, name: 'CyberKnight', level: 65, points: 64200, streak: 19, avatar: '🤖', isUser: false },
  { rank: 5, name: 'NinjaRiddle', level: 58, points: 53100, streak: 15, avatar: '🐱', isUser: false },
  { rank: 6, name: 'LogicAce', level: 52, points: 47800, streak: 14, avatar: '🦁', isUser: false },
  { rank: 7, name: 'CosmicStar', level: 46, points: 39500, streak: 11, avatar: '👽', isUser: false },
  { rank: 8, name: 'BrainyOwl', level: 41, points: 34200, streak: 9, avatar: '🦉', isUser: false },
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ stats, onBackToHome }) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const userPoints = (stats.iq || 105) * 10 + stats.totalGamesWon * 100;
  const userRank = 9;

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 border border-white/20 shadow-xl flex items-center justify-between">
        <div>
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-bold text-purple-100 hover:text-white flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </button>
          <div className="flex items-center gap-2">
            <Crown className="w-7 h-7 text-yellow-300 fill-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">Global Leaderboard</h2>
          </div>
          <p className="text-xs text-purple-100 mt-1">
            Compete daily across all Funzo games to climb the world rank!
          </p>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto w-full items-end pt-4">
        {/* Rank 2 (Silver) */}
        <div className="p-4 rounded-3xl bg-[#1c1e2f] border border-white/10 text-center flex flex-col items-center shadow-xl">
          <span className="text-2xl mb-1">{GLOBAL_LEADERBOARD[1].avatar}</span>
          <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center mb-1">
            2
          </span>
          <h4 className="text-xs font-black text-white truncate w-full">{GLOBAL_LEADERBOARD[1].name}</h4>
          <span className="text-xs font-mono font-black text-slate-300">{GLOBAL_LEADERBOARD[1].points.toLocaleString()}</span>
        </div>

        {/* Rank 1 (Gold) */}
        <div className="p-5 rounded-3xl bg-gradient-to-b from-[#2d1b4d] to-[#1c1e2f] border-2 border-amber-400 shadow-2xl text-center flex flex-col items-center -translate-y-3">
          <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400 mb-1 animate-bounce" />
          <span className="text-3xl mb-1">{GLOBAL_LEADERBOARD[0].avatar}</span>
          <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 font-black text-sm flex items-center justify-center mb-1">
            1
          </span>
          <h4 className="text-sm font-black text-white truncate w-full">{GLOBAL_LEADERBOARD[0].name}</h4>
          <span className="text-sm font-mono font-black text-amber-400">{GLOBAL_LEADERBOARD[0].points.toLocaleString()}</span>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="p-4 rounded-3xl bg-[#1c1e2f] border border-white/10 text-center flex flex-col items-center shadow-xl">
          <span className="text-2xl mb-1">{GLOBAL_LEADERBOARD[2].avatar}</span>
          <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center mb-1">
            3
          </span>
          <h4 className="text-xs font-black text-white truncate w-full">{GLOBAL_LEADERBOARD[2].name}</h4>
          <span className="text-xs font-mono font-black text-amber-500">{GLOBAL_LEADERBOARD[2].points.toLocaleString()}</span>
        </div>
      </div>

      {/* Roster Table */}
      <div className="rounded-3xl bg-[#1c1e2f] border border-white/10 shadow-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs font-black uppercase text-violet-400">
          <span>Rank &amp; Player</span>
          <span>Score</span>
        </div>

        <div className="divide-y divide-white/5">
          {GLOBAL_LEADERBOARD.slice(3).map((player) => (
            <div key={player.rank} className="p-3.5 flex items-center justify-between hover:bg-white/5 transition">
              <div className="flex items-center gap-3">
                <span className="w-6 font-mono font-black text-xs text-slate-400">#{player.rank}</span>
                <span className="text-xl">{player.avatar}</span>
                <div>
                  <h4 className="text-xs font-extrabold text-white">{player.name}</h4>
                  <span className="text-[10px] text-slate-400">Level {player.level} • {player.streak}d Streak</span>
                </div>
              </div>
              <span className="font-mono font-black text-xs text-white">{player.points.toLocaleString()}</span>
            </div>
          ))}

          {/* Current User Row */}
          <div className="p-3.5 bg-gradient-to-r from-violet-900/40 to-indigo-900/40 border-t-2 border-violet-500/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 font-mono font-black text-xs text-yellow-400">#{userRank}</span>
              <span className="text-xl">{avatar.emoji}</span>
              <div>
                <h4 className="text-xs font-black text-yellow-300 flex items-center gap-1.5">
                  <span>{stats.username || 'You'} (Active Player)</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-yellow-400/20 text-[9px] text-yellow-300">YOU</span>
                </h4>
                <span className="text-[10px] text-purple-200">Level {stats.level} • {stats.streak}d Streak</span>
              </div>
            </div>
            <span className="font-mono font-black text-sm text-yellow-300">{userPoints.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
