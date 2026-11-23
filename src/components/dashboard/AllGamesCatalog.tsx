import React, { useState, useMemo } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { GameKey } from './PopularGames';
import { sound } from '../../lib/soundEffects';

export type CategoryFilter = 'all' | 'brain' | 'social' | 'mystery';

export interface GameCatalogItem {
  id: GameKey;
  subTab?: string;
  title: string;
  genre: 'brain' | 'social' | 'mystery';
  genreLabel: string;
  tag: string;
  imageComponent: React.ReactNode;
}

export const CATEGORY_THEMES: Record<string, { buttonBg: string }> = {
  brain: {
    buttonBg: 'mario-btn-blue',
  },
  social: {
    buttonBg: 'mario-btn-red',
  },
  mystery: {
    buttonBg: 'mario-btn-yellow text-slate-950',
  },
};

export const ALL_GAMES_DATA: GameCatalogItem[] = [
  // 1. BRAIN & LOGIC PUZZLES
  {
    id: 'sudoku',
    title: 'Maths Puzzle',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Math',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-blue-500 relative flex items-center justify-center overflow-hidden">
        <span className="absolute top-1 left-2 text-white/20 text-[9px] font-pixel select-none">+ - × ÷</span>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🧮
        </div>
      </div>
    ),
  },
  {
    id: 'arrows',
    title: 'Arrow Out',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Maze',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-teal-600 via-emerald-600 to-cyan-500 relative flex items-center justify-center overflow-hidden">
        <span className="absolute top-1 right-2 text-white/25 text-xs font-bold select-none">↗ ↘</span>
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🚀
        </div>
      </div>
    ),
  },
  {
    id: '2048',
    title: '2048 Rush',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Numbers',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-fuchsia-600 relative flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 rounded-md bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center shadow-sm">512</span>
          <span className="w-7 h-7 rounded-lg bg-orange-500 text-white font-black text-[10px] flex items-center justify-center shadow-md scale-105">1024</span>
          <span className="w-8 h-8 rounded-lg bg-[#e52521] text-white font-black text-xs flex items-center justify-center shadow-lg border border-yellow-300 scale-110">2048</span>
        </div>
      </div>
    ),
  },

  // 2. SOCIAL & PARTY (SPILL IT)
  {
    id: 'tod',
    subTab: 'truth-or-dare',
    title: 'Truth or Dare',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Party',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-rose-600 via-pink-600 to-red-500 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🔥
        </div>
      </div>
    ),
  },
  {
    id: '2t1l',
    subTab: 'two-truths',
    title: '2 Truths & 1 Lie',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Trivia',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🤥
        </div>
      </div>
    ),
  },
  {
    id: 'tod',
    subTab: 'would-you-rather',
    title: 'Would You Rather',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Vote',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-500 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          ⚖️
        </div>
      </div>
    ),
  },
  {
    id: 'tod',
    subTab: 'never-have-i-ever',
    title: 'Never Have I Ever',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Party',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🙈
        </div>
      </div>
    ),
  },

  // 3. MYSTERY & DETECTIVE FORENSICS
  {
    id: 'mystery',
    subTab: 'crime-scene',
    title: 'The Case Files',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Crime',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-amber-700 via-orange-700 to-yellow-600 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🔍
        </div>
      </div>
    ),
  },
  {
    id: 'mystery',
    subTab: 'safe-code',
    title: 'Vault Safe Codebreaker',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Vault',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-yellow-600 via-amber-600 to-stone-700 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          🔐
        </div>
      </div>
    ),
  },
  {
    id: 'mystery',
    subTab: 'daily-riddles',
    title: 'Detective Riddles',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Riddle',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-violet-700 via-indigo-700 to-purple-600 relative flex items-center justify-center overflow-hidden">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center text-xl sm:text-2xl shadow-sm group-hover:scale-110 transition-transform">
          📜
        </div>
      </div>
    ),
  },
];

const CATEGORY_TABS: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Games', emoji: '⭐' },
  { id: 'brain', label: 'Brain & Logic', emoji: '🧩' },
  { id: 'social', label: 'Party & Social', emoji: '🔥' },
  { id: 'mystery', label: 'Mystery Riddles', emoji: '🔍' },
];

interface AllGamesCatalogProps {
  onSelectGame: (gameKey: GameKey, subTab?: string) => void;
  searchQuery?: string;
}

export const AllGamesCatalog: React.FC<AllGamesCatalogProps> = ({
  onSelectGame,
  searchQuery = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');

  // Filter games based on search query or selected category
  const filteredGames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length > 0) {
      return ALL_GAMES_DATA.filter((game) => 
        game.title.toLowerCase().includes(q) ||
        game.genreLabel.toLowerCase().includes(q) ||
        game.tag.toLowerCase().includes(q)
      );
    }
    if (selectedCategory === 'all') {
      return ALL_GAMES_DATA;
    }
    return ALL_GAMES_DATA.filter((game) => game.genre === selectedCategory);
  }, [searchQuery, selectedCategory]);

  return (
    <section className="w-full flex flex-col gap-2.5 mb-5 animate-fade-in">
      {/* ---------------- COMPACT CATEGORY FILTER TABS ---------------- */}
      <div className="w-full flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id && !searchQuery.trim();
            const count = tab.id === 'all' 
              ? ALL_GAMES_DATA.length 
              : ALL_GAMES_DATA.filter((g) => g.genre === tab.id).length;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedCategory(tab.id);
                }}
                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shrink-0 transition-all font-['Fredoka'] ${
                  isSelected
                    ? 'bg-[#e52521] text-white border border-[#9e100e] shadow-[2px_2px_0_#9e100e]'
                    : 'bg-white dark:bg-[#161a29] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-[#2f3752] hover:border-slate-400 dark:hover:border-slate-500 shadow-sm'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`text-[9px] px-1 py-0.2 rounded-md font-pixel ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Search Notification */}
      {searchQuery.trim().length > 0 && (
        <div className="flex items-center gap-1 px-1 text-xs font-black text-slate-700 dark:text-slate-300 font-['Fredoka']">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Search Results for &ldquo;{searchQuery}&rdquo; ({filteredGames.length})</span>
        </div>
      )}

      {/* ---------------- COMPACT HIGH-DENSITY GAMES GRID (SMALL BOXES) ---------------- */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {filteredGames.map((game, idx) => {
            const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
            return (
              <div
                key={`${game.id}-${game.subTab || idx}`}
                onClick={() => {
                  sound.playTap();
                  onSelectGame(game.id, game.subTab);
                }}
                className="rounded-xl sm:rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#1e293b] hover:shadow-[3px_3px_0_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
              >
                {/* 1. COMPACT GAME IMAGE THUMBNAIL */}
                <div className="w-full h-18 sm:h-22 relative overflow-hidden border-b-2 border-black dark:border-[#2f3752]">
                  {game.imageComponent}
                  {/* Subtle category tag on image */}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.2 rounded bg-black/60 backdrop-blur-sm text-[8px] font-black text-white font-['Fredoka'] border border-white/20">
                    {game.tag}
                  </span>
                </div>

                {/* 2. GAME NAME + SMALL PLAY BUTTON */}
                <div className="p-2 sm:p-2.5 flex items-center justify-between gap-1 bg-white dark:bg-[#161a29]">
                  {/* Game Title: compact & readable */}
                  <h4 className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#e52521] dark:group-hover:text-[#ff4a47] transition-colors font-['Fredoka'] line-clamp-1 break-words">
                    {game.title}
                  </h4>

                  {/* Small Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playTap();
                      onSelectGame(game.id, game.subTab);
                    }}
                    className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] font-black flex items-center gap-0.5 shrink-0 transition font-['Fredoka'] ${theme.buttonBg}`}
                  >
                    <span>Play</span>
                    <Play className="w-2.5 h-2.5 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] text-center shadow-[3px_3px_0_#000]">
          <span className="text-2xl mb-1 block">🔍</span>
          <p className="text-xs font-black text-slate-800 dark:text-white font-['Fredoka']">No games found</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-['Fredoka'] mt-0.5">Try another search keyword or select All Games.</p>
        </div>
      )}
    </section>
  );
};
