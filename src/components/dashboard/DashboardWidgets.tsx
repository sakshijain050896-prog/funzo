import React from 'react';
import { 
  Trophy, ArrowRight 
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
      {/* ---------------- ROW 1: MARIO TALLY, QUESTION BLOCK CHALLENGE, STAR RANKINGS ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Widget 1: Player Status Tally */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎮</span>
              <h4 className="text-sm font-black text-slate-900 dark:text-white font-['Fredoka']">Your Gaming Stats</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenStats(); }}
              className="text-xs font-black text-[#e52521] hover:underline flex items-center gap-1 transition font-['Fredoka']"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Games Played */}
            <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-[#1f2438] border-2 border-sky-300 dark:border-sky-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🎮</span>
              <span className="text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] leading-none mb-1">
                {stats.totalGamesPlayed}
              </span>
              <span className="text-[9px] font-extrabold text-sky-800 dark:text-sky-300 leading-tight font-['Fredoka']">Played</span>
            </div>

            {/* Games Won */}
            <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-[#1f2438] border-2 border-emerald-300 dark:border-emerald-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🏆</span>
              <span className="text-sm font-black text-[#00a859] dark:text-[#43b047] font-['Fredoka'] leading-none mb-1">
                {stats.totalGamesWon}
              </span>
              <span className="text-[9px] font-extrabold text-emerald-800 dark:text-emerald-300 leading-tight font-['Fredoka']">Games Won</span>
            </div>

            {/* Streak */}
            <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-[#1f2438] border-2 border-amber-300 dark:border-amber-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">⭐</span>
              <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-['Fredoka'] leading-none mb-1">
                {stats.streak}d
              </span>
              <span className="text-[9px] font-extrabold text-amber-800 dark:text-amber-300 leading-tight font-['Fredoka']">Streak</span>
            </div>

            {/* Coins */}
            <div className="p-2.5 rounded-2xl bg-yellow-50 dark:bg-[#1f2438] border-2 border-yellow-300 dark:border-yellow-700/50 flex flex-col items-center justify-center">
              <span className="text-base mb-0.5">🪙</span>
              <span className="text-sm font-black text-yellow-600 dark:text-yellow-400 font-['Fredoka'] leading-none mb-1">
                {stats.coins}
              </span>
              <span className="text-[9px] font-extrabold text-yellow-800 dark:text-yellow-300 leading-tight font-['Fredoka']">Coins</span>
            </div>
          </div>
        </div>

        {/* Widget 2: Daily Challenge */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#fcd116] via-[#f7b705] to-[#f59e0b] border-4 border-[#c49600] shadow-[4px_4px_0_#855e00] flex flex-col justify-between relative overflow-hidden">
          {/* Corner Bolts */}
          <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#855e00]" />
          <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#855e00]" />

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-[#855e00] text-[#fcd116] flex items-center justify-center font-black text-xs">?</span>
              <h4 className="text-sm font-black text-slate-950 font-['Fredoka']">Daily Game Challenge</h4>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-white/40 border border-[#855e00] text-slate-950 font-['Fredoka']">
              12H LEFT
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 mb-2">
            <div>
              <p className="text-xs font-black text-amber-950 leading-snug mb-1 font-['Fredoka']">
                Clear Sudoku Master to claim <span className="text-[#e52521] font-black">+100 Bonus Coins!</span>
              </p>
              <span className="text-xs text-amber-900 font-black font-['Fredoka']">
                {stats.totalGamesWon > 0 ? 'Status: Completed ✓' : 'Status: Ready to Play'}
              </span>
            </div>
            <div className="text-3xl select-none animate-bounce shrink-0 drop-shadow">
              🍄
            </div>
          </div>

          <button
            onClick={() => { sound.playTap(); onPlayDailyChallenge(); }}
            className="w-full py-2.5 rounded-2xl bg-[#e52521] border-b-4 border-[#9e100e] text-white font-black text-xs shadow-md hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-1.5 font-['Fredoka']"
          >
            <span>Play Daily Challenge ▶</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Widget 3: Leaderboard Preview */}
        <div className="rounded-3xl p-5 bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#1e293b] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#fcd116] fill-[#fcd116]" />
              <h4 className="text-sm font-black text-slate-900 dark:text-white font-['Fredoka']">Leaderboard High Scores</h4>
            </div>
            <button
              onClick={() => { sound.playTap(); onOpenLeaderboard(); }}
              className="text-xs font-black text-[#e52521] hover:underline flex items-center gap-1 transition font-['Fredoka']"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-1.5 mb-1">
            {/* Rank 1 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-amber-50 dark:bg-[#1f2438] border-2 border-amber-300 dark:border-amber-700/50 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#fcd116] text-slate-950 font-black text-[10px] flex items-center justify-center font-pixel">
                  1
                </span>
                <span className="text-xs">👑</span>
                <span className="font-extrabold text-slate-900 dark:text-white font-['Fredoka']">PrincessPeach</span>
              </div>
              <span className="font-pixel font-bold text-amber-700 dark:text-amber-400 text-[10px]">98,450</span>
            </div>

            {/* Rank 2 */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-emerald-50 dark:bg-[#1f2438] border-2 border-emerald-300 dark:border-emerald-700/50 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#00a859] text-white font-black text-[10px] flex items-center justify-center font-pixel">
                  2
                </span>
                <span className="text-xs">🟢</span>
                <span className="font-extrabold text-slate-900 dark:text-slate-200 font-['Fredoka']">SuperLuigi</span>
              </div>
              <span className="font-pixel font-bold text-emerald-700 dark:text-emerald-400 text-[10px]">87,320</span>
            </div>

            {/* Current Player Rank */}
            <div className="flex items-center justify-between p-2 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-500/40 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#e52521] text-white font-black text-[9px] flex items-center justify-center font-pixel">
                  P1
                </span>
                <span className="text-xs">🍄</span>
                <span className="font-extrabold text-red-900 dark:text-red-200 font-['Fredoka']">{stats.username || 'Mario'}</span>
              </div>
              <span className="font-pixel font-bold text-[#e52521] dark:text-red-300 text-[10px]">
                {(stats.totalGamesWon * 100 + stats.coins).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- ROW 2: PEACH'S TREASURE, WARP PIPE STAGE ACTIVITY, SUPER STAR POWER ---------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Widget 4: Daily Rewards & Loot Banner (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-6 bg-gradient-to-r from-[#e52521] via-[#d3261f] to-[#ff4a47] border-4 border-[#9e100e] shadow-[4px_4px_0_#5e0a09] flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-md bg-[#fcd116] text-slate-950 font-black">REWARDS</span>
              <h4 className="text-lg font-black text-white drop-shadow font-['Fredoka']">
                Unlock Daily Rewards &amp; Loot!
              </h4>
            </div>
            <p className="text-xs text-red-100 font-medium mb-4 max-w-xs leading-relaxed font-['Fredoka']">
              Clear games, claim daily bonus coins, and level up your player rank!
            </p>
            <button
              onClick={() => { sound.playTap(); onOpenRewards(); }}
              className="px-5 py-2 rounded-full bg-[#fcd116] border-b-4 border-[#b89100] text-slate-950 font-black text-xs shadow-md hover:brightness-105 active:translate-y-0.5 transition flex items-center gap-1.5 font-['Fredoka']"
            >
              <span>Claim Rewards 🎁</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-5xl select-none animate-bounce shrink-0 relative z-10 drop-shadow">
            🎁
          </div>
        </div>

        {/* Widget 5: Most Played Games (Real Player Data, 4 cols) */}
        <div className="lg:col-span-4 rounded-3xl p-5 bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#1e293b] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">🎮</span>
            <h4 className="text-xs font-black text-slate-900 dark:text-white font-['Fredoka']">Your Most Played Games</h4>
          </div>

          {/* Mario Warp Pipe Column Visualization */}
          {totalPlays > 0 ? (
            <div className="grid grid-cols-4 gap-2 items-end h-24 mb-1 px-1">
              {playedEntries.map(([gameKey, count]) => {
                const pct = Math.round((count / totalPlays) * 100);
                const heightPercent = Math.max(25, Math.min(100, pct));
                return (
                  <div key={gameKey} className="flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-pixel font-bold text-slate-700 dark:text-white">
                      {pct}%
                    </span>
                    {/* Mario Green Pipe Column */}
                    <div 
                      className="w-full bg-[#00a859] border-2 border-[#006633] rounded-t-md transition-all duration-500 relative"
                      style={{ height: `${heightPercent}%` }}
                    >
                      {/* Pipe Lip Rim */}
                      <div className="w-[108%] -left-[4%] h-2 bg-[#00c000] border border-[#006633] rounded-t-sm absolute -top-2" />
                    </div>
                    <span className="text-[8px] font-bold text-slate-600 dark:text-slate-400 truncate w-full text-center font-['Fredoka']">
                      {GAME_NAME_MAP[gameKey] || gameKey}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-24 mb-1 text-center p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border-2 border-dashed border-slate-300 dark:border-white/10">
              <span className="text-xl mb-1">🎮</span>
              <p className="text-[11px] font-black text-slate-800 dark:text-slate-300 font-['Fredoka']">No stages cleared yet</p>
              <span className="text-[9px] text-slate-500 dark:text-slate-400">Warp into any world above to begin!</span>
            </div>
          )}
        </div>

        {/* Widget 6: Super Star Power (3 cols) */}
        <div className="lg:col-span-3 rounded-3xl p-5 bg-gradient-to-br from-[#fcd116] via-[#f7b705] to-[#f59e0b] border-4 border-[#c49600] shadow-[4px_4px_0_#855e00] flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="text-4xl mb-1 animate-spin" style={{ animationDuration: '5s' }}>⭐</div>
          <h4 className="text-xl font-black text-slate-950 italic tracking-wider font-['Fredoka']">
            STAR POWER!
          </h4>
          <span className="text-xs font-black text-amber-950 font-pixel mt-0.5">
            INVINCIBLE 🍄
          </span>
        </div>
      </div>
    </div>
  );
};
