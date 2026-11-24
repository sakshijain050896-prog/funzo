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

export const MathPuzzle: React.FC<MathPuzzleProps> = ({
  stats,
  onWin,
  onRequestAd,
  onSpendCoins,
}) => {
  const [mode, setMode] = useState<MathMode>('speed');
  const [level, setLevel] = useState<number>(1);
  const [operatorSolvedCount, setOperatorSolvedCount] = useState<number>(0);
  const [levelToast, setLevelToast] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
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
      const op = operators[Math.floor(Math.random() * operators.length)];
      const scale = Math.max(1, currentLevel);
      let a = Math.floor(Math.random() * (6 + scale * 4)) + 2;
      let b = Math.floor(Math.random() * (5 + scale * 3)) + 2;
      let result = 0;

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

  // Restart game
  const resetGame = useCallback(() => {
    sound.playTap();
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsGameOver(false);
    setIsTimerRunning(true);
    setOperatorSolvedCount(0);
    setLevel(1);
    nextProblem(mode, 1);
  }, [mode, nextProblem]);

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
            sound.playVictory();
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
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
        <div className="w-full mb-3 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 border-2 border-emerald-400 text-white font-black text-xs text-center shadow-lg animate-bounce font-['Fredoka']">
          {levelToast}
        </div>
      )}

      {/* ---------------- TOP CONTROLS & MODE SELECTOR ---------------- */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1 bg-white/80 dark:bg-[#181d2f] p-1 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
          <button
            onClick={() => { sound.playTap(); setMode('speed'); resetGame(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition font-['Fredoka'] ${
              mode === 'speed'
                ? 'bg-[#fecdd3] text-[#9f1239] border border-[#fda4af] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Speed Run (60s)</span>
          </button>

          <button
            onClick={() => { sound.playTap(); setMode('operator'); resetGame(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition font-['Fredoka'] ${
              mode === 'operator'
                ? 'bg-[#a7f3d0] text-[#065f46] border border-[#6ee7b7] shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Operators</span>
          </button>
        </div>

        <button
          onClick={resetGame}
          className="p-2 rounded-2xl bg-white dark:bg-[#181d2f] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#e11d48] transition active:scale-95 shadow-sm"
          title="Restart Puzzle"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ---------------- STATS DASHBOARD BAR ---------------- */}
      <div className="w-full grid grid-cols-3 gap-2 mb-3">
        {/* Score */}
        <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-['Fredoka'] block">SCORE</span>
          <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-pixel leading-none">
            {score}
          </span>
        </div>

        {/* Timer or Level */}
        <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
          {mode === 'speed' ? (
            <>
              <span className="text-[10px] font-bold text-rose-500 font-['Fredoka'] block flex items-center justify-center gap-0.5">
                <Timer className="w-3 h-3" /> TIME
              </span>
              <span className={`text-base sm:text-lg font-black font-pixel leading-none ${timeLeft <= 10 ? 'text-[#e11d48] animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                {timeLeft}s
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-emerald-600 font-['Fredoka'] block">LEVEL {level}</span>
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] leading-none">
                {operatorSolvedCount % 5}/5 Solved
              </span>
            </>
          )}
        </div>

        {/* Streak */}
        <div className="p-2.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700/60 shadow-sm text-center">
          <span className="text-[10px] font-bold text-amber-500 font-['Fredoka'] block flex items-center justify-center gap-0.5">
            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> STREAK
          </span>
          <span className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-pixel leading-none">
            {streak}🔥
          </span>
        </div>
      </div>

      {/* ---------------- COIN BOOSTERS BAR ---------------- */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-3 p-2 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-xs font-['Fredoka']">
        <div className="flex items-center gap-1 pl-1">
          <span className="text-sm">🪙</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            {stats.coins ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-end">
          {/* Booster 1: 50:50 Eliminator (10 Coins) */}
          <button
            onClick={handleFiftyFifty}
            disabled={selectedOption !== null || isGameOver || hiddenOptions.length > 0}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#e0e7ff] hover:bg-[#c7d2fe] border border-[#c7d2fe] text-[#4338ca] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Remove 2 incorrect choices (Costs 10 Coins)"
          >
            <span>✂️ 50:50</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#c7d2fe] dark:bg-[#312e81]/40 text-[10px]">10🪙</span>
          </button>

          {/* Booster 2: +20s Time (15 Coins - in Speed mode) */}
          {mode === 'speed' && (
            <button
              onClick={handleAddTimeBoost}
              disabled={isGameOver}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#dcfce7] hover:bg-[#bbf7d0] border border-[#bbf7d0] text-[#065f46] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
              title="Add +20s to speed timer (Costs 15 Coins)"
            >
              <span>⏳ +20s</span>
              <span className="px-1.5 py-0.5 rounded-md bg-[#bbf7d0] dark:bg-[#064e3b]/40 text-[10px]">15🪙</span>
            </button>
          )}

          {/* Booster 3: Auto-Solve (25 Coins) */}
          <button
            onClick={handleAutoSolve}
            disabled={selectedOption !== null || isGameOver}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] text-[#854d0e] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Auto-solve current equation with full points (Costs 25 Coins)"
          >
            <span>⚡ Solve</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#fef08a] dark:bg-[#713f12]/40 text-[10px]">25🪙</span>
          </button>
        </div>
      </div>

      {/* ---------------- MAIN EQUATION QUESTION BOARD ---------------- */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#c7d2fe] via-[#a5b4fc] to-[#818cf8] dark:from-[#1e2746] dark:via-[#263156] dark:to-[#313f6d] border-4 border-[#a5b4fc] dark:border-indigo-700/60 shadow-md flex flex-col items-center justify-center text-center relative overflow-hidden mb-4 min-h-[170px] sm:min-h-[200px]">
        {/* Soft Question mark pattern */}
        <div className="absolute top-2 left-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute top-2 right-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute bottom-2 left-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute bottom-2 right-3 text-white/20 font-pixel text-xl select-none">?</div>

        <span className="text-xs font-black uppercase tracking-wider text-[#1e1b4b] dark:text-[#e0e7ff] font-['Fredoka'] mb-1">
          {mode === 'operator' ? 'Find the Missing Sign' : 'Solve the Equation'}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Fredoka'] tracking-wide drop-shadow-sm select-none my-2">
          {currentProblem.question}
        </h2>

        {/* Hint toggle */}
        {showHint ? (
          <p className="text-xs font-black text-[#1e1b4b] mt-2 font-['Fredoka'] bg-white/50 px-3 py-1 rounded-full animate-fade-in shadow-sm">
            💡 {currentProblem.hint}
          </p>
        ) : (
          <button
            onClick={handleHintClick}
            className="mt-2 text-xs font-bold text-white/90 hover:text-white flex items-center gap-1 font-['Fredoka'] transition"
          >
            <Lightbulb className="w-3.5 h-3.5 text-yellow-200" />
            <span>Need a hint? ({freeHints} free)</span>
          </button>
        )}
      </div>

      {/* ---------------- 4 BIG TACTILE ANSWER BUTTONS ---------------- */}
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mb-3">
        {currentProblem.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const isHiddenByBooster = hiddenOptions.includes(opt);
          let btnStyle = 'bg-white dark:bg-[#181d2f] text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-[#202538]';

          if (isHiddenByBooster) {
            btnStyle = 'opacity-20 pointer-events-none line-through bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-slate-800 text-slate-400';
          } else if (isSelected) {
            if (isCorrect) {
              btnStyle = 'bg-[#a7f3d0] text-[#064e3b] border-[#34d399] scale-[1.02] shadow-sm';
            } else {
              btnStyle = 'bg-[#fecdd3] text-[#9f1239] border-[#f43f5e] animate-shake shadow-sm';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null || isGameOver || isHiddenByBooster}
              onClick={() => handleSelectOption(opt)}
              className={`py-4 sm:py-5 px-3 rounded-2xl sm:rounded-3xl border-2 shadow-sm active:translate-y-0.5 transition text-xl sm:text-2xl lg:text-3xl font-black font-['Fredoka'] flex items-center justify-center gap-2 select-none ${btnStyle}`}
            >
              <span>{opt}</span>
              {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-[#064e3b] inline" />}
            </button>
          );
        })}
      </div>

      {/* ---------------- GAME OVER / ROUND COMPLETE MODAL ---------------- */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#161a29] border-4 border-black shadow-[6px_6px_0_#000] p-6 text-center flex flex-col items-center">
            <span className="text-5xl mb-2 animate-bounce">🏆</span>
            <span className="text-xs font-black uppercase text-[#e52521] font-pixel">TIME UP!</span>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white font-['Fredoka'] mt-1">
              Math Round Complete!
            </h3>

            <div className="w-full grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-[#1f2438] border-2 border-amber-300 dark:border-amber-700/50">
                <span className="text-xs text-slate-500 font-bold block font-['Fredoka']">FINAL SCORE</span>
                <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-pixel">{score}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-[#1f2438] border-2 border-emerald-300 dark:border-emerald-700/50">
                <span className="text-xs text-slate-500 font-bold block font-['Fredoka']">BEST SCORE</span>
                <span className="text-2xl font-black text-[#00a859] dark:text-[#43b047] font-pixel">{bestScore}</span>
              </div>
            </div>

            {onSpendCoins && (
              <button
                onClick={handleOvertimeRevive}
                className="w-full py-3 rounded-2xl bg-[#fef9c3] hover:bg-[#fef08a] border-b-4 border-[#ca8a04] text-[#854d0e] font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-2 font-['Fredoka'] mb-2.5"
              >
                <span>💖 Continue with +25s Overtime (20 🪙)</span>
              </button>
            )}

            <button
              onClick={() => {
                if (score > 0) onWin(score);
                resetGame();
              }}
              className="w-full py-3 rounded-2xl bg-[#00a859] border-b-4 border-[#006633] text-white font-black text-sm shadow-md hover:brightness-110 active:translate-y-0.5 transition flex items-center justify-center gap-2 font-['Fredoka']"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Play Again ▶</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
