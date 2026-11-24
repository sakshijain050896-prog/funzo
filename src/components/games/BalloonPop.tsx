import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface BalloonPopProps {
  onWin?: (score: number) => void;
  onBackToKids?: () => void;
}

interface Balloon {
  id: number;
  x: number; // percentage (5% to 85%)
  y: number; // bottom percentage (0% to 110%)
  speed: number;
  color: string;
  emoji: string;
  size: number;
  isPopped: boolean;
}

const BALLOON_COLORS = [
  { bg: 'from-red-400 to-rose-600 border-red-300', emoji: '🎈', name: 'Red' },
  { bg: 'from-amber-400 to-yellow-500 border-yellow-200', emoji: '⭐', name: 'Star' },
  { bg: 'from-emerald-400 to-green-600 border-green-300', emoji: '🐸', name: 'Green' },
  { bg: 'from-sky-400 to-blue-600 border-sky-300', emoji: '🐬', name: 'Blue' },
  { bg: 'from-purple-400 to-fuchsia-600 border-purple-300', emoji: '🦄', name: 'Purple' },
  { bg: 'from-orange-400 to-amber-600 border-orange-300', emoji: '🦁', name: 'Orange' },
];

export const BalloonPop: React.FC<BalloonPopProps> = ({ onWin, onBackToKids }) => {
  const [level, setLevel] = useState<number>(1);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState<number>(0);
  const [poppedInLevel, setPoppedInLevel] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isLevelCleared, setIsLevelCleared] = useState<boolean>(false);
  const nextId = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Target balloons per level (Level 1: 10, Level 2: 15, Level 3: 20...)
  const targetForLevel = 10 + (level - 1) * 5;

  // Spawn balloons periodically (faster spawn at higher levels)
  useEffect(() => {
    if (isLevelCleared) return;

    const spawnDelay = Math.max(450, 750 - (level - 1) * 60);
    const spawnInterval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length >= 7 + Math.min(level, 4)) return prev;
        const colorObj = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const baseSpeed = Math.random() * 0.35 + 0.35;
        const levelMultiplier = 1 + (level - 1) * 0.16;

        const newBalloon: Balloon = {
          id: nextId.current++,
          x: Math.floor(Math.random() * 75) + 8,
          y: -10,
          speed: baseSpeed * levelMultiplier,
          color: colorObj.bg,
          emoji: colorObj.emoji,
          size: Math.floor(Math.random() * 20) + 65,
          isPopped: false,
        };
        return [...prev, newBalloon];
      });
    }, spawnDelay);

    return () => clearInterval(spawnInterval);
  }, [level, isLevelCleared]);

  // Floating animation loop
  useEffect(() => {
    if (isLevelCleared) return;

    const updatePositions = () => {
      setBalloons((prev) =>
        prev
          .map((b) => ({ ...b, y: b.y + b.speed }))
          .filter((b) => b.y < 115 && !b.isPopped)
      );
      animationFrameRef.current = requestAnimationFrame(updatePositions);
    };

    animationFrameRef.current = requestAnimationFrame(updatePositions);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isLevelCleared]);

  const popBalloon = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    sound.playNumberPop(Math.floor(Math.random() * 8) + 1);

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    const newScore = score + 1;
    const newPoppedInLevel = poppedInLevel + 1;
    const newStreak = streak + 1;

    setScore(newScore);
    setPoppedInLevel(newPoppedInLevel);
    setStreak(newStreak);

    // Check level clear
    if (newPoppedInLevel >= targetForLevel) {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      setIsLevelCleared(true);
      if (onWin) onWin(newScore);
    }
  };

  // Advance to Next Level
  const handleNextLevel = () => {
    sound.playVictory();
    setLevel((l) => l + 1);
    setPoppedInLevel(0);
    setIsLevelCleared(false);
    setBalloons([]);
  };

  // Restart from Level 1
  const restartAll = () => {
    sound.playTap();
    setLevel(1);
    setScore(0);
    setPoppedInLevel(0);
    setStreak(0);
    setIsLevelCleared(false);
    setBalloons([]);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto animate-fade-in pb-10 font-['Fredoka'] select-none">
      {/* Top Controls */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Level Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-[#e52521] border-2 border-[#9e100e] text-white text-xs font-black shadow-sm flex items-center gap-1">
            <span>Level {level}</span>
          </div>

          {/* Goal Progress */}
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-xs font-black text-slate-800 dark:text-white shadow-sm">
            Pop: <span className="font-pixel text-[#00a859]">{poppedInLevel}</span> / {targetForLevel}
          </div>

          {/* Streak */}
          <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-xs font-black text-amber-500 shadow-sm">
            {streak} ⭐
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onBackToKids && (
            <button
              onClick={onBackToKids}
              className="px-2.5 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 border-2 border-amber-300 dark:border-amber-700/50 text-amber-900 dark:text-amber-300 font-black text-xs transition active:scale-95"
              title="Back to Kids Games"
            >
              ← Kids
            </button>
          )}

          <button
            onClick={restartAll}
            className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-slate-700 dark:text-slate-300 hover:text-[#e52521] transition active:scale-95 shadow-sm"
            title="Restart Game"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Balloon Sky Playground */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[420px] rounded-3xl bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 dark:from-[#1b2b48] dark:via-[#131f36] dark:to-[#0f172a] border-4 border-black dark:border-[#2f3752] shadow-[5px_5px_0_#000] overflow-hidden select-none touch-none">
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-6 text-3xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-14 right-8 text-4xl opacity-35 animate-pulse">☁️</div>
        <div className="absolute top-1/2 left-3 text-2xl opacity-30">☁️</div>

        {/* Floating Balloons */}
        {balloons.map((b) => (
          <div
            key={b.id}
            onPointerDown={(e) => popBalloon(b.id, e)}
            style={{
              left: `${b.x}%`,
              bottom: `${b.y}%`,
              width: `${b.size}px`,
              height: `${b.size * 1.25}px`,
            }}
            className="absolute cursor-pointer transform -translate-x-1/2 transition-transform duration-75 active:scale-125 touch-manipulation group"
          >
            {/* Balloon Body */}
            <div className={`w-full h-full rounded-full bg-gradient-to-tr ${b.color} border-2 shadow-lg flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform`}>
              <span className="text-xl sm:text-2xl select-none drop-shadow">{b.emoji}</span>
              {/* String */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-600 dark:bg-white/40" />
            </div>
          </div>
        ))}

        {balloons.length === 0 && !isLevelCleared && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl animate-bounce mb-2">🎈</span>
            <p className="text-xs font-black text-sky-900 dark:text-sky-200 font-['Fredoka']">Balloons rising! Tap to pop!</p>
          </div>
        )}

        {/* Level Cleared Overlay */}
        {isLevelCleared && (
          <div className="absolute inset-0 z-30 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg border-2 border-black animate-bounce">
              <Award className="w-8 h-8 fill-slate-950" />
            </div>
            <span className="text-xs font-black uppercase text-yellow-300 font-pixel">POP MASTER!</span>
            <h3 className="text-2xl font-black text-white mt-1">Level {level} Cleared! 🎈</h3>
            <p className="text-xs text-slate-200 my-2">
              Awesome popping! You popped all {targetForLevel} balloons!
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-3">
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#00a859] hover:bg-[#00c868] border-b-4 border-[#006633] text-white font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5"
              >
                <span>Next Level (Level {level + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onBackToKids && (
                <button
                  onClick={onBackToKids}
                  className="py-3 px-4 rounded-2xl bg-white dark:bg-[#22283a] border-2 border-slate-300 dark:border-[#444] text-slate-900 dark:text-white font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kids Games</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 font-['Fredoka'] mt-3 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Tap balloons to pop them before they float away!</span>
      </p>
    </div>
  );
};
