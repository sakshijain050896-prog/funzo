import React from 'react';
import { Play, Gamepad2, Crown } from 'lucide-react';
import { sound } from '../../lib/soundEffects';

interface HeroBannerProps {
  onStartPlaying: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onStartPlaying }) => {
  return (
    <div className="relative w-full rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-[#6b21a8] via-[#8b5cf6] to-[#ec4899] shadow-2xl shadow-purple-900/40 mb-6 border border-purple-400/30 flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Background Starry & Glow Effects */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-fuchsia-400/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-400/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

      {/* Floating Gold Coins & Stars Decor */}
      <div className="absolute top-4 left-1/3 text-lg select-none animate-bounce delay-100 opacity-80">🪙</div>
      <div className="absolute bottom-4 left-1/2 text-sm select-none animate-bounce delay-300 opacity-70">✨</div>
      <div className="absolute top-6 right-1/4 text-xl select-none animate-pulse opacity-80">⭐</div>
      <div className="absolute bottom-6 right-1/3 text-base select-none animate-bounce delay-500 opacity-80">🪙</div>

      {/* Left Column: Heading, Subtitle & Start Playing CTA */}
      <div className="relative z-10 flex flex-col items-start text-left max-w-lg">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-black uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-yellow-300" />
          <span>FUNZO GAMING PORTAL</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-2 drop-shadow-md">
          Your Daily Gaming Hub!
        </h2>

        <p className="text-xs sm:text-sm font-bold text-purple-100 mb-5 flex items-center gap-1.5 drop-shadow-sm">
          <span>Play</span>
          <span>•</span>
          <span>Challenge</span>
          <span>•</span>
          <span>Win Rewards</span>
          <span>💜</span>
        </p>

        <button
          onClick={() => {
            sound.playTap();
            onStartPlaying();
          }}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/30 hover:scale-105 active:scale-95 transition flex items-center gap-2 group"
        >
          <span>Start Playing</span>
          <Play className="w-4 h-4 fill-slate-950 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Right Column: 3D Crowned Controller Illustration & "Game On!" */}
      <div className="relative z-10 flex items-center justify-center shrink-0">
        <div className="relative flex flex-col items-center">
          {/* Floating Crown above Gamepad */}
          <div className="relative z-20 -mb-4 animate-bounce">
            <Crown className="w-12 h-12 text-yellow-300 fill-yellow-400 drop-shadow-[0_0_12px_rgba(253,224,71,0.9)]" />
          </div>

          {/* 3D Controller Centerpiece */}
          <div className="relative w-40 h-28 sm:w-48 sm:h-32 rounded-3xl bg-gradient-to-b from-white via-slate-100 to-slate-200 border-4 border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.4)] flex items-center justify-center text-slate-900 group">
            <Gamepad2 className="w-24 h-24 sm:w-28 sm:h-28 text-purple-600 stroke-[2.2] drop-shadow-md" />
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-3xl border-2 border-yellow-300/60 pointer-events-none animate-pulse" />
          </div>

          {/* "Game On!" Callout */}
          <div className="absolute -right-6 bottom-2 rotate-12 bg-black/40 backdrop-blur-md px-3 py-1 rounded-2xl border border-white/30 text-white font-black text-sm tracking-wider shadow-lg">
            Game On! 🚀
          </div>
        </div>
      </div>
    </div>
  );
};
