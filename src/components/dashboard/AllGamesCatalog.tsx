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
    tag: 'Math & Logic',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-sky-600 via-indigo-600 to-blue-500 relative flex items-center justify-center overflow-hidden">
        {/* Floating math symbols in background */}
        <span className="absolute top-2 left-3 text-white/20 text-xs font-pixel select-none">+ - × ÷</span>
        <span className="absolute bottom-2 right-3 text-white/20 text-xs font-pixel select-none">= ? %</span>
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🧮
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-yellow-300 font-pixel">
            <span>24 + 18 = 42</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'arrows',
    title: 'Arrow Out',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Spatial Maze',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-teal-600 via-emerald-600 to-cyan-500 relative flex items-center justify-center overflow-hidden">
        <span className="absolute top-2 right-3 text-white/20 text-lg font-bold select-none">↗ ↘ ↖</span>
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🚀
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-emerald-300 font-pixel">
            <span>ESCAPE GRID</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '2048',
    title: '2048 Rush',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Number Merge',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-fuchsia-600 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center shadow-md border border-white/40">512</span>
            <span className="w-10 h-10 rounded-xl bg-orange-500 text-white font-black text-sm flex items-center justify-center shadow-lg border-2 border-white/60 scale-110">1024</span>
            <span className="w-12 h-12 rounded-xl bg-[#e52521] text-white font-black text-base flex items-center justify-center shadow-xl border-2 border-yellow-300 scale-125">2048</span>
          </div>
          <div className="mt-2 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-yellow-300 font-pixel">
            <span>SLIDE &amp; MERGE</span>
          </div>
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
    tag: 'Party Favorite',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-rose-600 via-pink-600 to-red-500 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🔥
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-pink-300 font-pixel">
            <span>TRUTH OR DARE</span>
          </div>
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
    tag: 'Spot the Lie',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-emerald-600 via-teal-600 to-green-500 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🤥
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-lime-300 font-pixel">
            <span>FIND THE FAKE</span>
          </div>
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
    tag: 'Party Vote',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-amber-600 via-orange-500 to-yellow-500 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            ⚖️
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-yellow-300 font-pixel">
            <span>OPTION A OR B</span>
          </div>
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
    tag: 'Confessions',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-fuchsia-600 via-purple-600 to-pink-500 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🙈
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-fuchsia-300 font-pixel">
            <span>PUT A FINGER DOWN</span>
          </div>
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
    tag: 'Crime Scene',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-amber-700 via-orange-700 to-yellow-600 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🔍
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-amber-300 font-pixel">
            <span>FORENSIC CLUES</span>
          </div>
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
    tag: 'Vault Safe',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-yellow-600 via-amber-600 to-stone-700 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            🔐
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-yellow-300 font-pixel">
            <span>CRACK 4-DIGIT CODE</span>
          </div>
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
    tag: 'Story Riddles',
    imageComponent: (
      <div className="w-full h-full bg-gradient-to-tr from-violet-700 via-indigo-700 to-purple-600 relative flex items-center justify-center overflow-hidden">
        <div className="relative flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center text-3xl sm:text-4xl shadow-lg group-hover:scale-110 transition-transform">
            📜
          </div>
          <div className="flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-black/40 border border-white/20 text-[9px] font-black text-violet-300 font-pixel">
            <span>SOLVE MYSTERY</span>
          </div>
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
    <section className="w-full flex flex-col gap-3.5 mb-6 animate-fade-in">
      {/* ---------------- COMPACT CATEGORY FILTER TABS ---------------- */}
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full">
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
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all font-['Fredoka'] ${
                  isSelected
                    ? 'bg-[#e52521] text-white border-2 border-[#9e100e] shadow-[2px_2px_0_#9e100e] scale-[1.02]'
                    : 'bg-white dark:bg-[#161a29] text-slate-700 dark:text-slate-300 border-2 border-slate-300 dark:border-[#2f3752] hover:border-slate-400 dark:hover:border-slate-500 shadow-sm'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-pixel ${
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
        <div className="flex items-center gap-1.5 px-1 text-xs font-black text-slate-700 dark:text-slate-300 font-['Fredoka']">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Search Results for &ldquo;{searchQuery}&rdquo; ({filteredGames.length} games)</span>
        </div>
      )}

      {/* ---------------- HIGH-DENSITY RESPONSIVE GAMES GRID: IMAGES + TITLE + SMALL PLAY BUTTON ONLY ---------------- */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {filteredGames.map((game, idx) => {
            const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
            return (
              <div
                key={`${game.id}-${game.subTab || idx}`}
                onClick={() => {
                  sound.playTap();
                  onSelectGame(game.id, game.subTab);
                }}
                className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_#1e293b] hover:shadow-[5px_5px_0_#000] hover:-translate-y-1 active:translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between group overflow-hidden"
              >
                {/* 1. VISUAL GAME IMAGE THUMBNAIL (No instruction text) */}
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative overflow-hidden border-b-3 border-black dark:border-[#2f3752]">
                  {game.imageComponent}
                  {/* Subtle category badge on image corner */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[9px] font-black text-white font-['Fredoka'] border border-white/20">
                    {game.tag}
                  </span>
                </div>

                {/* 2. GAME NAME + SMALL PLAY BUTTON ONLY */}
                <div className="p-2.5 sm:p-3 flex items-center justify-between gap-1.5 bg-white dark:bg-[#161a29]">
                  {/* Full Game Title (No single-line truncate) */}
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight group-hover:text-[#e52521] dark:group-hover:text-[#ff4a47] transition-colors font-['Fredoka'] break-words">
                    {game.title}
                  </h4>

                  {/* Small Play Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playTap();
                      onSelectGame(game.id, game.subTab);
                    }}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-black flex items-center gap-1 shrink-0 transition font-['Fredoka'] ${theme.buttonBg}`}
                  >
                    <span>Play</span>
                    <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 rounded-3xl bg-white dark:bg-[#161a29] border-3 border-black dark:border-[#2f3752] text-center shadow-[4px_4px_0_#000]">
          <span className="text-3xl mb-2 block">🔍</span>
          <p className="text-sm font-black text-slate-800 dark:text-white font-['Fredoka']">No games found</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-['Fredoka'] mt-1">Try another search keyword or select All Games.</p>
        </div>
      )}
    </section>
  );
};
