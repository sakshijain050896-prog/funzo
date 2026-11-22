import React from 'react';
import { Flame, Coins, Volume2, VolumeX, Sun, Moon, HelpCircle } from 'lucide-react';
import { PlayerStats, GenreType, ThemeMode, CARTOON_AVATARS } from '../types';
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
    <header className="sticky top-0 z-30 w-full bg-white/90 dark:bg-[#090d16]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-3 py-2 transition-colors">
      <div className="max-w-md mx-auto flex flex-col gap-2">
        {/* Clean Top Navigation Bar */}
        <div className="flex items-center justify-between">
          {/* Left: Avatar & Funzo Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenProfile}
              className="relative w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-base hover:scale-105 active:scale-95 transition shadow-sm"
              title="Profile & Cloud Account"
            >
              <span>{avatar.emoji}</span>
              <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-indigo-600 text-white font-black text-[7px] shadow-sm">
                {stats.level}
              </span>
            </button>

            <div
              className="flex items-center gap-1.5 cursor-pointer select-none"
              onClick={handleLogoClick}
              title="Tap 5x for Admin Panel"
            >
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
                FUNZO
              </span>
              {getCurrentUser() ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" title="Cloud Synced" />
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); onOpenProfile(); }}
                  className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 font-bold hover:bg-indigo-500/20 transition"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Right: Consolidated Quick Stats Pill & Utility Controls */}
          <div className="flex items-center gap-1.5">
            {/* Unified Stats Pill (Streak + Coins + IQ) */}
            <button
              onClick={onOpenStats}
              className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-bold hover:border-slate-300 dark:hover:border-slate-700 transition active:scale-95 shadow-sm"
              title="View Stats & Records"
            >
              <span className="flex items-center gap-0.5 text-amber-500">
                <Flame className="w-3.5 h-3.5 fill-amber-500" />
                <span>{stats.streak}</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="flex items-center gap-0.5 text-yellow-500">
                <Coins className="w-3.5 h-3.5" />
                <span>{stats.coins}</span>
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={onToggleSound}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition active:scale-95 shadow-sm"
              aria-label="Toggle Sound"
              title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-rose-500" />}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition active:scale-95 shadow-sm"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-500" />}
            </button>

            {/* Help / Guide */}
            <button
              onClick={() => onOpenHowToPlay()}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition active:scale-95 shadow-sm"
              title="How to Play"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Modern Segmented Control for 3 Genres */}
        <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 text-xs font-bold">
          <button
            onClick={() => onSelectGenre('brain')}
            className={`py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeGenre === 'brain'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-black'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🧠</span>
            <span className="truncate">Brain</span>
          </button>

          <button
            onClick={() => onSelectGenre('social')}
            className={`py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeGenre === 'social'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-black'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>💬</span>
            <span className="truncate">Spill It</span>
          </button>

          <button
            onClick={() => onSelectGenre('mystery')}
            className={`py-1.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition active:scale-95 ${
              activeGenre === 'mystery'
                ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm font-black'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>🔍</span>
            <span className="truncate">Mystery</span>
          </button>
        </div>
      </div>
    </header>
  );
};
