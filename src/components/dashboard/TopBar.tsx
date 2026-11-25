import React from 'react';
import {
  Search, Bell, Menu, ChevronDown, Volume2, VolumeX,
  Coins, Flame, Trophy, Sun, Moon, Smartphone,
} from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS, ThemeMode } from '../../types';
import { getCurrentUser } from '../../lib/authService';
import { AvatarBadge, FunzoMark } from '../ui/Brand';

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
  canInstallApp?: boolean;
  onInstallApp?: () => void;
  onOpenInstallModal?: () => void;
}

const iconBtn =
  'w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition active:scale-95';

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
  canInstallApp = false,
  onInstallApp,
  onOpenInstallModal,
}) => {
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats.avatarId) || CARTOON_AVATARS[0];
  const currentUser = getCurrentUser();
  const displayName = stats.username || (currentUser ? currentUser.username : 'Player');

  const statPills = [
    { key: 'coins', icon: <Coins className="w-4 h-4 text-amber-400" />, value: stats.coins, label: 'Coins', title: 'Coins' },
    { key: 'streak', icon: <Flame className="w-4 h-4 text-orange-400" />, value: `${stats.streak}d`, label: 'Streak', title: 'Streak' },
    { key: 'won', icon: <Trophy className="w-4 h-4 text-emerald-400" />, value: stats.totalGamesWon, label: 'Won', title: 'Games Won' },
  ];

  return (
    <header className="w-full sticky top-0 z-30 max-w-full pt-[env(safe-area-inset-top)] bg-white/75 dark:bg-[#0a0b14]/70 backdrop-blur-xl border-b border-slate-900/5 dark:border-white/[0.06] text-slate-900 dark:text-white">
      {/* Top Row */}
      <div className="w-full h-16 px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-xs md:max-w-md">
          <button
            onClick={onOpenMenu}
            className={`${iconBtn} fz-btn-ghost lg:hidden`}
            title="Open Menu"
            aria-label="Open Menu"
          >
            <Menu className="w-[18px] h-[18px]" />
          </button>

          {/* Mobile wordmark */}
          <div className="flex md:hidden items-center gap-2 min-w-0">
            <FunzoMark className="w-8 h-8 shrink-0" />
            <span className="font-display text-lg font-extrabold tracking-tight hidden min-[400px]:inline">Funzo</span>
          </div>

          <div className="relative w-full min-w-0 group hidden md:block">
            <Search className="w-4 h-4 text-slate-400 group-focus-within:text-violet-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/[0.06] dark:border-white/[0.08] text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:bg-white dark:focus:bg-white/[0.08] focus:shadow-[0_0_0_4px_rgba(139,92,246,.15)] transition truncate"
            />
          </div>
        </div>

        {/* Center: Stats (desktop) */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.04] border border-slate-900/5 dark:border-white/[0.06]">
          {statPills.map((p) => (
            <button
              key={p.key}
              onClick={onOpenStats}
              className="flex items-center gap-2 h-8 px-3 rounded-xl hover:bg-white dark:hover:bg-white/[0.06] transition text-xs"
              title={p.title}
            >
              {p.icon}
              <span className="font-bold tabular-nums text-slate-900 dark:text-white">{p.value}</span>
              <span className="text-slate-500 dark:text-slate-400 font-medium hidden lg:inline">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Install App */}
          <button
            onClick={() => {
              if (canInstallApp && onInstallApp) {
                onInstallApp();
              } else if (onOpenInstallModal) {
                onOpenInstallModal();
              }
            }}
            className="h-9 sm:h-10 px-2.5 sm:px-3 rounded-xl fz-btn-primary text-xs font-bold flex items-center gap-1.5 shrink-0"
            title="Install Funzo App to your Phone Home Screen!"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden min-[400px]:inline">App</span>
          </button>

          {/* Sound Toggle — green when ON, red when OFF */}
          <button
            onClick={onToggleSound}
            className={`${iconBtn} border ${
              soundEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20'
            }`}
            title={soundEnabled ? 'Volume ON (Click to Mute)' : 'Volume OFF (Click to Unmute)'}
            aria-label={soundEnabled ? 'Mute Audio' : 'Enable Audio'}
          >
            {soundEnabled ? <Volume2 className="w-[18px] h-[18px]" /> : <VolumeX className="w-[18px] h-[18px]" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`${iconBtn} fz-btn-ghost`}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-[18px] h-[18px] text-amber-300" /> : <Moon className="w-[18px] h-[18px] text-violet-600" />}
          </button>

          {/* Notifications */}
          <div className="relative shrink-0">
            <button
              onClick={onOpenNotifications}
              className={`${iconBtn} fz-btn-ghost`}
              title="Notifications"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px]" />
            </button>
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 ring-2 ring-white dark:ring-[#0a0b14] text-white font-bold text-[10px] flex items-center justify-center pointer-events-none tabular-nums">
                {unreadNotificationCount > 9 ? '9+' : unreadNotificationCount}
              </span>
            )}
          </div>

          {/* Profile Chip */}
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-2 p-1 sm:pr-2.5 rounded-full fz-btn-ghost shrink-0"
            title="My Profile"
          >
            <AvatarBadge emoji={avatar.emoji} size="xs" />
            <span className="text-xs font-bold text-slate-800 dark:text-white hidden md:block max-w-[90px] truncate">
              {displayName}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Mobile sub-bar: search + compact stats */}
      <div className="flex md:hidden items-center gap-1.5 px-3 pb-2.5 w-full">
        <div className="relative flex-1 min-w-0 group">
          <Search className="w-4 h-4 text-slate-400 group-focus-within:text-violet-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-9 pl-9 pr-2 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/[0.06] dark:border-white/[0.08] text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,.15)] transition"
          />
        </div>
        {statPills.map((p) => (
          <button
            key={p.key}
            onClick={onOpenStats}
            className="flex items-center justify-center gap-1 h-9 px-2 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/5 dark:border-white/[0.06] active:scale-95 transition shrink-0"
            title={p.title}
            aria-label={`${p.title}: ${p.value}`}
          >
            {p.icon}
            <span className="text-[12px] font-bold tabular-nums">{p.value}</span>
          </button>
        ))}
      </div>
    </header>
  );
};
