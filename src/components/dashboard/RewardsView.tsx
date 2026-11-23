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
    <div className="w-full flex flex-col gap-6 animate-fade-in pb-12 font-['Fredoka']">
      {/* Header Banner - Mario 1-Up Mushroom & Coin Shop */}
      <div className="p-6 rounded-3xl bg-[#e52521] border-4 border-black shadow-[6px_6px_0_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white relative overflow-hidden">
        {/* Subtle decorative dot pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-32 opacity-15 bg-[radial-gradient(#fff_2px,transparent_2px)] [background-size:12px_12px] pointer-events-none" />

        <div className="relative z-10">
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-[11px] font-black font-pixel text-yellow-300 hover:text-white flex items-center gap-1.5 mb-3 transition active:translate-y-0.5"
          >
            <ArrowLeft className="w-4 h-4" /> ← WORLD MAP
          </button>
          <div className="flex items-center gap-3">
            <span className="text-3xl filter drop-shadow">🍄</span>
            <div>
              <span className="text-[10px] font-black uppercase font-pixel tracking-widest text-yellow-300 block">
                TOAD'S ITEM SHOP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                Mystery Rewards &amp; Loot
              </h2>
            </div>
          </div>
          <p className="text-xs text-white/90 mt-2 font-medium max-w-md">
            Claim free daily ? block coins, power up your Super Star streak, and discover secret Warp Zone bonuses!
          </p>
        </div>

        <div className="relative z-10 sm:text-right bg-black/30 px-5 py-3 rounded-2xl border-2 border-black/50 backdrop-blur-sm self-start sm:self-auto">
          <span className="text-[9px] uppercase font-bold font-pixel text-yellow-300 block mb-1">
            MARIO COINS
          </span>
          <span className="text-2xl sm:text-3xl font-black text-yellow-300 font-pixel drop-shadow">
            {stats.coins} 🪙
          </span>
        </div>
      </div>

      {/* Daily Claim Box - Classic Mario [ ? ] Question Block */}
      <div className="p-6 rounded-3xl bg-[#fbd000] border-4 border-black shadow-[6px_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
        {/* 4 Corner Rivets */}
        <span className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-[#996b00] border-2 border-black opacity-80" />
        <span className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-[#996b00] border-2 border-black opacity-80" />
        <span className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-[#996b00] border-2 border-black opacity-80" />
        <span className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-[#996b00] border-2 border-black opacity-80" />

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* Question mark block badge */}
          <div className="w-16 h-16 rounded-2xl bg-amber-600 border-3 border-black text-yellow-200 flex items-center justify-center text-2xl font-black font-pixel shadow-[3px_3px_0_#000] shrink-0">
            ?
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-950 font-pixel tracking-tight">
                Daily ? Block
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-black text-yellow-300 text-[10px] font-black font-pixel">
                +1-UP
              </span>
            </div>
            <p className="text-xs text-amber-950 font-semibold mt-1">
              Punch the ? block to claim <strong className="text-slate-950 underline decoration-black decoration-2 font-black">+150 Coins</strong> &amp; extend your streak!
            </p>
          </div>
        </div>

        <button
          onClick={handleClaimDaily}
          disabled={claimedDaily}
          className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-black text-xs font-pixel shadow-[3px_3px_0_#000] transition active:translate-y-1 shrink-0 ${
            claimedDaily
              ? 'bg-amber-700/60 text-amber-200 border-2 border-black cursor-not-allowed'
              : 'bg-[#e52521] hover:bg-[#ff3b37] text-white border-2 border-black hover:scale-105'
          }`}
        >
          {claimedDaily ? 'BLOCK EMPTIED ✓' : 'HIT BLOCK! (+150 🪙)'}
        </button>
      </div>

      {/* Sponsor Video Chest - Mario Green Warp Pipe Chamber */}
      <div className="p-6 rounded-3xl bg-[#00a859] border-4 border-black shadow-[6px_6px_0_#000] flex flex-col sm:flex-row items-center justify-between gap-5 relative overflow-hidden">
        {/* Warp Pipe Highlight Stripe */}
        <div className="absolute top-0 bottom-0 left-8 w-12 bg-white/20 skew-x-[-20deg] pointer-events-none" />

        <div className="flex items-center gap-4 w-full sm:w-auto relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-[#006633] border-3 border-black text-emerald-200 flex items-center justify-center text-3xl shadow-[3px_3px_0_#000] shrink-0">
            🟢
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-white font-pixel tracking-tight">
                Secret Warp Zone
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-black text-emerald-300 text-[10px] font-black font-pixel">
                BONUS STAGE
              </span>
            </div>
            <p className="text-xs text-emerald-100 font-semibold mt-1">
              Travel down the Warp Pipe to collect a massive stash of <strong className="text-yellow-300 font-black">+250 Coins</strong>!
            </p>
          </div>
        </div>

        <button
          onClick={handleWatchAdBonus}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#fbd000] hover:bg-[#ffe34d] text-slate-950 font-black text-xs font-pixel border-2 border-black shadow-[3px_3px_0_#000] hover:scale-105 active:translate-y-1 transition shrink-0 relative z-10"
        >
          ENTER WARP ZONE (+250 🪙)
        </button>
      </div>
    </div>
  );
};
