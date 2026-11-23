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

  const navItems: { id: DashboardNavTab; label: string; marioTag: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'World Map', marioTag: '1-1', icon: <Home className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Star Ranking', marioTag: 'TOP', icon: <Trophy className="w-4 h-4" /> },
    { id: 'rewards', label: 'Mystery Blocks', marioTag: '?', icon: <Gift className="w-4 h-4" /> },
    { id: 'profile', label: 'Player 1', marioTag: 'LVL', icon: <User className="w-4 h-4" /> },
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

      {/* Main Mario Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white/95 dark:bg-[#161a29]/95 border-r-4 border-slate-200 dark:border-[#22283a] flex flex-col justify-between p-4 transition-transform duration-300 shadow-2xl lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Header Brand: Super Mario Mushroom Cap + FUNZO */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer select-none group"
              title="Tap 5x for Warp Zone Admin Panel"
            >
              {/* Mario Cap Red 3D Block Badge */}
              <div className="relative">
                <span className="absolute -top-2.5 -right-1 text-sm animate-bounce">⭐</span>
                <div className="w-11 h-11 rounded-2xl bg-[#e52521] border-b-4 border-[#9e100e] flex items-center justify-center text-white shadow-md shadow-red-500/30 group-hover:scale-105 active:translate-y-0.5 transition-transform">
                  <span className="text-2xl select-none">🍄</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-2xl font-black tracking-tight text-[#e52521] dark:text-[#ff4a47] leading-none drop-shadow-sm font-['Fredoka']">
                    Funzo
                  </h1>
                  <span className="px-1.5 py-0.2 rounded-md bg-[#fcd116] border border-[#b89100] text-[9px] font-black text-slate-950 font-pixel">
                    WORLD
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#00a859] dark:text-[#43b047] block mt-0.5">
                  Mushroom Kingdom
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

          {/* Navigation Links - Mario 3D Pipe & Block Buttons */}
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-[#e52521] border-b-4 border-[#9e100e] text-white shadow-lg shadow-red-500/25 active:translate-y-0.5'
                      : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-red-50 dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-white animate-pulse' : 'text-[#00a859] dark:text-[#43b047]'}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-extrabold tracking-wide font-['Fredoka']">{item.label}</span>
                  </div>

                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                    isActive 
                      ? 'bg-[#fcd116] text-slate-950 font-pixel' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 font-pixel'
                  }`}>
                    {item.marioTag}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Question Block Card & Mascot */}
        <div className="flex flex-col gap-3">
          {/* Classic Mario Question Block [ ? ] Card */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-br from-[#fcd116] via-[#f7b705] to-[#f59e0b] border-4 border-[#c49600] text-center shadow-lg relative overflow-hidden group">
            {/* 4 Corner Rivets */}
            <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#855e00]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#855e00]" />
            <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-[#855e00]" />
            <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#855e00]" />

            <div className="w-10 h-10 mx-auto rounded-xl bg-white/30 border-2 border-[#c49600] text-slate-900 flex items-center justify-center text-xl font-black font-pixel mb-1 shadow-inner group-hover:scale-110 transition-transform">
              ?
            </div>
            <h4 className="text-xs font-black text-slate-950 font-['Fredoka'] mb-0.5">Lucky Power-Up Block</h4>
            <p className="text-[10px] text-amber-950 font-bold mb-2">
              Hit the block to collect bonus coins!
            </p>
            <button
              onClick={() => {
                sound.playTap();
                if (onOpenRewards) onOpenRewards();
                else onSelectTab('rewards');
              }}
              className="w-full py-1.5 rounded-xl bg-[#00a859] border-b-4 border-[#006633] text-white font-black text-[11px] shadow-md hover:brightness-110 active:translate-y-0.5 transition"
            >
              Hit Block! 🍄
            </button>
          </div>

          {/* Player 1 Badge (Mushroom Kingdom Citizen) */}
          <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1f2438] border-2 border-slate-200 dark:border-[#2f3752] shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#e52521] to-[#fcd116] border-2 border-white dark:border-[#2f3752] flex items-center justify-center text-xl shadow-md shrink-0">
              {avatar.emoji}
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-black text-slate-900 dark:text-white block truncate font-['Fredoka']">
                {displayName} 🍄
              </span>
              <span className="text-[10px] text-[#00a859] dark:text-[#43b047] font-bold block truncate font-pixel">
                P1 • WORLD 1-1
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
