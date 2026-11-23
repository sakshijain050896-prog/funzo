import React from 'react';
import { ArrowRight } from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface DashboardWidgetsProps {
  stats: PlayerStats;
  onOpenStats: () => void;
  onOpenLeaderboard: () => void;
  onOpenRewards: () => void;
  onPlayDailyChallenge: () => void;
}

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  stats,
  onOpenStats,
  onPlayDailyChallenge,
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* 2 Essential Cards: Real Player Stats + Today's Daily Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Player Status Tally */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎮</span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white font-['Fredoka']">Your Gaming Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-xs font-black text-[#e52521] hover:underline flex items-center gap-1 transition font-['Fredoka']"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Games Played */}
            <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-[#1f2438] border-2 border-sky-300 dark:border-sky-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🎮</span>
              <span className="text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] leading-none mb-1">
                {stats.totalGamesPlayed}
              </span>
              <span className="text-[9px] font-extrabold text-sky-800 dark:text-sky-300 leading-tight font-['Fredoka']">Played</span>
            </div>

            {/* Games Won */}
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-[#1f2438] border-2 border-emerald-300 dark:border-emerald-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🏆</span>
              <span className="text-sm font-black text-[#00a859] dark:text-[#43b047] font-['Fredoka'] leading-none mb-1">
                {stats.totalGamesWon}
              </span>
              <span className="text-[9px] font-extrabold text-emerald-800 dark:text-emerald-300 leading-tight font-['Fredoka']">Games Won</span>
            </div>

            {/* Streak */}
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-[#1f2438] border-2 border-amber-300 dark:border-amber-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">⭐</span>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-['Fredoka'] leading-none mb-1">
                {stats.streak}d
              </span>
              <span className="text-[9px] font-extrabold text-amber-800 dark:text-amber-300 leading-tight font-['Fredoka']">Streak</span>
            </div>

            {/* Coins */}
            <div className="p-2.5 rounded-2xl bg-yellow-50 dark:bg-[#1f2438] border-2 border-yellow-300 dark:border-yellow-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🪙</span>
              <span className="text-sm font-black text-yellow-600 dark:text-yellow-400 font-['Fredoka'] leading-none mb-1">
                {stats.coins}
              </span>
              <span className="text-[9px] font-extrabold text-yellow-800 dark:text-yellow-300 leading-tight font-['Fredoka']">Coins</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Daily Challenge */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#fcd116] via-[#f7b705] to-[#f59e0b] border-4 border-[#c49600] shadow-[4px_4px_0_#855e00] flex flex-col justify-between relative overflow-hidden">
          {/* Corner Bolts */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#855e00]" />

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#855e00] text-[#fcd116] flex items-center justify-center font-black text-xs">?</span>
              <h4 className="text-sm font-black text-slate-950 font-['Fredoka']">Today&apos;s Daily Challenge</h4>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white/40 border border-[#855e00] text-slate-950 font-['Fredoka']">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <p className="text-xs font-black text-amber-950 leading-snug mb-1 font-['Fredoka']">
                Clear Sudoku Master to claim <span className="text-[#e52521] font-black">+100 Bonus Coins!</span>
              </p>
              <span className="text-xs text-amber-900 font-black font-['Fredoka']">
                {stats.totalGamesWon > 0 ? 'Status: Completed ✓' : 'Status: Ready to Play'}
              </span>
            </div>
            <div className="text-3xl select-none animate-bounce shrink-0 drop-shadow">
              🍄
            </div>
          </div>

          <button
            onClick={() => { sound.playTap(); onPlayDailyChallenge(); }}
            className="w-full py-2.5 rounded-2xl bg-[#e52521] border-b-4 border-[#9e100e] text-white font-black text-xs shadow-md hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-1.5 font-['Fredoka']"
          >
            <span>Play Daily Challenge ▶</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
