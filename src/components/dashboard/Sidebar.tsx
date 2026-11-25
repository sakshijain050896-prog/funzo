import React, { useState } from 'react';
import {
  Home, Trophy, Gift, User,
  X
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';

import { PlayerStats, CARTOON_AVATARS } from '../../types';
import { getCurrentUser } from '../../lib/authService';

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
    { id: 'home', label: 'All Games', icon: <Home className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'rewards', label: 'Daily Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/95 dark:bg-[#161a29]/95 border-r-4 border-slate-200 dark:border-[#22283a] flex flex-col justify-between p-4 transition-transform duration-300 shadow-xl lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col">
          {/* Header Brand */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer select-none group"
              title="Funzo Portal"
            >
              {/* Mario Cap Red 3D Block Badge - Pastel Rose */}
              <div className="relative">
                <span className="absolute -top-2.5 -right-1 text-sm animate-bounce">⭐</span>
                <div className="w-11 h-11 rounded-2xl bg-[#fda4af] border-b-4 border-[#f43f5e] flex items-center justify-center text-white shadow-sm group-hover:scale-105 active:translate-y-0.5 transition-transform">
                  <span className="text-2xl select-none">🍄</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#e11d48] dark:text-[#fda4af] leading-none drop-shadow-sm font-['Fredoka']">
                  Funzo
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#059669] dark:text-[#6ee7b7] block mt-0.5">
                  Gaming Portal
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 dark:hover:text-white lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 mb-6">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all ${isActive
                    ? 'bg-[#ffe4e6] dark:bg-rose-950/60 border-2 border-[#fecdd3] dark:border-rose-800/40 text-[#9f1239] dark:text-[#ffe4e6] shadow-sm active:translate-y-0.5'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#e11d48]' : 'text-[#059669] dark:text-[#6ee7b7]'}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-extrabold tracking-wide font-['Fredoka']">{item.label}</span>
                  </div>

                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Daily Reward Promo & Profile Info */}
        <div className="flex flex-col gap-3">
          {/* Daily Coin Bonus Card - Pastel Peach/Buttercup */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-br from-[#fef3c7] via-[#fed7aa] to-[#fecdd3] border-2 border-[#fde68a] text-center shadow-sm relative overflow-hidden group">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-white/70 border border-[#fde68a] text-slate-900 flex items-center justify-center text-xl font-black mb-1 shadow-sm group-hover:scale-110 transition-transform">
              🎁
            </div>
            <h4 className="text-xs font-black text-amber-950 font-['Fredoka'] mb-0.5">Free Daily Bonus</h4>
            <p className="text-[10px] text-amber-900 font-bold mb-2">
              Claim free coins &amp; keep your streak alive!
            </p>
            <button
              onClick={() => {
                sound.playTap();
                if (onOpenRewards) onOpenRewards();
                else onSelectTab('rewards');
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full py-1.5 rounded-xl bg-[#a7f3d0] hover:bg-[#6ee7b7] border-b-4 border-[#059669] text-[#064e3b] font-black text-[11px] shadow-sm active:translate-y-0.5 transition"
            >
              Claim Coins 🪙
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1f2438] border-2 border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#fecdd3] to-[#fed7aa] border-2 border-white dark:border-slate-700 flex items-center justify-center text-xl shadow-sm shrink-0">
              {avatar.emoji}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-black text-slate-800 dark:text-white block truncate font-['Fredoka']">
                {displayName}
              </span>
              <span className="text-[10px] text-[#059669] dark:text-[#6ee7b7] font-bold block truncate">
                Level {stats?.level || 1} • {stats?.coins || 50} Coins 🪙
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
