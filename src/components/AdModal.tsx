import React, { useState, useEffect } from 'react';
import { PlayCircle, CheckCircle2, X } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReward: () => void;
  rewardTitle: string;
}

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  onClose,
  onReward,
  rewardTitle,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(5);
      setIsCompleted(false);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 p-6 text-center shadow-2xl text-slate-900 dark:text-white">
        {!isCompleted ? (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-3 animate-pulse">
              <PlayCircle className="w-7 h-7" />
            </div>
            <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-1">
              Sponsored Video Ad
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Watching Sponsor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
              Hold on! You are unlocking: <span className="text-indigo-600 dark:text-indigo-300 font-semibold">{rewardTitle}</span>
            </p>

            {/* Countdown circular / bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
              <div
                className="bg-indigo-500 h-2 transition-all duration-1000"
                style={{ width: `${((5 - secondsLeft) / 5) * 100}%` }}
              />
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Reward unlocks in {secondsLeft}s
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mb-3">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Reward Ready!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-6">
              You unlocked: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{rewardTitle}</span>
            </p>

            <button
              onClick={() => {
                onReward();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-95 transition"
            >
              Claim Reward
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
