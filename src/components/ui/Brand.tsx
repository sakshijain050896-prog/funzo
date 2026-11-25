import React from 'react';

/** Funzo monogram — gradient squircle with an "F" mark. */
export const FunzoMark: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="fz-mark-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8b5cf6" />
        <stop offset="0.55" stopColor="#c026d3" />
        <stop offset="1" stopColor="#f472b6" />
      </linearGradient>
      <radialGradient id="fz-mark-h" cx="0.25" cy="0.15" r="0.8">
        <stop offset="0" stopColor="rgba(255,255,255,.55)" />
        <stop offset="1" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
    </defs>
    <rect width="64" height="64" rx="18" fill="url(#fz-mark-g)" />
    <rect width="64" height="64" rx="18" fill="url(#fz-mark-h)" />
    <path d="M22 15h23v8.5H31.5V29H43v8.5H31.5V49H22z" fill="#fff" />
    <circle cx="44.5" cy="44.5" r="4.5" fill="#22d3ee" />
  </svg>
);

/** Emoji avatar presented inside a premium gradient ring. */
export const AvatarBadge: React.FC<{ emoji: string; size?: 'xs' | 'sm' | 'md' | 'lg'; className?: string }> = ({
  emoji, size = 'md', className = '',
}) => {
  const dims = {
    xs: 'w-7 h-7 text-sm',
    sm: 'w-8 h-8 text-base',
    md: 'w-10 h-10 text-xl',
    lg: 'w-14 h-14 text-3xl',
  }[size];
  return (
    <span className={`relative inline-flex shrink-0 rounded-full p-[2px] bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400 ${className}`}>
      <span className={`${dims} rounded-full bg-white dark:bg-[#14162b] flex items-center justify-center leading-none`}>
        {emoji}
      </span>
    </span>
  );
};
