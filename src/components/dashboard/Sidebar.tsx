import React, { useState } from 'react';
import {
  Home, Trophy, Gift, User,
  X, Smartphone, Coins, Sparkles,
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';

import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { getCurrentUser } from '../../lib/authService';
import { FunzoMark, AvatarBadge } from '../ui/Brand';

export type DashboardNavTab = 'home' | 'leaderboard' | 'rewards' | 'profile';

interface SidebarProps {
  activeTab: DashboardNavTab;
  onSelectTab: (tab: DashboardNavTab) => void;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenRewards?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  stats?: PlayerStats;
  canInstallApp?: boolean;
  onInstallApp?: () => void;
  onOpenInstallModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
  onOpenAdmin,
  onOpenRewards,
  isMobileOpen = false,
  onCloseMobile,
  stats,
  canInstallApp = false,
  onInstallApp,
  onOpenInstallModal,
}) => {
  const [logoClicks, setLogoClicks] = useState<number>(0);
  const currentUser = getCurrentUser();
  const displayName = stats?.username || (currentUser ? currentUser.username : 'Player');
  const avatar = CARTOON_AVATARS.find((a) => a.id === stats?.avatarId) || CARTOON_AVATARS[0];

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

  const navItems: { id: DashboardNavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'All Games', icon: <Home className="w-[18px] h-[18px]" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-[18px] h-[18px]" /> },
    { id: 'rewards', label: 'Daily Rewards', icon: <Gift className="w-[18px] h-[18px]" /> },
    { id: 'profile', label: 'My Profile', icon: <User className="w-[18px] h-[18px]" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 flex flex-col justify-between gap-4 overflow-y-auto no-scrollbar p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out lg:translate-x-0
          bg-white/90 dark:bg-[#0c0d19]/90 backdrop-blur-xl border-r border-slate-900/5 dark:border-white/[0.06] shadow-[20px_0_60px_-30px_rgba(0,0,0,.6)]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col min-h-0">
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-7 px-1">
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer select-none group"
              title="Funzo Portal"
            >
              <FunzoMark className="w-10 h-10 drop-shadow-[0_8px_18px_rgba(168,85,247,.55)] group-hover:scale-105 transition-transform" />
              <div>
                <h1 className="font-display text-[22px] font-extrabold tracking-tight leading-none text-slate-900 dark:text-white">
                  Funzo
                </h1>
                <span className="text-[10px] uppercase tracking-[0.22em] font-bold text-violet-500 dark:text-violet-400 block mt-1">
                  Games Hub
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="w-9 h-9 rounded-xl fz-btn-ghost flex items-center justify-center lg:hidden"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Menu</p>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mb-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playTap();
                    if (item.id === 'profile') {
                      onOpenProfile();
                    } else {
                      onSelectTab(item.id);
                    }
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`relative w-full flex items-center gap-3 px-3 h-11 rounded-xl text-sm font-semibold transition-all ${isActive
                    ? 'text-slate-900 dark:text-white bg-gradient-to-r from-violet-500/15 via-fuchsia-500/10 to-transparent'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-900/[0.04] dark:hover:bg-white/[0.04]'
                    }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-gradient-to-b from-violet-400 to-fuchsia-500 shadow-[0_0_12px_rgba(192,38,211,.8)]" />
                  )}
                  <span className={isActive ? 'text-violet-500 dark:text-violet-300' : ''}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-3">
          {/* Daily Coin Bonus Card */}
          <div className="relative p-4 rounded-2xl overflow-hidden isolate border border-white/10">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-400 via-orange-500 to-rose-600" />
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/20 blur-xl -z-10" />
            <div className="flex items-center gap-2 mb-1">
              <span className="w-8 h-8 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </span>
              <h4 className="font-display text-sm font-bold text-white">Free Daily Bonus</h4>
            </div>
            <p className="text-[11px] text-white/85 font-medium mb-3 leading-snug">
              Claim free coins &amp; keep your streak alive.
            </p>
            <button
              onClick={() => {
                sound.playTap();
                if (onOpenRewards) onOpenRewards();
                else onSelectTab('rewards');
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full h-9 rounded-xl bg-white text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm hover:bg-white/90 active:scale-[.98] transition"
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              Claim Coins
            </button>
          </div>

          {/* Install Mobile App Button */}
          <button
            onClick={() => {
              sound.playTap();
              if (canInstallApp && onInstallApp) {
                onInstallApp();
              } else if (onOpenInstallModal) {
                onOpenInstallModal();
              }
              if (onCloseMobile) onCloseMobile();
            }}
            className="relative overflow-hidden w-full h-10 flex items-center justify-center gap-2 rounded-xl fz-btn-ghost text-xs font-semibold"
            title="Install Funzo App directly to your device"
          >
            <Smartphone className="w-4 h-4 text-violet-500 dark:text-violet-400" />
            <span>Install Mobile App</span>
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-500" />
          </button>

          {/* User Profile Footer */}
          <div className="flex items-center gap-3 p-2 pr-3 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/5 dark:border-white/[0.06]">
            <AvatarBadge emoji={avatar.emoji} size="md" />
            <div className="overflow-hidden flex-1">
              <span className="text-sm font-bold text-slate-900 dark:text-white block truncate">
                {displayName}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block truncate">
                Level {stats?.level || 1} · {stats?.coins || 50} coins
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
