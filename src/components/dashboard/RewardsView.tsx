import React, { useState } from 'react';
import { Gift, ArrowLeft } from 'lucide-react';
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
    <div className="w-full flex flex-col gap-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 border border-amber-400/30 shadow-2xl flex items-center justify-between">
        <div>
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-bold text-amber-200 hover:text-white flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </button>
          <div className="flex items-center gap-2">
            <Gift className="w-7 h-7 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">Funzo Rewards &amp; Loot</h2>
          </div>
          <p className="text-xs text-amber-100 mt-1">
            Claim free daily coins, streak milestones, and unlock exclusive gamer perks!
          </p>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] uppercase font-bold text-yellow-200 block">Total Coins</span>
          <span className="text-2xl font-black text-white font-mono">{stats.coins} 🪙</span>
        </div>
      </div>

      {/* Daily Claim Box */}
      <div className="p-6 rounded-3xl bg-[#140a33] border border-[#2b1660] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl shadow-inner shrink-0">
            🎁
          </div>
          <div>
            <h3 className="text-base font-black text-white mb-0.5">Daily Login Chest</h3>
            <p className="text-xs text-purple-300">
              Claim your guaranteed <strong className="text-amber-400">+150 Coins</strong> and keep your streak hot!
            </p>
          </div>
        </div>

        <button
          onClick={handleClaimDaily}
          disabled={claimedDaily}
          className={`px-6 py-3 rounded-full font-black text-xs shadow-lg transition active:scale-95 shrink-0 ${
            claimedDaily
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 hover:scale-105'
          }`}
        >
          {claimedDaily ? 'Claimed for Today ✓' : 'Claim +150 Coins'}
        </button>
      </div>

      {/* Sponsor Video Chest */}
      <div className="p-6 rounded-3xl bg-[#140a33] border border-[#2b1660] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/20 text-fuchsia-400 flex items-center justify-center text-3xl shadow-inner shrink-0">
            📺
          </div>
          <div>
            <h3 className="text-base font-black text-white mb-0.5">Sponsor Video Bonus</h3>
            <p className="text-xs text-purple-300">
              Watch a quick 5-second sponsor video to earn <strong className="text-fuchsia-400">+250 Coins</strong>!
            </p>
          </div>
        </div>

        <button
          onClick={handleWatchAdBonus}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition shrink-0"
        >
          Watch Video (+250 🪙)
        </button>
      </div>
    </div>
  );
};
