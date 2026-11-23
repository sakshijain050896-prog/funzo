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
  const marioScore = String((stats.totalGamesWon * 1000) + (stats.coins * 50)).padStart(6, '0');

  return (
    <header className="w-full h-16 bg-[#101010] border-b-4 border-black text-white px-3 sm:px-6 flex items-center justify-between gap-3 sticky top-0 z-30 shadow-md">
      {/* Left: Mobile Menu Toggle & Mario Pipe Search Bar */}
      <div className="flex items-center gap-2.5 flex-1 max-w-md">
        <button
          onClick={onOpenMenu}
          className="p-2 rounded-xl bg-[#222] border-2 border-[#444] text-white hover:bg-[#333] lg:hidden transition active:translate-y-0.5"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Games Pill with Mario Cloud Feel */}
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Mario World games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full py-2 pl-10 pr-4 rounded-full bg-[#1c1c1c] border-2 border-[#333] text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:border-[#e52521] focus:ring-2 focus:ring-red-500/20 transition font-['Fredoka']"
          />
        </div>
      </div>

      {/* Center: Authentic NES Super Mario HUD */}
      <div className="hidden md:flex items-center gap-6 font-pixel text-xs text-white">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-[#fcd116] tracking-wider leading-none mb-0.5">MARIO</span>
          <span className="font-bold tracking-widest text-white leading-none">{marioScore}</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#fcd116]">
          <span className="animate-spin text-sm" style={{ animationDuration: '4s' }}>🪙</span>
          <span className="font-bold">x{String(stats.coins).padStart(2, '0')}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-[#00a859] tracking-wider leading-none mb-0.5">WORLD</span>
          <span className="font-bold text-white leading-none">1-1</span>
        </div>
      </div>

      {/* Right: Quick Controls (Coins, Stars, Sound, Theme, Profile) */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
        {/* Mario Star Streak HUD */}
        <button
          onClick={onOpenStats}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#fcd116] border-2 border-[#b89100] text-slate-950 font-black text-xs shadow-sm hover:brightness-105 transition active:translate-y-0.5"
          title="Super Star Streak"
        >
          <span className="text-xs">⭐</span>
          <span className="font-pixel text-[10px]">x{stats.streak}</span>
        </button>

        {/* 8-Bit Sound Toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-[#222] border-2 border-[#444] text-white hover:bg-[#333] transition active:translate-y-0.5"
          title={soundEnabled ? 'Mute 8-Bit Audio' : 'Enable 8-Bit Audio'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00a859]" /> : <VolumeX className="w-4 h-4 text-[#e52521]" />}
        </button>

        {/* Theme Toggle Button (Overworld ☀️ vs Underground Cave 🌙) */}
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl bg-[#222] border-2 border-[#444] text-white hover:bg-[#333] transition active:translate-y-0.5 shadow-sm"
          title={theme === 'dark' ? 'Switch to Overworld ☀️' : 'Switch to Underground Cave 🌙'}
        >
          {theme === 'dark' ? (
            <span className="text-base leading-none select-none" title="Overworld Day ☀️">☀️</span>
          ) : (
            <span className="text-base leading-none select-none" title="Underground World 1-2 🌙">🌙</span>
          )}
        </button>

        {/* Mail Notifications with Red Mushroom Badge */}
        <div className="relative">
          <button
            onClick={onOpenStats}
            className="p-2 rounded-xl bg-[#222] border-2 border-[#444] text-white hover:bg-[#333] transition active:translate-y-0.5"
            title="Peach Mail"
          >
            <Bell className="w-4 h-4" />
          </button>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#e52521] border border-white text-white font-black text-[9px] flex items-center justify-center font-pixel">
            3
          </span>
        </div>

        {/* Player 1 Profile Chip */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#222] border-2 border-[#444] hover:border-[#e52521] transition active:scale-95"
          title="Player 1 Profile"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e52521] to-[#fcd116] border border-white flex items-center justify-center text-sm shadow-sm">
            <span>{avatar.emoji}</span>
          </div>
          <span className="text-xs font-black text-white hidden md:block max-w-[85px] truncate font-['Fredoka']">
            {displayName}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    </header>
  );
};
