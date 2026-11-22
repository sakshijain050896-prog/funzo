import React from 'react';
import { Search, Bell, Menu, Flame, Coins, ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../../types';
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
}) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const currentUser = getCurrentUser();
  const displayName = currentUser ? currentUser.username : stats.username || 'Sakshi';

  return (
    <header className="w-full h-16 bg-[#10072b]/80 backdrop-blur-xl border-b border-[#241352] px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenMenu}
          className="p-2 rounded-xl bg-[#1b0e45] text-slate-300 hover:text-white lg:hidden"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Games Pill */}
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-[#1b0e45]/90 border border-[#351a7e] text-xs font-bold text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 transition"
          />
        </div>
      </div>

      {/* Right: Quick Stats, Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Streak Pill */}
        <button
          onClick={onOpenStats}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-xs hover:bg-amber-500/20 transition"
          title="Daily Streak"
        >
          <Flame className="w-3.5 h-3.5 fill-amber-400" />
          <span>{stats.streak}d</span>
        </button>

        {/* Coins Pill */}
        <button
          onClick={onOpenStats}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-black text-xs hover:bg-yellow-500/20 transition"
          title="Coins Balance"
        >
          <Coins className="w-3.5 h-3.5" />
          <span>{stats.coins}</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-[#1b0e45] border border-[#351a7e] text-purple-300 hover:text-white transition active:scale-95"
          title={soundEnabled ? 'Mute' : 'Enable Sound'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
        </button>

        {/* Notifications Bell with Red Badge "3" */}
        <div className="relative">
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-[#1b0e45] border border-[#351a7e] text-purple-300 hover:text-white transition active:scale-95"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center ring-2 ring-[#10072b]">
            3
          </span>
        </div>

        {/* User Profile Chip (Avatar + Name + Dropdown) */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#1b0e45] border border-[#351a7e] hover:border-purple-400 transition active:scale-95"
          title="User Account"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-sm shadow-md">
            <span>{avatar.emoji}</span>
          </div>
          <span className="text-xs font-black text-white hidden md:block max-w-[90px] truncate">
            {displayName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
        </button>
      </div>
    </header>
  );
};
