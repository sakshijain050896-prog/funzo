import React, { useState, useMemo } from 'react';
import { Play, Sparkles } from 'lucide-react';
import { GameKey } from './PopularGames';
import { sound } from '../../lib/soundEffects';

export type CategoryFilter = 'quiz' | 'all' | 'brain' | 'social' | 'kids';

export interface GameCatalogItem {
  id: GameKey;
  subTab?: string;
  title: string;
  genre: 'quiz' | 'brain' | 'social' | 'kids';
  genreLabel: string;
  tag: string;
  emoji: string;
  bgGradient: string;
}

export const CATEGORY_THEMES: Record<string, { tagBg: string; buttonBg: string }> = {
  quiz: {
    tagBg: 'bg-[#fef9c3] text-[#854d0e] dark:bg-amber-950/70 dark:text-amber-300 border border-[#fef08a] dark:border-amber-800/40',
    buttonBg: 'bg-[#fef08a] hover:bg-[#fde047] text-[#854d0e] border-b-3 border-[#eab308] shadow-sm active:translate-y-0.5',
  },
  brain: {
    tagBg: 'bg-[#e0f2fe] text-[#0369a1] dark:bg-sky-950/70 dark:text-sky-300 border border-[#bae6fd] dark:border-sky-800/40',
    buttonBg: 'bg-[#bae6fd] hover:bg-[#7dd3fc] text-[#0369a1] border-b-3 border-[#38bdf8] shadow-sm active:translate-y-0.5',
  },
  social: {
    tagBg: 'bg-[#ffe4e6] text-[#be123c] dark:bg-rose-950/70 dark:text-rose-300 border border-[#fecdd3] dark:border-rose-800/40',
    buttonBg: 'bg-[#fecdd3] hover:bg-[#fda4af] text-[#9f1239] border-b-3 border-[#f43f5e] shadow-sm active:translate-y-0.5',
  },
  kids: {
    tagBg: 'bg-[#d1fae5] text-[#065f46] dark:bg-emerald-950/70 dark:text-emerald-300 border border-[#a7f3d0] dark:border-emerald-800/40',
    buttonBg: 'bg-[#a7f3d0] hover:bg-[#6ee7b7] text-[#065f46] border-b-3 border-[#34d399] shadow-sm active:translate-y-0.5',
  },
};

export const ALL_GAMES_DATA: GameCatalogItem[] = [
  // 0. QUIZ UP TRIVIA
  {
    id: 'quizup',
    subTab: 'all',
    title: 'Quiz Up: General Knowledge',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'All GK Trivia',
    emoji: '💡',
    bgGradient: 'from-[#fef08a] to-[#fde047]',
  },
  {
    id: 'quizup',
    subTab: 'cinema',
    title: 'Quiz Up: Bollywood & Hollywood',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Movies & Cinema',
    emoji: '🎬',
    bgGradient: 'from-[#fecdd3] to-[#fda4af]',
  },
  {
    id: 'quizup',
    subTab: 'science',
    title: 'Quiz Up: Science & Nature',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Biology & Space',
    emoji: '🔬',
    bgGradient: 'from-[#a7f3d0] to-[#6ee7b7]',
  },
  {
    id: 'quizup',
    subTab: 'physics',
    title: 'Quiz Up: Physics & Energy',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Forces & Energy',
    emoji: '⚡',
    bgGradient: 'from-[#bae6fd] to-[#7dd3fc]',
  },
  {
    id: 'quizup',
    subTab: 'chemistry',
    title: 'Quiz Up: Chemistry & Elements',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Elements & Reactions',
    emoji: '🧪',
    bgGradient: 'from-[#ddd6fe] to-[#c4b5fd]',
  },
  {
    id: 'quizup',
    subTab: 'history',
    title: 'Quiz Up: World History',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'World Events & Civs',
    emoji: '🏛️',
    bgGradient: 'from-[#fed7aa] to-[#fdba74]',
  },
  {
    id: 'quizup',
    subTab: 'math',
    title: 'Quiz Up: Math & Logic',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Numbers & Geometry',
    emoji: '🧮',
    bgGradient: 'from-[#fecdd3] to-[#fda4af]',
  },
  {
    id: 'quizup',
    subTab: 'geography',
    title: 'Quiz Up: Geography & Wonders',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'World Wonders',
    emoji: '🌍',
    bgGradient: 'from-[#ccfbf1] to-[#99f6e4]',
  },
  {
    id: 'quizup',
    subTab: 'tech',
    title: 'Quiz Up: Tech & Inventions',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Computers & Gadgets',
    emoji: '💻',
    bgGradient: 'from-[#e0e7ff] to-[#c7d2fe]',
  },
  {
    id: 'quizup',
    subTab: 'sports',
    title: 'Quiz Up: Sports & Olympics',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Cricket & Football',
    emoji: '⚽',
    bgGradient: 'from-[#ecfccb] to-[#d9f99d]',
  },

  // 1. BRAIN & LOGIC PUZZLES
  {
    id: 'sudoku',
    title: 'Maths Puzzle',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Math & Logic',
    emoji: '🧮',
    bgGradient: 'from-[#bae6fd] to-[#93c5fd]',
  },
  {
    id: 'arrows',
    title: 'Arrow Out',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Spatial Maze',
    emoji: '🚀',
    bgGradient: 'from-[#a7f3d0] to-[#6ee7b7]',
  },
  {
    id: '2048',
    title: '2048 Rush',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Number Merge',
    emoji: '⚡',
    bgGradient: 'from-[#e9d5ff] to-[#c4b5fd]',
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
    bgGradient: 'from-[#fecdd3] to-[#fda4af]',
  },
  {
    id: '2t1l',
    subTab: 'two-truths',
    title: '2 Truths & 1 Lie',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Spot the Lie',
    emoji: '🤥',
    bgGradient: 'from-[#d9f99d] to-[#bef264]',
  },
  {
    id: 'tod',
    subTab: 'would-you-rather',
    title: 'Would You Rather',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Social Vote',
    emoji: '⚖️',
    bgGradient: 'from-[#fed7aa] to-[#fdba74]',
  },
  {
    id: 'tod',
    subTab: 'never-have-i-ever',
    title: 'Never Have I Ever',
    genre: 'social',
    genreLabel: 'Party & Social',
    tag: 'Confessions',
    emoji: '🙈',
    bgGradient: 'from-[#fbcfe8] to-[#f472b6]',
  },

  // 3. KIDS FUN
  {
    id: 'balloon',
    title: 'Balloon Pop',
    genre: 'kids',
    genreLabel: 'Kids Fun',
    tag: 'Balloon Fun',
    emoji: '🎈',
    bgGradient: 'from-[#fecdd3] to-[#f472b6]',
  },
  {
    id: 'memory',
    title: 'Animal Memory Match',
    genre: 'kids',
    genreLabel: 'Kids Fun',
    tag: 'Animal Match',
    emoji: '🐶',
    bgGradient: 'from-[#fef08a] to-[#fde047]',
  },
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    genre: 'kids',
    genreLabel: 'Kids Fun',
    tag: '3-in-a-Row',
    emoji: '❌⭕',
    bgGradient: 'from-[#a7f3d0] to-[#5eead4]',
  },
];

const CATEGORY_TABS: { id: CategoryFilter; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Games', emoji: '⭐' },
  { id: 'quiz', label: 'Quiz Up', emoji: '💡' },
  { id: 'brain', label: 'Brain & Logic', emoji: '🧩' },
  { id: 'social', label: 'Party & Social', emoji: '🔥' },
  { id: 'kids', label: 'Kids Games', emoji: '🎈' },
];

interface AllGamesCatalogProps {
  onSelectGame: (gameKey: GameKey, subTab?: string) => void;
  searchQuery?: string;
  selectedCategory?: CategoryFilter;
  onSelectCategory?: (category: CategoryFilter) => void;
}

export const AllGamesCatalog: React.FC<AllGamesCatalogProps> = ({
  onSelectGame,
  searchQuery = '',
  selectedCategory: propCategory,
  onSelectCategory: propOnSelectCategory,
}) => {
  const [internalCategory, setInternalCategory] = useState<CategoryFilter>('all');
  const selectedCategory = propCategory !== undefined ? propCategory : internalCategory;
  const setSelectedCategory = propOnSelectCategory !== undefined ? propOnSelectCategory : setInternalCategory;

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

  const activeTabInfo = CATEGORY_TABS.find((t) => t.id === selectedCategory);

  return (
    <section className="w-full flex flex-col gap-3 mb-5 animate-fade-in">
      {/* ---------------- CATEGORY FILTER TABS ---------------- */}
      <div className="w-full flex items-center justify-between gap-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 w-full">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id && !searchQuery.trim();
            const count = tab.id === 'all' 
              ? ALL_GAMES_DATA.length 
              : ALL_GAMES_DATA.filter((g) => g.genre === tab.id).length;

            let tabActiveStyle = 'bg-[#c7d2fe] text-[#312e81] border-2 border-[#a5b4fc] shadow-sm';
            if (tab.id === 'quiz') tabActiveStyle = 'bg-[#fef08a] text-[#854d0e] border-2 border-[#fde047] shadow-sm';
            if (tab.id === 'all') tabActiveStyle = 'bg-[#fef3c7] text-[#92400e] border-2 border-[#fde68a] shadow-sm';
            if (tab.id === 'brain') tabActiveStyle = 'bg-[#bae6fd] text-[#0369a1] border-2 border-[#7dd3fc] shadow-sm';
            if (tab.id === 'social') tabActiveStyle = 'bg-[#fecdd3] text-[#9f1239] border-2 border-[#fda4af] shadow-sm';
            if (tab.id === 'kids') tabActiveStyle = 'bg-[#a7f3d0] text-[#065f46] border-2 border-[#6ee7b7] shadow-sm';

            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedCategory(tab.id);
                }}
                className={`px-3 py-1.5 rounded-2xl text-xs font-black flex items-center gap-1.5 shrink-0 transition-all font-['Fredoka'] ${
                  isSelected
                    ? `${tabActiveStyle} scale-[1.02]`
                    : 'bg-white/80 dark:bg-[#181d2f]/80 text-slate-700 dark:text-slate-300 border-2 border-slate-200 dark:border-slate-700/60 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-pixel ${
                  isSelected 
                    ? 'bg-black/10 text-current' 
                    : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category / Search Banner */}
      {searchQuery.trim().length > 0 ? (
        <div className="flex items-center gap-1.5 px-1 text-xs font-black text-slate-700 dark:text-slate-300 font-['Fredoka']">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Search Results for &ldquo;{searchQuery}&rdquo; ({filteredGames.length} games)</span>
        </div>
      ) : selectedCategory !== 'all' && (
        <div className="flex items-center justify-between px-1 text-xs font-black text-slate-700 dark:text-slate-300 font-['Fredoka']">
          <div className="flex items-center gap-1.5">
            <span>{activeTabInfo?.emoji}</span>
            <span>{activeTabInfo?.label} Games</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300">
              {filteredGames.length}
            </span>
          </div>
        </div>
      )}

      {/* ---------------- GAMES PARALLELLY LINED UP (PARALLEL BROAD HORIZONTAL LINES) ---------------- */}
      {filteredGames.length > 0 ? (
        <div className="flex flex-col gap-2 sm:gap-2.5 w-full">
          {filteredGames.map((game, idx) => {
            const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
            return (
              <div
                key={`${game.id}-${game.subTab || idx}`}
                onClick={() => {
                  sound.playTap();
                  onSelectGame(game.id, game.subTab);
                }}
                className="w-full p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                {/* Left: Game Icon & Title */}
                <div className="flex items-center gap-3 overflow-hidden min-w-0">
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
