import React from 'react';
import { Play, Layers, Flame, Coins, Trophy } from 'lucide-react';
import { GameArtwork, getGameArt } from './GameArt';
import { GameKey } from './PopularGames';
import { PlayerStats } from '../../types';
import { sound } from '../../lib/soundEffects';

interface HomeHeroProps {
  stats: PlayerStats;
  onSelectGame: (gameKey: GameKey, subTab?: string) => void;
  onBrowseQuizTopics: () => void;
}

const STACK = [
  { sub: 'cinema', label: 'Cinema' },
  { sub: 'physics', label: 'Physics' },
  { sub: 'sports', label: 'Sports' },
];

export const HomeHero: React.FC<HomeHeroProps> = ({ stats, onSelectGame, onBrowseQuizTopics }) => {
  const name = stats.username || 'Player';

  return (
    <section className="relative w-full mb-6 sm:mb-8 rounded-[1.75rem] overflow-hidden animate-fade-in isolate">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10 bg-[#120a2a]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_0%_0%,#7c3aed_0%,transparent_45%),radial-gradient(90%_120%_at_100%_100%,#db2777_0%,transparent_50%),radial-gradient(60%_80%_at_80%_0%,#0891b2_0%,transparent_60%)] opacity-90" />
      <div className="absolute inset-0 -z-10 opacity-[0.18] bg-[linear-gradient(rgba(255,255,255,.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.4)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_30%_20%,#000_10%,transparent_70%)]" />

      <div className="relative grid md:grid-cols-[1.25fr_1fr] gap-6 p-5 sm:p-8 lg:p-10 min-h-[260px] sm:min-h-[300px]">
        {/* Copy */}
        <div className="flex flex-col justify-center text-white">
          <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-[0.16em]">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full w-2 h-2 bg-emerald-400" />
            </span>
            Featured tonight
          </span>

          <h1 className="mt-3 font-display text-[28px] leading-[1.05] sm:text-5xl lg:text-[56px] font-extrabold tracking-tight">
            Quiz Up
            <span className="block text-white/60 text-lg sm:text-2xl lg:text-[28px] font-semibold mt-1.5 tracking-normal">
              Welcome back, {name}.
            </span>
          </h1>
          <p className="mt-3 max-w-md text-sm sm:text-[15px] text-white/75 leading-relaxed">
            Timed trivia across 9 topics, from cinema and science to sports. Climb the levels and stack up coins.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => { sound.playTap(); onSelectGame('quizup', 'all'); }}
              className="h-11 sm:h-12 pl-4 pr-5 rounded-full bg-white text-slate-950 font-bold text-sm flex items-center gap-2 shadow-[0_12px_30px_-10px_rgba(0,0,0,.6)] hover:scale-[1.03] active:scale-[.98] transition"
            >
              <span className="w-7 h-7 rounded-full bg-slate-950 text-white flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-current translate-x-[1px]" />
              </span>
              Play now
            </button>
            <button
              onClick={() => { sound.playTap(); onBrowseQuizTopics(); }}
              className="h-11 sm:h-12 px-5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 backdrop-blur-md text-white font-semibold text-sm flex items-center gap-2 transition active:scale-[.98]"
            >
              <Layers className="w-4 h-4" />
              Browse topics
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white/80 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5"><Flame className="w-4 h-4 text-orange-300" /><b className="text-white tabular-nums">{stats.streak}</b> day streak</span>
            <span className="flex items-center gap-1.5"><Coins className="w-4 h-4 text-amber-300" /><b className="text-white tabular-nums">{stats.coins}</b> coins</span>
            <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-emerald-300" /><b className="text-white tabular-nums">{stats.totalGamesWon}</b> wins</span>
          </div>
        </div>

        {/* Fanned reel stack */}
        <div className="hidden md:flex relative items-center justify-center">
          {STACK.map((s, i) => {
            const spec = getGameArt('quizup', s.sub);
            const rot = [-12, 0, 12][i];
            const x = [-46, 0, 46][i];
            const y = [16, -6, 16][i];
            return (
              <div
                key={s.sub}
                className="absolute hover:!z-30"
                style={{ transform: `translate(${x * 1.6}px, ${y}px) rotate(${rot}deg)`, zIndex: i === 1 ? 20 : 10 }}
              >
                <button
                  onClick={() => { sound.playTap(); onSelectGame('quizup', s.sub); }}
                  className="relative block w-36 lg:w-40 aspect-[3/4.3] rounded-3xl overflow-hidden shadow-reel transition-transform duration-500 hover:-translate-y-3 hover:scale-[1.04]"
                  aria-label={`Play Quiz Up ${s.label}`}
                >
                  <GameArtwork spec={spec} />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-left">
                    <span className="font-display text-sm font-bold text-white">{s.label}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
