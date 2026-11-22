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
      className="w-full mb-3 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#1a2c35] border-2 border-slate-200 dark:border-[#2b4554] shadow-sm dark:shadow-md flex items-center justify-between cursor-pointer hover:border-slate-300 dark:hover:border-[#3b5a6d] transition group"
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202f36] border-b-2 border-slate-300 dark:border-[#142026] flex items-center justify-center text-base shrink-0 shadow-sm">
          <span>{details.badge}</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="font-black text-slate-900 dark:text-white font-mono">
              {currentIQ} IQ
            </span>
            <span className="text-slate-400">·</span>
            <span className={`font-black text-[11px] ${details.color}`}>
              {details.title}
            </span>
          </div>
          <div className="w-28 sm:w-36 bg-slate-100 dark:bg-[#131f24] rounded-full h-1.5 mt-1 overflow-hidden border border-slate-200 dark:border-[#2b4554]">
            <div
              className="bg-[#58cc02] h-full rounded-full transition-all duration-500"
              style={{ width: `${details.progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1 text-right">
        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">
          {remaining > 0 ? `${remaining} to ${details.nextTitle}` : 'Max'}
        </span>
        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#58cc02] transition" />
      </div>
    </div>
  );
};
