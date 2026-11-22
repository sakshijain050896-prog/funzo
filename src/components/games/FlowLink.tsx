import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Award, ChevronRight } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface FlowLinkProps {
  onWin: () => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
}

type ColorId = 'R' | 'B' | 'G' | 'Y' | 'O';

const COLOR_MAP: Record<ColorId, { bg: string; border: string; glow: string; name: string }> = {
  R: { bg: 'bg-rose-500', border: 'border-rose-400', glow: 'shadow-rose-500/50', name: 'Red' },
  B: { bg: 'bg-blue-500', border: 'border-blue-400', glow: 'shadow-blue-500/50', name: 'Blue' },
  G: { bg: 'bg-emerald-500', border: 'border-emerald-400', glow: 'shadow-emerald-500/50', name: 'Green' },
  Y: { bg: 'bg-amber-400', border: 'border-amber-300', glow: 'shadow-amber-400/50', name: 'Yellow' },
  O: { bg: 'bg-orange-500', border: 'border-orange-400', glow: 'shadow-orange-500/50', name: 'Orange' },
};

// Preset levels (5x5 boards with endpoints)
const FLOW_LEVELS: {
  size: number;
  endpoints: { r: number; c: number; color: ColorId }[];
}[] = [
  {
    size: 5,
    endpoints: [
      { r: 0, c: 0, color: 'R' }, { r: 4, c: 0, color: 'R' },
      { r: 0, c: 4, color: 'B' }, { r: 4, c: 4, color: 'B' },
      { r: 2, c: 1, color: 'G' }, { r: 2, c: 3, color: 'G' },
    ],
  },
  {
    size: 5,
    endpoints: [
      { r: 0, c: 1, color: 'R' }, { r: 3, c: 1, color: 'R' },
      { r: 1, c: 3, color: 'B' }, { r: 4, c: 3, color: 'B' },
      { r: 0, c: 4, color: 'Y' }, { r: 4, c: 0, color: 'Y' },
      { r: 2, c: 2, color: 'G' }, { r: 4, c: 4, color: 'G' },
    ],
  },
  {
    size: 5,
    endpoints: [
      { r: 0, c: 0, color: 'R' }, { r: 3, c: 2, color: 'R' },
      { r: 1, c: 0, color: 'B' }, { r: 4, c: 2, color: 'B' },
      { r: 0, c: 3, color: 'G' }, { r: 3, c: 4, color: 'G' },
      { r: 1, c: 4, color: 'Y' }, { r: 4, c: 0, color: 'Y' },
      { r: 2, c: 1, color: 'O' }, { r: 4, c: 4, color: 'O' },
    ],
  },
];

export const FlowLink: React.FC<FlowLinkProps> = ({ onWin }) => {
  const [levelIdx, setLevelIdx] = useState<number>(0);
  const currentLevel = FLOW_LEVELS[levelIdx];

  // Grid state: maps `${r}-${c}` to ColorId | null
  const [pipeGrid, setPipeGrid] = useState<Record<string, ColorId>>({});
  const [activeColor, setActiveColor] = useState<ColorId | null>(null);
  const [isLevelSolved, setIsLevelSolved] = useState<boolean>(false);

  // Check if cell is an endpoint
  const getEndpoint = (r: number, c: number): ColorId | null => {
    const ep = currentLevel.endpoints.find((p) => p.r === r && p.c === c);
    return ep ? ep.color : null;
  };

  const resetLevel = () => {
    sound.playTap();
    setPipeGrid({});
    setActiveColor(null);
    setIsLevelSolved(false);
  };

  const handleCellClickOrDrag = (r: number, c: number) => {
    if (isLevelSolved) return;
    const ep = getEndpoint(r, c);

    if (ep) {
      // Tapped endpoint: select that color to paint
      sound.playTap();
      setActiveColor(ep);
      const newGrid = { ...pipeGrid, [`${r}-${c}`]: ep };
      setPipeGrid(newGrid);
      checkCompletion(newGrid);
      return;
    }

    if (activeColor) {
      sound.playTap();
      const key = `${r}-${c}`;
      const newGrid = { ...pipeGrid };
      if (newGrid[key] === activeColor) {
        delete newGrid[key]; // tap again to erase
      } else {
        newGrid[key] = activeColor;
      }
      setPipeGrid(newGrid);
      checkCompletion(newGrid);
    }
  };

  const checkCompletion = (grid: Record<string, ColorId>) => {
    // Check if all endpoints have their color placed
    for (const ep of currentLevel.endpoints) {
      if (grid[`${ep.r}-${ep.c}`] !== ep.color) return;
    }

    // Check if at least 20 cells are filled in 5x5 board
    const filledCount = Object.keys(grid).length;
    if (filledCount >= currentLevel.size * currentLevel.size - 2) {
      sound.playVictory();
      confetti({ particleCount: 60, spread: 60 });
      setIsLevelSolved(true);
      onWin();
    }
  };

  const nextLevel = () => {
    sound.playTap();
    const next = (levelIdx + 1) % FLOW_LEVELS.length;
    setLevelIdx(next);
    setPipeGrid({});
    setActiveColor(null);
    setIsLevelSolved(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      <div className="w-full flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-1.5">
            <span>Color Link</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold">
              Level {levelIdx + 1}
            </span>
          </h2>
          <p className="text-[11px] text-slate-400">Connect matching dots without crossing lines</p>
        </div>

        <button
          onClick={resetLevel}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
          title="Reset Grid"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Color Selector Pills */}
      <div className="w-full flex items-center justify-center gap-2 mb-4 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {(['R', 'B', 'G', 'Y', 'O'] as ColorId[]).slice(0, currentLevel.endpoints.length / 2).map((c) => {
          const isSelected = activeColor === c;
          const config = COLOR_MAP[c];
          return (
            <button
              key={c}
              onClick={() => {
                sound.playTap();
                setActiveColor(c);
              }}
              className={`w-8 h-8 rounded-xl ${config.bg} flex items-center justify-center text-white font-bold text-xs transition active:scale-90 ${
                isSelected ? 'ring-4 ring-white shadow-lg' : 'opacity-70 hover:opacity-100'
              }`}
            >
              ●
            </button>
          );
        })}
      </div>

      {/* 5x5 Flow Grid Board */}
      <div className="relative w-full aspect-square max-w-[340px] p-2 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl grid grid-cols-5 grid-rows-5 gap-1.5">
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 5 }).map((_, c) => {
            const key = `${r}-${c}`;
            const epColor = getEndpoint(r, c);
            const pipeColor = pipeGrid[key] || epColor;
            const config = pipeColor ? COLOR_MAP[pipeColor] : null;

            return (
              <div
                key={key}
                onClick={() => handleCellClickOrDrag(r, c)}
                className={`rounded-xl flex items-center justify-center cursor-pointer transition-all duration-150 touch-manipulation ${
                  config
                    ? `${config.bg} ${config.glow} shadow-md`
                    : 'bg-slate-900/90 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {epColor && (
                  <div className="w-4 h-4 rounded-full bg-white shadow-md animate-pulse" />
                )}
              </div>
            );
          })
        )}

        {/* Level Complete Overlay */}
        {isLevelSolved && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">Board Cleared!</h3>
            <p className="text-xs text-slate-400 mb-4">+50 Funzo Coins Earned</p>
            <button
              onClick={nextLevel}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/30 flex items-center gap-1.5 active:scale-95 transition"
            >
              <span>Next Puzzle</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
