import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, RotateCcw, Award, Zap, Timer, Flame, Lightbulb, CheckCircle2
} from 'lucide-react';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface MathPuzzleProps {
  stats: PlayerStats;
  onWin: (score: number) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
}

type MathMode = 'speed' | 'operator' | 'levels';

interface Problem {
  question: string;
  options: (number | string)[];
  answer: number | string;
  hint: string;
}

export const MathPuzzle: React.FC<MathPuzzleProps> = ({
  onWin,
  onRequestAd,
}) => {
  const [mode, setMode] = useState<MathMode>('speed');
  const [level, setLevel] = useState<number>(1);
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

  // Generate arithmetic question based on mode & level
  const generateProblem = useCallback((currentMode: MathMode, currentLevel: number): Problem => {
    if (currentMode === 'operator') {
      // Missing Operator: e.g. 8 [ ? ] 4 = 32
      const operators: ('+' | '-' | '×' | '÷')[] = ['+', '-', '×', '÷'];
      const op = operators[Math.floor(Math.random() * operators.length)];
      let a = Math.floor(Math.random() * 12) + 2;
      let b = Math.floor(Math.random() * 9) + 2;
      let result = 0;

      if (op === '+') result = a + b;
      else if (op === '-') {
        if (a < b) [a, b] = [b, a];
        result = a - b;
      } else if (op === '×') {
        a = Math.floor(Math.random() * 9) + 2;
        b = Math.floor(Math.random() * 8) + 2;
        result = a * b;
      } else {
        // Division: ensure clean integer
        b = Math.floor(Math.random() * 8) + 2;
        result = Math.floor(Math.random() * 9) + 2;
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
        } catch {}
      }

      // Check level upgrade every 5 correct answers in Level mode
      if (mode === 'levels' && newStreak % 4 === 0) {
        setLevel((l) => l + 1);
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.5 } });
      }

      // Trigger global win rewards periodically
      if (newStreak >= 5) {
        onWin(newScore);
      }

      // Advance to next after short delay
      setTimeout(() => {
        nextProblem(mode, level);
      }, 450);
    } else {
      sound.playError();
      setStreak(0);
      if (mode === 'levels') {
        // Penalty in levels
      }
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

  return (
    <div className="w-full flex flex-col items-center animate-fade-in max-w-xl mx-auto pb-10">
      {/* ---------------- TOP CONTROLS & MODE SELECTOR ---------------- */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 px-1">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#161a29] p-1 rounded-2xl border-2 border-slate-300 dark:border-[#2f3752]">
          <button
            onClick={() => { sound.playTap(); setMode('speed'); resetGame(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition font-['Fredoka'] ${
              mode === 'speed'
                ? 'bg-[#e52521] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Speed Run</span>
          </button>

          <button
            onClick={() => { sound.playTap(); setMode('operator'); resetGame(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition font-['Fredoka'] ${
              mode === 'operator'
                ? 'bg-[#00a859] text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Operators</span>
          </button>

          <button
            onClick={() => { sound.playTap(); setMode('levels'); resetGame(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition font-['Fredoka'] ${
              mode === 'levels'
                ? 'bg-[#fcd116] text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Levels</span>
          </button>
        </div>

        <button
          onClick={resetGame}
          className="p-2 rounded-2xl bg-slate-100 dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-slate-700 dark:text-slate-300 hover:text-[#e52521] transition active:scale-95"
          title="Restart Puzzle"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* ---------------- STATS DASHBOARD BAR ---------------- */}
      <div className="w-full grid grid-cols-3 gap-2 mb-3">
        {/* Score */}
        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[3px_3px_0_#000] text-center">
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-['Fredoka'] block">SCORE</span>
          <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-pixel leading-none">
            {score}
          </span>
        </div>

        {/* Timer or Level */}
        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[3px_3px_0_#000] text-center">
          {mode === 'speed' ? (
            <>
              <span className="text-[10px] font-bold text-[#e52521] font-['Fredoka'] block flex items-center justify-center gap-0.5">
                <Timer className="w-3 h-3" /> TIME
              </span>
              <span className={`text-base sm:text-lg font-black font-pixel leading-none ${timeLeft <= 10 ? 'text-[#e52521] animate-pulse' : 'text-slate-900 dark:text-white'}`}>
                {timeLeft}s
              </span>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-emerald-600 font-['Fredoka'] block">LEVEL</span>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-pixel leading-none">
                {level}
              </span>
            </>
          )}
        </div>

        {/* Streak */}
        <div className="p-2.5 rounded-2xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[3px_3px_0_#000] text-center">
          <span className="text-[10px] font-bold text-amber-500 font-['Fredoka'] block flex items-center justify-center gap-0.5">
            <Flame className="w-3 h-3 fill-amber-500 text-amber-500" /> STREAK
          </span>
          <span className="text-base sm:text-lg font-black text-amber-600 dark:text-amber-400 font-pixel leading-none">
            {streak}🔥
          </span>
        </div>
      </div>

      {/* ---------------- MAIN EQUATION QUESTION BOARD ---------------- */}
      <div className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#5c94fc] to-[#3a75e0] border-4 border-black shadow-[5px_5px_0_#000] flex flex-col items-center justify-center text-center relative overflow-hidden mb-4 min-h-[170px] sm:min-h-[200px]">
        {/* Mario Question block pattern in background */}
        <div className="absolute top-2 left-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute top-2 right-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute bottom-2 left-3 text-white/20 font-pixel text-xl select-none">?</div>
        <div className="absolute bottom-2 right-3 text-white/20 font-pixel text-xl select-none">?</div>

        <span className="text-xs font-black uppercase tracking-wider text-yellow-300 font-['Fredoka'] mb-1">
          {mode === 'operator' ? 'Find the Missing Sign' : 'Solve the Equation'}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-['Fredoka'] tracking-wide drop-shadow-[2px_2px_0_#000] select-none my-2">
          {currentProblem.question}
        </h2>

        {/* Hint toggle */}
        {showHint ? (
          <p className="text-xs font-black text-yellow-200 mt-2 font-['Fredoka'] bg-black/30 px-3 py-1 rounded-full animate-fade-in">
            💡 {currentProblem.hint}
          </p>
        ) : (
          <button
            onClick={handleHintClick}
            className="mt-2 text-xs font-bold text-white/80 hover:text-white flex items-center gap-1 font-['Fredoka'] transition"
          >
            <Lightbulb className="w-3 h-3 text-yellow-300" />
            <span>Need a hint? ({freeHints} free)</span>
          </button>
        )}
      </div>

      {/* ---------------- 4 BIG TACTILE ANSWER BUTTONS ---------------- */}
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mb-3">
        {currentProblem.options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          let btnStyle = 'bg-white dark:bg-[#161a29] text-slate-900 dark:text-white border-black dark:border-[#2f3752] hover:bg-slate-50 dark:hover:bg-[#1f2438]';

          if (isSelected) {
            if (isCorrect) {
              btnStyle = 'bg-[#00a859] text-white border-[#006633] scale-[1.02] shadow-[3px_3px_0_#006633]';
            } else {
              btnStyle = 'bg-[#e52521] text-white border-[#9e100e] animate-shake shadow-[3px_3px_0_#9e100e]';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedOption !== null || isGameOver}
              onClick={() => handleSelectOption(opt)}
              className={`py-4 sm:py-5 px-3 rounded-2xl sm:rounded-3xl border-3 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_#1e293b] active:translate-y-1 transition text-xl sm:text-2xl lg:text-3xl font-black font-['Fredoka'] flex items-center justify-center gap-2 select-none ${btnStyle}`}
            >
              <span>{opt}</span>
              {isSelected && isCorrect && <CheckCircle2 className="w-5 h-5 text-white inline" />}
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

            <button
              onClick={resetGame}
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
