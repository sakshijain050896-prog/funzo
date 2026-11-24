import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Trophy, ArrowRight, ArrowLeft } from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface MemoryMatchProps {
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

export const MemoryMatch: React.FC<MemoryMatchProps> = ({ onWin, onBackToKids }) => {
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
          {/* Level Badge */}
          <div className="px-3 py-1.5 rounded-xl bg-[#00a859] border-2 border-[#006633] text-white text-xs font-black shadow-sm">
            <span>Level {level}</span>
          </div>

          {/* Moves Badge */}
          <div className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-xs font-black text-slate-800 dark:text-white shadow-sm">
            Moves: <span className="font-pixel text-[#e52521] ml-0.5">{moves}</span>
          </div>

          {/* Timer */}
          <div className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-xs font-black text-amber-500 shadow-sm">
            ⏱️ <span className="font-pixel text-slate-900 dark:text-white ml-0.5">{formatTime(seconds)}</span>
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
            onClick={handleRestartCurrent}
            className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#161a29] border-2 border-slate-300 dark:border-[#2f3752] text-slate-700 dark:text-slate-300 hover:text-[#e52521] transition active:scale-95 shadow-sm"
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

      {/* Memory Card Grid */}
      <div className={`relative w-full p-3 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[4px_4px_0_#000] grid ${gridColsClass} gap-2 sm:gap-2.5`}>
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`aspect-square rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all duration-300 active:scale-95 border-2 ${
              card.isMatched
                ? 'bg-gradient-to-tr from-emerald-400 to-green-500 text-white shadow-md border-emerald-600 scale-[0.98]'
                : card.isFlipped
                ? 'bg-gradient-to-tr from-amber-200 to-yellow-300 border-amber-500 text-slate-900 shadow-md scale-105'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] dark:hover:bg-[#2b334a] border-slate-300 dark:border-[#444] text-slate-400 hover:scale-105'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}

        {/* Won Overlay Banner */}
        {isWon && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-5 z-20 animate-fade-in text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-2.5 shadow-lg border-2 border-black animate-bounce">
              <Trophy className="w-8 h-8 fill-slate-950" />
            </div>
            <span className="text-xs font-black uppercase text-yellow-300 font-pixel">FANTASTIC MEMORY!</span>
            <h3 className="text-2xl font-black text-white mt-1">Level {level} Cleared! 🎉</h3>
            <p className="text-xs text-slate-200 my-2">
              All {currentConfig.pairs.length} pairs matched in {moves} moves · {formatTime(seconds)}
            </p>

            <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
              <button
                onClick={handleNextLevel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#00a859] hover:bg-[#00c868] border-b-4 border-[#006633] text-white font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5"
              >
                <span>{level < 3 ? `Next Level (Level ${level + 1})` : 'Play Again (Level 1)'}</span>
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
    </div>
  );
};
