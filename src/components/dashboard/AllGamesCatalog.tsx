import React, { useState, useMemo } from 'react';
import { 
  Brain, MessageSquare, Search, Dices, Play, ArrowLeft, ChevronRight
} from 'lucide-react';
import { GameKey } from './PopularGames';
import { sound } from '../../lib/soundEffects';

export interface GameCatalogItem {
  id: GameKey;
  subTab?: string;
  title: string;
  desc: string;
  genre: 'brain' | 'social' | 'mystery' | 'arcade';
  genreLabel: string;
  tag: string;
  emoji: string;
  bgGradient: string;
  accentColor: string;
}

export interface CategoryInfo {
  id: 'brain' | 'social' | 'mystery' | 'arcade';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  emoji: string;
  gradient: string;
  borderHover: string;
  gamesList: string[];
}

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'brain',
    title: 'Brain & Logic Puzzles',
    subtitle: 'Train deduction, math & spatial reasoning',
    icon: <Brain className="w-6 h-6 text-sky-500 dark:text-sky-400" />,
    emoji: '🧩',
    gradient: 'from-sky-50 via-blue-50/70 to-indigo-50 dark:from-sky-500/20 dark:via-blue-500/10 dark:to-indigo-500/20',
    borderHover: 'hover:border-sky-400 border-sky-200 dark:border-white/10',
    gamesList: ['Sudoku Master', 'Arrow Out', '2048 Rush'],
  },
  {
    id: 'social',
    title: 'Social & Party Decks',
    subtitle: 'Spill It party games with 10k+ questions',
    icon: <MessageSquare className="w-6 h-6 text-rose-500 dark:text-rose-400" />,
    emoji: '🔥',
    gradient: 'from-rose-50 via-pink-50/70 to-fuchsia-50 dark:from-rose-500/20 dark:via-pink-500/10 dark:to-fuchsia-500/20',
    borderHover: 'hover:border-rose-400 border-rose-200 dark:border-white/10',
    gamesList: ['Truth or Dare', '2 Truths & 1 Lie', 'Would You Rather', 'Never Have I Ever'],
  },
  {
    id: 'mystery',
    title: 'Mystery & Forensics',
    subtitle: 'Crack the vault safe, inspect crime scenes & riddles',
    icon: <Search className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
    emoji: '🔍',
    gradient: 'from-amber-50 via-yellow-50/70 to-orange-50 dark:from-amber-500/20 dark:via-yellow-500/10 dark:to-orange-500/20',
    borderHover: 'hover:border-amber-400 border-amber-200 dark:border-white/10',
    gamesList: ['The Case Files', 'Vault Safe Codebreaker', 'Detective Riddles'],
  },
  {
    id: 'arcade',
    title: 'Arcade & Quick Play',
    subtitle: 'Classic fast-paced mini games vs AI or friends',
    icon: <Dices className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
    emoji: '🎲',
    gradient: 'from-emerald-50 via-teal-50/70 to-cyan-50 dark:from-emerald-500/20 dark:via-teal-500/10 dark:to-cyan-500/20',
    borderHover: 'hover:border-emerald-400 border-emerald-200 dark:border-white/10',
    gamesList: ['Tic Tac Toe', 'Memory Match', 'Dice Roll & Luck'],
  },
];

export const CATEGORY_THEMES: Record<string, { tagBg: string; buttonBg: string }> = {
  brain: {
    tagBg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 border-sky-300/80 dark:border-sky-500/30',
    buttonBg: 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-sky-500/25',
  },
  social: {
    tagBg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border-rose-300/80 dark:border-rose-500/30',
    buttonBg: 'bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-rose-500/25',
  },
  mystery: {
    tagBg: 'bg-amber-100 text-amber-900 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300/80 dark:border-amber-500/30',
    buttonBg: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black shadow-amber-500/25',
  },
  arcade: {
    tagBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border-emerald-300/80 dark:border-emerald-500/30',
    buttonBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25',
  },
};

export const ALL_GAMES_DATA: GameCatalogItem[] = [
  // 1. BRAIN & LOGIC PUZZLES
  {
    id: 'sudoku',
    title: 'Sudoku Master',
    desc: 'Classic 9x9 deduction grid with Easy, Medium & Hard modes and Daily Challenge',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Daily Grid',
    emoji: '🧩',
    bgGradient: 'from-sky-500 to-blue-600',
    accentColor: 'text-sky-400',
  },
  {
    id: 'arrows',
    title: 'Arrow Out',
    desc: '10,000 sequential spatial levels. Clear intersecting paths and escape the grid',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: '10k Levels',
    emoji: '🚀',
    bgGradient: 'from-teal-500 to-emerald-600',
    accentColor: 'text-emerald-400',
  },
  {
    id: '2048',
    title: '2048 Rush',
    desc: 'Fast numeric sliding tile merger. Combine powers of 2 to reach the 2048 tile',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Number Rush',
    emoji: '⚡',
    bgGradient: 'from-purple-500 to-indigo-600',
    accentColor: 'text-purple-400',
  },

  // 2. SOCIAL & PARTY (SPILL IT)
  {
    id: 'tod',
    subTab: 'truth-or-dare',
    title: 'Truth or Dare',
    desc: '10,000+ dynamic questions across Kitty, Spicy, Wild & Deep confessional decks',
    genre: 'social',
    genreLabel: 'Social & Party',
    tag: 'Party Deck',
    emoji: '🔥',
    bgGradient: 'from-rose-500 to-pink-600',
    accentColor: 'text-rose-400',
  },
  {
    id: '2t1l',
    subTab: 'two-truths',
    title: '2 Truths & 1 Lie',
    desc: 'Procedural science & trivia rounds. Test your radar and spot the impostor lie!',
    genre: 'social',
    genreLabel: 'Social & Party',
    tag: 'Lie Spotter',
    emoji: '🤥',
    bgGradient: 'from-lime-500 to-green-600',
    accentColor: 'text-lime-400',
  },
  {
    id: 'tod',
    subTab: 'would-you-rather',
    title: 'Would You Rather',
    desc: 'Wild moral & hilarious dilemmas with live % community vote breakdown',
    genre: 'social',
    genreLabel: 'Social & Party',
    tag: 'Social Vote',
    emoji: '⚖️',
    bgGradient: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-400',
  },
  {
    id: 'tod',
    subTab: 'never-have-i-ever',
    title: 'Never Have I Ever',
    desc: 'Secret party confessions and guilty admits. Put a finger down if you did it!',
    genre: 'social',
    genreLabel: 'Social & Party',
    tag: 'Confessions',
    emoji: '🙈',
    bgGradient: 'from-fuchsia-500 to-purple-600',
    accentColor: 'text-fuchsia-400',
  },

  // 3. MYSTERY & DETECTIVE FORENSICS
  {
    id: 'mystery',
    subTab: 'crime-scene',
    title: 'The Case Files',
    desc: 'Inspect crime scene hotspots, forensic clues, interrogate suspects & arrest the killer',
    genre: 'mystery',
    genreLabel: 'Mystery & Forensics',
    tag: 'Forensics',
    emoji: '🔍',
    bgGradient: 'from-amber-600 to-yellow-600',
    accentColor: 'text-amber-400',
  },
  {
    id: 'mystery',
    subTab: 'safe-code',
    title: 'Vault Safe Codebreaker',
    desc: '4-digit deduction keypad safe. Crack the secret code using exact & misplaced clues',
    genre: 'mystery',
    genreLabel: 'Mystery & Forensics',
    tag: 'Vault Safe',
    emoji: '🔐',
    bgGradient: 'from-yellow-500 to-amber-700',
    accentColor: 'text-yellow-400',
  },
  {
    id: 'mystery',
    subTab: 'daily-riddles',
    title: 'Detective Riddles',
    desc: '10,000+ detective stories with Clue 1 & 2 + 4 interactive choices before explanation',
    genre: 'mystery',
    genreLabel: 'Mystery & Forensics',
    tag: '10k Riddles',
    emoji: '📜',
    bgGradient: 'from-violet-600 to-indigo-600',
    accentColor: 'text-violet-400',
  },

  // 4. ARCADE CLASSICS & QUICK PLAY
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    desc: 'Classic 3x3 battle against adaptive Smart AI or 2-player pass mode',
    genre: 'arcade',
    genreLabel: 'Arcade Classics',
    tag: 'Smart AI',
    emoji: '❌⭕',
    bgGradient: 'from-amber-500 to-orange-600',
    accentColor: 'text-orange-400',
  },
  {
    id: 'memory',
    title: 'Memory Match',
    desc: '16-card brain card flipping challenge. Match all 8 pairs with timer and move tracker',
    genre: 'arcade',
    genreLabel: 'Arcade Classics',
    tag: 'Memory Gym',
    emoji: '🧠',
    bgGradient: 'from-purple-500 to-fuchsia-600',
    accentColor: 'text-purple-400',
  },
  {
    id: 'dice',
    title: 'Dice Roll & Luck',
    desc: '3D rolling dice with physics. Predict Under 7, Lucky 7 or Over 7 to multiply your coins',
    genre: 'arcade',
    genreLabel: 'Arcade Classics',
    tag: 'Roll & Win',
    emoji: '🎲',
    bgGradient: 'from-teal-500 to-cyan-600',
    accentColor: 'text-teal-400',
  },
];

interface AllGamesCatalogProps {
  onSelectGame: (gameKey: GameKey, subTab?: string) => void;
  searchQuery?: string;
}

export const AllGamesCatalog: React.FC<AllGamesCatalogProps> = ({
  onSelectGame,
  searchQuery = '',
}) => {
  // Navigation State: null = Categories View; or 'brain' | 'social' | 'mystery' | 'arcade' = Games in that Category
  const [selectedCategory, setSelectedCategory] = useState<'brain' | 'social' | 'mystery' | 'arcade' | null>(null);

  // If user is actively searching, show search results across all games
  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    const q = searchQuery.trim().toLowerCase();
    return ALL_GAMES_DATA.filter((game) => 
      game.title.toLowerCase().includes(q) ||
      game.desc.toLowerCase().includes(q) ||
      game.genreLabel.toLowerCase().includes(q) ||
      game.tag.toLowerCase().includes(q)
    );
  }, [searchQuery, isSearching]);

  // Current category games
  const currentCategoryGames = useMemo(() => {
    if (!selectedCategory) return [];
    return ALL_GAMES_DATA.filter((g) => g.genre === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryInfo = CATEGORIES_DATA.find((c) => c.id === selectedCategory);

  return (
    <section className="w-full flex flex-col gap-3 mb-6 animate-fade-in">
      {/* ---------------- SCENARIO 1: SEARCH ACTIVE ---------------- */}
      {isSearching ? (
        <div className="w-full flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black text-slate-700 dark:text-slate-300">
              Search Results for &ldquo;{searchQuery}&rdquo; ({searchResults.length})
            </span>
          </div>

          {searchResults.length > 0 ? (
            <div className="flex flex-col gap-2">
              {searchResults.map((game, idx) => {
                const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
                return (
                  <div
                    key={`${game.id}-${game.subTab || idx}`}
                    onClick={() => {
                      sound.playTap();
                      onSelectGame(game.id, game.subTab);
                    }}
                    className="w-full p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-[#22253a] shadow-sm flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${game.bgGradient} flex items-center justify-center text-xl shadow-md shrink-0`}>
                        {game.emoji}
                      </div>
                      <div className="overflow-hidden">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors truncate">
                            {game.title}
                          </h4>
                          <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${theme.tagBg}`}>
                            {game.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate mt-0.5">{game.desc}</p>
                      </div>
                    </div>

                    <button className={`px-3 py-1.5 rounded-xl text-white font-black text-xs flex items-center gap-1 shrink-0 shadow-md transition ${theme.buttonBg}`}>
                      <span>Play</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-[#1c1e2f] border border-slate-200 dark:border-white/10 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">No games matched your search.</p>
            </div>
          )}
        </div>
      ) : selectedCategory === null ? (
        /* ---------------- SCENARIO 2: CATEGORIES FIRST (HOME VIEW) ---------------- */
        <div className="w-full flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-wide flex items-center gap-2">
                <span>🎮</span>
                <span>Game Categories</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose a category to explore games &amp; play instantly
              </p>
            </div>
          </div>

          {/* 4 Interactive Category Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedCategory(cat.id);
                }}
                className={`p-4 rounded-3xl bg-gradient-to-br ${cat.gradient} bg-white dark:bg-[#1c1e2f] border ${cat.borderHover} shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer flex flex-col justify-between gap-3 group`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/90 dark:bg-[#161726] border border-slate-200/80 dark:border-white/10 flex items-center justify-center text-2xl shadow-sm group-hover:scale-105 transition-transform">
                      {cat.emoji}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-white transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-1 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-200/60 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-transform shrink-0">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Sub-Games Pills Preview */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-200/60 dark:border-white/5">
                  {cat.gamesList.map((gName, gIdx) => (
                    <span
                      key={gIdx}
                      className="px-2 py-0.5 rounded-full bg-white/90 dark:bg-[#12131f]/70 border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-700 dark:text-slate-300"
                    >
                      {gName}
                    </span>
                  ))}
                  <span className="text-[10px] text-violet-600 dark:text-violet-400 font-extrabold ml-auto flex items-center gap-0.5">
                    Browse →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ---------------- SCENARIO 3: GAMES IN SELECTED CATEGORY (COMPACT ROWS) ---------------- */
        <div className="w-full flex flex-col gap-3 animate-fade-in">
          {/* Category Top Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 shadow-sm">
            <button
              onClick={() => {
                sound.playTap();
                setSelectedCategory(null);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#24273d] dark:hover:bg-[#2d304d] text-xs font-black text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-base">{activeCategoryInfo?.emoji}</span>
              <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {activeCategoryInfo?.title}
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-700 dark:text-violet-300 border border-violet-500/30">
                {currentCategoryGames.length} Games
              </span>
            </div>
          </div>

          {/* Compact Games List with Distinct Category Contrast Theme */}
          <div className="flex flex-col gap-2">
            {currentCategoryGames.map((game, idx) => {
              const theme = CATEGORY_THEMES[game.genre] || CATEGORY_THEMES.brain;
              return (
                <div
                  key={`${game.id}-${game.subTab || idx}`}
                  onClick={() => {
                    sound.playTap();
                    onSelectGame(game.id, game.subTab);
                  }}
                  className="w-full p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-[#1c1e2f] border border-slate-200/90 dark:border-white/10 hover:border-violet-500 hover:bg-slate-50 dark:hover:bg-[#22253a] shadow-sm flex items-center justify-between gap-3 cursor-pointer group active:scale-[0.99] transition duration-150"
                >
                  {/* Left: Icon & Details */}
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.bgGradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                      {game.emoji}
                    </div>

                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors truncate">
                          {game.title}
                        </h4>
                        <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${theme.tagBg}`}>
                          {game.tag}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                        {game.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right: Play Action Button with High Category Contrast */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playTap();
                      onSelectGame(game.id, game.subTab);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 shadow-md active:scale-95 transition ${theme.buttonBg}`}
                  >
                    <span>Play</span>
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
