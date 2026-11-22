import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface Game2048Props {
  onWinOrScore: (score: number) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
}

type Board = number[][];

export const Game2048: React.FC<Game2048Props> = ({ onWinOrScore, onRequestAd }) => {
  const [board, setBoard] = useState<Board>(() => {
    try {
      const saved = localStorage.getItem('funzo_2048_active_board');
      return saved ? JSON.parse(saved) : getInitialBoard();
    } catch {
      return getInitialBoard();
    }
  });
  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('funzo_2048_active_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });
  const [bestScore, setBestScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('funzo_2048_best') || '0', 10);
  });
  const [previousState, setPreviousState] = useState<{ board: Board; score: number } | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Auto-save in-progress board to localStorage so game can resume anytime
  useEffect(() => {
    try {
      if (!isGameOver) {
        localStorage.setItem('funzo_2048_active_board', JSON.stringify(board));
        localStorage.setItem('funzo_2048_active_score', score.toString());
      }
    } catch {
      // storage unavailable
    }
  }, [board, score, isGameOver]);

  function getInitialBoard(): Board {
    const b: Board = Array(4).fill(0).map(() => Array(4).fill(0));
    addRandomTile(b);
    addRandomTile(b);
    return b;
  }

  function addRandomTile(b: Board): boolean {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return false;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    b[r][c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  const restart = () => {
    sound.playTap();
    const newBoard = getInitialBoard();
    setBoard(newBoard);
    setScore(0);
    setPreviousState(null);
    setIsGameOver(false);
  };

  const undo = () => {
    if (!previousState || isGameOver) return;
    sound.playTap();
    setBoard(previousState.board);
    setScore(previousState.score);
    setPreviousState(null);
  };

  const slideAndMerge = (row: number[]): { newRow: number[]; gained: number } => {
    const filtered = row.filter((val) => val !== 0);
    const newRow: number[] = [];
    let gained = 0;

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        const mergedVal = filtered[i] * 2;
        newRow.push(mergedVal);
        gained += mergedVal;
        i++; // skip next tile
      } else {
        newRow.push(filtered[i]);
      }
    }
    while (newRow.length < 4) newRow.push(0);
    return { newRow, gained };
  };

  const move = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (isGameOver) return;

    let hasChanged = false;
    let addedScore = 0;
    const newBoard: Board = board.map((r) => [...r]);

    if (direction === 'left') {
      for (let r = 0; r < 4; r++) {
        const { newRow, gained } = slideAndMerge(newBoard[r]);
        if (newRow.join(',') !== newBoard[r].join(',')) hasChanged = true;
        newBoard[r] = newRow;
        addedScore += gained;
      }
    } else if (direction === 'right') {
      for (let r = 0; r < 4; r++) {
        const reversed = [...newBoard[r]].reverse();
        const { newRow, gained } = slideAndMerge(reversed);
        const normalRow = newRow.reverse();
        if (normalRow.join(',') !== newBoard[r].join(',')) hasChanged = true;
        newBoard[r] = normalRow;
        addedScore += gained;
      }
    } else if (direction === 'up') {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        const { newRow, gained } = slideAndMerge(col);
        for (let r = 0; r < 4; r++) {
          if (newBoard[r][c] !== newRow[r]) hasChanged = true;
          newBoard[r][c] = newRow[r];
        }
        addedScore += gained;
      }
    } else if (direction === 'down') {
      for (let c = 0; c < 4; c++) {
        const col = [newBoard[3][c], newBoard[2][c], newBoard[1][c], newBoard[0][c]];
        const { newRow, gained } = slideAndMerge(col);
        const reversed = newRow.reverse();
        for (let r = 0; r < 4; r++) {
          if (newBoard[r][c] !== reversed[r]) hasChanged = true;
          newBoard[r][c] = reversed[r];
        }
        addedScore += gained;
      }
    }

    if (hasChanged) {
      sound.playTap();
      setPreviousState({ board, score });
      addRandomTile(newBoard);
      setBoard(newBoard);

      const newScore = score + addedScore;
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem('funzo_2048_best', newScore.toString());
      }
      onWinOrScore(newScore);

      // Check Game Over
      if (checkGameOver(newBoard)) {
        sound.playError();
        setIsGameOver(true);
      }
    }
  }, [board, score, bestScore, isGameOver, onWinOrScore]);

  function checkGameOver(b: Board): boolean {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) return false;
        if (c < 3 && b[r][c] === b[r][c + 1]) return false;
        if (r < 3 && b[r][c] === b[r + 1][c]) return false;
      }
    }
    return true;
  }

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') move('left');
      else if (e.key === 'ArrowRight') move('right');
      else if (e.key === 'ArrowUp') move('up');
      else if (e.key === 'ArrowDown') move('down');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  // Touch Swipe controls
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    if (Math.max(absX, absY) > 25) {
      if (absX > absY) {
        move(deltaX > 0 ? 'right' : 'left');
      } else {
        move(deltaY > 0 ? 'down' : 'up');
      }
    }
    touchStartRef.current = null;
  };

  const getTileColor = (val: number) => {
    switch (val) {
      case 2: return 'bg-slate-200 border-b-4 border-slate-300 text-slate-800 dark:bg-[#202f36] dark:border-[#142026] dark:text-white font-extrabold';
      case 4: return 'bg-amber-100 border-b-4 border-amber-200 text-amber-900 dark:bg-[#2b4554] dark:border-[#1e323d] dark:text-white font-extrabold';
      case 8: return 'bg-[#ff9600] border-b-4 border-[#cc7800] text-slate-950 font-black';
      case 16: return 'bg-[#ff7900] border-b-4 border-[#d46400] text-white font-black';
      case 32: return 'bg-[#ff4b4b] border-b-4 border-[#d33131] text-white font-black';
      case 64: return 'bg-[#ea2b2b] border-b-4 border-[#b51d1d] text-white font-black';
      case 128: return 'bg-[#ffd900] border-b-4 border-[#ccad00] text-slate-950 font-black shadow-lg';
      case 256: return 'bg-[#ffc800] border-b-4 border-[#cc9f00] text-slate-950 font-black shadow-lg';
      case 512: return 'bg-[#58cc02] border-b-4 border-[#46a302] text-white font-black shadow-lg';
      case 1024: return 'bg-[#1cb0f6] border-b-4 border-[#1899d6] text-white font-black text-xl shadow-xl';
      case 2048: return 'bg-[#a855f7] border-b-4 border-[#7e22ce] text-white font-black text-xl shadow-2xl animate-pulse';
      default: return 'bg-slate-200/80 dark:bg-[#1a2c35]/60 border-b-4 border-transparent text-slate-500';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      {/* Header Info */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>2048 Rush</span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Swipe or tap arrows to merge numbers!</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-2xl bg-white dark:bg-[#1a2c35] border-2 border-slate-200 dark:border-[#2b4554] text-center shadow-sm">
            <span className="text-[9px] uppercase font-black text-slate-400 block">Score</span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{score}</span>
          </div>
          <div className="px-3 py-1 rounded-2xl bg-white dark:bg-[#1a2c35] border-2 border-slate-200 dark:border-[#2b4554] text-center shadow-sm">
            <span className="text-[9px] uppercase font-black text-amber-500 dark:text-amber-400 block flex items-center gap-0.5 justify-center">
              <Trophy className="w-2.5 h-2.5" /> Best
            </span>
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">{bestScore}</span>
          </div>
        </div>
      </div>

      {/* 4x4 Grid Board */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-square max-w-[340px] sm:max-w-[360px] bg-slate-100 dark:bg-slate-950 p-3 rounded-3xl border-2 border-slate-200 dark:border-slate-800/80 shadow-xl grid grid-cols-4 grid-rows-4 gap-2.5 touch-none"
      >
        {board.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`rounded-xl flex items-center justify-center font-bold text-2xl transition-all duration-100 ${getTileColor(
                cell
              )}`}
            >
              {cell > 0 ? cell : ''}
            </div>
          ))
        )}

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in">
            <h3 className="text-2xl font-black text-white mb-1">No Moves Left!</h3>
            <p className="text-xs text-slate-400 mb-4">Final Score: {score}</p>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  onRequestAd('Undo Move', () => {
                    setIsGameOver(false);
                    undo();
                  })
                }
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
              >
                Watch Ad to Undo
              </button>
              <button
                onClick={restart}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition"
              >
                Restart
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Controls & Swipe Buttons */}
      <div className="w-full flex items-center justify-between mt-3 px-1">
        <button
          onClick={restart}
          className="px-3.5 py-2 rounded-2xl btn-tactile-slate text-xs font-black flex items-center gap-1.5 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" /> Restart
        </button>

        <button
          onClick={undo}
          disabled={!previousState}
          className="px-4 py-2 rounded-2xl btn-tactile-blue text-xs font-black disabled:opacity-40 shadow-sm"
        >
          Undo Move
        </button>
      </div>

      {/* On-screen Direction D-Pad for Mobile */}
      <div className="mt-3 flex flex-col items-center gap-1 sm:hidden">
        <button
          onClick={() => move('up')}
          className="w-12 h-10 rounded-2xl btn-tactile-slate active:btn-tactile-green flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => move('left')}
            className="w-12 h-10 rounded-2xl btn-tactile-slate active:btn-tactile-green flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => move('down')}
            className="w-12 h-10 rounded-2xl btn-tactile-slate active:btn-tactile-green flex items-center justify-center"
          >
            <ArrowDown className="w-5 h-5 stroke-[2.5]" />
          </button>
          <button
            onClick={() => move('right')}
            className="w-12 h-10 rounded-2xl btn-tactile-slate active:btn-tactile-green flex items-center justify-center"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
