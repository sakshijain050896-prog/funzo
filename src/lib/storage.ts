import { PlayerStats, ThemeMode } from '../types';

const STATS_KEY = 'funzo_player_stats_v4';
const SOUND_KEY = 'funzo_sound_v3';
const THEME_KEY = 'funzo_theme_v3';

export const getStoredStats = (): PlayerStats => {
  if (typeof window === 'undefined') {
    return {
      username: 'Player',
      avatarId: 'fox',
      level: 1,
      xp: 0,
      iq: 100,
      streak: 1,
      lastPlayedDate: null,
      totalGamesWon: 0,
      totalGamesPlayed: 0,
      coins: 50,
      bestTimeSeconds: null,
      gamesPlayedHistory: {},
    };
  }

  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        username: parsed.username || 'Player',
        avatarId: parsed.avatarId || 'fox',
        level: parsed.level || 1,
        xp: parsed.xp ?? 0,
        iq: parsed.iq ?? 100,
        streak: parsed.streak || 1,
        lastPlayedDate: parsed.lastPlayedDate || null,
        totalGamesWon: parsed.totalGamesWon || (parsed.totalGamesPlayed ? Math.max(1, Math.floor(parsed.totalGamesPlayed * 0.5)) : 0),
        totalGamesPlayed: parsed.totalGamesPlayed || 0,
        coins: parsed.coins ?? 50,
        bestTimeSeconds: parsed.bestTimeSeconds || null,
        gamesPlayedHistory: parsed.gamesPlayedHistory || {},
      };
    }
  } catch (e) {
    console.error('Error loading stats from localStorage', e);
  }

  return {
    username: 'Player',
    avatarId: 'fox',
    level: 1,
    xp: 0,
    iq: 100,
    streak: 1,
    lastPlayedDate: null,
    totalGamesWon: 0,
    totalGamesPlayed: 0,
    coins: 50,
    bestTimeSeconds: null,
    gamesPlayedHistory: {},
  };
};

export const saveStats = (stats: PlayerStats) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Error saving stats to localStorage', e);
  }
};

export const updateProfile = (username: string, avatarId: string): PlayerStats => {
  const current = getStoredStats();
  const updated = {
    ...current,
    username: username.trim() || 'Player',
    avatarId,
  };
  saveStats(updated);
  return updated;
};

export const addPlayerXP = (amount: number): PlayerStats => {
  const current = getStoredStats();
  const newXP = current.xp + amount;
  const newLevel = Math.floor(newXP / 100) + 1;
  const updated = {
    ...current,
    xp: newXP,
    level: newLevel,
  };
  saveStats(updated);
  return updated;
};

export const increasePlayerIQ = (points: number): { stats: PlayerStats; oldIQ: number; newIQ: number } => {
  const current = getStoredStats();
  const oldIQ = current.iq;
  const newIQ = oldIQ + points;
  const updated = {
    ...current,
    iq: newIQ,
    coins: current.coins + 25,
  };
  saveStats(updated);
  return { stats: updated, oldIQ, newIQ };
};

export const recordDailyAttempt = (gameId: string): {
  stats: PlayerStats;
  isNewStreakDay: boolean;
  coinsEarned: number;
} => {
  const current = getStoredStats();
  const today = new Date().toISOString().slice(0, 10);

  let isNewStreakDay = false;
  let newStreak = current.streak;
  let coinsBonus = 0;

  if (current.lastPlayedDate !== today) {
    isNewStreakDay = true;
    coinsBonus = 25;

    if (current.lastPlayedDate) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (current.lastPlayedDate === yesterday) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else {
      newStreak = 1;
    }
  }

  const updatedHistory = {
    ...current.gamesPlayedHistory,
    [gameId]: (current.gamesPlayedHistory[gameId] || 0) + 1,
  };

  const newXP = current.xp + 15;
  const newLevel = Math.floor(newXP / 100) + 1;

  const updated: PlayerStats = {
    ...current,
    streak: newStreak,
    lastPlayedDate: today,
    totalGamesPlayed: current.totalGamesPlayed + 1,
    coins: current.coins + coinsBonus,
    xp: newXP,
    level: newLevel,
    gamesPlayedHistory: updatedHistory,
  };

  saveStats(updated);
  return { stats: updated, isNewStreakDay, coinsEarned: coinsBonus };
};

export const recordGameWin = (
  gameId?: string,
  timeTakenSeconds?: number,
  isDaily: boolean = false
): PlayerStats => {
  const current = getStoredStats();
  const coinsReward = isDaily ? 50 : 25;
  const newXP = current.xp + 50;
  const newLevel = Math.floor(newXP / 100) + 1;
  const newIQ = (current.iq || 100) + (isDaily ? 5 : 3);

  const updatedHistory = { ...current.gamesPlayedHistory };
  if (gameId) {
    updatedHistory[gameId] = (updatedHistory[gameId] || 0) + 1;
  }

  const newTotalWon = (current.totalGamesWon || 0) + 1;
  const newTotalPlayed = Math.max((current.totalGamesPlayed || 0), newTotalWon);

  const updated: PlayerStats = {
    ...current,
    totalGamesWon: newTotalWon,
    totalGamesPlayed: newTotalPlayed,
    coins: (current.coins || 0) + coinsReward,
    xp: newXP,
    level: newLevel,
    iq: newIQ,
    gamesPlayedHistory: updatedHistory,
    bestTimeSeconds: timeTakenSeconds
      ? (current.bestTimeSeconds ? Math.min(current.bestTimeSeconds, timeTakenSeconds) : timeTakenSeconds)
      : current.bestTimeSeconds,
  };

  saveStats(updated);
  return updated;
};

export const getSoundPreference = (): boolean => {
  if (typeof window === 'undefined') return true;
  const stored = localStorage.getItem(SOUND_KEY);
  return stored !== null ? stored === 'true' : true;
};

export const saveSoundPreference = (enabled: boolean) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SOUND_KEY, String(enabled));
};

export const getThemePreference = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};

export const saveThemePreference = (theme: ThemeMode) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_KEY, theme);
};
