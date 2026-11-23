import React from 'react';
import { Search, Bell, Menu, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS, ThemeMode } from '../../types';
import { getCurrentUser } from '../../lib/authService';

interface TopBarProps {
  stats: PlayerStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProfile: () => void;
  onOpenStats: () => void;
  onOpenMenu: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  stats,
  soundEnabled,
  onToggleSound,
  onOpenProfile,
  onOpenStats,
  onOpenMenu,
  searchQuery,
  onSearchChange,
  theme,
  onToggleTheme,
}) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const currentUser = getCurrentUser();
  const displayName = stats.username || (currentUser ? currentUser.username : 'Player');

  return (
    <header className="w-full h-16 bg-white dark:bg-[#181d2f] border-b-4 border-slate-200 dark:border-black text-slate-900 dark:text-white px-3 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-2.5 flex-1 max-w-md">
        <button
          onClick={onOpenMenu}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-800 dark:text-white lg:hidden transition active:translate-y-0.5"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Games Pill */}
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#333] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#e52521] focus:ring-2 focus:ring-red-500/20 transition font-['Fredoka']"
          />
        </div>
      </div>

      {/* Center: Explanatory Player Stats */}
      <div className="hidden md:flex items-center gap-3 font-['Fredoka'] text-xs">
        {/* Coins Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fcd116] border-2 border-[#b89100] text-slate-950 font-black shadow-sm">
          <span className="text-sm">🪙</span>
          <span>{stats.coins} Coins</span>
        </div>

        {/* Day Streak Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/60 border-2 border-orange-300 dark:border-orange-500/40 text-orange-800 dark:text-orange-300 font-black shadow-sm">
          <span className="text-sm">⭐</span>
          <span>{stats.streak}d Streak</span>
        </div>

        {/* Games Won Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-black shadow-sm">
          <span className="text-sm">🏆</span>
          <span>{stats.totalGamesWon} Won</span>
        </div>
      </div>

      {/* Right: Quick Controls (Coins, Sound, Theme, Profile) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Mobile Stats Chip */}
        <button
          onClick={onOpenStats}
          className="md:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#fcd116] border-2 border-[#b89100] text-slate-950 font-black text-xs shadow-sm active:translate-y-0.5"
          title="Your Stats"
        >
          <span>🪙</span>
          <span>{stats.coins}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-700 dark:text-white transition active:translate-y-0.5"
          title={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00a859]" /> : <VolumeX className="w-4 h-4 text-[#e52521]" />}
        </button>

        {/* Theme Toggle Button (Overworld Bright ☀️ vs Dark Mode 🌙) */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-700 dark:text-white transition active:translate-y-0.5 shadow-sm"
          title={theme === 'dark' ? 'Switch to Bright Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
        >
          {theme === 'dark' ? (
            <span className="text-base leading-none select-none" title="Bright Light Mode ☀️">☀️</span>
          ) : (
            <span className="text-base leading-none select-none" title="Dark Mode 🌙">🌙</span>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-700 dark:text-white transition active:translate-y-0.5"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e52521] border border-white text-white font-black text-[9px] flex items-center justify-center font-['Fredoka']">
            3
          </span>
        </div>

        {/* Player Profile Chip */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] hover:border-[#e52521] transition active:scale-95 shadow-sm"
          title="My Profile"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e52521] to-[#fcd116] border border-white flex items-center justify-center text-sm shadow-sm">
            <span>{avatar.emoji}</span>
          </div>
          <span className="text-xs font-black text-slate-900 dark:text-white hidden md:block max-w-[85px] truncate font-['Fredoka']">
            {displayName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>
    </header>
  );
};
