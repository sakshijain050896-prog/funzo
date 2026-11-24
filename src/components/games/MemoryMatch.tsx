import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface MemoryMatchProps {
  coins?: number;
  onSpendCoins?: (amount: number) => boolean;
  onWin?: (moves: number, timeSeconds: number) => void;
  onBackToKids?: () => void;
}

interface CardItem {
  id: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Multi-Level Cute Themed Emoji Decks for Kids
const LEVEL_DECKS: Record<number, { title: string; themeName: string; pairs: { emoji: string; name: string }[] }> = {
  1: {
    title: 'Level 1: Cute Pets 🐶',
    themeName: 'Friendly Pets',
    pairs: [
      { emoji: '🐶', name: 'Puppy' },
      { emoji: '🐱', name: 'Kitten' },
      { emoji: '🐰', name: 'Bunny' },
      { emoji: '🐻', name: 'Bear' },
      { emoji: '🐼', name: 'Panda' },
      { emoji: '🦊', name: 'Fox' },
    ],
  },
  2: {
    title: 'Level 2: Safari Zoo 🦁',
    themeName: 'Zoo Animals',
    pairs: [
      { emoji: '🦁', name: 'Lion' },
      { emoji: '🐯', name: 'Tiger' },
      { emoji: '🐨', name: 'Koala' },
      { emoji: '🐸', name: 'Froggy' },
      { emoji: '🐵', name: 'Monkey' },
      { emoji: '🦄', name: 'Unicorn' },
      { emoji: '🐬', name: 'Dolphin' },
      { emoji: '🐙', name: 'Octopus' },
    ],
  },
  3: {
    title: 'Level 3: Wild Kingdom 🦖',
    themeName: 'Wild Safari',
    pairs: [
      { emoji: '🦖', name: 'Dino' },
      { emoji: '🐧', name: 'Penguin' },
      { emoji: '🐝', name: 'Honeybee' },
      { emoji: '🦋', name: 'Butterfly' },
      { emoji: '🦉', name: 'Owl' },
      { emoji: '🐘', name: 'Elephant' },
      { emoji: '🦒', name: 'Giraffe' },
      { emoji: '🦩', name: 'Flamingo' },
      { emoji: '🦓', name: 'Zebra' },
      { emoji: '🐢', name: 'Turtle' },
    ],
  },
};

export const MemoryMatch: React.FC<MemoryMatchProps> = ({
  coins = 0,
  onSpendCoins,
  onWin,
  onBackToKids
}) => {
  const [level, setLevel] = useState<number>(1);

  const getDeckForLevel = useCallback((lvl: number): CardItem[] => {
    const config = LEVEL_DECKS[lvl] || LEVEL_DECKS[3];
    const full = [...config.pairs, ...config.pairs].map((item, idx) => ({
      id: idx,
      emoji: item.emoji,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));
    return full.sort(() => Math.random() - 0.5);
  }, []);

  const [cards, setCards] = useState<CardItem[]>(() => getDeckForLevel(1));
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  // Timer
  useEffect(() => {
    if (isWon) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isWon]);

  // Handle Card Flip
  const handleCardClick = (index: number) => {
    if (cards[index].isFlipped || cards[index].isMatched || selectedCards.length === 2) return;

    sound.playTap();
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((m) => m + 1);
      const [firstIdx, secondIdx] = newSelected;

      if (newCards[firstIdx].emoji === newCards[secondIdx].emoji) {
        sound.playVictory();
        setTimeout(() => {
          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setSelectedCards([]);

          if (newCards.every((c) => c.isMatched)) {
            setIsWon(true);
            confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
            if (onWin) onWin(moves + 1, seconds);
          }
        }, 300);
      } else {
        setTimeout(() => {
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setSelectedCards([]);
        }, 800);
      }
    }
  };

  // Replay Current Level
  const handleRestartCurrent = () => {
    sound.playTap();
    setCards(getDeckForLevel(level));
    setSelectedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsWon(false);
  };

  // Advance to Next Level
  const handleNextLevel = () => {
    sound.playVictory();
    const nextLvl = level < 3 ? level + 1 : 1;
    setLevel(nextLvl);
    setCards(getDeckForLevel(nextLvl));
    setSelectedCards([]);
    setMoves(0);
    setSeconds(0);
    setIsWon(false);
  };

  // Coin Booster 1: X-Ray Peek (10 Coins) - Flips all cards face-up for 1.5s
  const handleXRayPeek = () => {
    if (!onSpendCoins || isWon) return;
    if (!onSpendCoins(10)) return;

    sound.playTap();
    const backup = cards.map((c) => ({ ...c }));
    setCards((prev) => prev.map((c) => ({ ...c, isFlipped: true })));

    setTimeout(() => {
      setCards((prev) =>
        prev.map((c, idx) => ({
          ...c,
          isFlipped: backup[idx].isMatched ? true : false,
        }))
      );
    }, 1500);
  };

  // Coin Booster 2: Auto Match Pair (15 Coins) - Finds and matches 1 pair immediately
  const handleAutoMatchPair = () => {
    if (!onSpendCoins || isWon) return;
    const unmatched = cards.filter((c) => !c.isMatched);
    if (unmatched.length < 2) return;
    if (!onSpendCoins(15)) return;

    sound.playVictory();
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.5 } });

    const targetEmoji = unmatched[0].emoji;
    const updated = cards.map((c) =>
      c.emoji === targetEmoji ? { ...c, isMatched: true, isFlipped: true } : c
    );
    setCards(updated);
    setMoves((m) => m + 1);

    if (updated.every((c) => c.isMatched)) {
      setIsWon(true);
      if (onWin) onWin(moves + 1, seconds);
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentConfig = LEVEL_DECKS[level] || LEVEL_DECKS[3];
  const gridColsClass = level === 1 ? 'grid-cols-4' : level === 2 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center select-none pb-6 animate-fade-in font-['Fredoka']">
      {/* Top Header info */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Level Badge - Pastel Mint */}
          <div className="px-3 py-1.5 rounded-2xl bg-[#a7f3d0] border-2 border-[#6ee7b7] text-[#065f46] text-xs font-black shadow-sm">
            <span>Level {level}</span>
          </div>

          {/* Moves Badge - Pastel Neutral */}
          <div className="px-2.5 py-1.5 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-700 text-xs font-black text-slate-800 dark:text-white shadow-sm">
            Moves: <span className="font-pixel text-[#e11d48] ml-0.5">{moves}</span>
          </div>

          {/* Timer - Pastel Sunshine */}
          <div className="px-2.5 py-1.5 rounded-2xl bg-[#fef9c3] border-2 border-[#fef08a] text-xs font-black text-[#854d0e] shadow-sm">
            ⏱️ <span className="font-pixel text-[#854d0e] ml-0.5">{formatTime(seconds)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {onBackToKids && (
            <button
              onClick={onBackToKids}
              className="px-2.5 py-1.5 rounded-2xl bg-[#fef3c7] hover:bg-[#fde68a] border-2 border-[#fde68a] text-[#92400e] font-black text-xs transition active:scale-95 shadow-sm"
              title="Back to Kids Games"
            >
              ← Kids
            </button>
          )}

          <button
            onClick={handleRestartCurrent}
            className="p-1.5 sm:p-2 rounded-2xl bg-white dark:bg-[#181d2f] border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-[#e11d48] transition active:scale-95 shadow-sm"
            title="Restart Level"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Level Title Tagline */}
      <div className="w-full text-center mb-2">
        <span className="text-xs font-black text-slate-600 dark:text-slate-300">
          {currentConfig.title} — Find all matching {currentConfig.pairs.length} pairs!
        </span>
      </div>

      {/* Coin Boosters Bar */}
      <div className="w-full flex items-center justify-between gap-1.5 mb-2.5 p-2 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1 pl-1">
          <span className="text-sm">🪙</span>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            {coins}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Booster 1: X-Ray Peek */}
          <button
            onClick={handleXRayPeek}
            disabled={isWon}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#e0e7ff] hover:bg-[#c7d2fe] border border-[#c7d2fe] text-[#4338ca] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Peek at all cards for 1.5 seconds (Costs 10 Coins)"
          >
            <span>👁️ X-Ray Peek</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#c7d2fe] dark:bg-[#312e81]/40 text-[10px]">10🪙</span>
          </button>

          {/* Booster 2: Auto Match Pair */}
          <button
            onClick={handleAutoMatchPair}
            disabled={isWon}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#fef9c3] hover:bg-[#fef08a] border border-[#fef08a] text-[#854d0e] font-black text-xs shadow-xs active:scale-95 transition disabled:opacity-40"
            title="Auto-match 1 pair instantly (Costs 15 Coins)"
          >
            <span>🎯 Auto-Match</span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#fef08a] dark:bg-[#713f12]/40 text-[10px]">15🪙</span>
          </button>
        </div>
      </div>

      {/* Memory Card Grid - Pastel Soft Container */}
      <div className={`relative w-full p-3 sm:p-4 rounded-3xl bg-white/95 dark:bg-[#181d2f]/95 backdrop-blur-md border-2 border-slate-200 dark:border-slate-700/60 shadow-md grid ${gridColsClass} gap-2 sm:gap-2.5`}>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 active:scale-95 border-2 ${
              card.isMatched
                ? 'bg-gradient-to-tr from-[#a7f3d0] to-[#6ee7b7] text-white shadow-sm border-[#34d399] scale-[0.98]'
                : card.isFlipped
                ? 'bg-gradient-to-tr from-[#fef08a] to-[#fde047] border-[#facc15] text-slate-900 shadow-sm scale-105'
                : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-[#22283a] dark:hover:bg-[#2b334a] border-slate-200 dark:border-slate-700 text-slate-400 hover:scale-105'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}

        {/* Won Overlay Banner */}
        {isWon && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-5 z-20 animate-fade-in text-center">
            <div className="w-14 h-14 rounded-3xl bg-[#fef08a] text-[#854d0e] border-2 border-[#facc15] flex items-center justify-center mb-2.5 shadow-md animate-bounce">
              <Trophy className="w-8 h-8 fill-current" />
            </div>
            <span className="text-xs font-black uppercase text-[#fef08a] font-pixel">FANTASTIC MEMORY!</span>
            <h3 className="text-2xl font-black text-white mt-1">Level {level} Cleared! 🎉</h3>
            <p className="text-xs text-slate-100 my-2">
              All {currentConfig.pairs.length} pairs matched in {moves} moves · {formatTime(seconds)}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#a7f3d0] hover:bg-[#6ee7b7] border-b-4 border-[#059669] text-[#064e3b] font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5"
              >
                <span>{level < 3 ? `Next Level (Level ${level + 1})` : 'Play Again (Level 1)'}</span>
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
      </div>
    </div>
  );
};
