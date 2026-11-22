import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Lightbulb, Trophy } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface GridFlipProps {
  onWin: () => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
}

export const GridFlip: React.FC<GridFlipProps> = ({ onWin }) => {
  const [size, setSize] = useState<number>(4); // 4x4 grid
  const [board, setBoard] = useState<boolean[][]>(() => createScrambledBoard(4));
  const [moves, setMoves] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  function createEmptyBoard(s: number): boolean[][] {
    return Array(s).fill(false).map(() => Array(s).fill(false));
  }

  function toggleCell(b: boolean[][], r: number, c: number, s: number) {
    b[r][c] = !b[r][c];
    if (r > 0) b[r - 1][c] = !b[r - 1][c];
    if (r < s - 1) b[r + 1][c] = !b[r + 1][c];
    if (c > 0) b[r][c - 1] = !b[r][c - 1];
    if (c < s - 1) b[r][c + 1] = !b[r][c + 1];
  }

  function createScrambledBoard(s: number): boolean[][] {
    const b = createEmptyBoard(s);
    // Apply 6-10 random clicks from an all-true solved board to ensure 100% solvability
    for (let r = 0; r < s; r++) {
      for (let c = 0; c < s; c++) {
        b[r][c] = true;
      }
    }
    const scrambleMoves = 5 + s;
    for (let i = 0; i < scrambleMoves; i++) {
      const randR = Math.floor(Math.random() * s);
      const randC = Math.floor(Math.random() * s);
      toggleCell(b, randR, randC, s);
    }
    return b;
  }

  const restart = (newSize: number = size) => {
    sound.playTap();
    setSize(newSize);
    setBoard(createScrambledBoard(newSize));
    setMoves(0);
    setIsSolved(false);
  };

  const handleCellClick = (r: number, c: number) => {
    if (isSolved) return;
    sound.playTap();

    const newBoard = board.map((row) => [...row]);
    toggleCell(newBoard, r, c, size);
    setBoard(newBoard);
    setMoves((m) => m + 1);

    // Check if all cells are true (all lights ON)
    let allOn = true;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (!newBoard[row][col]) {
          allOn = false;
          break;
        }
      }
    }

    if (allOn) {
      sound.playVictory();
      confetti({ particleCount: 70, spread: 70 });
      setIsSolved(true);
      onWin();
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Matrix Flip</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 font-bold">
              {size}x{size}
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Spatial logic lights-out puzzle</p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center">
          <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Moves</span>
          <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{moves}</span>
        </div>
      </div>

      {/* Prominent In-Screen Instructions (3 Statements) */}
      <div className="w-full p-3 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 mb-3 text-left shadow-sm">
        <div className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1">
          <span>💡 HOW TO PLAY:</span>
        </div>
        <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-200">
          <li className="flex items-start gap-1.5">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">1.</span>
            <span><strong>Objective:</strong> Turn <strong>ALL</strong> tiles ON (glowing neon lightbulbs) to clear the matrix.</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">2.</span>
            <span><strong>Flip Rule:</strong> Tapping any tile flips <strong>both itself AND all 4 adjacent neighbors</strong> (Up, Down, Left, Right).</span>
          </li>
          <li className="flex items-start gap-1.5">
            <span className="text-cyan-600 dark:text-cyan-400 font-bold shrink-0">3.</span>
            <span><strong>Strategy:</strong> Work systematically row by row from top to bottom to isolate remaining unlit tiles!</span>
          </li>
        </ul>
      </div>

      {/* Grid Size Switcher */}
      <div className="flex gap-2 mb-3 p-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-xs font-bold">
        {[3, 4, 5].map((s) => (
          <button
            key={s}
            onClick={() => restart(s)}
            className={`px-3 py-1 rounded-lg transition ${
              size === s 
                ? 'bg-cyan-600 text-white shadow-sm font-black' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {s}x{s} {s === 3 ? 'Easy' : s === 4 ? 'Normal' : 'Hard'}
          </button>
        ))}
      </div>

      {/* Neon Matrix Board */}
      <div
        className="relative w-full aspect-square max-w-[340px] p-2.5 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${size}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, r) =>
          row.map((isOn, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellClick(r, c)}
              className={`rounded-2xl transition-all duration-200 flex items-center justify-center active:scale-90 ${
                isOn
                  ? 'bg-cyan-400 border border-cyan-200 text-slate-950 shadow-lg shadow-cyan-400/50'
                  : 'bg-slate-900 border border-slate-800 text-slate-700 hover:border-slate-600'
              }`}
            >
              <Lightbulb className={`w-5 h-5 ${isOn ? 'fill-slate-950 text-slate-950' : 'text-slate-700'}`} />
            </button>
          ))
        )}

        {/* Solved Overlay */}
        {isSolved && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <Trophy className="w-10 h-10 text-cyan-400 mb-2" />
            <h3 className="text-2xl font-black text-white mb-1">All Lights On!</h3>
            <p className="text-xs text-slate-400 mb-4">Solved in {moves} moves · +15 IQ Gained</p>
            <button
              onClick={() => restart(size)}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/30 active:scale-95 transition"
            >
              Play Another Puzzle
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => restart(size)}
        className="mt-4 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Scramble New Puzzle
      </button>
    </div>
  );
};
