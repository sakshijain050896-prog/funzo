import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, Trophy, RotateCcw, Lightbulb, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowRightCircle,
  Tv, ChevronLeft, ChevronRight, Hash
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import { syncPlayerProgress } from '../../lib/authService';
import { getStoredStats } from '../../lib/storage';

interface ArrowPuzzleProps {
  onWin: () => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
}

export type Direction = 'U' | 'D' | 'L' | 'R';

export interface ArrowTile {
  id: string;
  r: number;
  c: number;
  dir: Direction;
  color: string;
}

export interface LevelConfig {
  levelNum: number;
  rows: number;
  cols: number;
  arrows: { r: number; c: number; dir: Direction }[];
}

const DIR_COLORS: Record<Direction, { bg: string; text: string; glow: string }> = {
  U: { bg: 'bg-indigo-600', text: 'text-indigo-200', glow: 'shadow-indigo-500/40' },
  D: { bg: 'bg-rose-600', text: 'text-rose-200', glow: 'shadow-rose-500/40' },
  L: { bg: 'bg-amber-600', text: 'text-amber-200', glow: 'shadow-amber-500/40' },
  R: { bg: 'bg-cyan-600', text: 'text-cyan-200', glow: 'shadow-cyan-500/40' },
};

// Seeded PRNG for 100% deterministic levels across devices
function createPrng(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// Ray clear check
function isRayClear(
  r: number, 
  c: number, 
  dir: Direction, 
  others: { r: number; c: number }[]
): boolean {
  if (dir === 'U') return !others.some((o) => o.c === c && o.r < r);
  if (dir === 'D') return !others.some((o) => o.c === c && o.r > r);
  if (dir === 'L') return !others.some((o) => o.r === r && o.c < c);
  if (dir === 'R') return !others.some((o) => o.r === r && o.c > c);
  return false;
}

// 10,000+ Level Generator with Reverse-Construction Solvability Guarantee
export function generateArrowLevel(levelNum: number): LevelConfig {
  let rows = 4;
  let cols = 4;
  let arrowCount = 8;

  if (levelNum <= 3) {
    rows = 4; cols = 4; arrowCount = 7 + levelNum;
  } else if (levelNum <= 15) {
    rows = 4; cols = 4; arrowCount = 10 + Math.min(4, Math.floor(levelNum / 4));
  } else if (levelNum <= 50) {
    rows = 5; cols = 5; arrowCount = 14 + Math.floor((levelNum - 15) / 10);
  } else if (levelNum <= 200) {
    rows = 5; cols = 5; arrowCount = 17 + Math.floor((levelNum - 50) / 40);
  } else if (levelNum <= 1000) {
    rows = 6; cols = 6; arrowCount = 20 + Math.floor((levelNum - 200) / 160);
  } else if (levelNum <= 5000) {
    rows = 6; cols = 6; arrowCount = 24 + Math.floor((levelNum - 1000) / 1000);
  } else {
    rows = 7; cols = 7; arrowCount = 28 + Math.min(8, Math.floor((levelNum - 5000) / 1000));
  }

  const dirs: Direction[] = ['U', 'D', 'L', 'R'];
  let attempt = 0;

  while (attempt < 20) {
    attempt++;
    const prng = createPrng(levelNum * 1009 + attempt * 73);
    const placed: { r: number; c: number; dir: Direction }[] = [];
    const occupied = new Set<string>();

    for (let step = 0; step < arrowCount; step++) {
      // Find all empty cells that have at least one clear ray to edge without hitting previously placed arrows
      const candidates: { r: number; c: number; dir: Direction }[] = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const key = `${r},${c}`;
          if (occupied.has(key)) continue;

          // Check which directions are clear
          for (const d of dirs) {
            if (isRayClear(r, c, d, placed)) {
              candidates.push({ r, c, dir: d });
            }
          }
        }
      }

      if (candidates.length === 0) break;

      // Pick random valid candidate
      const pick = candidates[Math.floor(prng() * candidates.length)];
      placed.push(pick);
      occupied.add(`${pick.r},${pick.c}`);
    }

    // Verify 100% solvable forward
    let testList = [...placed];
    let solvable = true;

    while (testList.length > 0) {
      const escapeIdx = testList.findIndex((tile) => isRayClear(tile.r, tile.c, tile.dir, testList.filter((_, i) => i !== testList.indexOf(tile))));
      if (escapeIdx === -1) {
        solvable = false;
        break;
      }
      testList.splice(escapeIdx, 1);
    }

    if (solvable && placed.length >= Math.min(arrowCount - 2, 8)) {
      return {
        levelNum,
        rows,
        cols,
        arrows: placed,
      };
    }
  }

  // Fallback starter layout
  return {
    levelNum,
    rows: 4,
    cols: 4,
    arrows: [
      { r: 0, c: 0, dir: 'U' }, { r: 0, c: 1, dir: 'U' }, { r: 0, c: 2, dir: 'R' }, { r: 0, c: 3, dir: 'R' },
      { r: 1, c: 0, dir: 'L' }, { r: 1, c: 1, dir: 'U' }, { r: 1, c: 2, dir: 'D' }, { r: 1, c: 3, dir: 'R' },
      { r: 2, c: 0, dir: 'L' }, { r: 2, c: 1, dir: 'D' }, { r: 2, c: 2, dir: 'R' }, { r: 2, c: 3, dir: 'D' },
      { r: 3, c: 0, dir: 'D' }, { r: 3, c: 1, dir: 'D' }, { r: 3, c: 2, dir: 'D' }, { r: 3, c: 3, dir: 'D' },
    ],
  };
}

export const ArrowPuzzle: React.FC<ArrowPuzzleProps> = ({ onWin, onRequestAd }) => {
  // Current Level from localStorage (Default 1, up to 10,000+)
  const [levelNum, setLevelNum] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('funzo_arrow_level');
      const parsed = saved ? parseInt(saved, 10) : 1;
      return parsed >= 1 && parsed <= 10000 ? parsed : 1;
    } catch {
      return 1;
    }
  });

  // Free Hints state from localStorage (Default 3 free hints)
  const [freeHints, setFreeHints] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('funzo_arrow_hints');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // Level Config
  const activeLevel = useMemo(() => generateArrowLevel(levelNum), [levelNum]);

  const initArrows = useCallback((lvl: LevelConfig): ArrowTile[] => {
    return lvl.arrows.map((a, i) => ({
      id: `tile-lvl${lvl.levelNum}-${i}-${a.r}-${a.c}`,
      r: a.r,
      c: a.c,
      dir: a.dir,
      color: DIR_COLORS[a.dir].bg,
    }));
  }, []);

  const [activeArrows, setActiveArrows] = useState<ArrowTile[]>(() => initArrows(activeLevel));
  const [flyingArrows, setFlyingArrows] = useState<Record<string, Direction>>({});
  const [blockedTileId, setBlockedTileId] = useState<string | null>(null);
  const [highlightedTileId, setHighlightedTileId] = useState<string | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false);
  const [isJumpModalOpen, setIsJumpModalOpen] = useState<boolean>(false);
  const [jumpInput, setJumpInput] = useState<string>('');

  // Persist level and hints
  useEffect(() => {
    try {
      localStorage.setItem('funzo_arrow_level', levelNum.toString());
      syncPlayerProgress(getStoredStats(), levelNum);
    } catch {
      // storage unavailable
    }
  }, [levelNum]);

  useEffect(() => {
    try {
      localStorage.setItem('funzo_arrow_hints', freeHints.toString());
    } catch {
      // storage unavailable
    }
  }, [freeHints]);

  // Sync arrows when activeLevel changes
  useEffect(() => {
    setActiveArrows(initArrows(activeLevel));
    setFlyingArrows({});
    setBlockedTileId(null);
    setHighlightedTileId(null);
    setMoves(0);
    setIsLevelSolved(false);
  }, [activeLevel, initArrows]);

  // Check if tile can escape in its direction without hitting any other arrow
  const checkCanEscape = (tile: ArrowTile, currentList: ArrowTile[]): boolean => {
    const { r, c, dir } = tile;
    if (dir === 'U') {
      return !currentList.some((other) => other.id !== tile.id && other.c === c && other.r < r);
    }
    if (dir === 'D') {
      return !currentList.some((other) => other.id !== tile.id && other.c === c && other.r > r);
    }
    if (dir === 'L') {
      return !currentList.some((other) => other.id !== tile.id && other.r === r && other.c < c);
    }
    if (dir === 'R') {
      return !currentList.some((other) => other.id !== tile.id && other.r === r && other.c > c);
    }
    return false;
  };

  const handleTileClick = (tile: ArrowTile) => {
    if (isLevelSolved || flyingArrows[tile.id]) return;

    const canFly = checkCanEscape(tile, activeArrows);

    if (canFly) {
      sound.playTap();
      setMoves((m) => m + 1);
      if (highlightedTileId === tile.id) {
        setHighlightedTileId(null);
      }

      // Trigger fly away animation
      setFlyingArrows((prev) => ({ ...prev, [tile.id]: tile.dir }));

      // Remove after animation
      setTimeout(() => {
        const remaining = activeArrows.filter((a) => a.id !== tile.id);
        setActiveArrows(remaining);

        if (remaining.length === 0) {
          sound.playVictory();
          confetti({ particleCount: 75, spread: 80, origin: { y: 0.5 } });
          setIsLevelSolved(true);
          // Reward: +1 Free Hint every 5 levels
          if (levelNum % 5 === 0) {
            setFreeHints((h) => h + 1);
          }
          onWin();
        }
      }, 320);
    } else {
      sound.playError();
      setBlockedTileId(tile.id);
      setTimeout(() => setBlockedTileId(null), 400);
    }
  };

  // REWARDED HINT SYSTEM WITH SPONSOR VIDEO
  const handleHint = () => {
    sound.playTap();
    // 1. If player has free hints available
    if (freeHints > 0) {
      const freeTile = activeArrows.find((a) => checkCanEscape(a, activeArrows));
      if (freeTile) {
        setFreeHints((h) => Math.max(0, h - 1));
        setHighlightedTileId(freeTile.id);
      }
      return;
    }

    // 2. Out of free hints: Trigger Sponsor Video to earn hints & reveal move
    if (onRequestAd) {
      onRequestAd('Watch Sponsor Video for +2 Free Hints & Move Reveal', () => {
        setFreeHints((h) => h + 2);
        sound.playVictory();
        const freeTile = activeArrows.find((a) => checkCanEscape(a, activeArrows));
        if (freeTile) {
          setHighlightedTileId(freeTile.id);
        }
      });
    } else {
      // Fallback if ad modal not provided
      const freeTile = activeArrows.find((a) => checkCanEscape(a, activeArrows));
      if (freeTile) setHighlightedTileId(freeTile.id);
    }
  };

  // Direct Ad Reward Button
  const handleWatchAdForHints = () => {
    sound.playTap();
    if (onRequestAd) {
      onRequestAd('Watch Sponsor Video for +2 Free Hints', () => {
        setFreeHints((h) => h + 2);
        sound.playVictory();
      });
    }
  };

  const handleRestart = () => {
    sound.playTap();
    setActiveArrows(initArrows(activeLevel));
    setFlyingArrows({});
    setBlockedTileId(null);
    setHighlightedTileId(null);
    setMoves(0);
    setIsLevelSolved(false);
  };

  const handleNextLevel = () => {
    sound.playTap();
    setLevelNum((lvl) => Math.min(10000, lvl + 1));
  };

  const handlePrevLevel = () => {
    sound.playTap();
    setLevelNum((lvl) => Math.max(1, lvl - 1));
  };

  const handleJumpToLevel = (target: number) => {
    if (target >= 1 && target <= 10000) {
      sound.playTap();
      setLevelNum(target);
      setIsJumpModalOpen(false);
      setJumpInput('');
    }
  };

  const renderIcon = (dir: Direction) => {
    switch (dir) {
      case 'U': return <ArrowUp className="w-5 h-5 stroke-[2.5]" />;
      case 'D': return <ArrowDown className="w-5 h-5 stroke-[2.5]" />;
      case 'L': return <ArrowLeft className="w-5 h-5 stroke-[2.5]" />;
      case 'R': return <ArrowRight className="w-5 h-5 stroke-[2.5]" />;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      {/* Top Header with Level & Hint Status */}
      <div className="w-full flex items-center justify-between mb-2 px-0.5">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Arrow Escape</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-bold">
              Level {levelNum} / 10,000+
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Clear all arrows with unblocked trajectories!</p>
        </div>

        {/* Free Hints Pill */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleHint}
            className={`px-2.5 py-1 rounded-xl border flex items-center gap-1 transition active:scale-95 ${
              freeHints > 0
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 dark:text-amber-400'
                : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500 dark:text-indigo-400 animate-pulse'
            }`}
            title={freeHints > 0 ? `${freeHints} hints left` : 'Watch sponsor video for +2 hints'}
          >
            <Lightbulb className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-black font-mono">
              {freeHints > 0 ? `${freeHints} Hints` : 'Ad Hint'}
            </span>
          </button>
        </div>
      </div>

      {/* Prominent In-Screen Instruction Card */}
      <div className="w-full p-2.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-500/30 mb-2.5 text-left shadow-sm">
        <div className="text-[10px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-0.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>HOW TO PLAY (ARROW OUT):</span>
        </div>
        <p className="text-[11px] text-slate-700 dark:text-slate-200 leading-snug">
          Tap each arrow to launch it! An arrow can <strong>ONLY</strong> fly away if there is <strong>NO other block in front of it</strong>. Clear outer arrows first to free up the trapped ones inside!
        </p>
      </div>

      {/* Level Navigation & Jump Bar */}
      <div className="w-full flex items-center justify-between gap-1 mb-2.5 px-0.5">
        <button
          onClick={handlePrevLevel}
          disabled={levelNum <= 1}
          className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-0.5 transition active:scale-95"
          title="Previous Level"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        <button
          onClick={() => setIsJumpModalOpen(true)}
          className="px-3 py-1 rounded-xl bg-cyan-600/10 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 font-black text-xs flex items-center gap-1 hover:bg-cyan-600/20 transition active:scale-95"
        >
          <Hash className="w-3.5 h-3.5" />
          <span>Level {levelNum} (Jump)</span>
        </button>

        <button
          onClick={handleNextLevel}
          disabled={levelNum >= 10000}
          className="p-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center gap-0.5 transition active:scale-95"
          title="Next Level"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Active Hint Banner */}
      {highlightedTileId && (
        <div className="w-full py-1.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs text-center mb-2 shadow-lg animate-bounce flex items-center justify-center gap-1.5">
          <Lightbulb className="w-4 h-4 fill-slate-950" />
          <span>💡 HINT: Tap the flashing golden arrow to launch it!</span>
        </div>
      )}

      {/* ---------------- ARROW PUZZLE STAGE ---------------- */}
      <div className="relative w-full aspect-square max-w-[340px] p-3 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden">
        
        {/* Dynamic Grid */}
        <div
          className="grid gap-2 w-full h-full relative"
          style={{
            gridTemplateRows: `repeat(${activeLevel.rows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${activeLevel.cols}, minmax(0, 1fr))`,
          }}
        >
          {activeArrows.map((tile) => {
            const isFlying = flyingArrows[tile.id];
            const isBlocked = blockedTileId === tile.id;
            const isHighlighted = highlightedTileId === tile.id;

            let flyTransform = '';
            if (isFlying === 'U') flyTransform = '-translate-y-[400px] opacity-0 scale-50';
            if (isFlying === 'D') flyTransform = 'translate-y-[400px] opacity-0 scale-50';
            if (isFlying === 'L') flyTransform = '-translate-x-[400px] opacity-0 scale-50';
            if (isFlying === 'R') flyTransform = 'translate-x-[400px] opacity-0 scale-50';

            return (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile)}
                className={`rounded-2xl flex items-center justify-center font-black shadow-lg transition-all duration-300 relative ${
                  isHighlighted
                    ? 'ring-4 ring-amber-400 bg-amber-400 text-slate-950 animate-bounce scale-110 shadow-2xl shadow-amber-400/90 z-20'
                    : `${DIR_COLORS[tile.dir].bg} ${DIR_COLORS[tile.dir].text} ${DIR_COLORS[tile.dir].glow}`
                } ${
                  isBlocked ? 'animate-shake ring-4 ring-rose-500 scale-95' : ''
                } ${flyTransform}`}
                style={{
                  gridRowStart: tile.r + 1,
                  gridColumnStart: tile.c + 1,
                }}
              >
                {renderIcon(tile.dir)}

                {/* Subtle 3D Edge */}
                <div className="absolute inset-0 rounded-2xl border-t border-l border-white/25 pointer-events-none" />
              </button>
            );
          })}
        </div>

        {/* Level Solved Dopamine Banner */}
        {isLevelSolved && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-2 animate-bounce">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-white mb-0.5">Level {levelNum} Cleared! 🚀</h3>
            <p className="text-xs text-slate-400 mb-4">
              All arrows escaped in {moves} moves · +15 IQ Gained
              {levelNum % 5 === 0 && <span className="block text-amber-400 font-bold mt-1">🎁 +1 Bonus Hint Earned!</span>}
            </p>
            <button
              onClick={handleNextLevel}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/30 active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Play Level {levelNum + 1}</span>
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between w-full mt-3 px-1 gap-2">
        <button
          onClick={handleRestart}
          className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1 transition active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>

        {/* Rewarded Sponsor Video Button */}
        <button
          onClick={handleWatchAdForHints}
          className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center gap-1 shadow-md hover:brightness-110 transition active:scale-95"
        >
          <Tv className="w-3.5 h-3.5" />
          <span>🎁 Free Hints (Ad)</span>
        </button>

        <button
          onClick={handleHint}
          className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 transition active:scale-95 ${
            freeHints > 0
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 dark:text-amber-400 hover:bg-amber-500/20'
              : 'bg-indigo-600 text-white border-indigo-500 shadow-md'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{freeHints > 0 ? `Hint (${freeHints})` : 'Get Hint (Ad)'}</span>
        </button>
      </div>

      {/* Jump To Level Modal (1 to 10,000) */}
      {isJumpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-xs rounded-2xl bg-slate-900 border border-slate-700 p-5 text-center shadow-2xl">
            <h3 className="text-base font-black text-white mb-1 flex items-center justify-center gap-1.5">
              <Hash className="w-4 h-4 text-cyan-400" />
              <span>Jump to Any Level (1-10,000)</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Enter any level number or choose a preset checkpoint:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const num = parseInt(jumpInput, 10);
                if (num >= 1 && num <= 10000) handleJumpToLevel(num);
              }}
              className="flex gap-1.5 mb-3"
            >
              <input
                type="number"
                min={1}
                max={10000}
                placeholder="1 - 10000"
                value={jumpInput}
                onChange={(e) => setJumpInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs text-center font-bold font-mono focus:outline-none focus:border-cyan-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Go
              </button>
            </form>

            {/* Quick Checkpoint Presets */}
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">
              Quick Checkpoints
            </div>
            <div className="grid grid-cols-4 gap-1.5 mb-4">
              {[1, 10, 50, 100, 500, 1000, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleJumpToLevel(preset)}
                  className={`py-1 rounded-lg text-xs font-bold transition ${
                    levelNum === preset
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsJumpModalOpen(false)}
              className="w-full py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
