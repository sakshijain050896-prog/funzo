import React from 'react';
import { 
  BarChart2, Trophy, Flame, ArrowRight, 
  Gamepad2, Star, Coins
} from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface DashboardWidgetsProps {
  stats: PlayerStats;
  onOpenStats: () => void;
  onOpenLeaderboard: () => void;
  onOpenRewards: () => void;
  onPlayDailyChallenge: () => void;
}

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  stats,
  onOpenStats,
  onOpenLeaderboard,
  onOpenRewards,
  onPlayDailyChallenge,
}) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {/* ---------------- ROW 1: YOUR STATS, DAILY CHALLENGE, LEADERBOARD ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Widget 1: Your Stats */}
        <div className="rounded-3xl p-5 bg-[#1c1e2f] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-violet-400" />
              <h4 className="text-sm font-black text-white">Your Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-[11px] font-black text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Games Played */}
            <div className="p-2.5 rounded-2xl bg-[#24273d] border border-white/5 flex flex-col items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-purple-400 mb-1" />
              <span className="text-base font-black text-white font-mono leading-none mb-1">
                {stats.totalGamesPlayed || 12}
              </span>
              <span className="text-[9px] font-bold text-slate-400 leading-tight">Games Played</span>
            </div>

            {/* Total Points / IQ */}
            <div className="p-2.5 rounded-2xl bg-[#24273d] border border-white/5 flex flex-col items-center justify-center">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mb-1" />
              <span className="text-base font-black text-white font-mono leading-none mb-1">
                {(stats.iq || 105) * 10}
              </span>
              <span className="text-[9px] font-bold text-slate-400 leading-tight">Total Points</span>
            </div>

            {/* Day Streak */}
            <div className="p-2.5 rounded-2xl bg-[#24273d] border border-white/5 flex flex-col items-center justify-center">
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400 mb-1" />
              <span className="text-base font-black text-white font-mono leading-none mb-1">
                {stats.streak || 7}
              </span>
              <span className="text-[9px] font-bold text-slate-400 leading-tight">Day Streak</span>
            </div>

            {/* Coins */}
            <div className="p-2.5 rounded-2xl bg-[#24273d] border border-white/5 flex flex-col items-center justify-center">
              <Coins className="w-5 h-5 text-yellow-400 mb-1" />
              <span className="text-base font-black text-yellow-400 font-mono leading-none mb-1">
                {stats.coins || 5430}
              </span>
              <span className="text-[9px] font-bold text-slate-400 leading-tight">Coins</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Daily Challenge */}
        <div className="rounded-3xl p-5 bg-[#1c1e2f] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-black text-white">Daily Challenge</h4>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Ends in 12h 30m
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold text-slate-300 leading-snug mb-1">
                Complete today&apos;s challenge &amp; earn <span className="text-amber-400 font-black">100 coins!</span>
              </p>
              <span className="text-[10px] font-mono text-purple-400 font-black">0 / 1 Completed</span>
            </div>
            <div className="text-3xl select-none animate-bounce shrink-0">
              🎁
            </div>
          </div>

          <button
            onClick={() => { sound.playTap(); onPlayDailyChallenge(); }}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <span>Play Challenge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Widget 3: Leaderboard */}
        <div className="rounded-3xl p-5 bg-[#1c1e2f] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <h4 className="text-sm font-black text-white">Leaderboard</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenLeaderboard(); }}
              className="text-[11px] font-black text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mb-1">
            {/* Rank 1 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-[#24273d] border border-white/5/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  1
                </span>
                <span className="text-xs">👧</span>
                <span className="font-extrabold text-white">GameQueen 👑</span>
              </div>
              <span className="font-mono font-black text-amber-400">98,450</span>
            </div>

            {/* Rank 2 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-[#24273d] border border-white/5/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  2
                </span>
                <span className="text-xs">🧑</span>
                <span className="font-extrabold text-slate-200">PlayMaster007</span>
              </div>
              <span className="font-mono font-black text-slate-300">87,320</span>
            </div>

            {/* Rank 3 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-[#24273d] border border-white/5/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-black text-[10px] flex items-center justify-center">
                  3
                </span>
                <span className="text-xs">🦊</span>
                <span className="font-extrabold text-slate-200">FunPlayer</span>
              </div>
              <span className="font-mono font-black text-amber-600">76,900</span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- ROW 2: UNLOCK REWARDS, TOP GAMES THIS WEEK, GOOD VIBES ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Widget 4: Unlock Exciting Rewards (6 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-gradient-to-r from-[#581c87] via-[#6b21a8] to-[#9333ea] border border-purple-400/30 shadow-xl flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-lg font-black text-white mb-1 drop-shadow">
              Unlock Exciting Rewards!
            </h4>
            <p className="text-xs text-purple-200 font-medium mb-4 max-w-xs leading-relaxed">
              Play games, collect coins and redeem amazing rewards.
            </p>
            <button
              onClick={() => { sound.playTap(); onOpenRewards(); }}
              className="px-5 py-2 rounded-full bg-white text-slate-950 font-black text-xs shadow-md hover:bg-slate-100 active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Explore Rewards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-5xl select-none animate-bounce shrink-0 relative z-10">
            🎁
          </div>
          {/* Subtle shine */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Widget 5: Top Games This Week (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl p-5 bg-[#1c1e2f] border border-white/10 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-black text-white">Top Games This Week</h4>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-4 gap-2 items-end h-24 mb-2 px-1">
            {/* Truth or Dare */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[9px] font-mono font-black text-purple-300">42%</span>
              <div className="w-full bg-gradient-to-t from-purple-700 to-indigo-500 rounded-t-lg h-[85%]" />
              <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">Truth/Dare</span>
            </div>

            {/* Sudoku */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[9px] font-mono font-black text-cyan-300">35%</span>
              <div className="w-full bg-gradient-to-t from-cyan-600 to-sky-400 rounded-t-lg h-[70%]" />
              <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">Sudoku</span>
            </div>

            {/* Tic Tac Toe */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[9px] font-mono font-black text-pink-300">15%</span>
              <div className="w-full bg-gradient-to-t from-pink-600 to-rose-400 rounded-t-lg h-[35%]" />
              <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">Tic Tac</span>
            </div>

            {/* Memory Match */}
            <div className="flex flex-col items-center gap-1 h-full justify-end">
              <span className="text-[9px] font-mono font-black text-amber-300">8%</span>
              <div className="w-full bg-gradient-to-t from-amber-600 to-yellow-400 rounded-t-lg h-[20%]" />
              <span className="text-[8px] font-bold text-slate-400 truncate w-full text-center">Memory</span>
            </div>
          </div>
        </div>

        {/* Widget 6: Good Vibes Only 💖 (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl p-5 bg-gradient-to-br from-[#1c0c45] to-[#120630] border-2 border-pink-500/40 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="text-3xl mb-1 text-pink-400 animate-pulse">💖</div>
          <h4 className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300 italic tracking-wider">
            Good Vibes
          </h4>
          <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300 italic tracking-wider">
            Only 💜
          </span>
          <div className="absolute inset-0 bg-pink-500/10 rounded-3xl blur-xl pointer-events-none group-hover:opacity-40 transition" />
        </div>
      </div>
    </div>
  );
};
