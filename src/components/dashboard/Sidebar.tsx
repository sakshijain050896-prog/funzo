import React, { useState } from 'react';
import { 
  Home, Gamepad2, Trophy, Gift, User, Settings, 
  Crown, X
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';

export type DashboardNavTab = 'home' | 'games' | 'leaderboard' | 'rewards' | 'profile' | 'settings';

interface SidebarProps {
  activeTab: DashboardNavTab;
  onSelectTab: (tab: DashboardNavTab) => void;
  onOpenProfile: () => void;
  onOpenAdmin?: () => void;
  onOpenRewards?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
  onOpenAdmin,
  onOpenRewards,
  isMobileOpen = false,
  onCloseMobile,
}) => {
  const [logoClicks, setLogoClicks] = useState<number>(0);

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
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'games', label: 'Games', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy className="w-4 h-4" /> },
    { id: 'rewards', label: 'Rewards', icon: <Gift className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#10072b] border-r border-[#241352] flex flex-col justify-between p-4 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col">
          {/* Header Brand: Crown + Game Controller + FUNZO */}
          <div className="flex items-center justify-between mb-6 px-1">
            <div
              onClick={handleLogoClick}
              className="flex items-center gap-3 cursor-pointer select-none group"
              title="Tap 5x for Owner Admin Panel"
            >
              {/* Crown + Controller Icon Badge */}
              <div className="relative">
                <Crown className="w-4 h-4 text-amber-400 fill-amber-400 absolute -top-2 left-1/2 -translate-x-1/2 -rotate-12 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-purple-600/40 group-hover:scale-105 transition">
                  <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-pink-200 leading-none">
                  Funzo
                </h1>
                <span className="text-[9px] uppercase tracking-widest font-extrabold text-purple-400 block mt-0.5">
                  Gaming Hub
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="p-1 rounded-xl text-slate-400 hover:text-white lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5 mb-6">
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
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-black transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-fuchsia-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-[#1a0e42]'
                  }`}
                >
                  <span className={isActive ? 'text-white' : 'text-purple-400'}>{item.icon}</span>
                  <span className="text-sm font-extrabold tracking-wide">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section: Promo Card & Mascot */}
        <div className="flex flex-col gap-3">
          {/* "Play More Earn More!" Card */}
          <div className="p-3.5 rounded-3xl bg-gradient-to-br from-[#1d0e4c] to-[#120732] border border-[#3b1d82] text-center shadow-xl relative overflow-hidden group">
            <div className="w-10 h-10 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-xl mb-1.5 shadow-inner">
              🎁
            </div>
            <h4 className="text-xs font-black text-white mb-0.5">Play More Earn More!</h4>
            <p className="text-[10px] text-purple-300 mb-2.5">
              Level up your rank to claim coins.
            </p>
            <button
              onClick={() => {
                sound.playTap();
                if (onOpenRewards) onOpenRewards();
                else onSelectTab('rewards');
              }}
              className="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[11px] shadow-md hover:brightness-110 active:scale-95 transition"
            >
              Join Rewards →
            </button>
          </div>

          {/* Anime Gamer Mascot Badge */}
          <div className="flex items-center gap-3 p-2 rounded-2xl bg-[#160a3a]/80 border border-[#2d1668]">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-md shrink-0">
              🎧
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-black text-white block truncate">Sakshi Gamer 👑</span>
              <span className="text-[10px] text-pink-400 font-bold block truncate">Playing Funzo Daily</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
