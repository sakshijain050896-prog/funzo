import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, Pause, RotateCcw, Lightbulb, Eraser, 
  Edit3, Share2, Award, Calendar, AlertCircle, HelpCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { Difficulty, SudokuCell, PlayerStats } from '../types';
import { 
  generateDailyPuzzle, 
  generatePracticePuzzle, 
  buildGridCells 
} from '../lib/sudokuGenerator';
import { sound } from '../lib/soundEffects';

interface DailyGridProps {
  stats: PlayerStats;
  onWin: (seconds: number, isDaily: boolean) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
}

export const DailyGrid: React.FC<DailyGridProps> = ({
  stats,
  onWin,
  onRequestAd,
}) => {
  const [difficulty, setDifficulty] = useState<Difficulty>('daily');
  const [grid, setGrid] = useState<SudokuCell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number } | null>(null);
  const [history, setHistory] = useState<SudokuCell[][][]>([]);
  const [isPencilMode, setIsPencilMode] = useState<boolean>(false);
  const [mistakes, setMistakes] = useState<number>(0);
  const [freeHints, setFreeHints] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  // Initialize or reset puzzle
  const initGame = useCallback((diff: Difficulty, forceFresh = false) => {
    if (!forceFresh) {
      try {
        const saved = localStorage.getItem(`funzo_sudoku_${diff}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.grid) && parsed.grid.length === 9) {
            const restoredGrid: SudokuCell[][] = parsed.grid.map((row: any[]) =>
              row.map((cell: any) => ({
                ...cell,
                notes: new Set<number>(cell.notes || []),
              }))
            );
            setGrid(restoredGrid);
            setSelectedCell(null);
            setHistory([]);
            setMistakes(parsed.mistakes || 0);
            setSeconds(parsed.seconds || 0);
            setIsPaused(false);
            setIsWon(false);
            setIsGameOver(false);
            setCopiedShare(false);
            return;
          }
        }
      } catch {
        // storage fallback
      }
    }

    let puzzleData;
    if (diff === 'daily') {
      const today = new Date().toISOString().slice(0, 10);
      puzzleData = generateDailyPuzzle(today);
    } else {
      puzzleData = generatePracticePuzzle(diff);
    }

    const cells = buildGridCells(puzzleData.initial, puzzleData.solution);
    setGrid(cells);
    setSelectedCell(null);
    setHistory([]);
    setMistakes(0);
    setSeconds(0);
    setIsPaused(false);
    setIsWon(false);
    setIsGameOver(false);
    setCopiedShare(false);

    try {
      localStorage.removeItem(`funzo_sudoku_${diff}`);
    } catch {
      // storage fallback
    }
  }, []);

  useEffect(() => {
    initGame(difficulty);
  }, [difficulty, initGame]);

  // Mid-game Auto-Save Persistence
  useEffect(() => {
    if (grid.length === 0 || isWon || isGameOver) {
      if (isWon || isGameOver) {
        try {
          localStorage.removeItem(`funzo_sudoku_${difficulty}`);
        } catch {
          // ignore
        }
      }
      return;
    }

    const hasProgress = grid.some((row) =>
      row.some((c) => !c.isInitial && (c.value > 0 || (c.notes && c.notes.size > 0)))
    );
    if (!hasProgress) return;

    try {
      const serialized = {
        grid: grid.map((row) =>
          row.map((cell) => ({
            ...cell,
            notes: Array.from(cell.notes),
          }))
        ),
        mistakes,
        seconds,
        difficulty,
      };
      localStorage.setItem(`funzo_sudoku_${difficulty}`, JSON.stringify(serialized));
    } catch {
      // ignore
    }
  }, [grid, mistakes, seconds, difficulty, isWon, isGameOver]);

  // Timer
  useEffect(() => {
    if (isPaused || isWon || isGameOver) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, isWon, isGameOver]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const checkVictory = (currentGrid: SudokuCell[][]) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (currentGrid[r][c].value === 0 || currentGrid[r][c].value !== currentGrid[r][c].solution) {
          return false;
        }
      }
    }
    return true;
  };

  const cloneGrid = (g: SudokuCell[][]): SudokuCell[][] => {
    return g.map((row) =>
      row.map((cell) => ({
        ...cell,
        notes: new Set(cell.notes),
      }))
    );
  };

  const handleSelectCell = (r: number, c: number) => {
    if (isWon || isGameOver) return;
    sound.playTap();
    setSelectedCell({ r, c });
  };

  const handleInputNumber = useCallback(
    (num: number) => {
      if (!selectedCell || isWon || isGameOver || isPaused) return;
      const { r, c } = selectedCell;
      const currentCell = grid[r][c];
      if (currentCell.isInitial) return;

      setHistory((prev) => [...prev.slice(-15), cloneGrid(grid)]);
      const newGrid = cloneGrid(grid);
      const target = newGrid[r][c];

      if (isPencilMode) {
        sound.playTap();
        if (target.notes.has(num)) {
          target.notes.delete(num);
        } else {
          target.notes.add(num);
        }
        setGrid(newGrid);
        return;
      }

      if (num === target.solution) {
        sound.playNumberPop(num);
        target.value = num;
        target.isError = false;
        target.notes.clear();

        for (let i = 0; i < 9; i++) {
          newGrid[r][i].notes.delete(num);
          newGrid[i][c].notes.delete(num);
        }
        const startR = Math.floor(r / 3) * 3;
        const startC = Math.floor(c / 3) * 3;
        for (let ro = 0; ro < 3; ro++) {
          for (let co = 0; co < 3; co++) {
            newGrid[startR + ro][startC + co].notes.delete(num);
          }
        }

        setGrid(newGrid);

        if (checkVictory(newGrid)) {
          setIsWon(true);
          sound.playVictory();
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          onWin(seconds, difficulty === 'daily');
        }
      } else {
        sound.playError();
        target.value = num;
        target.isError = true;
        setGrid(newGrid);

        const newMistakes = mistakes + 1;
        setMistakes(newMistakes);
        if (newMistakes >= 3) {
          setIsGameOver(true);
        }
      }
    },
    [selectedCell, isWon, isGameOver, isPaused, grid, isPencilMode, mistakes, seconds, difficulty, onWin]
  );

  const handleErase = () => {
    if (!selectedCell || isWon || isGameOver) return;
    const { r, c } = selectedCell;
    if (grid[r][c].isInitial) return;

    sound.playTap();
    setHistory((prev) => [...prev.slice(-15), cloneGrid(grid)]);

    const newGrid = cloneGrid(grid);
    newGrid[r][c].value = 0;
    newGrid[r][c].isError = false;
    newGrid[r][c].notes.clear();
    setGrid(newGrid);
  };

  const handleUndo = () => {
    if (history.length === 0 || isWon || isGameOver) return;
    sound.playTap();
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setGrid(previous);
  };

  const handleHint = () => {
    if (!selectedCell || isWon || isGameOver) return;
    const { r, c } = selectedCell;
    const cell = grid[r][c];
    if (cell.isInitial || (cell.value === cell.solution && !cell.isError)) return;

    const applyHint = () => {
      sound.playNumberPop(cell.solution);
      const newGrid = cloneGrid(grid);
      newGrid[r][c].value = newGrid[r][c].solution;
      newGrid[r][c].isError = false;
      newGrid[r][c].notes.clear();
      setGrid(newGrid);

      if (checkVictory(newGrid)) {
        setIsWon(true);
        sound.playVictory();
        onWin(seconds, difficulty === 'daily');
      }
    };

    if (freeHints > 0) {
      setFreeHints((prev) => prev - 1);
      applyHint();
    } else {
      onRequestAd('1 Smart Hint', () => {
        applyHint();
      });
    }
  };

  const handleRevive = () => {
    onRequestAd('Extra Life / Revive', () => {
      setMistakes(2);
      setIsGameOver(false);
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isWon || isGameOver) return;

      if (e.key >= '1' && e.key <= '9') {
        handleInputNumber(parseInt(e.key, 10));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleErase();
      } else if (e.key === 'n' || e.key === 'N') {
        setIsPencilMode((prev) => !prev);
      } else if (e.key === 'ArrowUp' && selectedCell && selectedCell.r > 0) {
        setSelectedCell({ r: selectedCell.r - 1, c: selectedCell.c });
      } else if (e.key === 'ArrowDown' && selectedCell && selectedCell.r < 8) {
        setSelectedCell({ r: selectedCell.r + 1, c: selectedCell.c });
      } else if (e.key === 'ArrowLeft' && selectedCell && selectedCell.c > 0) {
        setSelectedCell({ r: selectedCell.r, c: selectedCell.c - 1 });
      } else if (e.key === 'ArrowRight' && selectedCell && selectedCell.c < 8) {
        setSelectedCell({ r: selectedCell.r, c: selectedCell.c + 1 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInputNumber, isWon, isGameOver, selectedCell]);

  const handleShare = () => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const text = `Funzo: Daily Grid (${dateStr}) 🧩\n⏱️ Solved in: ${formatTime(seconds)}\n❌ Mistakes: ${mistakes}/3\n🔥 Daily Streak: ${stats.streak} days\nPlay free: ${window.location.origin}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const selectedValue = selectedCell && grid[selectedCell.r] ? grid[selectedCell.r][selectedCell.c].value : null;

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center select-none pb-4">
      {/* Top Header: Difficulty Tabs */}
      <div className="w-full mb-2">
        <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 text-xs font-bold mb-2">
          {(['daily', 'easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`py-1.5 rounded-xl capitalize transition text-center ${
                difficulty === d
                  ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-black'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {d === 'daily' ? (
                <span className="flex items-center justify-center gap-1">
                  <Calendar className="w-3 h-3" /> Daily
                </span>
              ) : (
                d
              )}
            </button>
          ))}
        </div>

        {/* Minimalist Status Info */}
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <span>Mistakes:</span>
            <span className={`font-mono font-bold ${mistakes > 1 ? 'text-rose-500' : 'text-slate-800 dark:text-slate-200'}`}>
              {mistakes}/3
            </span>
          </div>

          <button
            onClick={() => setShowInstructions((prev) => !prev)}
            className="flex items-center gap-1 text-indigo-500 hover:text-indigo-400 font-bold transition"
          >
            <HelpCircle className="w-3 h-3" />
            <span>How to Play</span>
            {showInstructions ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition"
              title={isPaused ? 'Resume' : 'Pause'}
            >
              {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3" />}
            </button>
            <span className="font-mono text-slate-700 dark:text-slate-200 text-xs font-bold">
              {formatTime(seconds)}
            </span>
          </div>
        </div>

        {/* Collapsible Rich How to Play Guide */}
        {showInstructions && (
          <div className="mt-2 p-3 rounded-2xl bg-indigo-50 dark:bg-slate-900 border border-indigo-200 dark:border-indigo-500/30 text-xs text-left text-slate-700 dark:text-slate-300 space-y-1.5 animate-fade-in shadow-md">
            <strong className="block text-indigo-600 dark:text-indigo-400 font-black text-xs">
              🎯 How to Play Sudoku Master:
            </strong>
            <p className="text-[11px] leading-relaxed">
              1. <strong>Goal:</strong> Fill the 9x9 board with numbers 1 to 9 so that no digit repeats in any row, column, or 3x3 quadrant.
            </p>
            <p className="text-[11px] leading-relaxed">
              2. <strong>Mobile Touch:</strong> Tap an empty square, then tap a number (1–9) below. Tap <strong>Notes ON</strong> to jot down pencil candidates!
            </p>
            <p className="text-[11px] leading-relaxed">
              3. <strong>Laptop Keyboard:</strong> Click any cell, use Arrow keys (↑ ↓ ← →) to move, and type 1–9. Press Backspace to erase, and &quot;N&quot; for notes.
            </p>
            <p className="text-[11px] leading-relaxed">
              4. <strong>3 Mistakes = Game Over:</strong> Keep an eye on your mistakes counter. Tap <strong>Hint</strong> if you get stuck!
            </p>
          </div>
        )}
      </div>

      {/* 9x9 Sudoku Board Container (Viewport-fitted) */}
      <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[360px] p-1.5 bg-slate-950 rounded-3xl border border-slate-800/80 shadow-2xl">
        {isPaused && (
          <div className="absolute inset-0 z-20 rounded-2xl bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold text-white mb-3">Game Paused</h3>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" /> Resume
            </button>
          </div>
        )}

        {/* Sudoku Grid */}
        <div className="w-full h-full grid grid-cols-9 grid-rows-9 gap-[1px] bg-slate-800 rounded-xl overflow-hidden border border-slate-800">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const isSelected = selectedCell?.r === r && selectedCell?.c === c;
              const isRelated =
                selectedCell &&
                (selectedCell.r === r ||
                  selectedCell.c === c ||
                  (Math.floor(selectedCell.r / 3) === Math.floor(r / 3) &&
                    Math.floor(selectedCell.c / 3) === Math.floor(c / 3)));
              const isSameNumber =
                selectedValue && selectedValue > 0 && cell.value === selectedValue;

              const borderRight = c % 3 === 2 && c !== 8 ? 'border-r-2 border-r-slate-600' : '';
              const borderBottom = r % 3 === 2 && r !== 8 ? 'border-b-2 border-b-slate-600' : '';

              let cellBg = 'bg-[#131b2e]';
              if (isSelected) {
                cellBg = 'bg-indigo-600/60 ring-2 ring-indigo-400 z-10';
              } else if (cell.isError) {
                cellBg = 'bg-rose-950/80 text-rose-300';
              } else if (isSameNumber) {
                cellBg = 'bg-indigo-900/40 text-indigo-200';
              } else if (isRelated) {
                cellBg = 'bg-slate-800/50';
              }

              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleSelectCell(r, c)}
                  className={`relative flex items-center justify-center cursor-pointer transition-colors duration-75 text-sm sm:text-base font-bold ${cellBg} ${borderRight} ${borderBottom} touch-manipulation`}
                >
                  {cell.value > 0 ? (
                    <span
                      className={`${
                        cell.isInitial
                          ? 'text-white font-extrabold'
                          : cell.isError
                          ? 'text-rose-400 animate-bounce'
                          : 'text-indigo-300'
                      }`}
                    >
                      {cell.value}
                    </span>
                  ) : (
                    <div className="w-full h-full p-0.5 grid grid-cols-3 grid-rows-3 pointer-events-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <span
                          key={n}
                          className="flex items-center justify-center text-[7px] font-mono text-slate-400"
                        >
                          {cell.notes.has(n) ? n : ''}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Action Toolbar: Undo, Erase, Pencil, Hint */}
      <div className="w-full max-w-[340px] sm:max-w-[360px] flex items-center justify-between mt-2.5 mb-2 gap-1.5">
        <button
          onClick={handleUndo}
          disabled={history.length === 0}
          className="flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800 disabled:opacity-40 transition active:scale-95 text-[10px] font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5 mb-0.5 text-slate-500" />
          <span>Undo</span>
        </button>

        <button
          onClick={handleErase}
          className="flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-800 transition active:scale-95 text-[10px] font-bold"
        >
          <Eraser className="w-3.5 h-3.5 mb-0.5 text-slate-500" />
          <span>Erase</span>
        </button>

        <button
          onClick={() => setIsPencilMode((prev) => !prev)}
          className={`flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl border transition active:scale-95 text-[10px] font-bold ${
            isPencilMode
              ? 'bg-indigo-600/30 border-indigo-500 text-indigo-400 shadow-sm'
              : 'bg-slate-200 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Edit3 className={`w-3.5 h-3.5 mb-0.5 ${isPencilMode ? 'text-indigo-400' : 'text-slate-500'}`} />
          <span>Notes {isPencilMode ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={handleHint}
          className="flex-1 flex flex-col items-center py-1.5 px-1 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition active:scale-95 text-[10px] font-bold relative"
        >
          <Lightbulb className="w-3.5 h-3.5 mb-0.5 text-amber-500" />
          <span>Hint</span>
          <span className="absolute -top-1 -right-1 px-1 rounded-full bg-amber-500 text-slate-950 font-bold text-[8px]">
            {freeHints > 0 ? freeHints : 'Ad'}
          </span>
        </button>
      </div>

      {/* Number Pad (1-9) */}
      <div className="w-full max-w-[340px] sm:max-w-[360px] grid grid-cols-9 gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleInputNumber(num)}
            className="aspect-[4/5] rounded-xl bg-slate-200 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 hover:bg-indigo-600 hover:text-white text-slate-900 dark:text-white font-bold text-base sm:text-lg flex items-center justify-center transition active:scale-90 shadow-sm touch-manipulation"
          >
            {num}
          </button>
        ))}
      </div>

      {/* Victory Modal */}
      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-emerald-500/40 p-6 text-center shadow-2xl animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-7 h-7" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
              Puzzle Solved!
            </span>
            <h2 className="text-xl font-black text-white mt-0.5 mb-2">Genius Move</h2>
            <p className="text-xs text-slate-400 mb-4">
              Solved in <span className="text-white font-bold font-mono">{formatTime(seconds)}</span> with{' '}
              <span className="text-white font-bold">{mistakes}</span> mistakes.
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 block">Reward</span>
                <span className="text-base font-black text-yellow-400">+50 Coins 🪙</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-center">
                <span className="text-[10px] text-slate-400 block">Streak</span>
                <span className="text-base font-black text-amber-400">{stats.streak} Days 🔥</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleShare}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedShare ? 'Copied to Clipboard! 🎉' : 'Share Result with Friends'}</span>
              </button>

              <button
                onClick={() => initGame(difficulty, true)}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
              >
                Play Practice Round
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Over Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-rose-500/40 p-6 text-center shadow-2xl animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-2">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">3 Mistakes Reached</h2>
            <p className="text-xs text-slate-400 mb-5">
              Don&apos;t lose your daily progress! Watch a short sponsor ad to revive with 2 mistakes.
            </p>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleRevive}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition"
              >
                Watch 5s Ad to Revive &amp; Continue
              </button>
              <button
                onClick={() => initGame(difficulty, true)}
                className="w-full py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs"
              >
                Restart Puzzle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
