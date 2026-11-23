import React from 'react';
import { Gamepad2, Brain, MessageSquare, Search, Dices, Play, ArrowLeft } from 'lucide-react';
import { GameKey } from './PopularGames';
import { sound } from '../../lib/soundEffects';

interface GamesGalleryViewProps {
  onSelectGame: (gameKey: GameKey, subTab?: string) => void;
  onBackToHome: () => void;
}

export const GamesGalleryView: React.FC<GamesGalleryViewProps> = ({
  onSelectGame,
  onBackToHome,
}) => {
  const categories: {
    title: string;
    icon: React.ReactNode;
    color: string;
    games: {
      id: GameKey;
      subTab?: string;
      title: string;
      desc: string;
      tag: string;
      emoji: string;
      bg: string;
    }[];
  }[] = [
    {
      title: 'Brain & Logic Puzzles',
      icon: <Brain className="w-5 h-5 text-cyan-400" />,
      color: 'text-cyan-400',
      games: [
        {
          id: 'sudoku',
          title: 'Sudoku Master',
          desc: 'Classic 9x9 logical deduction grid with Daily challenge',
          tag: 'Logic',
          emoji: '🧩',
          bg: 'from-sky-500 to-blue-600',
        },
        {
          id: 'arrows',
          title: 'Arrow Out',
          desc: 'Sequential levels of directional spatial escape',
          tag: 'Spatial Logic',
          emoji: '🚀',
          bg: 'from-teal-500 to-emerald-600',
        },
        {
          id: '2048',
          title: '2048 Rush',
          desc: 'Endless number merge rush with swipe & arrow controls',
          tag: 'Numbers',
          emoji: '⚡',
          bg: 'from-purple-500 to-indigo-600',
        },
      ],
    },
    {
      title: 'Social & Spill It! Party',
      icon: <MessageSquare className="w-5 h-5 text-rose-400" />,
      color: 'text-rose-400',
      games: [
        {
          id: 'tod',
          subTab: 'truth-or-dare',
          title: 'Truth or Dare',
          desc: 'Fun and wild questions across Kitty, Spicy, Wild & Deep decks',
          tag: 'Party Favorite',
          emoji: '🔥',
          bg: 'from-rose-500 to-pink-600',
        },
        {
          id: '2t1l',
          subTab: 'two-truths',
          title: '2 Truths & 1 Lie',
          desc: 'Unique procedural science fact rounds',
          tag: 'Trivia',
          emoji: '🤥',
          bg: 'from-lime-500 to-green-600',
        },
        {
          id: 'tod',
          subTab: 'would-you-rather',
          title: 'Would You Rather',
          desc: 'Intense moral & funny dilemmas with live player % stats',
          tag: 'Social',
          emoji: '⚖️',
          bg: 'from-amber-500 to-orange-600',
        },
      ],
    },
    {
      title: 'Mystery & Detective Forensics',
      icon: <Search className="w-5 h-5 text-amber-400" />,
      color: 'text-amber-400',
      games: [
        {
          id: 'mystery',
          subTab: 'crime-scene',
          title: 'The Case Files',
          desc: 'Investigate crime hotspots, suspect alibis & arrest killers',
          tag: 'Detective',
          emoji: '🔍',
          bg: 'from-amber-600 to-yellow-600',
        },
        {
          id: 'mystery',
          subTab: 'safe-code',
          title: 'Vault Safe Codebreaker',
          desc: '4-digit logic deduction lock with exact/misplaced clues',
          tag: 'Deduction',
          emoji: '🔐',
          bg: 'from-yellow-500 to-amber-700',
        },
        {
          id: 'mystery',
          subTab: 'daily-riddles',
          title: 'Detective Mystery Riddles',
          desc: 'Interactive story riddles with clues & choices',
          tag: 'Riddles',
          emoji: '📜',
          bg: 'from-violet-600 to-indigo-600',
        },
      ],
    },
    {
      title: 'Arcade Classics & Quick Play',
      icon: <Dices className="w-5 h-5 text-emerald-400" />,
      color: 'text-emerald-400',
      games: [
        {
          id: 'tictactoe',
          title: 'Tic Tac Toe',
          desc: 'Classic 3x3 match against Smart Bot or 2-player pass',
          tag: 'Classic',
          emoji: '❌⭕',
          bg: 'from-amber-500 to-orange-600',
        },
        {
          id: 'memory',
          title: 'Memory Match',
          desc: '16-card brain memory flipping challenge with moves timer',
          tag: 'Memory',
          emoji: '🧠',
          bg: 'from-purple-500 to-fuchsia-600',
        },
        {
          id: 'dice',
          title: 'Dice Roll & Luck',
          desc: 'Predict sum total under 7, lucky 7 or over 7 for coins',
          tag: 'Loot',
          emoji: '🎲',
          bg: 'from-teal-500 to-cyan-600',
        },
      ],
    },
  ];

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-in pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 border border-white/20 shadow-2xl flex items-center justify-between">
        <div>
          <button
            onClick={() => { sound.playTap(); onBackToHome(); }}
            className="text-xs font-bold text-purple-100 hover:text-white flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Hub
          </button>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-7 h-7 text-yellow-300" />
            <h2 className="text-2xl sm:text-3xl font-black text-white">All Funzo Games</h2>
          </div>
          <p className="text-xs text-purple-100 mt-1">
            Pick any game to play instantly in browser with zero download!
          </p>
        </div>
      </div>

      {/* Categories */}
      {categories.map((cat, cIdx) => (
        <section key={cIdx} className="w-full">
          <div className="flex items-center gap-2 mb-3 px-1">
            {cat.icon}
            <h3 className={`text-base sm:text-lg font-black text-white tracking-wide`}>
              {cat.title}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {cat.games.map((g, gIdx) => (
              <div
                key={gIdx}
                onClick={() => {
                  sound.playTap();
                  onSelectGame(g.id, g.subTab);
                }}
                className="p-4 rounded-3xl bg-[#1c1e2f] border border-white/10 hover:border-violet-400 hover:bg-[#22253a] shadow-xl flex items-center justify-between gap-3 cursor-pointer group hover:scale-[1.02] active:scale-95 transition"
              >
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${g.bg} flex items-center justify-center text-2xl shadow-lg shrink-0 group-hover:scale-105 transition-transform`}>
                    {g.emoji}
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h4 className="text-sm font-black text-white truncate">{g.title}</h4>
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
                        {g.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{g.desc}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playTap();
                    onSelectGame(g.id);
                  }}
                  className="p-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black shadow-md shrink-0 group-hover:scale-105 transition"
                  title="Play"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
