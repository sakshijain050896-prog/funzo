import React from 'react';
import { Brain, MessageSquare, Search, User } from 'lucide-react';
import { GenreType } from '../types';
import { sound } from '../lib/soundEffects';

interface BottomDockProps {
  activeGenre: GenreType;
  onSelectGenre: (genre: GenreType) => void;
  onOpenProfile: () => void;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeGenre,
  onSelectGenre,
  onOpenProfile,
}) => {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-md pointer-events-auto">
      <div className="bg-white/95 dark:bg-[#1a2c35]/95 backdrop-blur-xl rounded-3xl border-2 border-slate-200/90 dark:border-[#2b4554] shadow-xl dark:shadow-2xl p-1.5 grid grid-cols-4 gap-1.5">
        {/* 1. BRAIN TAB */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectGenre('brain');
          }}
          className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition active:scale-95 ${
            activeGenre === 'brain'
              ? 'bg-[#58cc02] border-b-4 border-[#46a302] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border-b-4 border-transparent'
          }`}
        >
          <Brain className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black uppercase tracking-wider">Brain</span>
        </button>

        {/* 2. SPILL IT TAB */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectGenre('social');
          }}
          className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition active:scale-95 ${
            activeGenre === 'social'
              ? 'bg-[#ff4b4b] border-b-4 border-[#d33131] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border-b-4 border-transparent'
          }`}
        >
          <MessageSquare className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black uppercase tracking-wider">Spill It</span>
        </button>

        {/* 3. MYSTERY TAB */}
        <button
          onClick={() => {
            sound.playTap();
            onSelectGenre('mystery');
          }}
          className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition active:scale-95 ${
            activeGenre === 'mystery'
              ? 'bg-[#ff9600] border-b-4 border-[#cc7800] text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border-b-4 border-transparent'
          }`}
        >
          <Search className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black uppercase tracking-wider">Mystery</span>
        </button>

        {/* 4. PROFILE / STATS TAB */}
        <button
          onClick={() => {
            sound.playTap();
            onOpenProfile();
          }}
          className="py-2 px-1 rounded-2xl flex flex-col items-center justify-center gap-0.5 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border-b-4 border-transparent transition active:scale-95"
        >
          <User className="w-5 h-5 stroke-[2.5]" />
          <span className="text-[11px] font-black uppercase tracking-wider">Profile</span>
        </button>
      </div>
    </nav>
  );
};
