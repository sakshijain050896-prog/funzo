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
  emoji: string;
  bgGradient: string;
}

export const CATEGORY_THEMES: Record<string, { tagBg: string; buttonBg: string }> = {
  brain: {
    tagBg: 'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-300 border border-sky-300 dark:border-sky-700/50',
    buttonBg: 'mario-btn-blue',
  },
  social: {
    tagBg: 'bg-rose-100 text-rose-900 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-700/50',
    buttonBg: 'mario-btn-red',
  },
  mystery: {
    tagBg: 'bg-amber-100 text-amber-950 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-700/50',
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
    emoji: '🧮',
    bgGradient: 'from-sky-500 to-blue-600',
  },
  {
    id: 'arrows',
    title: 'Arrow Out',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Spatial Maze',
    emoji: '🚀',
    bgGradient: 'from-teal-500 to-emerald-600',
  },
  {
    id: '2048',
    title: '2048 Rush',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Number Merge',
    emoji: '⚡',
    bgGradient: 'from-purple-500 to-indigo-600',
  },

  // 2. SOCIAL & PARTY (SPILL IT)
  {
    id: 'tod',
    subTab: 'truth-or-dare',
    title: 'Truth or Dare',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Party Favorite',
    emoji: '🔥',
    bgGradient: 'from-rose-500 to-pink-600',
  },
  {
    id: '2t1l',
    subTab: 'two-truths',
    title: '2 Truths & 1 Lie',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Spot the Lie',
    emoji: '🤥',
    bgGradient: 'from-emerald-500 to-green-600',
  },
  {
    id: 'tod',
    subTab: 'would-you-rather',
    title: 'Would You Rather',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Social Vote',
    emoji: '⚖️',
    bgGradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'tod',
    subTab: 'never-have-i-ever',
    title: 'Never Have I Ever',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Confessions',
    emoji: '🙈',
    bgGradient: 'from-fuchsia-500 to-purple-600',
  },

  // 3. MYSTERY & DETECTIVE FORENSICS
  {
    id: 'mystery',
    subTab: 'crime-scene',
    title: 'The Case Files',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Crime Scene',
    emoji: '🔍',
    bgGradient: 'from-amber-600 to-yellow-600',
  },
  {
    id: 'mystery',
    subTab: 'safe-code',
    title: 'Vault Safe Codebreaker',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Vault Code',
    emoji: '🔐',
    bgGradient: 'from-yellow-500 to-amber-700',
  },
  {
    id: 'mystery',
    subTab: 'daily-riddles',
    title: 'Detective Riddles',
    genre: 'mystery',
    genreLabel: 'Mystery Riddles',
    tag: 'Story Riddles',
    emoji: '📜',
    bgGradient: 'from-violet-600 to-indigo-600',
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
    <section className="w-full flex flex-col gap-3 mb-5 animate-fade-in">
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
                className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all font-['Fredoka'] ${
                  isSelected
                    ? 'bg-[#e52521] text-white border-2 border-[#9e100e] shadow-[2px_2px_0_#9e100e]'
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

      {/* ---------------- PARALLEL BROAD LINES (GAME ICON + NAME + SMALL PLAY BUTTON) ---------------- */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
          {filteredGames.map((game, idx) => {
            const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
            return (
              <div
                key={`${game.id}-${game.subTab || idx}`}
                onClick={() => {
                  sound.playTap();
                  onSelectGame(game.id, game.subTab);
                }}
                className="w-full p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#1e293b] hover:border-[#e52521] hover:shadow-[3px_3px_0_#000] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                {/* Left: Game Icon & Title */}
                <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden min-w-0">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr ${game.bgGradient} border-2 border-white dark:border-slate-700 flex items-center justify-center text-xl sm:text-2xl shadow-sm shrink-0 group-hover:scale-105 transition-transform`}>
                    {game.emoji}
                  </div>

                  <div className="flex items-center gap-2 overflow-hidden min-w-0 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight font-['Fredoka'] group-hover:text-[#e52521] dark:group-hover:text-[#ff4a47] transition-colors truncate">
                      {game.title}
                    </h4>
                    <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md font-['Fredoka'] shrink-0 ${theme.tagBg}`}>
                      {game.tag}
                    </span>
                  </div>
                </div>

                {/* Right: Small Play Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playTap();
                    onSelectGame(game.id, game.subTab);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shrink-0 transition font-['Fredoka'] ${theme.buttonBg}`}
                >
                  <span>Play</span>
                  <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#161a29] border-2 border-black dark:border-[#2f3752] text-center shadow-[2px_2px_0_#000]">
          <span className="text-2xl mb-1 block">🔍</span>
          <p className="text-xs font-black text-slate-800 dark:text-white font-['Fredoka']">No games found</p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-['Fredoka'] mt-0.5">Try another search keyword or select All Games.</p>
        </div>
      )}
    </section>
  );
};
