import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
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
    <div className="w-full flex flex-col gap-4 sm:gap-6 animate-fade-in pb-12 font-['Fredoka']">
      {/* Header Banner - Pastel Warm Sunset */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#fecdd3] via-[#fed7aa] to-[#fef08a] border-2 border-[#fde68a] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-900 relative overflow-hidden">
        <div className="relative z-10">
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-black text-[#9f1239] hover:underline flex items-center gap-1.5 mb-2.5 transition active:translate-y-0.5 font-['Fredoka']"
          >
            <ArrowLeft className="w-4 h-4" /> ← Back to Games
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow-sm">🎁</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#9a3412] block">
                DAILY LOOT &amp; PERKS
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-wide">
                Rewards &amp; Free Coins
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-700 mt-1.5 font-medium max-w-md">
            Claim free daily bonus coins, keep your streak alive, and power up your games!
          </p>
        </div>

        <div className="relative z-10 sm:text-right bg-white/70 dark:bg-black/30 px-4 py-2.5 rounded-2xl border border-amber-300 backdrop-blur-sm self-start sm:self-auto shadow-xs">
          <span className="text-[9px] uppercase font-bold text-[#854d0e] dark:text-yellow-300 block mb-0.5">
            YOUR COINS
          </span>
          <span className="text-xl sm:text-2xl font-black text-[#854d0e] dark:text-yellow-300 font-pixel">
            {stats.coins} 🪙
          </span>
        </div>
      </div>

      {/* Daily Claim Box - Pastel Sunshine */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#fef9c3] dark:bg-[#1f2638] border-2 border-[#fef08a] dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          {/* Question mark block badge */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#fef08a] dark:bg-[#78350f]/40 border-2 border-[#facc15] text-[#854d0e] dark:text-[#fef08a] flex items-center justify-center text-2xl font-black shadow-xs shrink-0">
            🎁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Daily Bonus Gift
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#fef08a] text-[#854d0e] text-[10px] font-black">
                FREE
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Claim <strong className="text-[#854d0e] dark:text-amber-300 font-black">+150 Coins</strong> and maintain your login streak!
            </p>
          </div>
        </div>

        <button
          onClick={handleClaimDaily}
          disabled={claimedDaily}
          className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-xs shadow-xs transition active:translate-y-0.5 shrink-0 ${
            claimedDaily
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-[#a7f3d0] hover:bg-[#6ee7b7] border-b-4 border-[#059669] text-[#064e3b]'
          }`}
        >
          {claimedDaily ? 'GIFT CLAIMED ✓' : 'CLAIM +150 COINS 🪙'}
        </button>
      </div>

      {/* Sponsor Video Chest - Pastel Mint */}
      <div className="p-5 sm:p-6 rounded-3xl bg-[#dcfce7] dark:bg-[#162529] border-2 border-[#bbf7d0] dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
        <div className="flex items-center gap-3.5 w-full sm:w-auto relative z-10">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#bbf7d0] dark:bg-[#064e3b]/50 border-2 border-[#86efac] text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-2xl shadow-xs shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Bonus Stage Chest
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-[#bbf7d0] text-[#065f46] text-[10px] font-black">
                EXTRA
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
              Unlock a treasure chest filled with <strong className="text-[#065f46] dark:text-emerald-300 font-black">+250 Coins</strong>!
            </p>
          </div>
        </div>

        <button
          onClick={handleWatchAdBonus}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#fef9c3] hover:bg-[#fef08a] border-b-4 border-[#ca8a04] text-[#854d0e] font-black text-xs shadow-xs active:translate-y-0.5 transition shrink-0 relative z-10"
        >
          CLAIM +250 COINS 🪙
        </button>
      </div>
    </div>
  );
};
