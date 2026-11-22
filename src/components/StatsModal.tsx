import React from 'react';
import { X, Flame, Trophy, Coins, Clock, Calendar, Brain } from 'lucide-react';
import { PlayerStats, getIQRankDetails } from '../types';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
}

export const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const formatTime = (seconds: number | null) => {
    if (!seconds) return '--:--';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const rank = getIQRankDetails(stats.iq || 105);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#1a2c35] border-2 border-[#2b4554] p-5 shadow-2xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-black text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Player Ranking &amp; Stats
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Universal IQ & Rank Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-indigo-500/40 mb-3 text-left">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-base">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Universal IQ Rating</div>
                <div className="text-base font-black font-mono text-white flex items-center gap-1.5">
                  <span>{stats.iq || 105} IQ</span>
                  <span className={`text-xs ${rank.color}`}>({rank.title} {rank.badge})</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-1">
            <div
              className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-amber-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${rank.progressPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400">
            <span>Progress: {rank.progressPercent}%</span>
            <span>Next: {rank.nextTitle}</span>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
              <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Daily Streak</span>
            </div>
            <div className="text-xl font-black text-white">{stats.streak}d</div>
            <div className="text-[9px] text-slate-400">consecutive days</div>
          </div>

          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-yellow-400 text-xs font-bold mb-0.5">
              <Coins className="w-3.5 h-3.5" />
              <span>Coins</span>
            </div>
            <div className="text-xl font-black text-white">{stats.coins}</div>
            <div className="text-[9px] text-slate-400">total balance</div>
          </div>

          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-emerald-400 text-xs font-bold mb-0.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>Games Won</span>
            </div>
            <div className="text-xl font-black text-white">{stats.totalGamesWon}</div>
            <div className="text-[9px] text-slate-400">across all genres</div>
          </div>

          <div className="rounded-2xl bg-slate-800/80 border border-slate-700/60 p-2.5 text-center">
            <div className="flex items-center justify-center gap-1 text-indigo-400 text-xs font-bold mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Fastest Solve</span>
            </div>
            <div className="text-xl font-black text-white">{formatTime(stats.bestTimeSeconds)}</div>
            <div className="text-[9px] text-slate-400">in Sudoku Master</div>
          </div>
        </div>

        {/* Daily Streak Notice */}
        <div className="p-2.5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-xs text-amber-200">
          <div className="font-bold flex items-center gap-1 mb-0.5 text-amber-400 text-[11px]">
            <Calendar className="w-3.5 h-3.5" /> Universal Daily Streak Active
          </div>
          <p className="text-[10px] text-slate-300 leading-relaxed">
            Every game solved increases your IQ (+15 IQ), keeps your streak alive, and unlocks coins!
          </p>
        </div>
      </div>
    </div>
  );
};
