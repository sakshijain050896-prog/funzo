import React from 'react';
import { Flame, Coins, Volume2, VolumeX, BarChart3, Sun, Moon, HelpCircle, Brain, Cloud, User } from 'lucide-react';
import { PlayerStats, GenreType, ThemeMode, CARTOON_AVATARS, getIQRank } from '../types';
import { getCurrentUser } from '../lib/authService';

interface HeaderProps {
  stats: PlayerStats;
  theme: ThemeMode;
  soundEnabled: boolean;
  activeGenre: GenreType;
  onSelectGenre: (genre: GenreType) => void;
  onToggleTheme: () => void;
  onToggleSound: () => void;
  onOpenStats: () => void;
  onOpenProfile: () => void;
  onOpenHowToPlay: (gameId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  theme,
  soundEnabled,
  activeGenre,
  onSelectGenre,
  onToggleTheme,
  onToggleSound,
  onOpenStats,
  onOpenProfile,
  onOpenHowToPlay,
  onOpenAdmin,
}) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const rank = getIQRank(stats.iq || 105);
  const [logoClicks, setLogoClicks] = React.useState<number>(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    if (next >= 5) {
      setLogoClicks(0);
      if (onOpenAdmin) onOpenAdmin();
    } else {
      setLogoClicks(next);
      setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-slate-900/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-2.5 py-1.5 transition-colors">
      <div className="max-w-2xl mx-auto flex flex-col gap-1.5">
        {/* Compact Single Row Header */}
        <div className="flex items-center justify-between">
          {/* Logo & Profile Avatar */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenProfile}
              className="relative w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-sm text-sm hover:scale-105 active:scale-95 transition"
              title="Edit Profile Avatar"
            >
              <span>{avatar.emoji}</span>
              <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-amber-500 text-slate-950 font-black text-[7px]">
                {stats.level}
              </span>
            </button>

            <div className="flex items-center gap-1 cursor-pointer" onClick={handleLogoClick} title="Tap 5x for Owner Panel">
              <span className="text-base font-black tracking-tight text-white leading-none">
                FUNZO
              </span>
              {getCurrentUser() ? (
                <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-0.5" title="Cloud Synced">
                  <Cloud className="w-2.5 h-2.5" />
                  <span className="hidden sm:inline">Synced</span>
                </span>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenProfile(); }}
                  className="text-[8px] px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold hover:bg-indigo-500/30 transition flex items-center gap-0.5"
                >
                  <User className="w-2.5 h-2.5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Controls: IQ Rank Pill, Streak, Coins, Guide, Theme, Sound, Stats */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Universal IQ & Rank Pill */}
            <button
              onClick={onOpenStats}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold hover:bg-indigo-500/20 transition active:scale-95"
              title={`Rank: ${rank.title} (${stats.iq || 105} IQ)`}
            >
              <Brain className="w-3 h-3 text-indigo-400" />
              <span>{stats.iq || 105}</span>
              <span>{rank.badge}</span>
            </button>

            {/* Streak */}
            <button
              onClick={onOpenStats}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition active:scale-95"
              title="Daily Universal Streak"
            >
              <Flame className="w-3 h-3 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{stats.streak}d</span>
            </button>

            {/* Coins */}
            <div 
              className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-bold"
              title="Funzo Coins"
            >
              <Coins className="w-3 h-3 text-yellow-500" />
              <span>{stats.coins}</span>
            </div>

            {/* How to Play Guide Button */}
            <button
              onClick={() => onOpenHowToPlay()}
              className="px-1.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 font-bold text-[11px] flex items-center gap-1 transition"
              title="How to Play Instructions"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition"
              title={theme === 'dark' ? 'Switch to Bright Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-500" />}
            </button>

            {/* Stats */}
            <button
              onClick={onOpenStats}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200 transition"
              aria-label="Stats"
            >
              <BarChart3 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3 Active Genres Seen Prominently on Single Showing Screen */}
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-bold">
          <button
            onClick={() => onSelectGenre('brain')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition active:scale-95 ${
              activeGenre === 'brain'
                ? 'bg-indigo-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🧠</span>
            <span className="truncate">Brain (3)</span>
          </button>

          <button
            onClick={() => onSelectGenre('social')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition active:scale-95 ${
              activeGenre === 'social'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>💬</span>
            <span className="truncate">Spill It! (5)</span>
          </button>

          <button
            onClick={() => onSelectGenre('mystery')}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition active:scale-95 ${
              activeGenre === 'mystery'
                ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🔍</span>
            <span className="truncate">Mystery (3)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
