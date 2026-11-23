import React from 'react';
import { 
  BarChart2, Trophy, Flame, ArrowRight, 
  Gamepad2, Coins
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

const GAME_NAME_MAP: Record<string, string> = {
  sudoku: 'Sudoku',
  arrows: 'Arrow Out',
  '2048': '2048 Rush',
  tod: 'Truth/Dare',
  '2t1l': '2 Truths',
  'spill-it': 'Spill It',
  mystery: 'Mystery',
  tictactoe: 'Tic Tac',
  memory: 'Memory',
  dice: 'Dice Roll',
};

const BAR_GRADIENTS = [
  'from-violet-600 to-indigo-500',
  'from-cyan-500 to-blue-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-yellow-400',
];

export const DashboardWidgets: React.FC<DashboardWidgetsProps> = ({
  stats,
  onOpenStats,
  onOpenLeaderboard,
  onOpenRewards,
  onPlayDailyChallenge,
}) => {
  const history = stats.gamesPlayedHistory || {};
  const playedEntries = Object.entries(history)
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  const totalPlays = playedEntries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="w-full flex flex-col gap-5">
      {/* ---------------- ROW 1: YOUR STATS, DAILY CHALLENGE, LEADERBOARD ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Widget 1: Your Real Stats */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Your Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-[11px] font-black text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 transition"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Games Played */}
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 flex flex-col items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-purple-500 dark:text-purple-400 mb-1" />
              <span className="text-base font-black text-slate-900 dark:text-white font-mono leading-none mb-1">
                {stats.totalGamesPlayed}
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-tight">Played</span>
            </div>

            {/* Games Won */}
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 flex flex-col items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-500 dark:text-emerald-400 mb-1" />
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono leading-none mb-1">
                {stats.totalGamesWon}
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-tight">Won</span>
            </div>

            {/* Day Streak */}
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 flex flex-col items-center justify-center">
              <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 mb-1" />
              <span className="text-base font-black text-slate-900 dark:text-white font-mono leading-none mb-1">
                {stats.streak}d
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-tight">Streak</span>
            </div>

            {/* Coins */}
            <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 flex flex-col items-center justify-center">
              <Coins className="w-5 h-5 text-yellow-500 dark:text-yellow-400 mb-1" />
              <span className="text-base font-black text-yellow-600 dark:text-yellow-400 font-mono leading-none mb-1">
                {stats.coins}
              </span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 leading-tight">Coins</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Daily Challenge */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Daily Challenge</h4>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
              Ends in 12h 30m
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-snug mb-1">
                Complete today&apos;s challenge &amp; earn <span className="text-amber-600 dark:text-amber-400 font-black">100 coins!</span>
              </p>
              <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-black">
                {stats.totalGamesWon > 0 ? '1 / 1 Completed ✓' : '0 / 1 Completed'}
              </span>
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

        {/* Widget 3: Leaderboard Preview */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white">Global Leaderboard</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenLeaderboard(); }}
              className="text-[11px] font-black text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1 transition"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mb-1">
            {/* Rank 1 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  1
                </span>
                <span className="text-xs">👧</span>
                <span className="font-extrabold text-slate-800 dark:text-white">GameQueen 👑</span>
              </div>
              <span className="font-mono font-black text-amber-600 dark:text-amber-400">98,450</span>
            </div>

            {/* Rank 2 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-slate-50 dark:bg-[#24273d] border border-slate-200/80 dark:border-white/5 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-300 text-slate-950 font-black text-[10px] flex items-center justify-center">
                  2
                </span>
                <span className="text-xs">🧑</span>
                <span className="font-extrabold text-slate-700 dark:text-slate-200">PlayMaster007</span>
              </div>
              <span className="font-mono font-black text-slate-600 dark:text-slate-300">87,320</span>
            </div>

            {/* Current Player Rank */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-black text-[10px] flex items-center justify-center">
                  YOU
                </span>
                <span className="text-xs">🎮</span>
                <span className="font-extrabold text-violet-900 dark:text-violet-200">{stats.username || 'Player'}</span>
              </div>
              <span className="font-mono font-black text-violet-700 dark:text-violet-300">
                {(stats.totalGamesWon * 100 + stats.coins).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- ROW 2: UNLOCK REWARDS, TOP GAMES THIS WEEK, GOOD VIBES ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Widget 4: Unlock Exciting Rewards (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 border border-purple-400/30 shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-lg font-black text-white mb-1 drop-shadow">
              Unlock Exciting Rewards!
            </h4>
            <p className="text-xs text-purple-100 font-medium mb-4 max-w-xs leading-relaxed">
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

        {/* Widget 5: Your Most Played Games (Real Data, 4 cols) */}
        <div className="lg:col-span-4 rounded-3xl p-5 bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h4 className="text-xs font-black text-slate-900 dark:text-white">Your Most Played Games</h4>
          </div>

          {/* Bar Chart Visualization - Real Player Data */}
          {totalPlays > 0 ? (
            <div className="grid grid-cols-4 gap-2 items-end h-24 mb-2 px-1">
              {playedEntries.map(([gameKey, count], idx) => {
                const pct = Math.round((count / totalPlays) * 100);
                const heightPercent = Math.max(25, Math.min(100, pct));
                return (
                  <div key={gameKey} className="flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-mono font-black text-slate-600 dark:text-purple-300">
                      {pct}%
                    </span>
                    <div 
                      className={`w-full bg-gradient-to-t ${BAR_GRADIENTS[idx % BAR_GRADIENTS.length]} rounded-t-lg transition-all duration-500`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 truncate w-full text-center">
                      {GAME_NAME_MAP[gameKey] || gameKey}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 mb-2 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-200 dark:border-white/10">
              <span className="text-xl mb-1">🎮</span>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">No games played yet</p>
              <span className="text-[9px] text-slate-500 dark:text-slate-400">Play any game above to see your activity!</span>
            </div>
          )}
        </div>

        {/* Widget 6: Good Vibes Only 💖 (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl p-5 bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-[#1c0c45] dark:to-[#120630] border-2 border-pink-300 dark:border-pink-500/40 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="text-3xl mb-1 text-pink-500 animate-pulse">💖</div>
          <h4 className="text-xl sm:text-2xl font-black text-pink-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-400 dark:via-fuchsia-300 dark:to-purple-300 italic tracking-wider">
            Good Vibes
          </h4>
          <span className="text-xl sm:text-2xl font-black text-purple-700 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-pink-400 dark:via-fuchsia-300 dark:to-purple-300 italic tracking-wider">
            Only 💜
          </span>
          <div className="absolute inset-0 bg-pink-500/10 rounded-3xl blur-xl pointer-events-none group-hover:opacity-40 transition" />
        </div>
      </div>
    </div>
  );
};
