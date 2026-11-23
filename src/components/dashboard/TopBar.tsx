import React from 'react';
import { Search, Bell, Menu, Flame, Coins, ChevronDown, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
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
    <header className="w-full h-16 bg-white/90 dark:bg-[#161726]/85 backdrop-blur-xl border-b border-slate-200/90 dark:border-white/10 px-3 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30 transition-colors">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-2.5 flex-1 max-w-md">
        <button
          onClick={onOpenMenu}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white lg:hidden transition active:scale-95"
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
            className="w-full py-2 pl-10 pr-4 rounded-full bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
          />
        </div>
      </div>

      {/* Right: Quick Stats, Theme Toggle, Sound, Notifications & User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Streak Pill */}
        <button
          onClick={onOpenStats}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-black text-xs hover:bg-amber-500/20 transition"
          title="Daily Streak"
        >
          <Flame className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
          <span>{stats.streak}d</span>
        </button>

        {/* Coins Pill */}
        <button
          onClick={onOpenStats}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-600 dark:text-yellow-400 font-black text-xs hover:bg-yellow-500/20 transition"
          title="Coins Balance"
        >
          <Coins className="w-3.5 h-3.5" />
          <span>{stats.coins}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition active:scale-95"
          title={soundEnabled ? 'Mute' : 'Enable Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-500" />}
        </button>

        {/* Theme Toggle Button (Light by default, converts to dark mode) */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-amber-300 hover:text-slate-900 dark:hover:text-amber-200 transition active:scale-95 shadow-sm"
          title={theme === 'dark' ? 'Switch to Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Notifications Bell with Badge */}
        <div className="relative">
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center ring-2 ring-white dark:ring-[#161726]">
            3
          </span>
        </div>

        {/* User Profile Chip (Avatar + Name + Dropdown) */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#222538] border border-slate-200 dark:border-white/10 hover:border-violet-500 transition active:scale-95"
          title="User Account"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-sm shadow-md">
            <span>{avatar.emoji}</span>
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-white hidden md:block max-w-[90px] truncate">
            {displayName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
