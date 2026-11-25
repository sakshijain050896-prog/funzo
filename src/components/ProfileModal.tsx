import React, { useState, useEffect } from 'react';
import {
  X, Check, UserCheck, KeyRound, LogIn, LogOut, Cloud, CloudOff,
  AlertCircle, Mail, Lock, UserPlus, Loader2, ShieldCheck,
} from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../types';
import { updateProfile } from '../lib/storage';
import { sound } from '../lib/soundEffects';
import {
  isCloudEnabled,
  useAuthUser,
  signInWithEmail,
  signUpWithEmail,
  sendPasswordReset,
  signOut,
  checkIsAdmin,
} from '../lib/authService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onOpenAdmin?: () => void;
}

type AuthMode = 'signin' | 'signup';
type Toast = { message: string; type: 'success' | 'error' | 'info' } | null;

const inputCls =
  'w-full h-11 pl-10 pr-3 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/60 focus:shadow-[0_0_0_4px_rgba(139,92,246,.15)] transition';

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
  onOpenAdmin,
}) => {
  const { user } = useAuthUser();

  // Profile (name + avatar) — available to everyone
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(stats.avatarId || 'fox');
  const [username, setUsername] = useState<string>(stats.username || 'Player');
  const [isSaved, setIsSaved] = useState(false);

  // Account
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername(stats.username || 'Player');
      setSelectedAvatarId(stats.avatarId || 'fox');
      setToast(null);
      setPassword('');
    }
  }, [isOpen, stats.username, stats.avatarId]);

  // Admin link is shown only to accounts the server confirms as admin
  useEffect(() => {
    let alive = true;
    if (isOpen && user) checkIsAdmin().then((v) => alive && setIsAdmin(v));
    else setIsAdmin(false);
    return () => {
      alive = false;
    };
  }, [isOpen, user]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
  const currentXPInLevel = stats.xp % 100;

  const handleSaveProfile = () => {
    sound.playVictory();
    const cleanName = username.trim().slice(0, 18) || 'Player';
    const updated = updateProfile(cleanName, selectedAvatarId);
    onUpdateStats(updated); // persists + syncs to cloud when signed in
    setIsSaved(true);
    setToast({ message: user ? 'Saved to your account.' : 'Saved on this device.', type: 'success' });
    setTimeout(() => setIsSaved(false), 1500);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (!email.trim() || !password) {
      setToast({ message: 'Enter your email and password.', type: 'error' });
      return;
    }
    setBusy(true);
    setToast(null);
    sound.playTap();
    const res = mode === 'signin'
      ? await signInWithEmail(email, password)
      : await signUpWithEmail(email, password, username);
    setBusy(false);
    if (!res.ok) {
      sound.playError();
      setToast({ message: res.message, type: 'error' });
      return;
    }
    sound.playVictory();
    setPassword('');
    setToast({ message: res.message || 'Done!', type: 'success' });
    const restored = res.data && 'stats' in res.data ? res.data.stats : null;
    if (restored) onUpdateStats(restored);
  };

  const handleForgot = async () => {
    if (busy) return;
    setBusy(true);
    const res = await sendPasswordReset(email);
    setBusy(false);
    setToast({ message: res.ok ? res.message || 'Email sent.' : res.message, type: res.ok ? 'info' : 'error' });
  };

  const handleSignOut = async () => {
    setBusy(true);
    await signOut();
    setBusy(false);
    sound.playTap();
    setToast({ message: 'Signed out. Your progress stays on this device; sign in anytime to sync.', type: 'info' });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-[1.75rem] bg-white dark:bg-[#13152a] border border-slate-900/10 dark:border-white/10 p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,.7)] my-6 max-h-[92vh] overflow-y-auto animate-scale-in"
        role="dialog"
        aria-label="Player profile"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Player Profile</h2>
          <button
            onClick={() => { sound.playTap(); onClose(); }}
            className="w-9 h-9 rounded-xl fz-btn-ghost flex items-center justify-center"
            aria-label="Close"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {toast && (
          <div
            className={`p-3 rounded-xl text-xs mb-4 font-semibold flex items-start gap-2 border ${
              toast.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                : toast.type === 'error'
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                : 'bg-violet-500/10 border-violet-500/30 text-violet-700 dark:text-violet-300'
            }`}
            role="status"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-px" />
            <span>{toast.message}</span>
          </div>
        )}

        {/* ---------- Profile card ---------- */}
        <div className="flex items-center gap-3 mb-3">
          <span className="relative inline-flex rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-cyan-400">
            <span className="w-14 h-14 rounded-full bg-white dark:bg-[#14162b] flex items-center justify-center text-3xl">
              {currentAvatar.emoji}
            </span>
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-base font-bold text-slate-900 dark:text-white truncate">{username || 'Player'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Level {stats.level} · {stats.xp} XP</p>
            <div className="mt-1.5 w-full h-1.5 rounded-full bg-slate-900/10 dark:bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500" style={{ width: `${currentXPInLevel}%` }} />
            </div>
          </div>
        </div>

        <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 block mb-1.5">Nickname</label>
        <input
          type="text"
          maxLength={18}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full h-11 px-3 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/60 mb-3"
          placeholder="Your nickname"
        />

        <label className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400 block mb-1.5">Avatar</label>
        <div className="grid grid-cols-6 gap-1.5 mb-3">
          {CARTOON_AVATARS.map((av) => {
            const sel = av.id === selectedAvatarId;
            return (
              <button
                key={av.id}
                onClick={() => { sound.playTap(); setSelectedAvatarId(av.id); }}
                className={`aspect-square rounded-xl text-xl flex items-center justify-center transition active:scale-95 border ${
                  sel
                    ? 'bg-violet-500/15 border-violet-500 ring-2 ring-violet-500/40'
                    : 'bg-slate-900/[0.03] dark:bg-white/[0.04] border-slate-900/5 dark:border-white/5 hover:border-violet-400/50'
                }`}
                title={av.name}
                aria-label={av.name}
              >
                {av.emoji}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleSaveProfile}
          className="w-full h-11 rounded-xl fz-btn-primary text-sm font-bold flex items-center justify-center gap-2 mb-5"
        >
          {isSaved ? <><Check className="w-4 h-4" /> Saved</> : <><UserCheck className="w-4 h-4" /> Save Profile</>}
        </button>

        {/* ---------- Account ---------- */}
        <div className="pt-4 border-t border-slate-900/10 dark:border-white/10">
          {!isCloudEnabled ? (
            <div className="flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
              <CloudOff className="w-4 h-4 shrink-0 mt-px" />
              <span>Cloud accounts are coming soon. Your progress is saved on this device.</span>
            </div>
          ) : user ? (
            <div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 mb-3">
                <Cloud className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Progress synced to your account</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                disabled={busy}
                className="w-full h-10 rounded-xl fz-btn-ghost text-xs font-semibold flex items-center justify-center gap-2 text-rose-600 dark:text-rose-400"
              >
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogOut className="w-4 h-4" />}
                Sign out
              </button>
            </div>
          ) : (
            <div>
              <p className="font-display text-sm font-bold text-slate-900 dark:text-white">Save your progress</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Sign in to keep coins, levels and streaks safe and play on any device.
              </p>

              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] mb-3 text-xs font-semibold">
                {(['signin', 'signup'] as AuthMode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setToast(null); }}
                    className={`h-8 rounded-lg transition ${mode === m ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                  >
                    {m === 'signin' ? 'Sign in' : 'Create account'}
                  </button>
                ))}
              </div>

              <form onSubmit={handleAuth} className="flex flex-col gap-2.5">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    aria-label="Email address"
                  />
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    placeholder={mode === 'signin' ? 'Password' : 'Password (min 8 characters)'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputCls}
                    aria-label="Password"
                  />
                </div>
                {mode === 'signup' && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 -mt-0.5">
                    Your nickname <b className="text-slate-700 dark:text-slate-200">{username.trim() || 'Player'}</b> and current progress will be saved to the new account.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full h-11 rounded-xl fz-btn-primary text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : mode === 'signin' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  {mode === 'signin' ? 'Sign in & restore progress' : 'Create account'}
                </button>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={handleForgot}
                    disabled={busy}
                    className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </form>
            </div>
          )}
        </div>

        {/* Admin link: only for accounts the server confirms as admin */}
        {onOpenAdmin && isAdmin && (
          <button
            onClick={() => { onClose(); onOpenAdmin(); }}
            className="mt-4 w-full h-10 rounded-xl fz-btn-ghost text-xs font-semibold flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-violet-500" />
            Owner &amp; Admin Panel
            <KeyRound className="w-3.5 h-3.5 opacity-50" />
          </button>
        )}
      </div>
    </div>
  );
};
