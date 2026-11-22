import React from 'react';
import { Flame, Coins, Volume2, VolumeX, Sun, Moon, HelpCircle } from 'lucide-react';
import { PlayerStats, GenreType, ThemeMode, CARTOON_AVATARS } from '../types';
import { getCurrentUser } from '../lib/authService';

interface HeaderProps {
  stats: PlayerStats;
  theme: ThemeMode;
  soundEnabled: boolean;
  activeGenre?: GenreType;
  onSelectGenre?: (genre: GenreType) => void;
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
    <header className="sticky top-2 z-40 w-full px-3 transition-all pointer-events-auto">
      <div className="max-w-md mx-auto bg-white/95 dark:bg-[#1a2c35]/95 backdrop-blur-xl rounded-2xl border-2 border-slate-200/90 dark:border-[#2b4554] shadow-lg dark:shadow-xl px-3 py-2 flex items-center justify-between">
        {/* Left: Avatar & Funzo Brand */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenProfile}
            className="relative w-8 h-8 rounded-xl bg-[#1cb0f6] border-b-2 border-[#1899d6] flex items-center justify-center text-base hover:scale-105 active:scale-95 transition shadow-sm"
            title="Profile & Cloud Account"
          >
            <span>{avatar.emoji}</span>
            <span className="absolute -bottom-1 -right-1 px-1 rounded-full bg-[#58cc02] border border-[#46a302] text-white font-black text-[7px] shadow-sm">
              {stats.level}
            </span>
          </button>

          <div
            className="flex items-center gap-1.5 cursor-pointer select-none"
            onClick={handleLogoClick}
            title="Tap 5x for Admin Panel"
          >
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              FUNZO
            </span>
            {getCurrentUser() ? (
              <span className="w-2.5 h-2.5 rounded-full bg-[#58cc02] shadow-sm shadow-[#58cc02]/60 animate-pulse" title="Cloud Synced" />
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); onOpenProfile(); }}
                className="text-[9px] px-2 py-0.5 rounded-full bg-[#58cc02]/15 border border-[#58cc02]/30 text-[#46a302] dark:text-[#58cc02] font-black hover:bg-[#58cc02]/25 transition"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Right: Tactile Quick Stats & Utility Controls */}
        <div className="flex items-center gap-1.5">
          {/* Tactile Streak Pill */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#ff9600] border-b-2 border-[#cc7800] text-slate-950 font-black text-xs transition active:translate-y-0.5 active:border-b-0 shadow-sm"
            title="Daily Universal Streak"
          >
            <Flame className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
            <span>{stats.streak}d</span>
          </button>

          {/* Tactile Coins Pill */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#202f36] border-b-2 border-slate-300 dark:border-[#142026] text-amber-600 dark:text-yellow-400 font-black text-xs transition active:translate-y-0.5 active:border-b-0 shadow-sm"
            title="Funzo Coins"
          >
            <Coins className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
            <span>{stats.coins}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#202f36] border-b-2 border-slate-300 dark:border-[#142026] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition active:translate-y-0.5 active:border-b-0 shadow-sm"
            aria-label="Toggle Sound"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-[#ff4b4b]" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#202f36] border-b-2 border-slate-300 dark:border-[#142026] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition active:translate-y-0.5 active:border-b-0 shadow-sm"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-[#ff9600]" /> : <Moon className="w-3.5 h-3.5 text-[#1cb0f6]" />}
          </button>

          {/* Help / Guide */}
          <button
            onClick={() => onOpenHowToPlay()}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-[#202f36] border-b-2 border-slate-300 dark:border-[#142026] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white transition active:translate-y-0.5 active:border-b-0 shadow-sm"
            title="How to Play"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
