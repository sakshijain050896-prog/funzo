import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { 
  HelpCircle, Trophy, RotateCcw, Lightbulb, 
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowRightCircle,
  Tv, ChevronLeft, ChevronRight
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

const DIR_COLORS: Record<Direction, { bg: string; text: string; glow: string; border: string }> = {
  U: { bg: 'bg-[#58cc02]', text: 'text-white', glow: 'shadow-[#58cc02]/30', border: 'border-b-4 border-[#46a302]' },
  D: { bg: 'bg-[#ff4b4b]', text: 'text-white', glow: 'shadow-[#ff4b4b]/30', border: 'border-b-4 border-[#d33131]' },
  L: { bg: 'bg-[#ff9600]', text: 'text-white', glow: 'shadow-[#ff9600]/30', border: 'border-b-4 border-[#cc7800]' },
  R: { bg: 'bg-[#1cb0f6]', text: 'text-white', glow: 'shadow-[#1cb0f6]/30', border: 'border-b-4 border-[#1899d6]' },
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

  const [activeArrows, setActiveArrows] = useState<ArrowTile[]>(() => {
    const full = initArrows(activeLevel);
    try {
      const savedLevel = localStorage.getItem('funzo_arrow_level');
      const savedIds = localStorage.getItem('funzo_arrow_active_ids');
      if (savedLevel && parseInt(savedLevel, 10) === activeLevel.levelNum && savedIds) {
        const idSet = new Set<string>(JSON.parse(savedIds));
        const filtered = full.filter((a) => idSet.has(a.id));
        if (filtered.length > 0) return filtered;
      }
    } catch {
      // storage fallback
    }
    return full;
  });
  const [flyingArrows, setFlyingArrows] = useState<Record<string, Direction>>({});
  const [blockedTileId, setBlockedTileId] = useState<string | null>(null);
  const [highlightedTileId, setHighlightedTileId] = useState<string | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false);

  // Highest unlocked level (Players cannot jump ahead to unreached levels)
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<number>(() => {
    try {
      const savedMax = localStorage.getItem('funzo_arrow_max_level');
      const parsed = savedMax ? parseInt(savedMax, 10) : 1;
      return Math.max(parsed, levelNum);
    } catch {
      return Math.max(1, levelNum);
    }
  });

  // Persist level, max unlocked level and hints
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
      localStorage.setItem('funzo_arrow_max_level', maxUnlockedLevel.toString());
    } catch {
      // storage unavailable
    }
  }, [maxUnlockedLevel]);

  useEffect(() => {
    try {
      localStorage.setItem('funzo_arrow_hints', freeHints.toString());
    } catch {
      // storage unavailable
    }
  }, [freeHints]);

  // Persist in-progress active arrow remaining tiles
  useEffect(() => {
    try {
      if (activeArrows.length > 0 && !isLevelSolved && activeArrows.length < activeLevel.arrows.length) {
        localStorage.setItem('funzo_arrow_active_ids', JSON.stringify(activeArrows.map((a) => a.id)));
      } else if (isLevelSolved || activeArrows.length === 0) {
        localStorage.removeItem('funzo_arrow_active_ids');
      }
    } catch {
      // ignore
    }
  }, [activeArrows, isLevelSolved, activeLevel.arrows.length]);

  // Sync arrows when activeLevel changes
  useEffect(() => {
    let tiles = initArrows(activeLevel);
    try {
      const savedLevel = localStorage.getItem('funzo_arrow_level');
      const savedIds = localStorage.getItem('funzo_arrow_active_ids');
      if (savedLevel && parseInt(savedLevel, 10) === activeLevel.levelNum && savedIds) {
        const idSet = new Set<string>(JSON.parse(savedIds));
        const filtered = tiles.filter((a) => idSet.has(a.id));
        if (filtered.length > 0) tiles = filtered;
      }
    } catch {
      // ignore
    }
    setActiveArrows(tiles);
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
          const nextLvl = Math.min(10000, levelNum + 1);
          setMaxUnlockedLevel((prev) => Math.max(prev, nextLvl));
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
    if (levelNum < maxUnlockedLevel) {
      sound.playTap();
      setLevelNum((lvl) => Math.min(maxUnlockedLevel, lvl + 1));
    }
  };

  const handlePrevLevel = () => {
    sound.playTap();
    setLevelNum((lvl) => Math.max(1, lvl - 1));
  };

  const renderIcon = (dir: Direction) => {
    switch (dir) {
      case 'U': return <ArrowUp className="w-5 h-5 stroke-[2.5]" />;
      case 'D': return <ArrowDown className="w-5 h-5 stroke-[2.5]" />;
      case 'L': return <ArrowLeft className="w-5 h-5 stroke-[2.5]" />;
      case 'R': return <ArrowRight className="w-5 h-5 stroke-[2.5]" />;
    }
  };

  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-4">
      {/* Sleek Top Navigation Bar: Level, Sequential Prev/Next, Hints */}
      <div className="w-full flex items-center justify-between mb-2 px-0.5">
        {/* Left: Level Display & Rules (No arbitrary jumping permitted) */}
        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center gap-1 px-3 py-1.5 rounded-2xl btn-tactile-slate text-xs font-black shadow-sm cursor-default"
            title={`Level ${levelNum} of 10,000 (Sequential Progress)`}
          >
            <span>Level {levelNum}</span>
            <span className="text-[10px] text-slate-400 font-normal">/ 10k</span>
          </div>

          <button
            onClick={() => setShowHowToPlay((p) => !p)}
            className="p-1.5 rounded-xl btn-tactile-slate text-slate-400 hover:text-white transition"
            title="How to Play"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Prev / Next buttons (Next only enabled if level is solved/unlocked) */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevLevel}
            disabled={levelNum <= 1}
            className="p-2 rounded-xl btn-tactile-slate disabled:opacity-30 text-slate-700 dark:text-slate-300 transition"
            title="Previous Level"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextLevel}
            disabled={levelNum >= maxUnlockedLevel}
            className="p-2 rounded-xl btn-tactile-slate disabled:opacity-30 text-slate-700 dark:text-slate-300 transition"
            title={levelNum >= maxUnlockedLevel ? "Solve current level to advance!" : "Next Level"}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Hint Button */}
        <button
          onClick={handleHint}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-2xl text-xs font-black shadow-sm ${
            freeHints > 0
              ? 'btn-tactile-amber'
              : 'btn-tactile-green'
          }`}
          title={freeHints > 0 ? `${freeHints} Free Hints Left` : 'Watch Video for +2 Free Hints'}
        >
          <Lightbulb className="w-4 h-4 fill-current" />
          <span>{freeHints > 0 ? freeHints : 'Ad'}</span>
        </button>
      </div>

      {/* Optional Collapsible Minimalist Instruction Tip */}
      {showHowToPlay && (
        <div className="w-full p-2.5 rounded-2xl bg-indigo-50 dark:bg-slate-900/80 border border-indigo-200/80 dark:border-slate-800 mb-2 text-left text-xs text-slate-600 dark:text-slate-300 animate-fade-in shadow-sm">
          <p className="leading-relaxed text-[11px]">
            Tap each arrow to fly away! An arrow can <strong>only escape</strong> if no other block is directly in its path.
          </p>
        </div>
      )}

      {/* Active Hint Banner */}
      {highlightedTileId && (
        <div className="w-full py-1.5 px-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs text-center mb-2 shadow-lg animate-bounce flex items-center justify-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 fill-slate-950" />
          <span>Tap the glowing golden arrow!</span>
        </div>
      )}

      {/* ---------------- ARROW PUZZLE STAGE ---------------- */}
      <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[360px] p-3 rounded-3xl bg-slate-100 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800/80 shadow-xl flex items-center justify-center overflow-hidden">
        
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
                    ? 'ring-4 ring-amber-400 bg-amber-400 text-slate-950 animate-bounce scale-110 shadow-2xl shadow-amber-400/90 z-20 border-b-4 border-amber-600'
                    : `${DIR_COLORS[tile.dir].bg} ${DIR_COLORS[tile.dir].text} ${DIR_COLORS[tile.dir].border} ${DIR_COLORS[tile.dir].glow}`
                } ${
                  isBlocked ? 'animate-shake ring-4 ring-rose-500 scale-95' : 'active:translate-y-1 active:border-b-0'
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
          <div className="absolute inset-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center border-2 border-emerald-500/50">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 flex items-center justify-center mb-2 animate-bounce">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-0.5">Level {levelNum} Cleared! 🚀</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              All arrows escaped in {moves} moves · +15 IQ Gained
              {levelNum % 5 === 0 && <span className="block text-amber-500 font-bold mt-1">🎁 +1 Bonus Hint Earned!</span>}
            </p>
            <button
              onClick={() => {
                sound.playTap();
                const nextLvl = Math.min(10000, levelNum + 1);
                setMaxUnlockedLevel((prev) => Math.max(prev, nextLvl));
                setLevelNum(nextLvl);
                setIsLevelSolved(false);
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/30 active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Play Level {levelNum + 1}</span>
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center justify-between w-full mt-3 px-1">
        <button
          onClick={handleRestart}
          className="px-3.5 py-2 rounded-2xl btn-tactile-slate text-xs font-black flex items-center gap-1.5 shadow-sm"
        >
          <RotateCcw className="w-4 h-4" /> Restart Level
        </button>

        <button
          onClick={handleWatchAdForHints}
          className="px-4 py-2 rounded-2xl btn-tactile-green text-xs font-black flex items-center gap-1.5 shadow-md"
        >
          <Tv className="w-4 h-4" />
          <span>+2 Hints (Ad)</span>
        </button>
      </div>
    </div>
  );
};
