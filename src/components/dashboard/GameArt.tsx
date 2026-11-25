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

const GENRE_LABEL_SHORT: Record<string, string> = {
  quiz: 'Trivia',
  brain: 'Brain',
  social: 'Party',
  kids: 'Kids',
};

/** Square artwork for an app-style game icon. */
const IconArtwork: React.FC<{ spec: GameArtSpec }> = ({ spec }) => {
  const uid = useId().replace(/:/g, '');
  const Icon = spec.icon;
  return (
    <>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor={spec.from} />
            <stop offset="55%" stopColor={spec.via} />
            <stop offset="100%" stopColor={spec.to} />
          </linearGradient>
          <radialGradient id={`hl-${uid}`} cx="0.3" cy="0.15" r="0.75">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <rect width="200" height="200" fill={`url(#bg-${uid})`} />
        <MotifLayer motif={spec.motif} uid={uid} />
        <rect width="200" height="200" fill={`url(#hl-${uid})`} />
        {spec.glyph && (
          <text
            x="100" y="112" textAnchor="middle" dominantBaseline="middle"
            fontFamily="Sora, sans-serif" fontWeight="800"
            fontSize={spec.glyph.length > 3 ? 62 : spec.glyph.length > 1 ? 88 : 150}
            fill="rgba(255,255,255,0.14)" letterSpacing="-4"
          >
            {spec.glyph}
          </text>
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className="w-[46%] h-[46%] text-white drop-shadow-[0_6px_12px_rgba(0,0,0,.35)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
          strokeWidth={1.6}
        />
      </div>
      {/* glossy top sheen */}
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
    </>
  );
};

interface GameIconTileProps {
  game: GameCatalogItem;
  onPlay: () => void;
  index?: number;
}

/** Compact, app-store style game icon: glowing squircle artwork with the title below. */
export const GameIconTile: React.FC<GameIconTileProps> = ({ game, onPlay, index = 0 }) => {
  const spec = getGameArt(game.id, game.subTab);
  const title = game.title.replace(/^Quiz Up:\s*/, '');
  const isTopic = game.title.startsWith('Quiz Up:');

  return (
    <button
      type="button"
      onClick={onPlay}
      className="fz-game-icon group w-full flex flex-col items-center text-center animate-fade-in focus:outline-none"
      style={{ ['--icon-glow' as any]: spec.glow, animationDelay: `${Math.min(index, 14) * 30}ms` }}
      aria-label={`Play ${game.title}`}
    >
      <span className="fz-game-icon-wrap relative w-full max-w-[112px] aspect-square">
        <span className="fz-squircle absolute inset-0 overflow-hidden">
          <IconArtwork spec={spec} />
        </span>
        {/* play badge */}
        <span className="fz-game-icon-play absolute -bottom-0.5 -right-0.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white text-slate-950 flex items-center justify-center shadow-[0_6px_16px_-4px_rgba(0,0,0,.6)] ring-2 ring-[#f5f5fb] dark:ring-[#0a0b14]">
          <Play className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current translate-x-[1px]" />
        </span>
      </span>
      <span className="mt-2 w-full px-0.5 text-[11px] sm:text-[13px] font-semibold leading-tight text-slate-900 dark:text-white line-clamp-2">
        {title}
      </span>
      <span className="mt-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500 truncate w-full">
        {isTopic ? 'Quiz Up' : GENRE_LABEL_SHORT[game.genre] || game.genreLabel}
      </span>
    </button>
  );
};
