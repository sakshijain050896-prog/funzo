import React, { useState } from 'react';
import { KeyRound, Loader2, Check, X } from 'lucide-react';
import { updatePassword } from '../lib/authService';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Shown when the player opens the "reset password" link from their email. */
export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose }) => {
  const [pw, setPw] = useState('');
  const [pw2, setPw2] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  if (!isOpen) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pw !== pw2) return setMsg({ text: 'Passwords do not match.', ok: false });
    setBusy(true);
    const res = await updatePassword(pw);
    setBusy(false);
    if (!res.ok) return setMsg({ text: res.message, ok: false });
    setMsg({ text: 'Password updated. You are signed in.', ok: true });
    try { window.history.replaceState(null, '', window.location.pathname); } catch { /* ignore */ }
    setTimeout(onClose, 1400);
  };

  const field = 'w-full h-11 px-3 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-violet-500/60';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <form onSubmit={submit} className="relative w-full max-w-sm rounded-[1.75rem] bg-white dark:bg-[#13152a] border border-slate-900/10 dark:border-white/10 p-5 shadow-2xl animate-scale-in" role="dialog" aria-label="Set a new password">
        <button type="button" onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-xl fz-btn-ghost flex items-center justify-center" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 rounded-2xl bg-violet-500/15 text-violet-500 flex items-center justify-center mb-3">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">Set a new password</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Choose a password with at least 8 characters.</p>
        <input type="password" autoComplete="new-password" placeholder="New password" value={pw} onChange={(e) => setPw(e.target.value)} className={`${field} mb-2`} aria-label="New password" />
        <input type="password" autoComplete="new-password" placeholder="Repeat new password" value={pw2} onChange={(e) => setPw2(e.target.value)} className={`${field} mb-3`} aria-label="Repeat new password" />
        {msg && (
          <p className={`text-xs font-semibold mb-3 ${msg.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{msg.text}</p>
        )}
        <button type="submit" disabled={busy} className="w-full h-11 rounded-xl fz-btn-primary text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-70">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />} Save new password
        </button>
      </form>
    </div>
  );
};
