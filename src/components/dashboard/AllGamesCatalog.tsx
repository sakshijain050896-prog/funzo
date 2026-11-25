import React, { useState, useMemo } from 'react';
import { Sparkles, Search, LayoutGrid, Lightbulb, Brain, Flame, Smile, LucideIcon } from 'lucide-react';
import { GameIconTile } from './GameArt';
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
  // 0. QUIZ UP TRIVIA (Single entry for "All Games" tab)
  {
    id: 'quizup',
    subTab: 'all',
    title: 'Quiz Up',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Trivia & GK',
    emoji: '💡',
    bgGradient: 'from-[#fef08a] to-[#fde047]',
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

// ---------------- ALL TOPIC-WISE LINES FOR QUIZ UP CATEGORY ----------------
export const QUIZ_TOPIC_ITEMS: GameCatalogItem[] = [
  {
    id: 'quizup',
    subTab: 'cinema',
    title: 'Quiz Up: Cinema (Bolly & Holly)',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Movies, Actors & Oscars',
    emoji: '🎬',
    bgGradient: 'from-[#fecdd3] to-[#fda4af]',
  },
  {
    id: 'quizup',
    subTab: 'science',
    title: 'Quiz Up: Science & Biology',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Living World & Nature',
    emoji: '🔬',
    bgGradient: 'from-[#d1fae5] to-[#a7f3d0]',
  },
  {
    id: 'quizup',
    subTab: 'physics',
    title: 'Quiz Up: Physics & Energy',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Forces, Space & Optics',
    emoji: '⚡',
    bgGradient: 'from-[#e0f2fe] to-[#bae6fd]',
  },
  {
    id: 'quizup',
    subTab: 'chemistry',
    title: 'Quiz Up: Chemistry & Elements',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Reactions, Acids & Elements',
    emoji: '🧪',
    bgGradient: 'from-[#ede9fe] to-[#ddd6fe]',
  },
  {
    id: 'quizup',
    subTab: 'history',
    title: 'Quiz Up: World History',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Empires, Wars & Wonders',
    emoji: '🏛️',
    bgGradient: 'from-[#ffedd5] to-[#fed7aa]',
  },
  {
    id: 'quizup',
    subTab: 'math',
    title: 'Quiz Up: Math & Logic',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Numbers, Algebra & IQ',
    emoji: '🧮',
    bgGradient: 'from-[#ffe4e6] to-[#fecdd3]',
  },
  {
    id: 'quizup',
    subTab: 'geography',
    title: 'Quiz Up: Geography & Wonders',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'World Capitals & Oceans',
    emoji: '🌍',
    bgGradient: 'from-[#ccfbf1] to-[#99f6e4]',
  },
  {
    id: 'quizup',
    subTab: 'tech',
    title: 'Quiz Up: Tech & Inventions',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Computers, AI & Internet',
    emoji: '💻',
    bgGradient: 'from-[#e0e7ff] to-[#c7d2fe]',
  },
  {
    id: 'quizup',
    subTab: 'sports',
    title: 'Quiz Up: Sports & Olympics',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Cricket, Football & Records',
    emoji: '⚽',
    bgGradient: 'from-[#ecfccb] to-[#d9f99d]',
  },
  {
    id: 'quizup',
    subTab: 'all',
    title: 'Quiz Up: All Topics Trivia Mix',
    genre: 'quiz',
    genreLabel: 'Quiz Up',
    tag: 'Universal GK Challenge',
    emoji: '🌟',
    bgGradient: 'from-[#fef08a] to-[#fde047]',
  },
];

const CATEGORY_TABS: { id: CategoryFilter; label: string; emoji: string; icon: LucideIcon }[] = [
  { id: 'all', label: 'All Games', emoji: '⭐', icon: LayoutGrid },
  { id: 'quiz', label: 'Quiz Up', emoji: '💡', icon: Lightbulb },
  { id: 'brain', label: 'Brain & Logic', emoji: '🧩', icon: Brain },
  { id: 'social', label: 'Party & Social', emoji: '🔥', icon: Flame },
  { id: 'kids', label: 'Kids Games', emoji: '🎈', icon: Smile },
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
      // Search matches across both general games and all specific Quiz Up topics
      return [...ALL_GAMES_DATA, ...QUIZ_TOPIC_ITEMS].filter((game) =>
        game.title.toLowerCase().includes(q) ||
        game.genreLabel.toLowerCase().includes(q) ||
        game.tag.toLowerCase().includes(q)
      );
    }
    if (selectedCategory === 'all') {
      // In "All Games" tab, show one clean single card for Quiz Up
      return ALL_GAMES_DATA;
    }
    if (selectedCategory === 'quiz') {
      // In "Quiz Up" category, ALL topic-wise cards should come!
      return QUIZ_TOPIC_ITEMS;
    }
    return ALL_GAMES_DATA.filter((game) => game.genre === selectedCategory);
  }, [searchQuery, selectedCategory]);

  const activeTabInfo = CATEGORY_TABS.find((t) => t.id === selectedCategory);
  const isSearching = searchQuery.trim().length > 0;

  return (
    <section className="w-full flex flex-col gap-4 sm:gap-5 mb-6 animate-fade-in" id="games">
      {/* ---------------- CATEGORY FILTER TABS ---------------- */}
      <div className="w-full flex items-center gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 py-1">
        {CATEGORY_TABS.map((tab) => {
          const isSelected = selectedCategory === tab.id && !isSearching;
          const count = tab.id === 'all'
            ? ALL_GAMES_DATA.length
            : tab.id === 'quiz'
            ? QUIZ_TOPIC_ITEMS.length
            : ALL_GAMES_DATA.filter((g) => g.genre === tab.id).length;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playTap();
                setSelectedCategory(tab.id);
              }}
              className={`group relative h-10 pl-3 pr-2 rounded-full text-[13px] font-semibold flex items-center gap-2 shrink-0 transition-all duration-200 ${
                isSelected
                  ? 'fz-btn-primary'
                  : 'fz-btn-ghost text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-violet-500 dark:text-violet-400'}`} />
              <span className="whitespace-nowrap">{tab.label}</span>
              <span className={`min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-bold flex items-center justify-center tabular-nums ${
                isSelected
                  ? 'bg-white/25 text-white'
                  : 'bg-slate-900/5 dark:bg-white/10 text-slate-500 dark:text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Section heading */}
      <div className="flex items-end justify-between gap-3 px-0.5">
        <div className="min-w-0">
          {isSearching ? (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-500 dark:text-violet-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Search
              </p>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900 dark:text-white truncate">
                Results for &ldquo;{searchQuery}&rdquo;
              </h2>
            </>
          ) : (
            <>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-500 dark:text-violet-400">
                {selectedCategory === 'all' ? 'Browse' : 'Category'}
              </p>
              <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">
                {selectedCategory === 'all'
                  ? 'All Games'
                  : selectedCategory === 'quiz'
                  ? 'Quiz Up Topics'
                  : `${activeTabInfo?.label} Games`}
              </h2>
            </>
          )}
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-500 dark:text-slate-400 tabular-nums">
          {filteredGames.length} {selectedCategory === 'quiz' && !isSearching ? 'topics' : 'games'}
        </span>
      </div>

      {/* ---------------- GAME ICON GRID ---------------- */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-x-3 gap-y-5 sm:gap-x-5 sm:gap-y-7 w-full justify-items-center">
          {filteredGames.map((game, idx) => (
            <GameIconTile
              key={`${game.id}-${game.subTab || idx}`}
              game={game}
              index={idx}
              onPlay={() => {
                sound.playTap();
                onSelectGame(game.id, game.subTab);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="fz-card p-10 text-center flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-3">
            <Search className="w-6 h-6 text-violet-500" />
          </div>
          <p className="font-display text-base font-bold text-slate-900 dark:text-white">No games found</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try another keyword or browse All Games.</p>
        </div>
      )}
    </section>
  );
};
