import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, RotateCcw, Lightbulb, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ArrowRightCircle } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface ArrowPuzzleProps {
  onWin: () => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
}

type Direction = 'U' | 'D' | 'L' | 'R';

interface ArrowTile {
  id: string;
  r: number;
  c: number;
  dir: Direction;
  color: string;
}

interface LevelPreset {
  id: string;
  name: string;
  rows: number;
  cols: number;
  arrows: { r: number; c: number; dir: Direction }[];
}

const LEVEL_PRESETS: LevelPreset[] = [
  // Level 1: 4x4 Starter Grid
  {
    id: 'lvl-1',
    name: 'Intro Grid (4x4)',
    rows: 4,
    cols: 4,
    arrows: [
      { r: 0, c: 0, dir: 'U' }, { r: 0, c: 1, dir: 'U' }, { r: 0, c: 2, dir: 'R' }, { r: 0, c: 3, dir: 'R' },
      { r: 1, c: 0, dir: 'L' }, { r: 1, c: 1, dir: 'U' }, { r: 1, c: 2, dir: 'D' }, { r: 1, c: 3, dir: 'R' },
      { r: 2, c: 0, dir: 'L' }, { r: 2, c: 1, dir: 'D' }, { r: 2, c: 2, dir: 'R' }, { r: 2, c: 3, dir: 'D' },
      { r: 3, c: 0, dir: 'D' }, { r: 3, c: 1, dir: 'D' }, { r: 3, c: 2, dir: 'D' }, { r: 3, c: 3, dir: 'D' },
    ],
  },
  // Level 2: 5x5 Cross Pattern
  {
    id: 'lvl-2',
    name: 'The Crosshair (5x5)',
    rows: 5,
    cols: 5,
    arrows: [
      { r: 0, c: 2, dir: 'U' },
      { r: 1, c: 1, dir: 'U' }, { r: 1, c: 2, dir: 'U' }, { r: 1, c: 3, dir: 'R' },
      { r: 2, c: 0, dir: 'L' }, { r: 2, c: 1, dir: 'L' }, { r: 2, c: 2, dir: 'R' }, { r: 2, c: 3, dir: 'R' }, { r: 2, c: 4, dir: 'R' },
      { r: 3, c: 1, dir: 'L' }, { r: 3, c: 2, dir: 'D' }, { r: 3, c: 3, dir: 'D' },
      { r: 4, c: 2, dir: 'D' },
    ],
  },
  // Level 3: 5x5 Spiral Vortex
  {
    id: 'lvl-3',
    name: 'The Spiral (5x5)',
    rows: 5,
    cols: 5,
    arrows: [
      { r: 0, c: 1, dir: 'R' }, { r: 0, c: 2, dir: 'R' }, { r: 0, c: 3, dir: 'R' }, { r: 0, c: 4, dir: 'D' },
      { r: 1, c: 0, dir: 'U' }, { r: 1, c: 2, dir: 'R' }, { r: 1, c: 3, dir: 'D' }, { r: 1, c: 4, dir: 'D' },
      { r: 2, c: 0, dir: 'U' }, { r: 2, c: 1, dir: 'U' }, { r: 2, c: 3, dir: 'D' }, { r: 2, c: 4, dir: 'D' },
      { r: 3, c: 0, dir: 'U' }, { r: 3, c: 1, dir: 'L' }, { r: 3, c: 2, dir: 'L' }, { r: 3, c: 4, dir: 'D' },
      { r: 4, c: 0, dir: 'L' }, { r: 4, c: 1, dir: 'L' }, { r: 4, c: 2, dir: 'L' }, { r: 4, c: 3, dir: 'L' },
    ],
  },
  // Level 4: 6x6 Diamond Fortress
  {
    id: 'lvl-4',
    name: 'Diamond Fortress (6x6)',
    rows: 6,
    cols: 6,
    arrows: [
      { r: 0, c: 2, dir: 'U' }, { r: 0, c: 3, dir: 'U' },
      { r: 1, c: 1, dir: 'L' }, { r: 1, c: 2, dir: 'U' }, { r: 1, c: 3, dir: 'R' }, { r: 1, c: 4, dir: 'R' },
      { r: 2, c: 0, dir: 'L' }, { r: 2, c: 1, dir: 'U' }, { r: 2, c: 2, dir: 'L' }, { r: 2, c: 3, dir: 'R' }, { r: 2, c: 4, dir: 'D' }, { r: 2, c: 5, dir: 'R' },
      { r: 3, c: 0, dir: 'L' }, { r: 3, c: 1, dir: 'D' }, { r: 3, c: 2, dir: 'L' }, { r: 3, c: 3, dir: 'R' }, { r: 3, c: 4, dir: 'U' }, { r: 3, c: 5, dir: 'R' },
      { r: 4, c: 1, dir: 'L' }, { r: 4, c: 2, dir: 'D' }, { r: 4, c: 3, dir: 'D' }, { r: 4, c: 4, dir: 'R' },
      { r: 5, c: 2, dir: 'D' }, { r: 5, c: 3, dir: 'D' },
    ],
  },
];

const DIR_COLORS: Record<Direction, { bg: string; text: string; glow: string }> = {
  U: { bg: 'bg-indigo-600', text: 'text-indigo-200', glow: 'shadow-indigo-500/40' },
  D: { bg: 'bg-rose-600', text: 'text-rose-200', glow: 'shadow-rose-500/40' },
  L: { bg: 'bg-amber-600', text: 'text-amber-200', glow: 'shadow-amber-500/40' },
  R: { bg: 'bg-cyan-600', text: 'text-cyan-200', glow: 'shadow-cyan-500/40' },
};

export const ArrowPuzzle: React.FC<ArrowPuzzleProps> = ({ onWin, onRequestAd }) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const activeLevel = LEVEL_PRESETS[levelIdx];
  const [activeArrows, setActiveArrows] = useState<ArrowTile[]>(() => initArrows(activeLevel));
  const [flyingArrows, setFlyingArrows] = useState<Record<string, Direction>>({});
  const [blockedTileId, setBlockedTileId] = useState<string | null>(null);
  const [highlightedTileId, setHighlightedTileId] = useState<string | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false);

  function initArrows(lvl: LevelPreset): ArrowTile[] {
    return lvl.arrows.map((a, i) => ({
      id: `tile-${lvl.id}-${i}-${a.r}-${a.c}`,
      r: a.r,
      c: a.c,
      dir: a.dir,
      color: DIR_COLORS[a.dir].bg,
    }));
  }

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
      setHighlightedTileId(null);

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
          onWin();
        }
      }, 350);
    } else {
      sound.playError();
      setBlockedTileId(tile.id);
      setTimeout(() => setBlockedTileId(null), 400);
    }
  };

  const handleHint = () => {
    // Find first unobstructed tile
    const freeTile = activeArrows.find((a) => checkCanEscape(a, activeArrows));
    if (freeTile) {
      sound.playTap();
      setHighlightedTileId(freeTile.id);
      setTimeout(() => setHighlightedTileId(null), 2500);
    } else if (onRequestAd) {
      onRequestAd('Reveal Next Arrow Move', () => {
        const anyFree = activeArrows.find((a) => checkCanEscape(a, activeArrows));
        if (anyFree) setHighlightedTileId(anyFree.id);
      });
    }
  };

  const handleRestart = (newIdx: number = levelIdx) => {
    sound.playTap();
    const nextLvl = LEVEL_PRESETS[newIdx];
    setLevelIdx(newIdx);
    setActiveArrows(initArrows(nextLvl));
    setFlyingArrows({});
    setBlockedTileId(null);
    setHighlightedTileId(null);
    setMoves(0);
    setIsLevelSolved(false);
  };

  const handleNextLevel = () => {
    sound.playTap();
    handleRestart((levelIdx + 1) % LEVEL_PRESETS.length);
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
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Arrow Escape</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-500 dark:text-cyan-400 font-bold">
              Level {levelIdx + 1}/{LEVEL_PRESETS.length}
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Tap arrows with clear, open escape paths!</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center">
            <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Left</span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{activeArrows.length}</span>
          </div>
          <div className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center">
            <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Moves</span>
            <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{moves}</span>
          </div>
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

      {/* Level Selector Pills */}
      <div className="flex gap-1 mb-2.5 overflow-x-auto w-full pb-0.5">
        {LEVEL_PRESETS.map((lvl, idx) => (
          <button
            key={lvl.id}
            onClick={() => handleRestart(idx)}
            className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              levelIdx === idx
                ? 'bg-cyan-600 text-white shadow-md font-black'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400'
            }`}
          >
            Level {idx + 1}
          </button>
        ))}
      </div>

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
                  DIR_COLORS[tile.dir].bg
                } ${DIR_COLORS[tile.dir].text} ${DIR_COLORS[tile.dir].glow} ${
                  isBlocked ? 'animate-shake ring-4 ring-rose-500 scale-95' : ''
                } ${
                  isHighlighted ? 'ring-4 ring-yellow-400 animate-pulse scale-105' : ''
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
            <h3 className="text-xl font-black text-white mb-0.5">Arrows Cleared! 🚀</h3>
            <p className="text-xs text-slate-400 mb-4">
              All tiles escaped in {moves} moves · +15 IQ Gained
            </p>
            <button
              onClick={handleNextLevel}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-black text-xs shadow-lg shadow-cyan-500/30 active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Next Arrow Labyrinth</span>
              <ArrowRightCircle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between w-full mt-3 px-1">
        <button
          onClick={() => handleRestart()}
          className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Board
        </button>

        <button
          onClick={handleHint}
          className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 dark:text-amber-400 hover:bg-amber-500/20 text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <Lightbulb className="w-3.5 h-3.5" /> Hint
        </button>
      </div>
    </div>
  );
};
