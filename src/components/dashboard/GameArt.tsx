import React, { useId } from 'react';
import {
  Lightbulb, Calculator, Rocket, Grid2x2, Flame, Drama, Scale, EyeOff,
  PartyPopper, PawPrint, Grid3x3, Clapperboard, Microscope, Atom, FlaskConical,
  Landmark, Sigma, Earth, Cpu, Trophy, Sparkles, Play, LucideIcon,
} from 'lucide-react';
import type { GameCatalogItem } from './AllGamesCatalog';

type Motif = 'rings' | 'grid' | 'rays' | 'dots' | 'waves';

export interface GameArtSpec {
  icon: LucideIcon;
  /** top colour */
  from: string;
  /** mid colour */
  via: string;
  /** deep bottom colour (keeps titles legible) */
  to: string;
  /** hover glow colour */
  glow: string;
  motif: Motif;
  /** large decorative glyph behind the icon */
  glyph?: string;
}

const ART: Record<string, GameArtSpec> = {
  'quizup:all':        { icon: Lightbulb,    from: '#fbbf24', via: '#ef4444', to: '#2a0b3d', glow: 'rgba(251,146,60,.7)',  motif: 'rings', glyph: '?' },
  'sudoku':            { icon: Calculator,   from: '#22d3ee', via: '#3b82f6', to: '#0b1035', glow: 'rgba(59,130,246,.7)',  motif: 'grid',  glyph: '÷' },
  'arrows':            { icon: Rocket,       from: '#34d399', via: '#0ea5e9', to: '#04172a', glow: 'rgba(16,185,129,.7)',  motif: 'rays',  glyph: '↗' },
  '2048':              { icon: Grid2x2,      from: '#c084fc', via: '#6366f1', to: '#140b3a', glow: 'rgba(139,92,246,.75)', motif: 'grid',  glyph: '2048' },
  'tod:truth-or-dare': { icon: Flame,        from: '#fb7185', via: '#f97316', to: '#3a0714', glow: 'rgba(244,63,94,.75)',  motif: 'rays' },
  '2t1l:two-truths':   { icon: Drama,        from: '#a3e635', via: '#14b8a6', to: '#03251f', glow: 'rgba(20,184,166,.7)',  motif: 'dots',  glyph: '2+1' },
  'tod:would-you-rather': { icon: Scale,     from: '#fdba74', via: '#f43f5e', to: '#36091a', glow: 'rgba(251,146,60,.7)',  motif: 'waves', glyph: 'A/B' },
  'tod:never-have-i-ever': { icon: EyeOff,   from: '#f472b6', via: '#8b5cf6', to: '#1e0838', glow: 'rgba(217,70,239,.7)',  motif: 'dots' },
  'balloon':           { icon: PartyPopper,  from: '#f9a8d4', via: '#fb7185', to: '#3d0820', glow: 'rgba(244,114,182,.7)', motif: 'dots' },
  'memory':            { icon: PawPrint,     from: '#fde047', via: '#f97316', to: '#331003', glow: 'rgba(250,204,21,.65)', motif: 'grid' },
  'tictactoe':         { icon: Grid3x3,      from: '#5eead4', via: '#22c55e', to: '#03200f', glow: 'rgba(45,212,191,.7)',  motif: 'grid',  glyph: 'XO' },
  'tod':               { icon: Flame,        from: '#fb7185', via: '#f97316', to: '#3a0714', glow: 'rgba(244,63,94,.75)',  motif: 'rays' },
  '2t1l':              { icon: Drama,        from: '#a3e635', via: '#14b8a6', to: '#03251f', glow: 'rgba(20,184,166,.7)',  motif: 'dots',  glyph: '2+1' },
  'mystery':         { icon: Sparkles,     from: '#94a3b8', via: '#6366f1', to: '#0b0d1e', glow: 'rgba(99,102,241,.7)',  motif: 'rings' },
  // Quiz Up topics
  'quizup:cinema':     { icon: Clapperboard, from: '#fb7185', via: '#a21caf', to: '#22052c', glow: 'rgba(225,29,72,.7)',   motif: 'rays' },
  'quizup:science':    { icon: Microscope,   from: '#4ade80', via: '#0d9488', to: '#032320', glow: 'rgba(34,197,94,.65)',  motif: 'dots' },
  'quizup:physics':    { icon: Atom,         from: '#7dd3fc', via: '#6366f1', to: '#0c0f3a', glow: 'rgba(99,102,241,.7)',  motif: 'rings' },
  'quizup:chemistry':  { icon: FlaskConical, from: '#c4b5fd', via: '#7c3aed', to: '#170a38', glow: 'rgba(124,58,237,.75)', motif: 'dots' },
  'quizup:history':    { icon: Landmark,     from: '#fcd34d', via: '#c2410c', to: '#2a0f03', glow: 'rgba(245,158,11,.7)',  motif: 'rays' },
  'quizup:math':       { icon: Sigma,        from: '#fda4af', via: '#e11d48', to: '#2e0512', glow: 'rgba(225,29,72,.7)',   motif: 'grid',  glyph: 'π' },
  'quizup:geography':  { icon: Earth,        from: '#5eead4', via: '#0284c7', to: '#041a33', glow: 'rgba(14,165,233,.7)',  motif: 'waves' },
  'quizup:tech':       { icon: Cpu,          from: '#a5b4fc', via: '#4338ca', to: '#0c0a33', glow: 'rgba(99,102,241,.75)', motif: 'grid',  glyph: '</>' },
  'quizup:sports':     { icon: Trophy,       from: '#bef264', via: '#16a34a', to: '#04230f', glow: 'rgba(132,204,22,.7)',  motif: 'rings' },
};

export const getGameArt = (id: string, subTab?: string): GameArtSpec => {
  return ART[`${id}:${subTab}`] || ART[id] || ART[`${id}:all`] || ART['quizup:all'];
};

const MotifLayer: React.FC<{ motif: Motif; uid: string }> = ({ motif, uid }) => {
  const stroke = 'rgba(255,255,255,0.16)';
  switch (motif) {
    case 'rings':
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.2">
          {[28, 52, 78, 106, 136, 168].map((r) => (
            <circle key={r} cx="150" cy="70" r={r} />
          ))}
        </g>
      );
    case 'grid':
      return (
        <g transform="rotate(-14 100 150)" fill="none" stroke={stroke} strokeWidth="1.2">
          {Array.from({ length: 7 }).map((_, r) =>
            Array.from({ length: 5 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={-20 + c * 52} y={-20 + r * 52} width="42" height="42" rx="10"
                fill={(r + c) % 4 === 0 ? 'rgba(255,255,255,0.07)' : 'none'} />
            ))
          )}
        </g>
      );
    case 'rays':
      return (
        <g>
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return (
              <line key={i} x1="100" y1="90" x2={100 + Math.cos(a) * 320} y2={90 + Math.sin(a) * 320}
                stroke={i % 2 ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.14)'} strokeWidth={i % 2 ? 10 : 2} />
            );
          })}
        </g>
      );
    case 'dots':
      return (
        <g>
          <defs>
            <pattern id={`dots-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="1.6" fill="rgba(255,255,255,0.22)" />
            </pattern>
          </defs>
          <rect width="200" height="300" fill={`url(#dots-${uid})`} />
          <circle cx="40" cy="60" r="26" fill="rgba(255,255,255,0.10)" />
          <circle cx="170" cy="40" r="14" fill="rgba(255,255,255,0.12)" />
          <circle cx="160" cy="170" r="36" fill="rgba(255,255,255,0.06)" />
        </g>
      );
    case 'waves':
    default:
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.4">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M -10 ${30 + i * 26} C 40 ${10 + i * 26}, 80 ${55 + i * 26}, 120 ${30 + i * 26} S 190 ${10 + i * 26}, 220 ${30 + i * 26}`} />
          ))}
        </g>
      );
  }
};

/** Full-bleed artwork for a game (used by reel cards & hero). */
export const GameArtwork: React.FC<{ spec: GameArtSpec; className?: string; iconSize?: 'md' | 'lg' }> = ({
  spec, className = '', iconSize = 'md',
}) => {
  const uid = useId().replace(/:/g, '');
  const Icon = spec.icon;
  return (
    <div className={`absolute inset-0 ${className}`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor={spec.from} />
            <stop offset="48%" stopColor={spec.via} />
            <stop offset="100%" stopColor={spec.to} />
          </linearGradient>
          <radialGradient id={`hl-${uid}`} cx="0.25" cy="0.1" r="0.7">
            <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="200" height="300" fill={`url(#bg-${uid})`} />
        <MotifLayer motif={spec.motif} uid={uid} />
        <rect width="200" height="300" fill={`url(#hl-${uid})`} />
        {spec.glyph && (
          <text
            x="100" y="150" textAnchor="middle" dominantBaseline="middle"
            fontFamily="Sora, sans-serif" fontWeight="800"
            fontSize={spec.glyph.length > 3 ? 64 : spec.glyph.length > 1 ? 92 : 150}
            fill="rgba(255,255,255,0.13)" letterSpacing="-4"
          >
            {spec.glyph}
          </text>
        )}
      </svg>

      {/* Floating glass icon orb */}
      <div className="absolute inset-x-0 top-[24%] flex justify-center">
        <div className={`relative ${iconSize === 'lg' ? 'w-24 h-24 sm:w-28 sm:h-28' : 'w-16 h-16 sm:w-[72px] sm:h-[72px]'} rounded-[28%] bg-white/15 border border-white/30 backdrop-blur-md shadow-[0_20px_40px_-12px_rgba(0,0,0,.55),inset_0_1px_0_rgba(255,255,255,.45)] flex items-center justify-center animate-float`}>
          <Icon className={`${iconSize === 'lg' ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-8 h-8 sm:w-9 sm:h-9'} text-white drop-shadow-[0_4px_10px_rgba(0,0,0,.35)]`} strokeWidth={1.75} />
        </div>
      </div>
    </div>
  );
};

const GENRE_LABEL_SHORT: Record<string, string> = {
  quiz: 'Trivia',
  brain: 'Brain',
  social: 'Party',
  kids: 'Kids',
};

interface ReelCardProps {
  game: GameCatalogItem;
  onPlay: () => void;
  index?: number;
}

/** Vertical, story-style "reel" card for a game. */
export const ReelCard: React.FC<ReelCardProps> = ({ game, onPlay, index = 0 }) => {
  const spec = getGameArt(game.id, game.subTab);
  const title = game.title.replace(/^Quiz Up:\s*/, '');
  const isTopic = game.title.startsWith('Quiz Up:');

  return (
    <button
      type="button"
      onClick={onPlay}
      className="fz-reel group w-full aspect-[3/4.3] text-left animate-fade-in focus:outline-none"
      style={{ ['--reel-glow' as any]: spec.glow, animationDelay: `${Math.min(index, 12) * 40}ms` }}
      aria-label={`Play ${game.title}`}
    >
      <GameArtwork spec={spec} className="fz-reel-art" />

      {/* Reel progress segments */}
      <div className="absolute top-2.5 inset-x-3 z-[2] flex gap-1">
        <span className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
          <span className="block h-full w-full origin-left bg-white/90 animate-reel-progress" style={{ animationDelay: `${(index % 5) * 0.6}s` }} />
        </span>
        <span className="h-[3px] flex-1 rounded-full bg-white/25" />
        <span className="h-[3px] flex-1 rounded-full bg-white/25" />
      </div>

      {/* Genre chip */}
      <div className="absolute top-5 left-3 z-[2] flex items-center gap-1.5">
        <span className="px-2 py-[3px] rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          {isTopic ? 'Quiz Up' : GENRE_LABEL_SHORT[game.genre] || game.genreLabel}
        </span>
      </div>

      {/* Bottom scrim + meta */}
      <div className="absolute inset-x-0 bottom-0 z-[2] pt-16 p-3 sm:p-3.5 bg-gradient-to-t from-black/85 via-black/45 to-transparent">
        <div className="flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display text-[13px] sm:text-[15px] font-bold leading-tight text-white line-clamp-2 drop-shadow">
              {title}
            </h3>
            <p className="mt-0.5 text-[10px] sm:text-[11px] font-medium text-white/70 truncate">
              {game.tag}
            </p>
          </div>
          <span className="fz-reel-play shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(0,0,0,.6)]">
            <Play className="w-4 h-4 fill-current translate-x-[1px]" />
          </span>
        </div>
      </div>
    </button>
  );
};
