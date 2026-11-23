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
    <div className="w-full flex flex-col gap-2.5">
      {/* 2 Compact Essential Cards: Real Player Stats + Today's Daily Challenge */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3">
        {/* Card 1: Player Status Tally */}
        <div className="rounded-2xl p-3 sm:p-3.5 bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎮</span>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Fredoka']">Your Gaming Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-[11px] font-black text-[#e52521] hover:underline flex items-center gap-0.5 transition font-['Fredoka']"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            {/* Games Played */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-sky-50 dark:bg-[#1f2438] border border-sky-300 dark:border-sky-700/50 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🎮</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] leading-none mb-0.5">
                {stats.totalGamesPlayed}
              </span>
              <span className="text-[8px] font-extrabold text-sky-800 dark:text-sky-300 leading-tight font-['Fredoka']">Played</span>
            </div>

            {/* Games Won */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-50 dark:bg-[#1f2438] border border-emerald-300 dark:border-emerald-700/50 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🏆</span>
              <span className="text-xs sm:text-sm font-black text-[#00a859] dark:text-[#43b047] font-['Fredoka'] leading-none mb-0.5">
                {stats.totalGamesWon}
              </span>
              <span className="text-[8px] font-extrabold text-emerald-800 dark:text-emerald-300 leading-tight font-['Fredoka']">Won</span>
            </div>

            {/* Streak */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-amber-50 dark:bg-[#1f2438] border border-amber-300 dark:border-amber-700/50 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">⭐</span>
              <span className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400 font-['Fredoka'] leading-none mb-0.5">
                {stats.streak}d
              </span>
              <span className="text-[8px] font-extrabold text-amber-800 dark:text-amber-300 leading-tight font-['Fredoka']">Streak</span>
            </div>

            {/* Coins */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-yellow-50 dark:bg-[#1f2438] border border-yellow-300 dark:border-yellow-700/50 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🪙</span>
              <span className="text-xs sm:text-sm font-black text-yellow-600 dark:text-yellow-400 font-['Fredoka'] leading-none mb-0.5">
                {stats.coins}
              </span>
              <span className="text-[8px] font-extrabold text-yellow-800 dark:text-yellow-300 leading-tight font-['Fredoka']">Coins</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Daily Challenge */}
        <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-[#fcd116] via-[#f7b705] to-[#f59e0b] border-2 border-[#c49600] shadow-[2px_2px_0_#855e00] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-[#855e00] text-[#fcd116] flex items-center justify-center font-black text-[11px]">?</span>
              <h4 className="text-xs sm:text-sm font-black text-slate-950 font-['Fredoka']">Today&apos;s Daily Challenge</h4>
            </div>
            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-white/40 border border-[#855e00] text-slate-950 font-['Fredoka']">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <p className="text-xs font-black text-amber-950 leading-snug font-['Fredoka']">
                Clear Maths Puzzle for <span className="text-[#e52521] font-black">+100 Bonus Coins!</span>
              </p>
              <span className="text-[10px] text-amber-900 font-black font-['Fredoka']">
                {stats.totalGamesWon > 0 ? 'Status: Completed ✓' : 'Status: Ready to Play'}
              </span>
            </div>
            <div className="text-2xl select-none animate-bounce shrink-0 drop-shadow">
              🧮
            </div>
          </div>

          <button
            onClick={() => { sound.playTap(); onPlayDailyChallenge(); }}
            className="w-full py-1.5 sm:py-2 rounded-xl bg-[#e52521] border-b-2 border-[#9e100e] text-white font-black text-xs shadow-sm hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-1 font-['Fredoka']"
          >
            <span>Play Daily Challenge ▶</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
