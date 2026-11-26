// Funzo authentication & cloud progress (Supabase Auth: email + password).
//
// - Passwords are handled entirely by Supabase Auth (hashed server-side).
// - Each player's progress lives in public.player_progress, protected by
//   Row Level Security so a player can only read/write their own row.
// - Admin rights are checked on the server (public.is_admin()).
// - Without Supabase configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY),
//   the app runs in guest mode with progress stored on the device only.

import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { PlayerStats } from '../types';
import { saveStats, getStoredStats, PROGRESS_UPDATED_AT_KEY } from './storage';
import { supabase, isSupabaseConfigured } from './supabase';

export const isCloudEnabled = isSupabaseConfigured;

export interface AuthUser {
  id: string;
  email: string;
}

export interface CloudProgressRow {
  user_id: string;
  username: string;
  avatar_id: string;
  stats: PlayerStats;
  arrow_level: number;
  game_state: Record<string, string>;
  updated_at: string;
}

export interface AdminPlayerRow extends CloudProgressRow {
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

export interface LeaderboardRow {
  username: string;
  avatar_id: string;
  level: number;
  wins: number;
  coins: number;
  streak: number;
  points: number;
  is_me: boolean;
}

type Result<T = undefined> = { ok: true; data: T; message?: string } | { ok: false; message: string };

// ---------------------------------------------------------------------------
// Device keys synced to the cloud alongside stats (per-game progress)
// ---------------------------------------------------------------------------
const ARROW_LEVEL_KEY = 'funzo_arrow_level';
const SYNCED_GAME_KEYS = [
  'funzo_quizup_level',
  'funzo_math_level',
  'funzo_math_highscore',
  'funzo_2048_best',
  'funzo_arrow_max_level',
  'funzo_arrow_hints',
  'funzo_mystery_max_case',
];

// Legacy demo-auth storage (contained base64 "passwords"); removed on upgrade.
const LEGACY_KEYS = ['funzo_cloud_accounts_v2', 'funzo_active_session_v2'];
try {
  if (typeof window !== 'undefined') LEGACY_KEYS.forEach((k) => localStorage.removeItem(k));
} catch {
  /* ignore */
}

const readArrowLevel = (): number => {
  try {
    const n = parseInt(localStorage.getItem(ARROW_LEVEL_KEY) || '1', 10);
    return Number.isFinite(n) && n >= 1 ? Math.min(n, 10000) : 1;
  } catch {
    return 1;
  }
};

const readGameState = (): Record<string, string> => {
  const out: Record<string, string> = {};
  try {
    for (const k of SYNCED_GAME_KEYS) {
      const v = localStorage.getItem(k);
      if (v !== null) out[k] = v;
    }
  } catch {
    /* ignore */
  }
  return out;
};

const applyCloudRowLocally = (row: CloudProgressRow) => {
  const stats: PlayerStats = {
    ...getStoredStats(),
    ...row.stats,
    username: row.username || row.stats?.username || 'Player',
    avatarId: row.avatar_id || row.stats?.avatarId || 'fox',
  };
  saveStats(stats);
  try {
    localStorage.setItem(ARROW_LEVEL_KEY, String(row.arrow_level || 1));
    for (const [k, v] of Object.entries(row.game_state || {})) {
      if (SYNCED_GAME_KEYS.includes(k) && typeof v === 'string') localStorage.setItem(k, v);
    }
    localStorage.setItem(PROGRESS_UPDATED_AT_KEY, row.updated_at || new Date().toISOString());
  } catch {
    /* ignore */
  }
  return stats;
};

const friendlyError = (msg?: string): string => {
  const m = (msg || '').toLowerCase();
  if (m.includes('invalid login credentials')) return 'Wrong email or password.';
  if (m.includes('email not confirmed')) return 'Please confirm your email first (check your inbox).';
  if (m.includes('user already registered') || m.includes('already been registered')) return 'An account with this email already exists. Try signing in.';
  if (m.includes('password should be') || m.includes('weak password')) return 'Password is too weak. Use at least 8 characters.';
  if (m.includes('rate limit') || m.includes('too many')) return 'Too many attempts. Please wait a minute and try again.';
  if (m.includes('unable to validate email') || m.includes('invalid email')) return 'Please enter a valid email address.';
  if (m.includes('failed to fetch') || m.includes('network')) return 'Network error. Check your connection and try again.';
  return msg || 'Something went wrong. Please try again.';
};

const notConfigured = (): { ok: false; message: string } => ({
  ok: false,
  message: 'Cloud sign-in is not available yet. Your progress is saved on this device.',
});

// ---------------------------------------------------------------------------
// Auth state (tiny store + React hook)
// ---------------------------------------------------------------------------
let currentUser: AuthUser | null = null;
let authReady = !isCloudEnabled;
const listeners = new Set<() => void>();
const recoveryListeners = new Set<() => void>();
// The recovery event can fire before React subscribes (Supabase parses the URL on load)
let pendingRecovery =
  typeof window !== 'undefined' && /type=(recovery|invite)/.test(window.location.hash + window.location.search); // invite = owner/admin invite link: set first password
const emit = () => listeners.forEach((l) => l());

const toAuthUser = (u: User | null | undefined): AuthUser | null =>
  u ? { id: u.id, email: u.email || '' } : null;

if (supabase) {
  supabase.auth.getSession().then(({ data }) => {
    currentUser = toAuthUser(data.session?.user);
    authReady = true;
    emit();
  });
  supabase.auth.onAuthStateChange((event, session) => {
    currentUser = toAuthUser(session?.user);
    authReady = true;
    if (event === 'PASSWORD_RECOVERY') {
      if (recoveryListeners.size) recoveryListeners.forEach((l) => l());
      else pendingRecovery = true;
    }
    emit();
  });
}

export const getAuthUser = (): AuthUser | null => currentUser;

export function useAuthUser(): { user: AuthUser | null; ready: boolean } {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  return { user: currentUser, ready: authReady };
}

/** Fires when the user lands back on the site from a "reset password" email. */
export function onPasswordRecovery(cb: () => void): () => void {
  recoveryListeners.add(cb);
  if (pendingRecovery && isCloudEnabled) {
    pendingRecovery = false;
    setTimeout(cb, 0);
  }
  return () => {
    recoveryListeners.delete(cb);
  };
}

// ---------------------------------------------------------------------------
// Cloud progress
// ---------------------------------------------------------------------------
async function fetchOwnProgress(userId: string): Promise<CloudProgressRow | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('player_progress')
    .select('user_id, username, avatar_id, stats, arrow_level, game_state, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return (data as CloudProgressRow) || null;
}

async function pushProgress(userId: string, stats: PlayerStats): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from('player_progress').upsert(
    {
      user_id: userId,
      username: (stats.username || 'Player').slice(0, 24),
      avatar_id: stats.avatarId || 'fox',
      stats,
      arrow_level: readArrowLevel(),
      game_state: readGameState(),
    },
    { onConflict: 'user_id' }
  );
  if (error) throw error;
}

/**
 * Reconcile device progress with the account.
 *  - 'login'  (just signed in / signed up): the account's saved progress wins,
 *             so signing in on a new device restores it. A brand-new account
 *             adopts the progress already on this device.
 *  - 'resume' (app reopened with an existing session): the newer copy wins.
 * Returns the stats to show, or null if nothing changed locally.
 */
export async function reconcileProgress(mode: 'login' | 'resume'): Promise<PlayerStats | null> {
  const user = currentUser;
  if (!supabase || !user) return null;
  try {
    const row = await fetchOwnProgress(user.id);
    const local = getStoredStats();
    if (!row) {
      await pushProgress(user.id, local);
      return null;
    }
    if (mode === 'login') return applyCloudRowLocally(row);
    const localAt = Date.parse(localStorage.getItem(PROGRESS_UPDATED_AT_KEY) || '') || 0;
    const cloudAt = Date.parse(row.updated_at) || 0;
    if (cloudAt > localAt) return applyCloudRowLocally(row);
    await pushProgress(user.id, local);
    return null;
  } catch (e) {
    console.error('Progress sync failed', e);
    return null;
  }
}

let syncTimer: ReturnType<typeof setTimeout> | null = null;
let pendingStats: PlayerStats | null = null;

/** Debounced cloud save of the latest stats (no-op for guests). */
export function syncPlayerProgress(updatedStats: PlayerStats, _arrowLevel?: number) {
  if (!supabase || !currentUser) return;
  pendingStats = updatedStats;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(flushSync, 1500);
}

async function flushSync() {
  syncTimer = null;
  const user = currentUser;
  const stats = pendingStats;
  pendingStats = null;
  if (!user || !stats) return;
  try {
    await pushProgress(user.id, stats);
  } catch (e) {
    console.error('Cloud save failed', e);
  }
}

if (typeof window !== 'undefined') {
  // Don't lose the last few seconds of progress when the tab is hidden/closed
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && syncTimer) {
      clearTimeout(syncTimer);
      flushSync();
    }
  });
}

// ---------------------------------------------------------------------------
// Email + password auth
// ---------------------------------------------------------------------------
const siteUrl = () => (typeof window !== 'undefined' ? window.location.origin : undefined);

export async function signUpWithEmail(email: string, password: string, username: string): Promise<Result<{ needsConfirmation: boolean; stats: PlayerStats | null }>> {
  if (!supabase) return notConfigured();
  if (password.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' };
  const cleanName = (username || '').trim().slice(0, 24) || 'Player';
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { username: cleanName }, emailRedirectTo: siteUrl() },
  });
  if (error) return { ok: false, message: friendlyError(error.message) };
  // Email enumeration protection returns a user with no identities for existing emails
  if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
    return { ok: false, message: 'An account with this email already exists. Try signing in.' };
  }
  if (!data.session) {
    return { ok: true, data: { needsConfirmation: true, stats: null }, message: 'Check your email to confirm your account, then sign in.' };
  }
  currentUser = toAuthUser(data.user);
  // New account: keep this device's progress, with the chosen name
  const local = { ...getStoredStats(), username: cleanName };
  saveStats(local);
  const stats = (await reconcileProgress('login')) || local;
  return { ok: true, data: { needsConfirmation: false, stats }, message: 'Account created! Your progress is now saved to the cloud.' };
}

export async function signInWithEmail(email: string, password: string): Promise<Result<{ stats: PlayerStats | null }>> {
  if (!supabase) return notConfigured();
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) return { ok: false, message: friendlyError(error.message) };
  currentUser = toAuthUser(data.user);
  const stats = await reconcileProgress('login');
  return { ok: true, data: { stats }, message: 'Signed in! Your progress has been restored.' };
}

export async function sendPasswordReset(email: string): Promise<Result> {
  if (!supabase) return notConfigured();
  if (!email.trim()) return { ok: false, message: 'Enter your email address first.' };
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: siteUrl() });
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, data: undefined, message: 'If an account exists for this email, a reset link is on its way.' };
}

export async function updatePassword(newPassword: string): Promise<Result> {
  if (!supabase) return notConfigured();
  if (newPassword.length < 8) return { ok: false, message: 'Password must be at least 8 characters.' };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, data: undefined, message: 'Password updated.' };
}

export async function signOut(): Promise<void> {
  if (!supabase) return;
  if (syncTimer) {
    clearTimeout(syncTimer);
    await flushSync();
  }
  await supabase.auth.signOut();
  currentUser = null;
  emit();
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------
export async function fetchLeaderboard(limit = 50): Promise<LeaderboardRow[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc('get_leaderboard', { limit_n: limit });
  if (error) {
    console.error('Leaderboard failed', error);
    return null;
  }
  return (data as LeaderboardRow[]) || [];
}

// ---------------------------------------------------------------------------
// Admin (every call is re-checked by the database)
// ---------------------------------------------------------------------------
export async function checkIsAdmin(): Promise<boolean> {
  if (!supabase || !currentUser) return false;
  const { data, error } = await supabase.rpc('is_admin');
  return !error && data === true;
}

export async function adminListPlayers(): Promise<Result<AdminPlayerRow[]>> {
  if (!supabase) return notConfigured();
  const { data, error } = await supabase.rpc('admin_list_players');
  if (error) return { ok: false, message: error.message.includes('admin only') ? 'Admins only.' : friendlyError(error.message) };
  return { ok: true, data: (data as AdminPlayerRow[]) || [] };
}

export async function adminUpdatePlayer(
  userId: string,
  patch: { stats?: PlayerStats; arrow_level?: number; username?: string }
): Promise<Result> {
  if (!supabase) return notConfigured();
  const { error } = await supabase.from('player_progress').update(patch).eq('user_id', userId);
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, data: undefined };
}

export async function adminDeletePlayer(userId: string): Promise<Result> {
  if (!supabase) return notConfigured();
  const { error } = await supabase.from('player_progress').delete().eq('user_id', userId);
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, data: undefined };
}

export async function adminRestorePlayers(rows: Partial<CloudProgressRow>[]): Promise<Result<number>> {
  if (!supabase) return notConfigured();
  const clean = rows
    .filter((r) => r && typeof r.user_id === 'string')
    .map((r) => ({
      user_id: r.user_id!,
      username: (r.username || 'Player').slice(0, 24),
      avatar_id: r.avatar_id || 'fox',
      stats: r.stats || {},
      arrow_level: r.arrow_level || 1,
      game_state: r.game_state || {},
    }));
  if (clean.length === 0) return { ok: false, message: 'No valid players found in this file.' };
  const { error } = await supabase.from('player_progress').upsert(clean, { onConflict: 'user_id' });
  if (error) return { ok: false, message: friendlyError(error.message) };
  return { ok: true, data: clean.length };
}

/** Apply stats edited by an admin to this device if they edited their own row. */
export function applyOwnRowIfCurrent(row: CloudProgressRow): PlayerStats | null {
  if (!currentUser || row.user_id !== currentUser.id) return null;
  return applyCloudRowLocally(row);
}
