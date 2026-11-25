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
  onOpenNotifications: () => void;
  unreadNotificationCount?: number;
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
  onOpenNotifications,
  unreadNotificationCount = 0,
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
    <header className="w-full bg-white/95 dark:bg-[#181d2f]/95 border-b-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white sticky top-0 z-30 shadow-sm max-w-full backdrop-blur-md">
      {/* Top Row: Search & Profile Controls */}
      <div className="w-full h-14 sm:h-16 px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Left: Mobile Menu Toggle & Search Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-1 min-w-0 max-w-xs md:max-w-md">
          <button
            onClick={onOpenMenu}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-800 dark:text-white lg:hidden transition active:translate-y-0.5 shrink-0"
            title="Open Menu"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Search Games Pill */}
          <div className="relative w-full min-w-0">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full py-1.5 sm:py-2 pl-7 sm:pl-10 pr-2 sm:pr-4 rounded-full bg-slate-100 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#333] text-xs font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#e52521] transition font-['Fredoka'] truncate"
            />
          </div>
        </div>

        {/* Center: Explanatory Player Stats for Desktop */}
        <div className="hidden md:flex items-center gap-3 font-['Fredoka'] text-xs">
          {/* Coins Badge - Pastel Sunshine */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fef9c3] border-2 border-[#fef08a] text-[#854d0e] font-black shadow-sm hover:scale-105 active:scale-95 transition"
            title="Coins"
          >
            <span className="text-sm">🪙</span>
            <span>{stats.coins} Coins</span>
          </button>

          {/* Day Streak Badge - Pastel Peach */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffedd5] border-2 border-[#fed7aa] text-[#c2410c] font-black shadow-sm hover:scale-105 active:scale-95 transition"
            title="Streak"
          >
            <span className="text-sm">⭐</span>
            <span>{stats.streak}d Streak</span>
          </button>

          {/* Games Won Badge - Pastel Mint */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dcfce7] border-2 border-[#bbf7d0] text-[#065f46] font-black shadow-sm hover:scale-105 active:scale-95 transition"
            title="Games Won"
          >
            <span className="text-sm">🏆</span>
            <span>{stats.totalGamesWon} Won</span>
          </button>
        </div>

        {/* Right: Quick Controls (Sound, Theme, Notifications, Profile) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Sound Toggle Button - Green when ON, Red when OFF */}
          <button
            onClick={onToggleSound}
            className={`p-1.5 sm:p-2 rounded-xl border-2 transition active:translate-y-0.5 shadow-sm shrink-0 flex items-center justify-center ${
              soundEnabled
                ? 'bg-[#dcfce7] hover:bg-[#bbf7d0] dark:bg-emerald-950/70 border-[#86efac] dark:border-emerald-600 text-[#15803d] dark:text-emerald-300'
                : 'bg-[#ffe4e6] hover:bg-[#fecdd3] dark:bg-rose-950/70 border-[#fca5a5] dark:border-rose-600 text-[#b91c1c] dark:text-rose-300'
            }`}
            title={soundEnabled ? 'Volume ON (Click to Mute)' : 'Volume OFF (Click to Unmute)'}
            aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#15803d] dark:text-emerald-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#b91c1c] dark:text-rose-300" />
            )}
          </button>

          {/* Theme Toggle Button (Overworld Bright ☀️ vs Dark Mode 🌙) */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-700 dark:text-white transition active:translate-y-0.5 shadow-sm shrink-0"
            title={theme === 'dark' ? 'Switch to Bright Light Mode ☀️' : 'Switch to Dark Mode 🌙'}
          >
            {theme === 'dark' ? (
              <span className="text-sm sm:text-base leading-none select-none" title="Bright Light Mode ☀️">☀️</span>
            ) : (
              <span className="text-sm sm:text-base leading-none select-none" title="Dark Mode 🌙">🌙</span>
            )}
          </button>

          {/* Notifications Bell Button */}
          <div className="relative shrink-0">
            <button
              onClick={onOpenNotifications}
              className="p-1.5 sm:p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] text-slate-700 dark:text-white transition active:translate-y-0.5 shadow-sm"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[17px] h-[17px] px-0.5 rounded-full bg-[#f43f5e] border-2 border-white dark:border-[#181d2f] text-white font-black text-[9px] flex items-center justify-center font-['Fredoka'] pointer-events-none">
                {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
              </span>
            )}
          </div>

          {/* Player Profile Chip - Always pinned and fully visible on all mobile viewports */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1 sm:gap-2 pl-1 pr-2 sm:pl-1.5 sm:pr-3 py-1 sm:py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#22283a] border-2 border-slate-200 dark:border-[#444] hover:border-pink-300 transition active:scale-95 shadow-sm shrink-0"
            title="My Profile"
          >
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#fecdd3] to-[#fed7aa] border border-white flex items-center justify-center text-xs sm:text-sm shadow-sm shrink-0">
              <span>{avatar.emoji}</span>
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-white hidden md:block max-w-[85px] truncate font-['Fredoka']">
              {displayName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          </button>
        </div>
      </div>

      {/* Row 2: Mobile Stats Sub-bar (Streak, Coin, and Won icons at top on mobile) */}
      <div className="flex md:hidden items-center justify-between gap-1.5 px-2.5 py-1.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/90 dark:bg-[#141824]/90 text-xs font-['Fredoka'] w-full">
        <button
          onClick={onOpenStats}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-xl bg-[#fef9c3] border border-[#fef08a] text-[#854d0e] font-black shadow-xs active:scale-95 transition min-w-0"
          title="Your Coins"
        >
          <span className="text-xs shrink-0">🪙</span>
          <span className="text-[11px] font-bold leading-tight truncate">{stats.coins} Coins</span>
        </button>

        <button
          onClick={onOpenStats}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-xl bg-[#ffedd5] border border-[#fed7aa] text-[#c2410c] font-black shadow-xs active:scale-95 transition min-w-0"
          title="Your Day Streak"
        >
          <span className="text-xs shrink-0">⭐</span>
          <span className="text-[11px] font-bold leading-tight truncate">{stats.streak}d Streak</span>
        </button>

        <button
          onClick={onOpenStats}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 px-1.5 rounded-xl bg-[#dcfce7] border border-[#bbf7d0] text-[#065f46] font-black shadow-xs active:scale-95 transition min-w-0"
          title="Total Games Won"
        >
          <span className="text-xs shrink-0">🏆</span>
          <span className="text-[11px] font-bold leading-tight truncate">{stats.totalGamesWon} Won</span>
        </button>
      </div>
    </header>
  );
};
