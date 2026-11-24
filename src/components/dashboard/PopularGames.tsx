import React from 'react';
import { Play, Flame, ArrowRight } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

export type GameKey = 'tod' | 'sudoku' | '2t1l' | 'tictactoe' | 'memory' | 'dice' | 'arrows' | '2048' | 'balloon' | 'mystery';

interface PopularGamesProps {
  onSelectGame: (gameKey: GameKey) => void;
  onViewAll: () => void;
}

export const PopularGames: React.FC<PopularGamesProps> = ({
  onSelectGame,
  onViewAll,
}) => {
  const gamesList: {
    id: GameKey;
    title: string;
    subtitle: string;
    bgGradient: string;
    icon: React.ReactNode;
  }[] = [
    {
      id: 'tod',
      title: 'Truth or Dare',
      subtitle: 'Spice up your day!',
      bgGradient: 'from-[#fecdd3] via-[#fda4af] to-[#f472b6]',
      icon: (
        <div className="text-3xl filter drop-shadow-md animate-pulse">
          💕
        </div>
      ),
    },
    {
      id: 'sudoku',
      title: 'Sudoku',
      subtitle: 'Train Your Brain',
      bgGradient: 'from-[#bae6fd] via-[#7dd3fc] to-[#60a5fa]',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md p-1 grid grid-cols-3 grid-rows-3 gap-0.5 text-[8px] font-mono font-black text-white shadow-inner">
          <span>5</span><span>3</span><span>1</span>
          <span>6</span><span>7</span><span>9</span>
          <span>1</span><span>8</span><span>4</span>
        </div>
      ),
    },
    {
      id: '2t1l',
      title: '2 Truths 1 Lie',
      subtitle: 'Guess the Lie!',
      bgGradient: 'from-[#bbf7d0] via-[#86efac] to-[#4ade80]',
      icon: (
        <div className="text-3xl filter drop-shadow-md">
          💬
        </div>
      ),
    },
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      subtitle: 'Classic Fun',
      bgGradient: 'from-[#fed7aa] via-[#fdba74] to-[#f59e0b]',
      icon: (
        <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md p-1 grid grid-cols-3 grid-rows-3 gap-0.5 text-[9px] font-mono font-black text-white shadow-inner text-center">
          <span>X</span><span>O</span><span>X</span>
          <span>O</span><span>X</span><span>O</span>
          <span>X</span><span>O</span><span>X</span>
        </div>
      ),
    },
    {
      id: 'memory',
      title: 'Memory Match',
      subtitle: 'Test Your Memory',
      bgGradient: 'from-[#ddd6fe] via-[#c4b5fd] to-[#a78bfa]',
      icon: (
        <div className="text-3xl filter drop-shadow-md animate-bounce">
          🧠
        </div>
      ),
    },
    {
      id: 'balloon',
      title: 'Balloon Pop',
      subtitle: 'Pop & Fun',
      bgGradient: 'from-[#fbcfe8] via-[#f472b6] to-[#ec4899]',
      icon: (
        <div className="text-3xl filter drop-shadow-md animate-bounce">
          🎈
        </div>
      ),
    },
  ];

  return (
    <section className="w-full mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3.5 px-1">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
          <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
            Popular Games
          </h3>
        </div>

        <button
          onClick={() => {
            sound.playTap();
            onViewAll();
          }}
          className="text-xs font-black text-purple-400 hover:text-purple-300 flex items-center gap-1 transition"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 6 Game Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {gamesList.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              sound.playTap();
              onSelectGame(game.id);
            }}
            className={`rounded-3xl p-4 bg-gradient-to-b ${game.bgGradient} shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between text-center min-h-[170px] border border-white/20 group relative overflow-hidden`}
          >
            {/* Top Shine */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-3xl" />

            {/* Icon Container */}
            <div className="my-auto py-1 flex items-center justify-center">
              {game.icon}
            </div>

            {/* Title & Subtitle */}
            <div className="w-full mb-3">
              <h4 className="text-xs sm:text-sm font-black text-white tracking-wide leading-tight truncate">
                {game.title}
              </h4>
              <p className="text-[10px] text-white/80 font-bold mt-0.5 truncate">
                {game.subtitle}
              </p>
            </div>

            {/* "Play Now ▶" Pill Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                sound.playTap();
                onSelectGame(game.id);
              }}
              className="w-full py-1.5 rounded-full bg-white text-slate-900 font-black text-[11px] shadow-md hover:bg-slate-100 transition flex items-center justify-center gap-1 group-hover:scale-105"
            >
              <span>Play Now</span>
              <Play className="w-3 h-3 fill-slate-900" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
