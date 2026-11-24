import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, Award, ArrowRight, ArrowLeft, Timer, AlertCircle } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface BalloonPopProps {
  coins?: number;
  onSpendCoins?: (amount: number) => boolean;
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

// Gentle, cheerful pastel colors for kid-friendly balloons
const BALLOON_COLORS = [
  { bg: 'from-[#fecdd3] to-[#f43f5e] border-[#fda4af]', emoji: '🎈', name: 'Pastel Rose' },
  { bg: 'from-[#fef08a] to-[#eab308] border-[#fde047]', emoji: '⭐', name: 'Pastel Sunshine' },
  { bg: 'from-[#a7f3d0] to-[#10b981] border-[#6ee7b7]', emoji: '🐸', name: 'Pastel Mint' },
  { bg: 'from-[#bae6fd] to-[#0284c7] border-[#7dd3fc]', emoji: '🐬', name: 'Pastel Sky' },
  { bg: 'from-[#e9d5ff] to-[#a855f7] border-[#d8b4fe]', emoji: '🦄', name: 'Pastel Lavender' },
  { bg: 'from-[#fed7aa] to-[#f97316] border-[#fdba74]', emoji: '🦁', name: 'Pastel Peach' },
];

const LEVEL_DURATION = 25; // 25 seconds per level

export const BalloonPop: React.FC<BalloonPopProps> = ({
  coins = 0,
  onSpendCoins,
  onWin,
  onBackToKids
}) => {
  const [level, setLevel] = useState<number>(1);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState<number>(0);
  const [poppedInLevel, setPoppedInLevel] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(LEVEL_DURATION);
  const [streak, setStreak] = useState<number>(0);
  const [isLevelCleared, setIsLevelCleared] = useState<boolean>(false);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const nextId = useRef<number>(1);
  const animationFrameRef = useRef<number | null>(null);

  // Target balloons per level (Level 1: 10, Level 2: 14, Level 3: 18, Level 4: 22...)
  const targetForLevel = 10 + (level - 1) * 4;

  // Level Countdown Timer
  useEffect(() => {
    if (isLevelCleared || isTimeUp) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          sound.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [level, isLevelCleared, isTimeUp]);

  // Spawn balloons periodically
  useEffect(() => {
    if (isLevelCleared || isTimeUp) return;

    const spawnDelay = Math.max(450, 750 - (level - 1) * 60);
    const spawnInterval = setInterval(() => {
      setBalloons((prev) => {
        if (prev.length >= 7 + Math.min(level, 4)) return prev;
        const colorObj = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const baseSpeed = Math.random() * 0.35 + 0.35;
        const levelMultiplier = 1 + (level - 1) * 0.15;

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
  }, [level, isLevelCleared, isTimeUp]);

  // Floating animation loop
  useEffect(() => {
    if (isLevelCleared || isTimeUp) return;

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
  }, [isLevelCleared, isTimeUp]);

  const popBalloon = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    if (isLevelCleared || isTimeUp) return;
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
    setTimeLeft(LEVEL_DURATION);
    setIsLevelCleared(false);
    setIsTimeUp(false);
    setBalloons([]);
  };

  // Retry Current Level
  const retryLevel = () => {
    sound.playTap();
    setPoppedInLevel(0);
    setTimeLeft(LEVEL_DURATION);
    setIsLevelCleared(false);
    setIsTimeUp(false);
    setBalloons([]);
  };

  // Coin Booster 1: Super Pop Bomb (15 Coins) - Pops all balloons currently on screen
  const handleSuperBomb = () => {
    if (!onSpendCoins) return;
    if (balloons.length === 0 || isLevelCleared || isTimeUp) return;
    if (!onSpendCoins(15)) return;

    sound.playVictory();
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });

    const unpopped = balloons.filter((b) => !b.isPopped);
    const count = unpopped.length;
    const addedScore = count * 10;
    const newScore = score + addedScore;
    const newPoppedInLevel = poppedInLevel + count;

    setScore(newScore);
    setPoppedInLevel(newPoppedInLevel);
    setBalloons([]);

    if (newPoppedInLevel >= targetForLevel) {
      setIsLevelCleared(true);
      if (onWin) onWin(newScore);
    }
  };

  // Coin Booster 2: +15s Extra Time (10 Coins) - Adds 15 seconds to countdown timer
  const handleAddTimeBonus = () => {
    if (!onSpendCoins) return;
    if (isLevelCleared || isTimeUp) return;
    if (!onSpendCoins(10)) return;

    sound.playTap();
    setTimeLeft((t) => t + 15);
  };

  // Coin Booster 3: Revive on Time's Up (20 Coins) - Revives with +15s
  const handleReviveWithCoins = () => {
    if (!onSpendCoins) return;
    if (!onSpendCoins(20)) return;

    sound.playVictory();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });
    setTimeLeft(15);
    setIsTimeUp(false);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-xl mx-auto animate-fade-in pb-10 font-['Fredoka'] select-none">
      {/* Top Status Bar: Level, Target, Timer */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Level Badge - Pastel Coral */}
          <div className="px-3 py-1.5 rounded-2xl bg-[#fed7aa] dark:bg-[#7c2d12]/50 border-2 border-[#fdba74] text-[#9a3412] dark:text-[#ffedd5] text-xs font-black shadow-sm flex items-center gap-1">
            <span>Level {level}</span>
          </div>

          {/* Goal Progress - Pastel Mint */}
          <div className="px-3 py-1.5 rounded-2xl bg-[#d1fae5] dark:bg-[#064e3b]/50 border-2 border-[#a7f3d0] text-xs font-black text-[#065f46] dark:text-[#d1fae5] shadow-sm">
            Pop: <span className="font-pixel text-[#059669]">{poppedInLevel}</span> / {targetForLevel}
          </div>

          {/* Countdown Timer - Pastel Rose */}
          <div className={`px-3 py-1.5 rounded-2xl border-2 text-xs font-black flex items-center gap-1 shadow-sm ${
            timeLeft <= 5 
              ? 'bg-[#ffe4e6] border-[#f43f5e] text-[#be123c] animate-pulse' 
              : 'bg-[#e0f2fe] dark:bg-[#0c4a6e]/50 border-[#bae6fd] text-[#0369a1] dark:text-[#e0f2fe]'
          }`}>
            <Timer className="w-3.5 h-3.5" />
            <span className="font-pixel">{timeLeft}s</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onBackToKids && (
            <button
              onClick={onBackToKids}
              className="px-2.5 py-1.5 rounded-2xl bg-[#fef3c7] hover:bg-[#fde68a] dark:bg-[#78350f]/50 border-2 border-[#fde68a] text-[#92400e] dark:text-[#fef3c7] font-black text-xs transition active:scale-95 shadow-sm"
              title="Back to Kids Games"
            >
              ← Kids
            </button>
          )}

          <button
            onClick={retryLevel}
            className="p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-[#1f2438] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-rose-500 transition active:scale-95 shadow-sm"
            title="Restart Level"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Coin Power-Ups / Boosters Strip */}
      <div className="w-full max-w-[420px] flex items-center justify-between gap-1.5 mb-2.5 p-2 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1 pl-1 font-['Fredoka']">
          <span className="text-sm">🪙</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            {coins}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-['Fredoka']">
          {/* Booster 1: Super Pop Bomb */}
          <button
            onClick={handleSuperBomb}
            disabled={isLevelCleared || isTimeUp || balloons.length === 0}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] text-[#854d0e] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Detonate all floating balloons immediately (Costs 15 Coins)"
          >
            <span>💣 Super Pop</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#fef08a] dark:bg-[#713f12]/40 text-[10px]">15🪙</span>
          </button>

          {/* Booster 2: +15s Extra Time */}
          <button
            onClick={handleAddTimeBonus}
            disabled={isLevelCleared || isTimeUp}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#dcfce7] hover:bg-[#bbf7d0] border border-[#bbf7d0] text-[#065f46] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Add +15 seconds to countdown timer (Costs 10 Coins)"
          >
            <span>⏳ +15s Time</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#bbf7d0] dark:bg-[#064e3b]/40 text-[10px]">10🪙</span>
          </button>
        </div>
      </div>

      {/* Interactive Balloon Sky Playground - Dreamy Pastel Sky */}
      <div className="relative w-full aspect-[4/5] sm:aspect-square max-w-[420px] rounded-3xl bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-[#fdf4ff] dark:from-[#131b2e] dark:via-[#162035] dark:to-[#1a1730] border-4 border-[#bae6fd] dark:border-slate-700 shadow-md overflow-hidden select-none touch-none">
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-6 text-3xl opacity-50 animate-pulse">☁️</div>
        <div className="absolute top-14 right-8 text-4xl opacity-40 animate-pulse">☁️</div>
        <div className="absolute top-1/2 left-3 text-2xl opacity-35">☁️</div>

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
            <div className={`w-full h-full rounded-full bg-gradient-to-tr ${b.color} border-2 shadow-sm flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform`}>
              <span className="text-xl sm:text-2xl select-none drop-shadow-sm">{b.emoji}</span>
              {/* String */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-slate-400 dark:bg-white/40" />
            </div>
          </div>
        ))}

        {balloons.length === 0 && !isLevelCleared && !isTimeUp && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-4xl animate-bounce mb-2">🎈</span>
            <p className="text-xs font-black text-sky-800 dark:text-sky-200 font-['Fredoka']">Balloons rising! Pop them fast!</p>
          </div>
        )}

        {/* Level Cleared Overlay */}
        {isLevelCleared && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-3xl bg-[#fef08a] border-2 border-[#facc15] text-[#854d0e] flex items-center justify-center mb-2.5 shadow-md animate-bounce">
              <Award className="w-8 h-8 fill-current" />
            </div>
            <span className="text-xs font-black uppercase text-[#fef08a] font-pixel">LEVEL COMPLETE!</span>
            <h3 className="text-2xl font-black text-white mt-1">Level {level} Cleared! 🎈</h3>
            <p className="text-xs text-slate-100 my-2">
              Popped all {targetForLevel} balloons with {timeLeft}s remaining!
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-3">
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#6ee7b7] hover:bg-[#34d399] border-b-4 border-[#059669] text-[#064e3b] font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5"
              >
                <span>Next Level (Level {level + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onBackToKids && (
                <button
                  onClick={onBackToKids}
                  className="py-3 px-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-slate-200 text-slate-800 font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kids Games</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Time's Up Overlay */}
        {isTimeUp && !isLevelCleared && (
          <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-3xl bg-[#fecdd3] border-2 border-[#f43f5e] text-[#be123c] flex items-center justify-center mb-2.5 shadow-md animate-bounce">
              <AlertCircle className="w-8 h-8 stroke-[2.5]" />
            </div>
            <span className="text-xs font-black uppercase text-[#fecdd3] font-pixel">TIME EXPIRED!</span>
            <h3 className="text-2xl font-black text-white mt-1">So Close! ⏱️</h3>
            <p className="text-xs text-slate-100 my-2">
              You popped {poppedInLevel} of {targetForLevel} balloons. Try again!
            </p>

            {onSpendCoins && (
              <button
                onClick={handleReviveWithCoins}
                className="w-full py-2.5 px-4 mb-2 rounded-2xl bg-[#fef9c3] hover:bg-[#fef08a] border-b-4 border-[#ca8a04] text-[#854d0e] font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-2"
              >
                <span>💖 Revive & Add +15s (20 🪙)</span>
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-1">
              <button
                onClick={retryLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#fcd34d] hover:bg-[#fbbf24] border-b-4 border-[#d97706] text-[#78350f] font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Try Level {level} Again</span>
              </button>

              {onBackToKids && (
                <button
                  onClick={onBackToKids}
                  className="py-3 px-4 rounded-2xl bg-white/90 hover:bg-white border-2 border-slate-200 text-slate-800 font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1"
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
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Pop {targetForLevel} balloons before the {LEVEL_DURATION}s timer runs out!</span>
      </p>
    </div>
  );
};
