import React, { useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Brain, ArrowUpRight, Quote, Heart } from 'lucide-react';
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

const FEEL_GOOD_COMPLIMENTS = [
  'GREAT JOB! 🌟',
  'WOW, UNSTOPPABLE! 🔥',
  'GENIUS AT WORK! 🧠',
  'FANTASTIC SOLVE! 🚀',
  'PURE BRILLIANCE! 💎',
  'SPECTACULAR MIND! 🎯',
  'MASTERCLASS MOVE! 👑',
  'SUPERB LOGIC! ⚡'
];

const HAPPY_MOTIVATIONAL_QUOTES = [
  '“Your brain is a supercomputer, and today it’s running at peak performance!”',
  '“Brilliant minds don’t just solve problems—they make it look effortless!”',
  '“Every puzzle you conquer unlocks another layer of your infinite potential.”',
  '“Sharp thinking, flawless intuition, and unmatched focus. Keep shining!”',
  '“Intelligence is having fun with logic. You are absolutely crushing it!”',
  '“Success is the sum of small victories repeated every day. Fantastic round!”',
  '“Your intellect is leveling up with every move. Stay unstoppable!”',
  '“True mastery is the art of seeing solutions where others see dead ends!”'
];

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
        particleCount: 90,
        spread: 85,
        origin: { y: 0.5 },
      });
    }
  }, [isOpen]);

  // Random feel-good praise and happy quote per celebration popup
  const randomCompliment = useMemo(() => {
    return FEEL_GOOD_COMPLIMENTS[Math.floor(Math.random() * FEEL_GOOD_COMPLIMENTS.length)];
  }, [isOpen]);

  const randomQuote = useMemo(() => {
    return HAPPY_MOTIVATIONAL_QUOTES[Math.floor(Math.random() * HAPPY_MOTIVATIONAL_QUOTES.length)];
  }, [isOpen]);

  if (!isOpen) return null;

  const previousIQ = Math.max(80, currentIQ - iqGained);
  const rank = getIQRankDetails(currentIQ);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#181d2f] border-4 border-black p-6 text-center shadow-[6px_6px_0_#000] overflow-hidden font-sans">
        {/* Glow backdrop behind badge */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Animated Trophy / Brain Icon */}
        <div className="relative w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-orange-400 text-slate-950 flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-amber-500/30 font-black animate-bounce">
          <Trophy className="w-8 h-8 fill-slate-950" />
        </div>

        {/* Dynamic Uplifting Compliment Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-300 dark:border-amber-500/40 text-amber-700 dark:text-amber-300 font-black text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>{randomCompliment}</span>
        </div>

        {/* Main Achievement Title */}
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1 leading-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          {subtitle}
        </p>

        {/* Inspiring Happy Quote Card */}
        <div className="p-3 rounded-2xl bg-purple-50 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-slate-950 border border-purple-200 dark:border-purple-500/30 mb-3 text-left shadow-inner">
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
            <p className="text-[11px] font-semibold italic text-purple-900 dark:text-purple-200 leading-relaxed">
              {randomQuote}
            </p>
          </div>
        </div>

        {/* Animated IQ Meter Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-500/40 mb-3 text-left shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>Universal Mind IQ:</span>
            </span>
            <div className="flex items-center gap-1 font-mono font-black text-sm sm:text-base text-amber-600 dark:text-amber-400">
              <span className="text-slate-400 dark:text-slate-500 line-through text-xs">{previousIQ}</span>
              <span>➔</span>
              <span className="text-base text-emerald-600 dark:text-emerald-400 font-bold">{currentIQ} IQ</span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-500/20">
                +{iqGained}
              </span>
            </div>
          </div>

          {/* Progress Bar Gauge */}
          <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-300 dark:border-slate-700/80 mb-2">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 h-full transition-all duration-1000 animate-pulse"
              style={{ width: `${rank.progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-500 dark:text-slate-400">Current Rank:</span>
            <span className={`font-black flex items-center gap-1 ${rank.color}`}>
              <span>{rank.badge}</span>
              <span>{rank.title}</span>
            </span>
          </div>
        </div>

        {/* Coins Reward */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 mb-4 text-xs">
          <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Bonus Reward:</span>
          </span>
          <span className="text-amber-600 dark:text-amber-400 font-black flex items-center gap-1 text-xs font-mono">
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
          className="w-full py-3 rounded-2xl btn-tactile-green font-black text-sm shadow-lg flex items-center justify-center gap-1.5"
        >
          <span>Continue Next Challenge</span>
          <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
