import React, { useState, useMemo } from 'react';
import { 
  Brain, MessageSquare, Search, Dices, Play, Sparkles, Filter
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
    desc: 'Fast-paced numeric sliding tile merger. Combine matching powers of 2 to 2048',
    genre: 'brain',
    genreLabel: 'Brain & Logic',
    tag: 'Number Merge',
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
    desc: 'Procedural science & pop trivia rounds. Test your radar and spot the deceptive lie!',
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
    genreLabel: 'Mystery & Detective',
    tag: 'Forensics',
    emoji: '🔍',
    bgGradient: 'from-amber-600 to-yellow-600',
    accentColor: 'text-amber-400',
  },
  {
    id: 'mystery',
    subTab: 'safe-code',
    title: 'Vault Safe Codebreaker',
    desc: '4-digit deduction keypad safe. Crack the secret code using exact & misplaced hints',
    genre: 'mystery',
    genreLabel: 'Mystery & Detective',
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
    genreLabel: 'Mystery & Detective',
    tag: '10k Riddles',
    emoji: '📜',
    bgGradient: 'from-violet-600 to-indigo-600',
    accentColor: 'text-violet-400',
  },

  // 4. ARCADE CLASSICS & QUICK PLAY
  {
    id: 'tictactoe',
    title: 'Tic Tac Toe',
    desc: 'Classic 3x3 grid battle against intelligent AI or pass-and-play 2-player friend mode',
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
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  const genres = [
    { id: 'all', label: 'All Games', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'brain', label: 'Brain & Logic', icon: <Brain className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'social', label: 'Social & Party', icon: <MessageSquare className="w-3.5 h-3.5 text-rose-400" /> },
    { id: 'mystery', label: 'Mystery & Forensics', icon: <Search className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'arcade', label: 'Arcade Classics', icon: <Dices className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  // Filter games based on search query and genre filter
  const filteredGames = useMemo(() => {
    return ALL_GAMES_DATA.filter((game) => {
      const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesGenre;
      const matchesQuery = 
        game.title.toLowerCase().includes(q) ||
        game.desc.toLowerCase().includes(q) ||
        game.genreLabel.toLowerCase().includes(q) ||
        game.tag.toLowerCase().includes(q);
      return matchesGenre && matchesQuery;
    });
  }, [selectedGenre, searchQuery]);

  return (
    <section className="w-full flex flex-col gap-4 mb-8">
      {/* Section Header & Genre Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎮</span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              All Game Genres
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 font-extrabold border border-violet-500/30">
              {filteredGames.length} Available
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Instant browser play with zero download. All progress autosaves!
          </p>
        </div>

        {/* Genre Filter Pills (Horizontal Scrollable on Mobile) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none max-w-full">
          {genres.map((g) => {
            const isActive = selectedGenre === g.id;
            return (
              <button
                key={g.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedGenre(g.id);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30 ring-1 ring-violet-400'
                    : 'bg-[#1c1e2f] border border-white/10 text-slate-300 hover:text-white hover:bg-[#25283f]'
                }`}
              >
                {g.icon}
                <span>{g.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Games Responsive Grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
          {filteredGames.map((game, idx) => (
            <div
              key={`${game.id}-${game.subTab || idx}`}
              onClick={() => {
                sound.playTap();
                onSelectGame(game.id, game.subTab);
              }}
              className="group p-4 rounded-3xl bg-[#1c1e2f] border border-white/10 hover:border-violet-400/80 hover:bg-[#22253a] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              {/* Top Row: Icon + Genre Badge + Play Indicator */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${game.bgGradient} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition-transform shrink-0`}>
                    {game.emoji}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white group-hover:text-violet-300 transition-colors leading-tight">
                      {game.title}
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                      {game.genreLabel}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase shrink-0">
                  {game.tag}
                </span>
              </div>

              {/* Game Description */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {game.desc}
              </p>

              {/* Action Button: Play Now */}
              <div className="w-full pt-1 flex items-center justify-between">
                <span className={`text-[11px] font-black ${game.accentColor} flex items-center gap-1 group-hover:translate-x-0.5 transition-transform`}>
                  <span>Play Instant</span>
                  <span>→</span>
                </span>
                <div className="w-7 h-7 rounded-xl bg-violet-600/20 group-hover:bg-violet-600 text-violet-300 group-hover:text-white flex items-center justify-center transition-colors">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 rounded-3xl bg-[#1c1e2f] border border-white/10 text-center flex flex-col items-center justify-center">
          <Filter className="w-8 h-8 text-slate-500 mb-2" />
          <h4 className="text-sm font-black text-white mb-1">No Games Found</h4>
          <p className="text-xs text-slate-400">
            No games match &ldquo;{searchQuery}&rdquo;. Try another search keyword or clear the filter.
          </p>
        </div>
      )}
    </section>
  );
};
