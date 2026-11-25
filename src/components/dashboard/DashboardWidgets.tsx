import React from 'react';
import { ArrowRight, Gamepad2, Trophy, Flame, Coins, Calculator, CheckCircle2, Play, Zap } from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';
import { isDailyChallengeDoneToday } from '../../lib/storage';

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
  const tiles = [
    { label: 'Played', value: stats.totalGamesPlayed, icon: Gamepad2, tint: 'from-sky-400/20 to-indigo-500/10', ic: 'text-sky-400' },
    { label: 'Won', value: stats.totalGamesWon, icon: Trophy, tint: 'from-emerald-400/20 to-teal-500/10', ic: 'text-emerald-400' },
    { label: 'Streak', value: `${stats.streak}d`, icon: Flame, tint: 'from-orange-400/20 to-rose-500/10', ic: 'text-orange-400' },
    { label: 'Coins', value: stats.coins, icon: Coins, tint: 'from-amber-300/25 to-yellow-500/10', ic: 'text-amber-400' },
  ];
  // Completed = a Maths Puzzle level was cleared TODAY (was: any win ever).
  // `stats` changes after every win, so this re-reads on each update.
  const completed = isDailyChallengeDoneToday();

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {/* Card 1: Player stats */}
      <div className="fz-card p-4 sm:p-5 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-500 dark:text-violet-400">Your progress</p>
            <h4 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">Gaming Stats</h4>
          </div>
          <button
            onClick={() => { sound.playTap(); onOpenStats(); }}
            className="h-8 px-3 rounded-full fz-btn-ghost text-xs font-semibold flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {tiles.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label} className={`relative rounded-2xl p-2.5 sm:p-3 bg-gradient-to-br ${t.tint} border border-slate-900/5 dark:border-white/[0.06] flex flex-col`}>
                <Icon className={`w-4 h-4 ${t.ic} mb-2`} />
                <span className="font-display text-base sm:text-xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
                  {t.value}
                </span>
                <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-1">{t.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card 2: Daily challenge */}
      <div className="relative rounded-[1.25rem] overflow-hidden isolate p-4 sm:p-5 flex flex-col justify-between text-white border border-white/10 min-h-[180px]">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-900" />
        <div className="absolute inset-0 -z-10 opacity-25 bg-[linear-gradient(rgba(255,255,255,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.35)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:linear-gradient(120deg,#000,transparent_70%)]" />
        <Calculator className="absolute -right-4 -bottom-6 w-40 h-40 text-white/10 -z-10 rotate-[-12deg]" strokeWidth={1.25} />

        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 border border-white/25 text-[10px] font-bold uppercase tracking-[0.16em]">
              <Zap className="w-3 h-3" /> Daily challenge
            </span>
            <h4 className="mt-2.5 font-display text-lg sm:text-xl font-bold leading-tight">
              Clear Maths Puzzle
            </h4>
            <p className="text-sm text-white/80 mt-0.5">
              Earn <b className="text-amber-300">+100 bonus coins</b> today.
            </p>
          </div>
          <span className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${completed ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-300/30' : 'bg-white/15 text-white border border-white/25'}`}>
            {completed ? <><CheckCircle2 className="w-3 h-3" /> Completed</> : 'Ready to play'}
          </span>
        </div>

        <button
          onClick={() => { sound.playTap(); onPlayDailyChallenge(); }}
          className="mt-4 h-11 w-full sm:w-fit sm:px-6 rounded-full bg-white text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_12px_30px_-12px_rgba(0,0,0,.6)] hover:scale-[1.02] active:scale-[.98] transition"
        >
          <Play className="w-4 h-4 fill-current" />
          Play Daily Challenge
        </button>
      </div>
    </div>
  );
};
