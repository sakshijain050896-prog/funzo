import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play, RotateCcw, Zap, Timer, Flame, Lightbulb, CheckCircle2
} from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface MathPuzzleProps {
  stats: PlayerStats;
  onWin: (score: number) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
  onSpendCoins?: (amount: number) => boolean;
}

type MathMode = 'speed' | 'operator';

interface Problem {
  question: string;
  options: (number | string)[];
  answer: number | string;
  hint: string;
}

const MATH_PASS_CORRECT = 5; // correct answers needed in 60s to clear a Speed level

export const MathPuzzle: React.FC<MathPuzzleProps> = ({
  stats,
  onWin,
  onRequestAd,
  onSpendCoins,
}) => {
  const [mode, setMode] = useState<MathMode>('speed');
  // Initialize level from localStorage so returning users resume at Level 2, 3, etc.
  const [level, setLevel] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('funzo_math_level');
      const parsed = saved ? parseInt(saved, 10) : 1;
      return parsed >= 1 ? parsed : 1;
    } catch {
      return 1;
    }
  });

  // Persist level to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('funzo_math_level', level.toString());
    } catch {}
  }, [level]);

  const [operatorSolvedCount, setOperatorSolvedCount] = useState<number>(0);
  const [levelToast, setLevelToast] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  // Correct answers this round; Speed mode needs MATH_PASS_CORRECT to clear the level
  const [roundCorrect, setRoundCorrect] = useState<number>(0);
  const roundCorrectRef = useRef(0);
  useEffect(() => { roundCorrectRef.current = roundCorrect; }, [roundCorrect]);
  const [streak, setStreak] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('funzo_math_highscore') || '0', 10);
    } catch {
      return 0;
    }
  });

  // Timer state for Speed mode (60s countdown)
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // Current problem
  const [currentProblem, setCurrentProblem] = useState<Problem>({
    question: '12 + 15 = ?',
    options: [25, 27, 29, 31],
    answer: 27,
    hint: 'Add 12 and 15',
  });

  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [freeHints, setFreeHints] = useState<number>(3);
  const [hiddenOptions, setHiddenOptions] = useState<(number | string)[]>([]);

  // Generate arithmetic question based on mode & level
  const generateProblem = useCallback((currentMode: MathMode, currentLevel: number): Problem => {
    if (currentMode === 'operator') {
      // Missing Operator: e.g. 8 [ ? ] 4 = 32
      // Progressive difficulty based on currentLevel:
      const operators: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
      const scale = Math.max(1, currentLevel);
      const fits = (x: number, y: number, r: number) =>
        [x + y, x - y, x * y, x / y].filter((v) => v === r).length;
      // Regenerate until exactly ONE sign is correct (e.g. 4 ? 2 = 2 fits both − and ÷,
      // 2 ? 2 = 4 fits both + and ×, which marked a correct tap as wrong).
      let op: '+' | '-' | '×' | '÷' = '+';
      let a = 0;
      let b = 0;
      let result = 0;
      for (let attempt = 0; attempt < 30; attempt++) {
      op = operators[Math.floor(Math.random() * operators.length)];
      a = Math.floor(Math.random() * (6 + scale * 4)) + 2;
      b = Math.floor(Math.random() * (5 + scale * 3)) + 2;
      result = 0;

      if (op === '+') {
        result = a + b;
      } else if (op === '-') {
        if (a < b) [a, b] = [b, a];
        if (a === b) a += Math.floor(Math.random() * 5) + 1;
        result = a - b;
      } else if (op === '×') {
        a = Math.floor(Math.random() * (4 + scale * 2)) + 2;
        b = Math.floor(Math.random() * (4 + scale * 2)) + 2;
        result = a * b;
      } else {
        // Division: ensure clean integer
        b = Math.floor(Math.random() * (4 + scale * 2)) + 2;
        result = Math.floor(Math.random() * (4 + scale * 2)) + 2;
        a = b * result;
      }
      if (fits(a, b, result) === 1) break;
      }

      return {
        question: `${a}  [ ? ]  ${b}  =  ${result}`,
        options: ['+', '-', '×', '÷'],
        answer: op,
        hint: `Think which operation on ${a} and ${b} produces ${result}`,
      };
    }

    // Number equations (Speed or Levels)
    const maxNumber = Math.min(100, 15 + currentLevel * 8);
    const opRand = Math.random();

    if (opRand < 0.35) {
      // Addition
      const a = Math.floor(Math.random() * maxNumber) + 5;
      const b = Math.floor(Math.random() * maxNumber) + 5;
      const ans = a + b;
      const opts = new Set<number>([ans]);
      while (opts.size < 4) {
        const offset = (Math.floor(Math.random() * 9) + 1) * (Math.random() < 0.5 ? 1 : -1);
        const wrong = Math.max(1, ans + offset);
        opts.add(wrong);
      }
      return {
        question: `${a} + ${b} = ?`,
        options: Array.from(opts).sort(() => Math.random() - 0.5),
        answer: ans,
        hint: `Add units first: ${a % 10} + ${b % 10}`,
      };
    } else if (opRand < 0.65) {
      // Subtraction
      let a = Math.floor(Math.random() * maxNumber) + 15;
      let b = Math.floor(Math.random() * (a - 5)) + 3;
      if (a < b) [a, b] = [b, a];
      const ans = a - b;
      const opts = new Set<number>([ans]);
      while (opts.size < 4) {
        const offset = (Math.floor(Math.random() * 9) + 1) * (Math.random() < 0.5 ? 1 : -1);
        const wrong = Math.max(0, ans + offset);
        opts.add(wrong);
      }
      return {
        question: `${a} - ${b} = ?`,
        options: Array.from(opts).sort(() => Math.random() - 0.5),
        answer: ans,
        hint: `Subtract ${b} from ${a}`,
      };
    } else if (opRand < 0.85) {
      // Multiplication
      const a = Math.floor(Math.random() * Math.min(12, 4 + currentLevel)) + 2;
      const b = Math.floor(Math.random() * 11) + 2;
      const ans = a * b;
      const opts = new Set<number>([ans]);
      while (opts.size < 4) {
        const offset = (Math.floor(Math.random() * 6) + 1) * (Math.random() < 0.5 ? a : -a);
        const wrong = Math.max(2, ans + offset);
        opts.add(wrong);
      }
      return {
        question: `${a} × ${b} = ?`,
        options: Array.from(opts).sort(() => Math.random() - 0.5),
        answer: ans,
        hint: `Times table: ${a} times ${b}`,
      };
    } else {
      // Division
      const b = Math.floor(Math.random() * 9) + 2;
      const ans = Math.floor(Math.random() * Math.min(12, 3 + currentLevel)) + 2;
      const a = b * ans;
      const opts = new Set<number>([ans]);
      while (opts.size < 4) {
        const offset = (Math.floor(Math.random() * 4) + 1) * (Math.random() < 0.5 ? 1 : -1);
        const wrong = Math.max(1, ans + offset);
        opts.add(wrong);
      }
      return {
        question: `${a} ÷ ${b} = ?`,
        options: Array.from(opts).sort(() => Math.random() - 0.5),
        answer: ans,
        hint: `How many times does ${b} go into ${a}?`,
      };
    }
  }, []);

  // Next problem
  const nextProblem = useCallback((currentMode: MathMode, currentLvl: number) => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowHint(false);
    setHiddenOptions([]);
    setCurrentProblem(generateProblem(currentMode, currentLvl));
  }, [generateProblem]);

  // Replay current level
  const resetGame = useCallback(() => {
    sound.playTap();
    setScore(0);
    setRoundCorrect(0);
    setStreak(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsTimerRunning(true);
    setOperatorSolvedCount(0);
    nextProblem(mode, level);
  }, [mode, level, nextProblem]);

  // Restart to Level 1
  const handleRestartToLevel1 = useCallback(() => {
    sound.playTap();
    setLevel(1);
    try {
      localStorage.setItem('funzo_math_level', '1');
    } catch {}
    setScore(0);
    setRoundCorrect(0);
    setStreak(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsTimerRunning(true);
    setOperatorSolvedCount(0);
    nextProblem(mode, 1);
  }, [mode, nextProblem]);

  // Advance to Next Level (e.g. Level 2, 3, etc.)
  const handlePassToNextLevel = useCallback(() => {
    if (roundCorrect < MATH_PASS_CORRECT) return; // not cleared
    sound.playTap();
    onWin(score);
    const nextLvl = level + 1;
    setLevel(nextLvl);
    try {
      localStorage.setItem('funzo_math_level', nextLvl.toString());
    } catch {}
    setScore(0);
    setRoundCorrect(0);
    setStreak(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsTimerRunning(true);
    setOperatorSolvedCount(0);
    nextProblem(mode, nextLvl);
  }, [level, score, roundCorrect, onWin, mode, nextProblem]);

  // Handle speed timer
  const timerRef = useRef<any>(null);
  useEffect(() => {
    if (mode === 'speed' && isTimerRunning && !isGameOver) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsGameOver(true);
            setIsTimerRunning(false);
            if (roundCorrectRef.current >= MATH_PASS_CORRECT) {
              sound.playVictory();
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            } else {
              sound.playError();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [mode, isTimerRunning, isGameOver]);

  // Initialize on mount
  useEffect(() => {
    nextProblem(mode, level);
  }, [mode, nextProblem]);

  // Handle answer selection
  const handleSelectOption = (opt: number | string) => {
    if (selectedOption !== null || isGameOver) return;
    setSelectedOption(opt);

    const correct = opt === currentProblem.answer;
    setIsCorrect(correct);

    if (correct) {
      sound.playNumberPop(typeof opt === 'number' ? opt : 7);
      const newScore = score + 10 + streak * 2;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setRoundCorrect((c) => c + 1);

      if (newScore > bestScore) {
        setBestScore(newScore);
        try {
          localStorage.setItem('funzo_math_highscore', newScore.toString());
        } catch { }
      }

      // Check level upgrade every 5 correct answers in Operator mode
      let nextLvl = level;
      if (mode === 'operator') {
        const nextSolved = operatorSolvedCount + 1;
        setOperatorSolvedCount(nextSolved);

        if (nextSolved % 5 === 0) {
          nextLvl = level + 1;
          setLevel(nextLvl);
          sound.playVictory();
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.5 } });
          setLevelToast(`🚀 LEVEL UP! Welcome to Level ${nextLvl}! (+25 Coins)`);
          onWin(newScore); // records the win and credits the +25 coins shown in the toast
          setTimeout(() => setLevelToast(null), 3000);
        }
      }

      // Advance to next after short delay without interrupting modal popups
      setTimeout(() => {
        nextProblem(mode, nextLvl);
      }, 420);
    } else {
      sound.playError();
      setStreak(0);
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 600);
    }
  };

  const handleHintClick = () => {
    if (freeHints > 0) {
      setFreeHints((h) => h - 1);
      setShowHint(true);
      sound.playTap();
    } else {
      onRequestAd('1 Math Hint', () => {
        setShowHint(true);
      });
    }
  };

  // Coin Booster 1: 50:50 Eliminator (10 Coins) - Hides 2 incorrect options
  const handleFiftyFifty = () => {
    if (!onSpendCoins) return;
    if (selectedOption !== null || isGameOver || hiddenOptions.length > 0) return;
    if (!onSpendCoins(10)) return;

    sound.playTap();
    const wrongOptions = currentProblem.options.filter((opt) => opt !== currentProblem.answer);
    const shuffledWrong = [...wrongOptions].sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffledWrong.slice(0, 2));
  };

  // Coin Booster 2: +20s Time Boost (15 Coins) - Adds 20 seconds to Speed Run
  const handleAddTimeBoost = () => {
    if (!onSpendCoins) return;
    if (isGameOver) return;
    if (!onSpendCoins(15)) return;

    sound.playTap();
    setTimeLeft((t) => t + 20);
  };

  // Coin Booster 3: Auto-Solve (25 Coins) - Automatically answers with full points
  const handleAutoSolve = () => {
    if (!onSpendCoins) return;
    if (selectedOption !== null || isGameOver) return;
    if (!onSpendCoins(25)) return;

    sound.playVictory();
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 } });
    handleSelectOption(currentProblem.answer);
  };

  // Coin Booster 4: Overtime Revive (20 Coins) - Revives with +25s
  const handleOvertimeRevive = () => {
    if (!onSpendCoins) return;
    if (!onSpendCoins(20)) return;

    sound.playVictory();
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
    setTimeLeft(25);
    setIsGameOver(false);
    setIsTimerRunning(true);
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in max-w-xl mx-auto pb-10">
      {/* Level Up Banner */}
      {levelToast && (
        <div className="w-full mb-3 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-emerald-400 text-white font-black text-xs text-center shadow-lg animate-bounce font-sans">
          {levelToast}
        </div>
      )}

      {/* ---------------- TOP CONTROLS & MODE SELECTOR ---------------- */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-2.5 px-0.5">
        <div className="flex items-center gap-1 bg-white/80 dark:bg-[#181d2f] p-1 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xs">
          <button
            onClick={() => { sound.playTap(); setMode('speed'); resetGame(); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition font-sans ${mode === 'speed'
              ? 'bg-[#fecdd3] text-[#9f1239] border border-[#fda4af] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Speed (60s)</span>
          </button>

          <button
            onClick={() => { sound.playTap(); setMode('operator'); resetGame(); }}
            className={`px-2.5 py-1 rounded-xl text-xs font-black flex items-center gap-1 transition font-sans ${mode === 'operator'
              ? 'bg-[#a7f3d0] text-[#065f46] border border-[#6ee7b7] shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Operators</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          {level > 1 && (
            <button
              onClick={handleRestartToLevel1}
              className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-300 text-[11px] font-black transition flex items-center gap-1 active:scale-95 shadow-xs font-sans"
              title="Reset progress back to Level 1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Lvl 1</span>
            </button>
          )}

          <button
            onClick={resetGame}
            className="p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-[#181d2f] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#e11d48] transition active:scale-95 shadow-xs"
            title="Replay Current Level"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ---------------- STATS DASHBOARD BAR ---------------- */}
      <div className="w-full grid grid-cols-3 gap-1.5 sm:gap-2 mb-2.5">
        {/* Score */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-xs text-center">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-sans block">SCORE</span>
          <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white font-pixel leading-none">
            {score}
          </span>
        </div>

        {/* Level Display (Always visible) */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-xs text-center">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-sans block">LEVEL {level}</span>
          <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-sans leading-none">
            {mode === 'operator' ? `${operatorSolvedCount % 5}/5 Solved` : 'Stage Active'}
          </span>
        </div>

        {/* Timer or Streak */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-xs text-center">
          {mode === 'speed' ? (
            <>
              <span className="text-[10px] font-bold text-rose-500 font-sans block flex items-center justify-center gap-0.5">
                <Timer className="w-3 h-3" /> TIME
              </span>
              <span className={`text-sm sm:text-base font-black font-pixel leading-none ${timeLeft <= 10 ? 'text-[#e11d48] animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                {timeLeft}s
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-amber-500 font-sans block flex items-center justify-center gap-0.5">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> STREAK
              </span>
              <span className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400 font-pixel leading-none">
                {streak}🔥
              </span>
            </>
          )}
        </div>
      </div>

      {/* ---------------- COIN BOOSTERS BAR ---------------- */}
      <div className="w-full flex items-center justify-between gap-1 mb-2.5 p-1.5 sm:p-2 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-xs font-sans">
        <div className="flex items-center gap-1 pl-1">
          <span className="text-xs">🪙</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            {stats.coins ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-end">
          {/* Booster 1: 50:50 Eliminator (10 Coins) */}
          <button
            onClick={handleFiftyFifty}
            disabled={selectedOption !== null || isGameOver || hiddenOptions.length > 0}
            className="flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 rounded-lg bg-[#e0e7ff] hover:bg-[#c7d2fe] border border-[#c7d2fe] text-[#4338ca] font-black text-[11px] sm:text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Remove 2 incorrect choices (Costs 10 Coins)"
          >
            <span>✂️ 50:50</span>
            <span className="px-1 py-0.2 rounded bg-[#c7d2fe] dark:bg-[#312e81]/40 text-[9px]">10🪙</span>
          </button>

          {/* Booster 2: +20s Time (15 Coins - in Speed mode) */}
          {mode === 'speed' && (
            <button
              onClick={handleAddTimeBoost}
              disabled={isGameOver}
              className="flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 rounded-lg bg-[#dcfce7] hover:bg-[#bbf7d0] border border-[#bbf7d0] text-[#065f46] font-black text-[11px] sm:text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
              title="Add +20s to speed timer (Costs 15 Coins)"
            >
              <span>⏳ +20s</span>
              <span className="px-1 py-0.2 rounded bg-[#bbf7d0] dark:bg-[#064e3b]/40 text-[9px]">15🪙</span>
            </button>
          )}

          {/* Booster 3: Auto-Solve (25 Coins) */}
          <button
            onClick={handleAutoSolve}
            disabled={selectedOption !== null || isGameOver}
            className="flex items-center gap-0.5 sm:gap-1 px-2 py-0.5 rounded-lg bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] text-[#854d0e] font-black text-[11px] sm:text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Auto-solve current equation with full points (Costs 25 Coins)"
          >
            <span>⚡ Solve</span>
            <span className="px-1 py-0.2 rounded bg-[#fef08a] dark:bg-[#713f12]/40 text-[9px]">25🪙</span>
          </button>
        </div>
      </div>

      {/* ---------------- MAIN EQUATION QUESTION BOARD - Compact for Mobile ---------------- */}
      <div className="w-full p-4 sm:p-7 rounded-3xl bg-gradient-to-br from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8] dark:from-[#1e2746] dark:via-[#263156] dark:to-[#313f6d] border-3 sm:border-4 border-[#a5b4fc] dark:border-indigo-700/60 shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden mb-2.5 min-h-[110px] sm:min-h-[160px]">
        {/* Soft Question mark pattern */}
        <div className="absolute top-1.5 left-2.5 text-white/20 font-pixel text-base select-none">?</div>
        <div className="absolute top-1.5 right-2.5 text-white/20 font-pixel text-base select-none">?</div>

        <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-[#1e1b4b] dark:text-[#e0e7ff] font-sans mb-0.5">
          Level {level} • {mode === 'operator' ? 'Find the Missing Sign' : 'Solve the Equation'}
        </span>

        <h2 className="text-2xl sm:text-4xl font-black text-white font-sans tracking-wide drop-shadow-sm select-none my-1 sm:my-2">
          {currentProblem.question}
        </h2>

        {/* Hint toggle */}
        {showHint ? (
          <p className="text-[11px] sm:text-xs font-black text-[#1e1b4b] mt-1 font-sans bg-white/60 px-3 py-0.5 rounded-full animate-fade-in shadow-xs">
            💡 {currentProblem.hint}
          </p>
        ) : (
          <button
            onClick={handleHintClick}
            className="mt-1 text-[11px] sm:text-xs font-bold text-white/90 hover:text-white flex items-center gap-1 font-sans transition"
          >
            <Lightbulb className="w-3 h-3 text-yellow-200" />
            <span>Need a hint? ({freeHints} free)</span>
          </button>
        )}
      </div>

      {/* ---------------- 4 TACTILE ANSWER BUTTONS (2x2 Grid) ---------------- */}
      <div className="w-full grid grid-cols-2 gap-2 sm:gap-3.5 mb-2.5">
        {currentProblem.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isHiddenByBooster = hiddenOptions.includes(opt);
          let btnStyle = 'bg-white dark:bg-[#181d2f] text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#202538]';

          if (isHiddenByBooster) {
            btnStyle = 'opacity-20 pointer-events-none line-through bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-800 text-slate-400';
          } else if (isSelected) {
            if (isCorrect) {
              btnStyle = 'bg-[#a7f3d0] text-[#064e3b] border-[#34d399] scale-[1.02] shadow-xs';
            } else {
              btnStyle = 'bg-[#fecdd3] text-[#9f1239] border-[#f43f5e] animate-shake shadow-xs';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null || isGameOver || isHiddenByBooster}
              onClick={() => handleSelectOption(opt)}
              className={`py-3 sm:py-4 px-2.5 rounded-2xl border-2 shadow-xs active:translate-y-0.5 transition text-lg sm:text-2xl font-black font-sans flex items-center justify-center gap-2 select-none ${btnStyle}`}
            >
              <span>{opt}</span>
              {isSelected && isCorrect && <CheckCircle2 className="w-4 h-4 text-[#064e3b] inline" />}
            </button>
          );
        })}
      </div>

      {/* ---------------- GAME OVER / ROUND COMPLETE MODAL ---------------- */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#161a29] border-4 border-black shadow-[6px_6px_0_#000] p-5 sm:p-6 text-center flex flex-col items-center">
            <span className={`text-4xl sm:text-5xl mb-1 ${roundCorrect >= MATH_PASS_CORRECT ? 'animate-bounce' : ''}`}>{roundCorrect >= MATH_PASS_CORRECT ? '🏆' : '⏰'}</span>
            <span className="text-xs font-black uppercase text-[#e52521] font-pixel">TIME UP!</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-sans mt-0.5">
              {roundCorrect >= MATH_PASS_CORRECT ? 'Round Complete!' : 'So close!'}
            </h3>
            {roundCorrect >= MATH_PASS_CORRECT ? (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-sans">
                Level {level} Cleared! 🎉 ({roundCorrect} correct)
              </p>
            ) : (
              <p className="text-xs font-bold text-rose-600 dark:text-rose-400 font-sans">
                You got {roundCorrect} correct. Get {MATH_PASS_CORRECT} right in 60s to clear Level {level}.
              </p>
            )}

            <div className="w-full grid grid-cols-2 gap-2.5 my-3">
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-[#1f2438] border-2 border-amber-300 dark:border-amber-700/50">
                <span className="text-[11px] text-slate-500 font-bold block font-sans">FINAL SCORE</span>
                <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-pixel">{score}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-[#1f2438] border-2 border-emerald-300 dark:border-emerald-700/50">
                <span className="text-[11px] text-slate-500 font-bold block font-sans">BEST SCORE</span>
                <span className="text-xl font-black text-[#00a859] dark:text-[#43b047] font-pixel">{bestScore}</span>
              </div>
            </div>

            {onSpendCoins && (
              <button
                onClick={handleOvertimeRevive}
                className="w-full py-2.5 rounded-xl bg-[#fef9c3] hover:bg-[#fef08a] border-b-3 border-[#ca8a04] text-[#854d0e] font-black text-xs shadow-xs active:translate-y-0.5 transition flex items-center justify-center gap-1.5 font-sans mb-2"
              >
                <span>💖 Continue with +25s Overtime (20 🪙)</span>
              </button>
            )}

            {/* Primary Action: Pass to Next Level (only when cleared) / Retry */}
            {roundCorrect >= MATH_PASS_CORRECT ? (
            <button
              onClick={handlePassToNextLevel}
              className="w-full py-3 rounded-2xl bg-[#00a859] border-b-4 border-[#006633] text-white font-black text-sm shadow-md hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-2 font-sans mb-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Pass to Level {level + 1} ➔</span>
            </button>
            ) : (
            <button
              onClick={resetGame}
              className="w-full py-3 rounded-2xl bg-[#00a859] border-b-4 border-[#006633] text-white font-black text-sm shadow-md hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-2 font-sans mb-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Level {level}</span>
            </button>
            )}

            {/* Secondary Action: Restart from Level 1 */}
            <button
              onClick={handleRestartToLevel1}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-1.5 font-sans"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restart from Level 1 🔄</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
