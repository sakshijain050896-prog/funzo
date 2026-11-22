import React from 'react';
import { Brain, ArrowUpRight } from 'lucide-react';
import { getIQRankDetails } from '../types';

interface IQRankMeterProps {
  currentIQ: number;
  sectionName?: string;
  onOpenStats?: () => void;
}

export const IQRankMeter: React.FC<IQRankMeterProps> = ({
  currentIQ,
  sectionName = 'Cognitive Arena',
  onOpenStats,
}) => {
  const details = getIQRankDetails(currentIQ);
  const remaining = Math.max(0, details.nextIQ - currentIQ);

  return (
    <div className={`w-full p-2.5 rounded-2xl bg-white dark:bg-slate-900 border ${details.borderColor} mb-2.5 shadow-sm transition-all`}>
      <div className="flex items-center justify-between mb-1.5">
        {/* Left: Icon & IQ */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-xl ${details.bgColor} flex items-center justify-center font-bold text-lg shrink-0`}>
            <span>{details.badge}</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {sectionName}
              </span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black">
                +15 IQ/WIN
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black font-mono text-slate-900 dark:text-white">
                {currentIQ} IQ
              </span>
              <span className="text-slate-400 dark:text-slate-600">·</span>
              <span className={`text-xs font-black ${details.color}`}>
                {details.title}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick action / Stats */}
        {onOpenStats && (
          <button
            onClick={onOpenStats}
            className="flex items-center gap-0.5 text-[11px] font-bold text-indigo-500 dark:text-indigo-400 hover:underline px-1.5 py-0.5 rounded-lg hover:bg-indigo-500/10 transition"
            title="View Rank Stats & Records"
          >
            <span>Ranks</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Progress Bar Gauge towards next rank */}
      <div className="w-full">
        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 mb-1">
          <span className="flex items-center gap-1">
            <Brain className="w-3 h-3 text-indigo-400" />
            <span>Next Tier:</span>
            <strong className="text-slate-700 dark:text-slate-200">{details.nextTitle}</strong>
          </span>
          <span className="font-mono font-bold text-amber-500 dark:text-amber-400">
            {remaining > 0 ? `${remaining} IQ needed` : 'MAX RANK'}
          </span>
        </div>

        <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 h-full transition-all duration-700 rounded-full"
            style={{ width: `${details.progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
