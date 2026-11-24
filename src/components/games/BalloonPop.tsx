import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Award } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface BalloonPopProps {
  onWin?: (score: number) => void;
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

export const BalloonPop: React.FC<BalloonPopProps> = ({ onWin }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [mode, setMode] = useState<'endless' | 'timed'>('endless');
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const nextId = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Spawn balloons periodically
  useEffect(() => {
    if (isGameOver) return;

    const spawnInterval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length >= 8) return prev;
        const colorObj = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const newBalloon: Balloon = {
          id: nextId.current++,
          x: Math.floor(Math.random() * 75) + 8,
          y: -10,
          speed: Math.random() * 0.4 + 0.35,
          color: colorObj.bg,
          emoji: colorObj.emoji,
          size: Math.floor(Math.random() * 20) + 65,
          isPopped: false,
        };
        return [...prev, newBalloon];
      });
    }, 700);

    return () => clearInterval(spawnInterval);
  }, [isGameOver]);

  // Floating animation loop
  useEffect(() => {
    if (isGameOver) return;

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
  }, [isGameOver]);

  // Countdown timer for timed mode
  useEffect(() => {
    if (mode !== 'timed' || isGameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          sound.playVictory();
          confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
          if (onWin) onWin(score);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, isGameOver, score, onWin]);

  const popBalloon = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    sound.playNumberPop(Math.floor(Math.random() * 8) + 1);

    setBalloons((prev) => prev.filter((b) => b.id !== id));
    const newScore = score + 1;
    const newStreak = streak + 1;
    setScore(newScore);
    setStreak(newStreak);

    // Confetti on milestone
    if (newScore > 0 && newScore % 15 === 0) {
      sound.playVictory();
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }
  };

  const restart = () => {
    sound.playTap();
    setScore(0);
    setStreak(0);
    setTimeLeft(30);
    setIsGameOver(false);
    setBalloons([]);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto animate-fade-in pb-10">
      {/* Top Controls */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#161a29] p-1 rounded-2xl border-2 border-slate-300 dark:border-[#2f3752]">
          <button
            onClick={() => { sound.playTap(); setMode('endless'); restart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition font-['Fredoka'] ${
              mode === 'endless'
                ? 'bg-[#00a859] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            🎈 Endless Pop
          </button>
          <button
            onClick={() => { sound.playTap(); setMode('timed'); restart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition font-['Fredoka'] ${
              mode === 'timed'
                ? 'bg-[#e52521] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            ⏱️ 30s Speed Pop
          </button>
        </div>

        <button
          onClick={restart}
          className="p-2 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-slate-700 dark:text-slate-300 hover:text-[#e52521] transition active:scale-95"
          title="Restart"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Score & Timer Bar */}
      <div className="w-full grid grid-cols-2 gap-2 mb-3 text-center">
        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] shadow-[2px_2px_0_#000]">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-['Fredoka'] block">BALLOONS POPPED</span>
          <span className="text-xl sm:text-2xl font-black text-rose-500 font-pixel leading-none">
            {score} 🎈
          </span>
        </div>

        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] shadow-[2px_2px_0_#000]">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-['Fredoka'] block">
            {mode === 'timed' ? 'TIME REMAINING' : 'STREAK'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-500 font-pixel leading-none">
            {mode === 'timed' ? `${timeLeft}s` : `${streak} ⭐`}
          </span>
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

        {balloons.length === 0 && !isGameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl animate-bounce mb-2">🎈</span>
            <p className="text-xs font-black text-sky-900 dark:text-sky-200 font-['Fredoka']">Balloons rising! Tap to pop!</p>
          </div>
        )}

        {/* Game Over Modal for Timed Mode */}
        {isGameOver && (
          <div className="absolute inset-0 z-30 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <Award className="w-12 h-12 text-yellow-400 animate-bounce mb-2" />
            <h3 className="text-2xl font-black text-white font-['Fredoka']">Great Popping!</h3>
            <p className="text-sm font-bold text-yellow-300 font-pixel my-2">
              You popped {score} balloons!
            </p>
            <button
              onClick={restart}
              className="mt-3 px-6 py-2.5 rounded-2xl bg-[#00a859] border-b-4 border-[#006633] text-white font-black text-xs shadow-md active:translate-y-0.5 transition font-['Fredoka']"
            >
              Play Again 🎈
            </button>
          </div>
        )}
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 font-['Fredoka'] mt-3 flex items-center gap-1">
        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        <span>Tap any balloon to pop it and hear cheerful sounds!</span>
      </p>
    </div>
  );
};
