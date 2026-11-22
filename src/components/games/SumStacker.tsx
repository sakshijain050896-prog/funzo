import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Trophy } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface SumStackerProps {
  onScore: (score: number) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
}

export const SumStacker: React.FC<SumStackerProps> = ({ onScore }) => {
  const [board, setBoard] = useState<number[][]>(() => generateInitialBoard());
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  const [score, setScore] = useState<number>(0);
  const [combos, setCombos] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  function generateInitialBoard(): number[][] {
    const b: number[][] = [];
    for (let r = 0; r < 5; r++) {
      const row: number[] = [];
      for (let c = 0; c < 5; c++) {
        row.push(Math.floor(Math.random() * 9) + 1); // 1 to 9
      }
      b.push(row);
    }
    return b;
  }

  // Timer
  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsGameOver(true);
          sound.playVictory();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, isGameOver]);

  const restart = () => {
    sound.playTap();
    setBoard(generateInitialBoard());
    setSelectedCells([]);
    setScore(0);
    setCombos(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  // Calculate current sum of selected cells
  const currentSum = selectedCells.reduce((acc, curr) => acc + board[curr.r][curr.c], 0);

  const handleCellClick = (r: number, c: number) => {
    if (isGameOver || !isPlaying) return;

    // Check if cell already selected -> toggle off
    const existsIdx = selectedCells.findIndex((cell) => cell.r === r && cell.c === c);
    if (existsIdx !== -1) {
      sound.playTap();
      setSelectedCells((prev) => prev.filter((_, idx) => idx !== existsIdx));
      return;
    }

    sound.playTap();
    const newSelected = [...selectedCells, { r, c }];
    const newSum = newSelected.reduce((acc, cell) => acc + board[cell.r][cell.c], 0);

    if (newSum === 10) {
      // MATCH FOUND! (Exact 10)
      sound.playNumberPop(10);
      const pointsGained = newSelected.length * 10 * (combos + 1);
      setScore((s) => s + pointsGained);
      setCombos((c) => c + 1);
      onScore(score + pointsGained);

      // Replace matched tiles with fresh numbers
      const newBoard = board.map((row) => [...row]);
      for (const cell of newSelected) {
        newBoard[cell.r][cell.c] = Math.floor(Math.random() * 9) + 1;
      }
      setBoard(newBoard);
      setSelectedCells([]);

      // Small confetti burst on 3+ tile combos
      if (newSelected.length >= 3) {
        confetti({ particleCount: 30, spread: 50 });
      }
    } else if (newSum > 10) {
      // OVERSHOT!
      sound.playError();
      setCombos(0);
      setSelectedCells([]);
    } else {
      setSelectedCells(newSelected);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      {/* Top Info Bar */}
      <div className="w-full flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-1.5">
            <span>Make 10</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
              Combo x{combos + 1}
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">Tap numbers that add up to 10</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[9px] uppercase font-bold text-slate-400 block">Time</span>
            <span className={`text-sm font-black font-mono ${timeLeft < 10 ? 'text-rose-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-center">
            <span className="text-[9px] uppercase font-bold text-amber-400 block">Score</span>
            <span className="text-sm font-black text-amber-400 font-mono">{score}</span>
          </div>
        </div>
      </div>

      {/* Target Meter Indicator */}
      <div className="w-full flex items-center justify-between px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 mb-3">
        <span className="text-xs font-bold text-slate-400">Current Sum:</span>
        <div className="flex items-center gap-2">
          <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-150 ${
                currentSum === 10 ? 'bg-emerald-400' : currentSum > 10 ? 'bg-rose-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${Math.min(100, (currentSum / 10) * 100)}%` }}
            />
          </div>
          <span
            className={`font-mono font-black text-base ${
              currentSum === 10 ? 'text-emerald-400' : 'text-indigo-300'
            }`}
          >
            {currentSum} / 10
          </span>
        </div>
      </div>

      {/* 5x5 Number Grid */}
      <div className="relative w-full aspect-square max-w-[340px] p-2.5 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl grid grid-cols-5 grid-rows-5 gap-2">
        {board.map((row, r) =>
          row.map((val, c) => {
            const isSelected = selectedCells.some((cell) => cell.r === r && cell.c === c);

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-100 active:scale-90 ${
                  isSelected
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-400 shadow-lg shadow-indigo-500/40'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800'
                }`}
              >
                {val}
              </button>
            );
          })
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <Trophy className="w-10 h-10 text-amber-400 mb-2" />
            <h3 className="text-2xl font-black text-white mb-1">Time&apos;s Up!</h3>
            <p className="text-xs text-slate-400 mb-1">Final Score: <span className="text-amber-400 font-bold">{score}</span></p>
            <p className="text-xs text-slate-500 mb-4">Combo Chains: {combos}</p>

            <button
              onClick={restart}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 active:scale-95 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Restart Button */}
      <button
        onClick={restart}
        className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Restart Game
      </button>
    </div>
  );
};
