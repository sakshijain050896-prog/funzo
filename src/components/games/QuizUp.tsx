import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Flame, RotateCcw, ArrowRight,
  CheckCircle2, XCircle, Zap, Scissors, Clock,
  Trophy, Brain
} from 'lucide-react';
import {
  QuizTopic,
  QuizQuestion,
  generateQuizRound,
} from '../../data/quizUpData';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface QuizUpProps {
  coins?: number;
  onSpendCoins?: (amount: number) => boolean;
  onWin?: (score: number, accuracy: number) => void;
  initialTopic?: QuizTopic;
  stats?: PlayerStats;
}

const TOPICS_CONFIG: { id: QuizTopic; label: string; emoji: string; bg: string; border: string; text: string }[] = [
  { id: 'all', label: 'All GK (10k+)', emoji: '⭐', bg: 'bg-[#fef9c3]', border: 'border-[#fef08a]', text: 'text-[#854d0e]' },
  { id: 'science', label: 'Science', emoji: '🔬', bg: 'bg-[#d1fae5]', border: 'border-[#a7f3d0]', text: 'text-[#065f46]' },
  { id: 'physics', label: 'Physics', emoji: '⚡', bg: 'bg-[#e0f2fe]', border: 'border-[#bae6fd]', text: 'text-[#0369a1]' },
  { id: 'chemistry', label: 'Chemistry', emoji: '🧪', bg: 'bg-[#ede9fe]', border: 'border-[#ddd6fe]', text: 'text-[#5b21b6]' },
  { id: 'history', label: 'History', emoji: '🏛️', bg: 'bg-[#ffedd5]', border: 'border-[#fed7aa]', text: 'text-[#9a3412]' },
  { id: 'math', label: 'Math', emoji: '🧮', bg: 'bg-[#ffe4e6]', border: 'border-[#fecdd3]', text: 'text-[#9f1239]' },
];

const QUESTION_TIME_LIMIT = 15; // 15 seconds per question

export const QuizUp: React.FC<QuizUpProps> = ({
  coins: _coins = 100,
  onSpendCoins,
  onWin,
  initialTopic = 'all',
  stats: _stats,
}) => {
  // Topic & Round State
  const [activeTopic, setActiveTopic] = useState<QuizTopic>(initialTopic);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    generateQuizRound(1, initialTopic, 10)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Gameplay State
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [highestStreak, setHighestStreak] = useState<number>(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0);
  const [isRoundFinished, setIsRoundFinished] = useState<boolean>(false);

  // Round History for Review
  const [roundHistory, setRoundHistory] = useState<{
    question: QuizQuestion;
    userAnswer: string | null;
    isCorrect: boolean;
    timeSpent: number;
  }[]>([]);

  // Timer State
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const timerRef = useRef<any>(null);

  // Booster States (Per Question)
  const [eliminatedOptions, setEliminatedOptions] = useState<string[]>([]);
  const [boosterToast, setBoosterToast] = useState<string | null>(null);

  // Auto-advance timer ref
  const autoAdvanceRef = useRef<any>(null);

  const currentQ: QuizQuestion | undefined = questions[currentIndex];

  // Helper to show brief toast
  const showToast = (msg: string) => {
    setBoosterToast(msg);
    setTimeout(() => {
      setBoosterToast(null);
    }, 2500);
  };

  // Start new round
  const startNewRound = useCallback((round: number, topic: QuizTopic) => {
    const newQuestions = generateQuizRound(round, topic, 10);
    setQuestions(newQuestions);
    setRoundNumber(round);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setIsTimedOut(false);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setCorrectAnswersCount(0);
    setIsRoundFinished(false);
    setRoundHistory([]);
    setEliminatedOptions([]);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setIsTimerActive(true);
  }, []);

  // Switch Topic
  const handleSelectTopic = (topic: QuizTopic) => {
    if (topic === activeTopic && !isRoundFinished) return;
    sound.playTap();
    setActiveTopic(topic);
    startNewRound(1, topic);
  };

  // Reset timer on next question
  const resetQuestionTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setIsTimerActive(true);
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    if (!isTimerActive || isAnswered || isRoundFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        if (prev <= 4) {
          sound.playTap();
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, isAnswered, isRoundFinished, currentIndex]);

  // Handle Question Timeout
  const handleTimeOut = () => {
    if (isAnswered || !currentQ) return;
    sound.playError();
    setIsTimedOut(true);
    setIsAnswered(true);
    setIsTimerActive(false);
    setStreak(0);

    setRoundHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: null,
        isCorrect: false,
        timeSpent: QUESTION_TIME_LIMIT,
      },
    ]);
  };

  // Handle Option Click
  const handleSelectAnswer = (option: string) => {
    if (isAnswered || !currentQ || eliminatedOptions.includes(option)) return;

    if (timerRef.current) clearInterval(timerRef.current);
    setSelectedOption(option);
    setIsAnswered(true);
    setIsTimerActive(false);

    const isCorrect = option === currentQ.answer;
    const timeSpent = QUESTION_TIME_LIMIT - timeLeft;

    if (isCorrect) {
      sound.playNumberPop(5);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
      setCorrectAnswersCount((prev) => prev + 1);

      // Score Calculation:
      // Base: 100 pts
      // Time Bonus: up to 150 pts (10 pts per sec left)
      // Streak Multiplier: 1.0x (1-2), 1.5x (3-4), 2.0x (5+)
      const streakMultiplier = newStreak >= 5 ? 2.0 : newStreak >= 3 ? 1.5 : 1.0;
      const questionScore = Math.round((100 + timeLeft * 10) * streakMultiplier);
      setScore((prev) => prev + questionScore);
    } else {
      sound.playError();
      setStreak(0);
    }

    // Record History
    setRoundHistory((prev) => [
      ...prev,
      {
        question: currentQ,
        userAnswer: option,
        isCorrect,
        timeSpent,
      },
    ]);
  };

  // Move to Next Question
  const handleNextQuestion = () => {
    if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    sound.playTap();

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setIsTimedOut(false);
      setEliminatedOptions([]);
      resetQuestionTimer();
    } else {
      // Round Complete
      setIsRoundFinished(true);
      const totalCorrect = correctAnswersCount + (selectedOption === currentQ?.answer ? 0 : 0);
      const accuracy = Math.round((totalCorrect / questions.length) * 100);

      if (accuracy >= 70) {
        sound.playVictory();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#34d399', '#38bdf8', '#f472b6', '#fbbf24'],
        });
      } else {
        sound.playVictory();
      }

      if (onWin) {
        onWin(score, accuracy);
      }
    }
  };

  // Booster: 50:50 Eliminator (10 Coins)
  const handleBooster5050 = () => {
    if (isAnswered || !currentQ) return;
    if (eliminatedOptions.length > 0) {
      showToast('50:50 already applied to this question!');
      return;
    }

    if (onSpendCoins && !onSpendCoins(10)) {
      showToast('Need 10 coins for 50:50! Earn more by playing.');
      return;
    }

    sound.playNumberPop(8);
    // Eliminate 2 wrong choices
    const wrongOptions = currentQ.options.filter((opt) => opt !== currentQ.answer);
    const toEliminate = wrongOptions.slice(0, 2);
    setEliminatedOptions(toEliminate);
    showToast('✂️ 50:50 applied! 2 incorrect answers eliminated.');
  };

  // Booster: +10s Time Freeze (10 Coins)
  const handleBoosterFreezeTime = () => {
    if (isAnswered || !currentQ) return;

    if (onSpendCoins && !onSpendCoins(10)) {
      showToast('Need 10 coins for +10s! Earn more by playing.');
      return;
    }

    sound.playNumberPop(8);
    setTimeLeft((prev) => prev + 10);
    showToast('⏳ +10 Seconds added to question clock!');
  };

  // Booster: Auto-Solve (20 Coins)
  const handleBoosterAutoSolve = () => {
    if (isAnswered || !currentQ) return;

    if (onSpendCoins && !onSpendCoins(20)) {
      showToast('Need 20 coins for Auto-Solve! Earn more by playing.');
      return;
    }

    sound.playNumberPop(8);
    showToast('⚡ Auto-Solve activated! Correct answer selected.');
    handleSelectAnswer(currentQ.answer);
  };

  // Timer Progress Percentage
  const timerPercent = Math.max(0, (timeLeft / QUESTION_TIME_LIMIT) * 100);
  const timerColor =
    timeLeft > 6
      ? 'bg-emerald-400'
      : timeLeft > 3
      ? 'bg-amber-400'
      : 'bg-rose-500 animate-pulse';

  // Global question tracker
  const globalQNum = (roundNumber - 1) * 10 + (currentIndex + 1);

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-3 sm:py-6 flex flex-col gap-4 font-sans text-slate-800 dark:text-slate-100">
      {/* Toast Notification */}
      {boosterToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full shadow-xl backdrop-blur-md border border-white/20 animate-fade-in flex items-center gap-2">
          <span>{boosterToast}</span>
        </div>
      )}

      {/* 1. TOPIC SELECTOR TABS */}
      <div className="w-full overflow-x-auto no-scrollbar py-1">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          {TOPICS_CONFIG.map((t) => {
            const isSelected = activeTopic === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all border ${
                  isSelected
                    ? `${t.bg} ${t.text} ${t.border} shadow-sm ring-2 ring-amber-400/50 scale-105`
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN GAME AREA */}
      {!isRoundFinished ? (
        <div className="flex flex-col gap-4">
          {/* Header Stats Bar */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
            {/* Left: Question Counter & Topic */}
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl">{currentQ?.topicEmoji || '💡'}</span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    {currentQ?.topicLabel || 'General Knowledge'}
                  </span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-md font-mono">
                    #{globalQNum} of 10,000+
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-white">
                  Question {currentIndex + 1} <span className="text-slate-400 font-normal">/ 10</span>
                </h3>
              </div>
            </div>

            {/* Right: Score, Streak, & Timer */}
            <div className="flex items-center gap-2 sm:gap-4 ml-auto">
              {/* Streak */}
              {streak > 0 && (
                <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800/60 font-bold text-xs animate-bounce">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{streak}x Streak</span>
                </div>
              )}

              {/* Score */}
              <div className="flex items-center gap-1.5 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 px-2.5 py-1 rounded-xl border border-sky-200 dark:border-sky-800/60 font-extrabold text-xs sm:text-sm">
                <Trophy className="w-3.5 h-3.5 text-sky-500" />
                <span>{score} pts</span>
              </div>

              {/* Timer Chip */}
              <div
                className={`flex items-center gap-1 px-3 py-1 rounded-xl font-mono font-bold text-xs sm:text-sm border transition-all ${
                  timeLeft <= 4
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 border-rose-300 dark:border-rose-800 ring-2 ring-rose-400/40'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                }`}
              >
                <Clock className={`w-3.5 h-3.5 ${timeLeft <= 4 ? 'animate-spin' : ''}`} />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Countdown Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden shadow-inner">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full ${timerColor}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col gap-5">
            {/* Question Text */}
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold text-slate-400 tracking-wide uppercase">
                Round {roundNumber} • Question {currentIndex + 1}
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-slate-800 dark:text-white leading-snug">
                {currentQ?.question}
              </h2>
            </div>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
              {currentQ?.options.map((option, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedOption === option;
                const isCorrect = isAnswered && option === currentQ.answer;
                const isWrong = isAnswered && isSelected && !isCorrect;
                const isEliminated = eliminatedOptions.includes(option);

                // Option Styling Logic
                let optionStyle =
                  'bg-white dark:bg-slate-700/60 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-slate-700 shadow-sm';

                if (isCorrect) {
                  optionStyle =
                    'bg-[#ecfdf5] dark:bg-emerald-950/60 border-[#34d399] dark:border-emerald-500 text-[#065f46] dark:text-emerald-200 shadow-md ring-2 ring-emerald-400/40';
                } else if (isWrong) {
                  optionStyle =
                    'bg-[#fff1f2] dark:bg-rose-950/60 border-[#fb7185] dark:border-rose-500 text-[#9f1239] dark:text-rose-200 shadow-md ring-2 ring-rose-400/40';
                } else if (isEliminated) {
                  optionStyle =
                    'bg-slate-100 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/40 text-slate-400 line-through opacity-40 cursor-not-allowed';
                }

                return (
                  <button
                    key={option}
                    disabled={isAnswered || isEliminated}
                    onClick={() => handleSelectAnswer(option)}
                    className={`flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl border-2 text-left font-medium text-sm sm:text-base transition-all transform active:scale-[0.99] ${optionStyle}`}
                  >
                    {/* Option Letter Tag */}
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs sm:text-sm shrink-0 border ${
                        isCorrect
                          ? 'bg-emerald-500 text-white border-emerald-400'
                          : isWrong
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-500'
                      }`}
                    >
                      {isCorrect ? '✓' : isWrong ? '✗' : letter}
                    </span>

                    <span className="flex-1 leading-snug">{option}</span>

                    {/* Right side icon */}
                    {isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 animate-scale-in" />
                    )}
                    {isWrong && (
                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 animate-scale-in" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Button Card (When Answered or Timed Out) */}
            {isAnswered && (
              <div className="mt-2 p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col gap-3 animate-fade-in">
                <div className="flex items-start gap-2.5">
                  <Brain className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                      {isTimedOut ? '⏳ Time Up!' : selectedOption === currentQ?.answer ? '🎉 Spot On!' : '💡 Knowledge Byte:'}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      {currentQ?.explanation}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 bg-[#bae6fd] hover:bg-[#7dd3fc] text-[#0369a1] font-extrabold px-5 py-2.5 rounded-xl border-b-3 border-[#38bdf8] shadow-sm hover:shadow-md active:translate-y-0.5 transition-all text-xs sm:text-sm"
                  >
                    <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'Complete Round'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 3. COIN BOOSTERS BAR */}
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl p-3 border border-slate-200/80 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-700 dark:text-slate-200">Power-Ups:</span>
              <span>Use coins to give yourself an edge!</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* 50:50 Booster */}
              <button
                disabled={isAnswered || eliminatedOptions.length > 0}
                onClick={handleBooster5050}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#fef9c3] hover:bg-[#fef08a] text-[#854d0e] border border-[#fde047] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                title="Eliminate two wrong answers"
              >
                <Scissors className="w-3.5 h-3.5" />
                <span>50:50</span>
                <span className="bg-amber-500/20 px-1 rounded text-[10px]">10🪙</span>
              </button>

              {/* +10s Time Booster */}
              <button
                disabled={isAnswered}
                onClick={handleBoosterFreezeTime}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#e0f2fe] hover:bg-[#bae6fd] text-[#0369a1] border border-[#7dd3fc] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                title="Add 10 seconds to the timer"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>+10s</span>
                <span className="bg-sky-500/20 px-1 rounded text-[10px]">10🪙</span>
              </button>

              {/* Auto-Solve Booster */}
              <button
                disabled={isAnswered}
                onClick={handleBoosterAutoSolve}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#5b21b6] border border-[#c4b5fd] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs"
                title="Automatically pick the correct answer"
              >
                <Zap className="w-3.5 h-3.5 text-purple-600" />
                <span>Solve</span>
                <span className="bg-purple-500/20 px-1 rounded text-[10px]">20🪙</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* 4. ROUND FINISHED SUMMARY */
        <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col items-center text-center gap-6 animate-scale-in">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-amber-300">
            🏆
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white">
              Round {roundNumber} Completed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Outstanding trivia performance across general knowledge!
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-lg">
            <div className="bg-sky-50 dark:bg-sky-950/40 p-3 rounded-2xl border border-sky-200 dark:border-sky-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-sky-600 dark:text-sky-300 uppercase">Score</span>
              <span className="text-lg sm:text-xl font-extrabold text-sky-800 dark:text-sky-100">{score}</span>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-2xl border border-emerald-200 dark:border-emerald-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-300 uppercase">Accuracy</span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-800 dark:text-emerald-100">
                {Math.round((correctAnswersCount / questions.length) * 100)}%
              </span>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200 dark:border-amber-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-300 uppercase">Best Streak</span>
              <span className="text-lg sm:text-xl font-extrabold text-amber-800 dark:text-amber-100">
                {highestStreak}x 🔥
              </span>
            </div>

            <div className="bg-purple-50 dark:bg-purple-950/40 p-3 rounded-2xl border border-purple-200 dark:border-purple-800 flex flex-col items-center">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-300 uppercase">IQ Gained</span>
              <span className="text-lg sm:text-xl font-extrabold text-purple-800 dark:text-purple-100">+25 IQ</span>
            </div>
          </div>

          {/* Round Review List */}
          <div className="w-full max-w-xl flex flex-col gap-2 text-left">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Questions Review:
            </h4>
            <div className="max-h-56 overflow-y-auto pr-1 flex flex-col gap-2 custom-scrollbar">
              {roundHistory.map((item, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
                    item.isCorrect
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/40'
                  }`}
                >
                  <span className="shrink-0 mt-0.5">
                    {item.isCorrect ? '✅' : '❌'}
                  </span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {item.question.question}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      Ans: <strong className="text-emerald-700 dark:text-emerald-300">{item.question.answer}</strong>
                      {item.userAnswer && !item.isCorrect && (
                        <span> • You picked: <span className="text-rose-600">{item.userAnswer}</span></span>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => startNewRound(roundNumber + 1, activeTopic)}
              className="flex items-center gap-2 bg-[#bae6fd] hover:bg-[#7dd3fc] text-[#0369a1] font-black px-6 py-3 rounded-2xl border-b-4 border-[#38bdf8] shadow-md hover:shadow-lg active:translate-y-0.5 transition-all text-sm"
            >
              <span>Next Round (Qs {roundNumber * 10 + 1}–{(roundNumber + 1) * 10})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => startNewRound(roundNumber, activeTopic)}
              className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-600 transition-all text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Round</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
