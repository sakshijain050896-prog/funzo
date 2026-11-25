import React, { useState } from 'react';
import { ArrowLeft, Gift, Coins, Zap, CheckCircle2, PlayCircle } from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface RewardsViewProps {
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
  onBackToHome: () => void;
}

export const RewardsView: React.FC<RewardsViewProps> = ({
  stats,
  onUpdateStats,
  onRequestAd,
  onBackToHome,
}) => {
  const [claimedDaily, setClaimedDaily] = useState<boolean>(false);

  const handleClaimDaily = () => {
    if (claimedDaily) return;
    sound.playVictory();
    confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    const updated = {
      ...stats,
      coins: stats.coins + 150,
      streak: stats.streak + 1,
    };
    onUpdateStats(updated);
    setClaimedDaily(true);
  };

  const handleWatchAdBonus = () => {
    sound.playTap();
    if (onRequestAd) {
      onRequestAd('Watch Sponsor Video for +250 Funzo Coins', () => {
        sound.playVictory();
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
        const updated = { ...stats, coins: stats.coins + 250 };
        onUpdateStats(updated);
      });
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 animate-fade-in pb-12">
      {/* Header */}
      <div className="relative rounded-[1.75rem] overflow-hidden isolate p-5 sm:p-8 text-white border border-white/10">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(80%_100%_at_100%_0%,rgba(255,255,255,.35),transparent_60%)]" />
        <Gift className="absolute -right-6 -bottom-8 w-48 h-48 text-white/15 -z-10 rotate-[-10deg]" strokeWidth={1.2} />

        <button
          onClick={() => { sound.playTap(); onBackToHome(); }}
          className="h-8 px-3 -ml-1 mb-4 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-semibold flex items-center gap-1.5 transition w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Games
        </button>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Daily loot &amp; perks</p>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">Rewards &amp; Free Coins</h2>
            <p className="text-sm text-white/85 mt-2 max-w-md">
              Claim free daily bonus coins, keep your streak alive, and power up your games.
            </p>
          </div>
          <div className="self-start sm:self-auto px-4 py-3 rounded-2xl bg-black/20 border border-white/25 backdrop-blur-md">
            <span className="text-[10px] uppercase font-bold tracking-[0.16em] text-white/75 block">Your coins</span>
            <span className="font-display text-2xl sm:text-3xl font-extrabold tabular-nums flex items-center gap-2">
              <Coins className="w-6 h-6 text-amber-200" /> {stats.coins}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        {/* Daily claim */}
        <div className="fz-card p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center shadow-[0_12px_28px_-10px_rgba(249,115,22,.8)] shrink-0">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Daily Bonus Gift</h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-600 dark:text-amber-300 border border-amber-400/30 text-[10px] font-bold">FREE</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Claim <b className="text-amber-600 dark:text-amber-300">+150 coins</b> and maintain your login streak.
              </p>
            </div>
          </div>
          <button
            onClick={handleClaimDaily}
            disabled={claimedDaily}
            className={`h-12 w-full rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition ${
              claimedDaily
                ? 'bg-slate-900/5 dark:bg-white/5 text-slate-400 cursor-not-allowed border border-slate-900/5 dark:border-white/5'
                : 'fz-btn-primary'
            }`}
          >
            {claimedDaily ? <><CheckCircle2 className="w-4 h-4" /> Gift Claimed</> : <><Coins className="w-4 h-4" /> Claim +150 Coins</>}
          </button>
        </div>

        {/* Sponsor chest */}
        <div className="fz-card p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-300 to-teal-600 flex items-center justify-center shadow-[0_12px_28px_-10px_rgba(16,185,129,.8)] shrink-0">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">Bonus Stage Chest</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/15 text-emerald-600 dark:text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">EXTRA</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Unlock a treasure chest filled with <b className="text-emerald-600 dark:text-emerald-300">+250 coins</b>.
              </p>
            </div>
          </div>
          <button
            onClick={handleWatchAdBonus}
            className="h-12 w-full rounded-xl font-bold text-sm flex items-center justify-center gap-2 btn-tactile-green"
          >
            <PlayCircle className="w-4 h-4" /> Claim +250 Coins
          </button>
        </div>
      </div>
    </div>
  );
};
