export type Difficulty = 'daily' | 'easy' | 'medium' | 'hard';

export type SudokuCell = {
  row: number;
  col: number;
  value: number;
  solution: number;
  isInitial: boolean;
  notes: Set<number>;
  isError: boolean;
};

export type PlayerStats = {
  username: string;
  avatarId: string;
  level: number;
  xp: number;
  iq: number;
  streak: number;
  lastPlayedDate: string | null;
  totalGamesWon: number;
  totalGamesPlayed: number;
  coins: number;
  bestTimeSeconds: number | null;
  gamesPlayedHistory: Record<string, number>;
};

export type GenreType = 'quiz' | 'brain' | 'social' | 'kids' | 'mystery';
export type ThemeMode = 'dark' | 'light';

export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
}

export const CARTOON_AVATARS: AvatarOption[] = [
  { id: 'mario', name: 'Super Mario', emoji: '🍄', bgColor: 'bg-red-500' },
  { id: 'luigi', name: 'Super Luigi', emoji: '🟢', bgColor: 'bg-emerald-500' },
  { id: 'peach', name: 'Princess Peach', emoji: '👑', bgColor: 'bg-pink-400' },
  { id: 'yoshi', name: 'Dino Yoshi', emoji: '🦖', bgColor: 'bg-green-500' },
  { id: 'toad', name: 'Speedy Toad', emoji: '🎈', bgColor: 'bg-blue-500' },
  { id: 'star', name: 'Super Star', emoji: '⭐', bgColor: 'bg-yellow-400' },
  { id: 'boo', name: 'Mischief Boo', emoji: '👻', bgColor: 'bg-indigo-400' },
  { id: 'fox', name: 'Brainy Fox', emoji: '🦊', bgColor: 'bg-orange-500' },
  { id: 'lion', name: 'Cool Lion', emoji: '🦁', bgColor: 'bg-amber-500' },
  { id: 'panda', name: 'Chill Panda', emoji: '🐼', bgColor: 'bg-emerald-500' },
  { id: 'cat', name: 'Cat Mario', emoji: '🐱', bgColor: 'bg-rose-500' },
  { id: 'bot', name: 'Mecha Koopa', emoji: '🤖', bgColor: 'bg-cyan-500' },
];

export interface IQRankDetails {
  title: string;
  badge: string;
  color: string;
  borderColor: string;
  bgColor: string;
  minIQ: number;
  nextIQ: number;
  nextTitle: string;
  progressPercent: number;
}

export const getIQRank = (iq: number): { title: string; badge: string; color: string } => {
  if (iq < 105) return { title: 'Rookie Prodigy', badge: '🌱', color: 'text-emerald-400' };
  if (iq < 120) return { title: 'Brainstormer', badge: '⚡', color: 'text-cyan-400' };
  if (iq < 135) return { title: 'Cerebral Ace', badge: '🎯', color: 'text-blue-400' };
  if (iq < 150) return { title: 'Mastermind', badge: '🧠', color: 'text-purple-400' };
  if (iq < 165) return { title: 'Apex Intellect', badge: '💎', color: 'text-pink-400' };
  return { title: 'Cosmic Deity', badge: '👑', color: 'text-amber-400' };
};

export const getIQRankDetails = (iq: number): IQRankDetails => {
  if (iq < 105) {
    const minIQ = 80;
    const nextIQ = 105;
    const pct = Math.min(100, Math.max(0, Math.round(((iq - minIQ) / (nextIQ - minIQ)) * 100)));
    return {
      title: 'Rookie Prodigy',
      badge: '🌱',
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      bgColor: 'bg-emerald-500/10',
      minIQ,
      nextIQ,
      nextTitle: 'Brainstormer ⚡',
      progressPercent: pct,
    };
  }
  if (iq < 120) {
    const minIQ = 105;
    const nextIQ = 120;
    const pct = Math.min(100, Math.max(0, Math.round(((iq - minIQ) / (nextIQ - minIQ)) * 100)));
    return {
      title: 'Brainstormer',
      badge: '⚡',
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgColor: 'bg-cyan-500/10',
      minIQ,
      nextIQ,
      nextTitle: 'Cerebral Ace 🎯',
      progressPercent: pct,
    };
  }
  if (iq < 135) {
    const minIQ = 120;
    const nextIQ = 135;
    const pct = Math.min(100, Math.max(0, Math.round(((iq - minIQ) / (nextIQ - minIQ)) * 100)));
    return {
      title: 'Cerebral Ace',
      badge: '🎯',
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      minIQ,
      nextIQ,
      nextTitle: 'Mastermind 🧠',
      progressPercent: pct,
    };
  }
  if (iq < 150) {
    const minIQ = 135;
    const nextIQ = 150;
    const pct = Math.min(100, Math.max(0, Math.round(((iq - minIQ) / (nextIQ - minIQ)) * 100)));
    return {
      title: 'Mastermind',
      badge: '🧠',
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      bgColor: 'bg-purple-500/10',
      minIQ,
      nextIQ,
      nextTitle: 'Apex Intellect 💎',
      progressPercent: pct,
    };
  }
  if (iq < 165) {
    const minIQ = 150;
    const nextIQ = 165;
    const pct = Math.min(100, Math.max(0, Math.round(((iq - minIQ) / (nextIQ - minIQ)) * 100)));
    return {
      title: 'Apex Intellect',
      badge: '💎',
      color: 'text-pink-400',
      borderColor: 'border-pink-500/30',
      bgColor: 'bg-pink-500/10',
      minIQ,
      nextIQ,
      nextTitle: 'Cosmic Deity 👑',
      progressPercent: pct,
    };
  }
  return {
    title: 'Cosmic Deity',
    badge: '👑',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/10',
    minIQ: 165,
    nextIQ: 200,
    nextTitle: 'Maximum Ascended',
    progressPercent: 100,
  };
};

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'reward' | 'streak' | 'challenge' | 'system' | 'update';
  icon: string;
  isRead: boolean;
  actionGameId?: string;
  actionCategory?: string;
  actionLabel?: string;
  claimed?: boolean;
  rewardCoins?: number;
}

