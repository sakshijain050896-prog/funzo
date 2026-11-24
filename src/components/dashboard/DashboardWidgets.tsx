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
        <div className="rounded-2xl p-3 sm:p-3.5 bg-white/95 dark:bg-[#181d2f]/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🎮</span>
              <h4 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white font-['Fredoka']">Your Gaming Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-[11px] font-black text-[#e11d48] hover:underline flex items-center gap-0.5 transition font-['Fredoka']"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center">
            {/* Games Played - Pastel Sky */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#e0f2fe] dark:bg-sky-950/40 border border-[#bae6fd] dark:border-sky-800/40 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🎮</span>
              <span className="text-xs sm:text-sm font-black text-[#0369a1] dark:text-sky-300 font-['Fredoka'] leading-none mb-0.5">
                {stats.totalGamesPlayed}
              </span>
              <span className="text-[8px] font-extrabold text-[#0284c7] dark:text-sky-400 leading-tight font-['Fredoka']">Played</span>
            </div>

            {/* Games Won - Pastel Mint */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#d1fae5] dark:bg-emerald-950/40 border border-[#a7f3d0] dark:border-emerald-800/40 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🏆</span>
              <span className="text-xs sm:text-sm font-black text-[#065f46] dark:text-emerald-300 font-['Fredoka'] leading-none mb-0.5">
                {stats.totalGamesWon}
              </span>
              <span className="text-[8px] font-extrabold text-[#059669] dark:text-emerald-400 leading-tight font-['Fredoka']">Won</span>
            </div>

            {/* Streak - Pastel Peach */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#ffedd5] dark:bg-orange-950/40 border border-[#fed7aa] dark:border-orange-800/40 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">⭐</span>
              <span className="text-xs sm:text-sm font-black text-[#c2410c] dark:text-orange-300 font-['Fredoka'] leading-none mb-0.5">
                {stats.streak}d
              </span>
              <span className="text-[8px] font-extrabold text-[#ea580c] dark:text-orange-400 leading-tight font-['Fredoka']">Streak</span>
            </div>

            {/* Coins - Pastel Buttercup */}
            <div className="p-1.5 sm:p-2 rounded-xl bg-[#fef9c3] dark:bg-yellow-950/40 border border-[#fef08a] dark:border-yellow-800/40 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm mb-0.5">🪙</span>
              <span className="text-xs sm:text-sm font-black text-[#854d0e] dark:text-yellow-300 font-['Fredoka'] leading-none mb-0.5">
                {stats.coins}
              </span>
              <span className="text-[8px] font-extrabold text-[#ca8a04] dark:text-yellow-400 leading-tight font-['Fredoka']">Coins</span>
            </div>
          </div>
        </div>

        {/* Card 2: Today's Daily Challenge - Pastel Warm Peach */}
        <div className="rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br from-[#fef3c7] via-[#fed7aa] to-[#fecdd3] border-2 border-[#fde68a] shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-[#854d0e] text-[#fef3c7] flex items-center justify-center font-black text-[11px]">?</span>
              <h4 className="text-xs sm:text-sm font-black text-amber-950 font-['Fredoka']">Today&apos;s Daily Challenge</h4>
            </div>
            <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-white/70 border border-amber-300 text-amber-950 font-['Fredoka']">
              ACTIVE
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <p className="text-xs font-black text-amber-950 leading-snug font-['Fredoka']">
                Clear Maths Puzzle for <span className="text-[#be123c] font-black">+100 Bonus Coins!</span>
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
            className="w-full py-1.5 sm:py-2 rounded-xl bg-[#f43f5e] hover:bg-[#e11d48] border-b-2 border-[#be123c] text-white font-black text-xs shadow-sm active:translate-y-0.5 transition flex items-center justify-center gap-1 font-['Fredoka']"
          >
            <span>Play Daily Challenge ▶</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
