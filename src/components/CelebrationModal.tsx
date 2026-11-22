import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Brain, ArrowUpRight } from 'lucide-react';
import { sound } from '../lib/soundEffects';
import { getIQRankDetails } from '../types';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  iqGained: number;
  currentIQ: number;
  coinsGained?: number;
  onContinue?: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  title = 'FANTASTIC MOVE! 🌟',
  subtitle = 'Level Complete! Your intellect is soaring.',
  iqGained = 15,
  currentIQ = 110,
  coinsGained = 25,
  onContinue,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playVictory();
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const previousIQ = Math.max(80, currentIQ - iqGained);
  const rank = getIQRankDetails(currentIQ);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border-2 border-amber-500/50 p-6 text-center shadow-2xl overflow-hidden">
        {/* Glow backdrop behind badge */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Trophy / Brain Icon */}
        <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30 font-black animate-bounce">
          <Trophy className="w-8 h-8 fill-slate-950" />
        </div>

        {/* Title & Feedback */}
        <span className="text-[11px] font-black uppercase tracking-widest text-amber-400 block mb-0.5 flex items-center justify-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> {title}
        </span>
        <h3 className="text-xl font-black text-white mb-2 leading-tight">
          Brilliant Achievement!
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-5">
          {subtitle}
        </p>

        {/* Animated IQ Meter Box */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 mb-4 text-left shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>Universal Mind IQ:</span>
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-base text-amber-400">
              <span className="text-slate-500 line-through text-xs">{previousIQ}</span>
              <span>➔</span>
              <span className="text-lg text-emerald-400">{currentIQ} IQ</span>
              <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/20">
                +{iqGained}
              </span>
            </div>
          </div>

          {/* Progress Bar Gauge */}
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700/80 mb-2">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 h-full transition-all duration-1000 animate-pulse"
              style={{ width: `${rank.progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Current Rank:</span>
            <span className={`font-black flex items-center gap-1 ${rank.color}`}>
              <span>{rank.badge}</span>
              <span>{rank.title}</span>
            </span>
          </div>
        </div>

        {/* Coins Reward */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-5 text-xs">
          <span className="text-slate-300 font-semibold">Bonus Reward:</span>
          <span className="text-amber-400 font-black flex items-center gap-1 text-sm font-mono">
            +{coinsGained} Coins 🪙
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => {
            sound.playTap();
            if (onContinue) onContinue();
            onClose();
          }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 active:scale-95 transition flex items-center justify-center gap-1.5"
        >
          <span>Continue Next Challenge</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
