import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { getIQRankDetails } from '../types';

interface IQRankMeterProps {
  currentIQ: number;
  sectionName?: string;
  onOpenStats?: () => void;
}

export const IQRankMeter: React.FC<IQRankMeterProps> = ({
  currentIQ,
  onOpenStats,
}) => {
  const details = getIQRankDetails(currentIQ);
  const remaining = Math.max(0, details.nextIQ - currentIQ);

  return (
    <div
      onClick={onOpenStats}
      className="w-full mb-2.5 px-3 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-sm flex items-center justify-between cursor-pointer hover:border-indigo-500/40 transition group shadow-sm"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-sm shadow-sm shrink-0">
          <span>{details.badge}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-black text-slate-900 dark:text-white font-mono">
              {currentIQ} IQ
            </span>
            <span className="text-slate-400 dark:text-slate-600">·</span>
            <span className={`font-bold text-[11px] ${details.color}`}>
              {details.title}
            </span>
          </div>
          <div className="w-28 sm:w-36 bg-slate-200 dark:bg-slate-800 rounded-full h-1 mt-1 overflow-hidden">
            <div
              className="bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${details.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 text-right">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          {remaining > 0 ? `${remaining} to ${details.nextTitle}` : 'Max'}
        </span>
        <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-400 transition" />
      </div>
    </div>
  );
};
