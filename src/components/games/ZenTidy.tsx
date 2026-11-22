import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Check, ArrowRight, Image } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface ZenTidyProps {
  onWin: () => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
}

interface LevelDef {
  id: string;
  title: string;
  subtitle: string;
  instruction: string;
  type: 'swap-height' | 'rotate-frames' | 'swap-pencils' | 'fill-jars';
}

const LEVELS: LevelDef[] = [
  {
    id: 'books',
    title: 'The Rainbow Bookshelf',
    subtitle: 'Ascending Height Order',
    instruction: 'Tap any two books to swap them. Organize them from shortest (left) to tallest (right).',
    type: 'swap-height',
  },
  {
    id: 'frames',
    title: 'The Art Gallery',
    subtitle: 'Straighten Crooked Paintings',
    instruction: 'Every painting is tilted! Tap each painting to rotate it until it hangs perfectly level (0°).',
    type: 'rotate-frames',
  },
  {
    id: 'pencils',
    title: 'The Artist Desk',
    subtitle: 'Pencil Length Alignment',
    instruction: 'Tap two pencils to swap their places. Line them up neatly from shortest to longest.',
    type: 'swap-pencils',
  },
  {
    id: 'jars',
    title: 'The Spice Pantry',
    subtitle: 'Gradient Fill Levels',
    instruction: 'Swap the potion & spice jars so their fill levels rise smoothly from lowest to highest.',
    type: 'fill-jars',
  },
];

export const ZenTidy: React.FC<ZenTidyProps> = ({ onWin }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const activeLevel = LEVELS[currentLevelIdx];
  const [moves, setMoves] = useState<number>(0);
  const [levelSolved, setLevelSolved] = useState<boolean>(false);

  // LEVEL 1: BOOKS (Heights: 1 to 6)
  const [books, setBooks] = useState<{ id: number; height: number; color: string; label: string }[]>([
    { id: 1, height: 85, color: 'from-amber-600 to-amber-700', label: 'History' },
    { id: 2, height: 45, color: 'from-rose-600 to-rose-700', label: 'Poems' },
    { id: 3, height: 100, color: 'from-purple-600 to-purple-700', label: 'Atlas' },
    { id: 4, height: 60, color: 'from-emerald-600 to-emerald-700', label: 'Botany' },
    { id: 5, height: 75, color: 'from-blue-600 to-blue-700', label: 'Novels' },
    { id: 6, height: 30, color: 'from-cyan-600 to-cyan-700', label: 'Tales' },
  ]);
  const [selectedBookIdx, setSelectedBookIdx] = useState<number | null>(null);

  // LEVEL 2: FRAMES (Rotations in degrees)
  const [frames, setFrames] = useState<number[]>([30, -45, 15, -30]);

  // LEVEL 3: PENCILS (Lengths 1 to 5)
  const [pencils, setPencils] = useState<{ id: number; length: number; color: string }[]>([
    { id: 1, length: 70, color: 'bg-amber-400' },
    { id: 2, length: 30, color: 'bg-rose-500' },
    { id: 3, length: 90, color: 'bg-indigo-500' },
    { id: 4, length: 50, color: 'bg-emerald-400' },
    { id: 5, length: 110, color: 'bg-cyan-400' },
  ]);
  const [selectedPencilIdx, setSelectedPencilIdx] = useState<number | null>(null);

  // LEVEL 4: JARS (Fill % from lowest to highest)
  const [jars, setJars] = useState<{ id: number; fill: number; color: string; name: string }[]>([
    { id: 1, fill: 65, color: 'bg-amber-500', name: 'Curry' },
    { id: 2, fill: 20, color: 'bg-rose-500', name: 'Chili' },
    { id: 3, fill: 90, color: 'bg-emerald-500', name: 'Basil' },
    { id: 4, fill: 40, color: 'bg-purple-500', name: 'Thyme' },
  ]);
  const [selectedJarIdx, setSelectedJarIdx] = useState<number | null>(null);

  // Check solved condition for each level
  const triggerWin = () => {
    sound.playVictory();
    confetti({ particleCount: 70, spread: 70 });
    setLevelSolved(true);
    onWin();
  };

  // 1. Book Swap
  const handleBookClick = (idx: number) => {
    if (levelSolved) return;
    sound.playTap();
    if (selectedBookIdx === null) {
      setSelectedBookIdx(idx);
    } else {
      if (selectedBookIdx !== idx) {
        const next = [...books];
        const temp = next[selectedBookIdx];
        next[selectedBookIdx] = next[idx];
        next[idx] = temp;
        setBooks(next);
        setMoves((m) => m + 1);

        // Check if sorted ascending
        const isSorted = next.every((b, i) => i === 0 || b.height >= next[i - 1].height);
        if (isSorted) triggerWin();
      }
      setSelectedBookIdx(null);
    }
  };

  // 2. Frame Rotate (clicks cycle rotation by 15 degrees)
  const handleFrameClick = (idx: number) => {
    if (levelSolved) return;
    sound.playTap();
    const next = [...frames];
    // Advance rotation towards 0
    let rot = next[idx] + 15;
    if (rot > 45) rot = -45;
    next[idx] = rot;
    setFrames(next);
    setMoves((m) => m + 1);

    const allStraight = next.every((r) => r === 0);
    if (allStraight) triggerWin();
  };

  // 3. Pencil Swap
  const handlePencilClick = (idx: number) => {
    if (levelSolved) return;
    sound.playTap();
    if (selectedPencilIdx === null) {
      setSelectedPencilIdx(idx);
    } else {
      if (selectedPencilIdx !== idx) {
        const next = [...pencils];
        const temp = next[selectedPencilIdx];
        next[selectedPencilIdx] = next[idx];
        next[idx] = temp;
        setPencils(next);
        setMoves((m) => m + 1);

        const isSorted = next.every((p, i) => i === 0 || p.length >= next[i - 1].length);
        if (isSorted) triggerWin();
      }
      setSelectedPencilIdx(null);
    }
  };

  // 4. Jar Swap
  const handleJarClick = (idx: number) => {
    if (levelSolved) return;
    sound.playTap();
    if (selectedJarIdx === null) {
      setSelectedJarIdx(idx);
    } else {
      if (selectedJarIdx !== idx) {
        const next = [...jars];
        const temp = next[selectedJarIdx];
        next[selectedJarIdx] = next[idx];
        next[idx] = temp;
        setJars(next);
        setMoves((m) => m + 1);

        const isSorted = next.every((j, i) => i === 0 || j.fill >= next[i - 1].fill);
        if (isSorted) triggerWin();
      }
      setSelectedJarIdx(null);
    }
  };

  const nextLevel = () => {
    sound.playTap();
    setLevelSolved(false);
    setSelectedBookIdx(null);
    setSelectedPencilIdx(null);
    setSelectedJarIdx(null);
    setMoves(0);
    setCurrentLevelIdx((prev) => (prev + 1) % LEVELS.length);
  };

  const restartLevel = () => {
    sound.playTap();
    setLevelSolved(false);
    setSelectedBookIdx(null);
    setSelectedPencilIdx(null);
    setSelectedJarIdx(null);
    setMoves(0);
    if (activeLevel.id === 'books') {
      setBooks([
        { id: 1, height: 85, color: 'from-amber-600 to-amber-700', label: 'History' },
        { id: 2, height: 45, color: 'from-rose-600 to-rose-700', label: 'Poems' },
        { id: 3, height: 100, color: 'from-purple-600 to-purple-700', label: 'Atlas' },
        { id: 4, height: 60, color: 'from-emerald-600 to-emerald-700', label: 'Botany' },
        { id: 5, height: 75, color: 'from-blue-600 to-blue-700', label: 'Novels' },
        { id: 6, height: 30, color: 'from-cyan-600 to-cyan-700', label: 'Tales' },
      ]);
    } else if (activeLevel.id === 'frames') {
      setFrames([30, -45, 15, -30]);
    } else if (activeLevel.id === 'pencils') {
      setPencils([
        { id: 1, length: 70, color: 'bg-amber-400' },
        { id: 2, length: 30, color: 'bg-rose-500' },
        { id: 3, length: 90, color: 'bg-indigo-500' },
        { id: 4, length: 50, color: 'bg-emerald-400' },
        { id: 5, length: 110, color: 'bg-cyan-400' },
      ]);
    } else {
      setJars([
        { id: 1, fill: 65, color: 'bg-amber-500', name: 'Curry' },
        { id: 2, fill: 20, color: 'bg-rose-500', name: 'Chili' },
        { id: 3, fill: 90, color: 'bg-emerald-500', name: 'Basil' },
        { id: 4, fill: 40, color: 'bg-purple-500', name: 'Thyme' },
      ]);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-6">
      {/* Top Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>Zen Tidy</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">
              Level {currentLevelIdx + 1}/{LEVELS.length}
            </span>
          </h2>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">{activeLevel.subtitle}</p>
        </div>

        <div className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-center">
          <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Moves</span>
          <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{moves}</span>
        </div>
      </div>

      {/* Prominent In-Screen Instruction Card */}
      <div className="w-full p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 mb-3 text-left shadow-sm">
        <div className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{activeLevel.title}</span>
        </div>
        <p className="text-xs text-slate-700 dark:text-slate-200 leading-snug">
          {activeLevel.instruction}
        </p>
      </div>

      {/* Level Selector Pills */}
      <div className="flex gap-1 mb-3 overflow-x-auto w-full pb-1">
        {LEVELS.map((lvl, idx) => (
          <button
            key={lvl.id}
            onClick={() => {
              sound.playTap();
              setCurrentLevelIdx(idx);
              setLevelSolved(false);
              setMoves(0);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              currentLevelIdx === idx
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {lvl.title.split(' ')[1] || lvl.title}
          </button>
        ))}
      </div>

      {/* ---------------- ACTIVE LEVEL STAGE ---------------- */}
      <div className="relative w-full aspect-square max-w-[340px] p-4 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden">
        
        {/* 1. BOOKS LEVEL */}
        {activeLevel.id === 'books' && (
          <div className="w-full h-full flex flex-col justify-end">
            <div className="flex items-end justify-center gap-1.5 h-48 w-full border-b-4 border-amber-800/80 px-2 pb-0.5">
              {books.map((b, idx) => {
                const isSelected = selectedBookIdx === idx;
                return (
                  <button
                    key={b.id}
                    onClick={() => handleBookClick(idx)}
                    className={`flex-1 rounded-t-lg bg-gradient-to-t ${b.color} transition-all duration-200 relative flex flex-col items-center justify-between py-2 active:scale-95 border-2 ${
                      isSelected
                        ? 'border-yellow-300 ring-2 ring-yellow-400 -translate-y-2'
                        : 'border-white/10 hover:brightness-110'
                    }`}
                    style={{ height: `${b.height}%` }}
                  >
                    <span className="text-[9px] font-black text-white/80 writing-vertical rotate-180 uppercase tracking-widest">
                      {b.label}
                    </span>
                    <div className="w-full h-1 bg-amber-400/50" />
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-center text-slate-500 mt-3">
              Shortest on left ➔ Tallest on right
            </div>
          </div>
        )}

        {/* 2. FRAMES LEVEL */}
        {activeLevel.id === 'frames' && (
          <div className="w-full grid grid-cols-2 gap-4 p-2">
            {frames.map((rot, idx) => {
              const isStraight = rot === 0;
              return (
                <button
                  key={idx}
                  onClick={() => handleFrameClick(idx)}
                  className={`aspect-[4/3] rounded-2xl border-4 p-2 transition-transform duration-300 flex flex-col items-center justify-center relative active:scale-90 ${
                    isStraight
                      ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-500/20'
                      : 'border-amber-500/60 bg-slate-900 shadow-md'
                  }`}
                  style={{ transform: `rotate(${rot}deg)` }}
                >
                  <Image className={`w-6 h-6 mb-1 ${isStraight ? 'text-emerald-400' : 'text-amber-400'}`} />
                  <span className="text-[9px] font-mono font-bold text-white">
                    {isStraight ? 'PERFECT ✨' : `${rot}°`}
                  </span>
                  {/* Hanging string nail */}
                  <div className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-amber-400" />
                </button>
              );
            })}
          </div>
        )}

        {/* 3. PENCILS LEVEL */}
        {activeLevel.id === 'pencils' && (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col gap-2 px-3">
              {pencils.map((p, idx) => {
                const isSelected = selectedPencilIdx === idx;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePencilClick(idx)}
                    className={`h-7 rounded-full flex items-center transition-all duration-200 border-2 active:scale-98 ${
                      isSelected
                        ? 'border-yellow-300 ring-2 ring-yellow-400 scale-[1.02]'
                        : 'border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`h-full rounded-full ${p.color} transition-all duration-300 flex items-center justify-end px-2 text-[10px] font-bold text-slate-950`}
                      style={{ width: `${p.length}%` }}
                    >
                      ✏️
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="text-[10px] text-center text-slate-500 mt-4">
              Tap two pencils to swap into ascending order
            </div>
          </div>
        )}

        {/* 4. JARS LEVEL */}
        {activeLevel.id === 'jars' && (
          <div className="w-full flex items-end justify-center gap-2.5 h-44 px-3">
            {jars.map((j, idx) => {
              const isSelected = selectedJarIdx === idx;
              return (
                <button
                  key={j.id}
                  onClick={() => handleJarClick(idx)}
                  className={`flex-1 h-36 rounded-2xl bg-slate-900 border-2 transition-all relative overflow-hidden flex flex-col justify-end active:scale-95 ${
                    isSelected
                      ? 'border-yellow-300 ring-2 ring-yellow-400'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  {/* Jar Cap */}
                  <div className="absolute top-0 inset-x-2 h-2 rounded-b bg-amber-600" />
                  
                  {/* Liquid Fill */}
                  <div
                    className={`w-full ${j.color} transition-all duration-500 rounded-b-xl flex items-center justify-center text-[10px] font-black text-white`}
                    style={{ height: `${j.fill}%` }}
                  >
                    {j.fill}%
                  </div>
                  <span className="absolute top-3 text-[9px] font-bold text-slate-400 w-full text-center">
                    {j.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Level Solved Dopamine Banner */}
        {levelSolved && (
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2 animate-bounce">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h3 className="text-xl font-black text-white mb-0.5">Perfect Order! ✨</h3>
            <p className="text-xs text-slate-400 mb-4">
              Solved in {moves} moves · +15 IQ Gained
            </p>
            <button
              onClick={nextLevel}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 active:scale-95 transition flex items-center gap-1.5"
            >
              <span>Next Zen Room</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <button
        onClick={restartLevel}
        className="mt-3.5 px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset Room Items
      </button>
    </div>
  );
};
