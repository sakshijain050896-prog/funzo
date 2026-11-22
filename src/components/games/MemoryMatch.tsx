import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy } from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface MemoryMatchProps {
  onWin?: (moves: number, timeSeconds: number) => void;
}

interface CardItem {
  id: number;
  emoji: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJI_PAIRS = [
  { emoji: '🧠', name: 'Brain' },
  { emoji: '🎮', name: 'Controller' },
  { emoji: '💎', name: 'Diamond' },
  { emoji: '👑', name: 'Crown' },
  { emoji: '🔥', name: 'Flame' },
  { emoji: '⚡', name: 'Thunder' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🎁', name: 'Gift' },
];

export const MemoryMatch: React.FC<MemoryMatchProps> = ({ onWin }) => {
  const generateDeck = (): CardItem[] => {
    const full = [...EMOJI_PAIRS, ...EMOJI_PAIRS].map((item, idx) => ({
      id: idx,
      emoji: item.emoji,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));
    return full.sort(() => Math.random() - 0.5);
  };

  const [cards, setCards] = useState<CardItem[]>(generateDeck);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isWon, setIsWon] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    if (isWon) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [isWon]);

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

  const handleRestart = () => {
    sound.playTap();
    setCards(generateDeck());
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

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-4">
      {/* Top Header info */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 rounded-xl bg-[#180d38] border border-[#2f1863] text-xs font-black text-purple-300">
            Moves: <span className="font-mono text-white text-sm">{moves}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#180d38] border border-[#2f1863] text-xs font-black text-amber-300">
            ⏱️ <span className="font-mono text-white text-sm">{formatTime(seconds)}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-[#180d38] border border-[#2f1863] text-slate-300 hover:text-white transition active:scale-95"
          title="Restart Deck"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* 4x4 Grid Board */}
      <div className="relative w-full aspect-square max-w-[320px] p-2.5 rounded-3xl bg-[#130a2e] border-2 border-[#2f1863] shadow-2xl grid grid-cols-4 grid-rows-4 gap-2">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            className={`rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 active:scale-95 ${
              card.isMatched
                ? 'bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-lg border-2 border-purple-400 opacity-90'
                : card.isFlipped
                ? 'bg-[#21114a] border-2 border-purple-500 text-white shadow-md'
                : 'bg-[#180d38] hover:bg-[#231352] border border-[#2f1863] text-transparent'
            }`}
          >
            {card.isFlipped || card.isMatched ? card.emoji : '❓'}
          </button>
        ))}

        {/* Won Overlay Banner */}
        {isWon && (
          <div className="absolute inset-0 bg-[#0f0724]/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2 animate-bounce">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-xl font-black text-white mb-1">Memory Master! 🧠</h3>
            <p className="text-xs text-slate-300 mb-4">
              All 8 pairs matched in {moves} moves · {formatTime(seconds)}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-black text-xs shadow-lg active:scale-95 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
