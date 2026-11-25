import React, { useState, useEffect, useCallback } from 'react';
import {
  X, ShieldAlert, Download, Upload, Trash2, Search, Edit3, Check,
  Trophy, Lock, Loader2, RefreshCw,
} from 'lucide-react';
import { PlayerStats } from '../types';
import { sound } from '../lib/soundEffects';
import { getStoredStats } from '../lib/storage';
import {
  isCloudEnabled,
  useAuthUser,
  checkIsAdmin,
  adminListPlayers,
  adminUpdatePlayer,
  adminDeletePlayer,
  adminRestorePlayers,
  applyOwnRowIfCurrent,
  AdminPlayerRow,
} from '../lib/authService';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
}

// Access is decided by the database (public.is_admin()), not by anything in
// this file: non-admins get no rows back and every write is rejected by RLS.
export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, stats, onUpdateStats }) => {
  const { user } = useAuthUser();
  const [access, setAccess] = useState<'checking' | 'granted' | 'denied'>('checking');
  const [players, setPlayers] = useState<AdminPlayerRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'tools'>('users');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [edit, setEdit] = useState({ level: 1, iq: 100, coins: 0, arrow: 1 });
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const loadPlayers = useCallback(async () => {
    setLoading(true);
    const res = await adminListPlayers();
    setLoading(false);
    if (res.ok) setPlayers(res.data);
    else showToast(res.message, false);
  }, []);

  useEffect(() => {
    let alive = true;
    if (!isOpen) return;
    setAccess('checking');
    if (!isCloudEnabled || !user) {
      setAccess('denied');
      return;
    }
    checkIsAdmin().then((ok) => {
      if (!alive) return;
      setAccess(ok ? 'granted' : 'denied');
      if (ok) loadPlayers();
    });
    return () => {
      alive = false;
    };
  }, [isOpen, user, loadPlayers]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const startEdit = (p: AdminPlayerRow) => {
    setEditingId(p.user_id);
    setEdit({
      level: p.stats?.level ?? 1,
      iq: p.stats?.iq ?? 100,
      coins: p.stats?.coins ?? 0,
      arrow: p.arrow_level || 1,
    });
  };

  const saveEdit = async (p: AdminPlayerRow) => {
    const nextStats: PlayerStats = {
      ...(p.stats || getStoredStats()),
      level: Math.max(1, Math.floor(Number(edit.level) || 1)),
      iq: Math.max(0, Math.floor(Number(edit.iq) || 0)),
      coins: Math.max(0, Math.floor(Number(edit.coins) || 0)),
    };
    const arrow = Math.min(10000, Math.max(1, Math.floor(Number(edit.arrow) || 1)));
    const res = await adminUpdatePlayer(p.user_id, { stats: nextStats, arrow_level: arrow });
    if (!res.ok) return showToast(res.message, false);
    sound.playVictory();
    const updatedRow = { ...p, stats: nextStats, arrow_level: arrow };
    setPlayers((list) => list.map((x) => (x.user_id === p.user_id ? updatedRow : x)));
    const own = applyOwnRowIfCurrent(updatedRow);
    if (own) onUpdateStats(own);
    setEditingId(null);
    showToast(`${p.username} updated.`);
  };

  const deletePlayer = async (p: AdminPlayerRow) => {
    const res = await adminDeletePlayer(p.user_id);
    setConfirmDeleteId(null);
    if (!res.ok) return showToast(res.message, false);
    setPlayers((list) => list.filter((x) => x.user_id !== p.user_id));
    showToast(`Progress for ${p.username} deleted.`);
  };

  const exportBackup = () => {
    const blob = new Blob([JSON.stringify(players, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `funzo_players_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    showToast(`Exported ${players.length} players.`);
  };

  const importBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const rows = Array.isArray(parsed) ? parsed : [];
        const res = await adminRestorePlayers(rows);
        if (!res.ok) return showToast(res.message, false);
        showToast(`Restored ${res.data} players.`);
        loadPlayers();
      } catch {
        showToast('That file is not a valid Funzo backup.', false);
      }
    };
    reader.readAsText(file, 'UTF-8');
  };

  const godMode = async () => {
    if (!user) return;
    sound.playVictory();
    try { localStorage.setItem('funzo_arrow_level', '10000'); } catch { /* ignore */ }
    const newStats: PlayerStats = {
      ...stats,
      level: 100,
      xp: 10000,
      iq: 200,
      coins: stats.coins + 50000,
      streak: Math.max(stats.streak, 30),
    };
    onUpdateStats(newStats); // saves locally + syncs to your account
    showToast('God Mode applied to your account (testing only).');
  };

  const q = searchQuery.trim().toLowerCase();
  const filtered = players.filter((p) => !q || p.username.toLowerCase().includes(q) || (p.email || '').toLowerCase().includes(q));

  const shell = (children: React.ReactNode) => (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl rounded-[1.75rem] bg-white dark:bg-[#13152a] border border-slate-900/10 dark:border-white/10 p-5 sm:p-6 shadow-2xl text-left my-4 text-slate-900 dark:text-white animate-scale-in"
        role="dialog"
        aria-label="Admin panel"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-xl fz-btn-ghost flex items-center justify-center" aria-label="Close admin panel" title="Close">
          <X className="w-4 h-4" />
        </button>
        {children}
      </div>
    </div>
  );

  if (access !== 'granted') {
    return shell(
      <div className="flex flex-col items-center text-center py-6">
        <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/30 text-violet-500 flex items-center justify-center mb-3">
          {access === 'checking' ? <Loader2 className="w-7 h-7 animate-spin" /> : <Lock className="w-7 h-7" />}
        </div>
        <h3 className="font-display text-xl font-bold mb-1">Owner &amp; Admin Panel</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
          {access === 'checking'
            ? 'Checking your access…'
            : !isCloudEnabled
            ? 'The admin panel needs cloud accounts, which are not connected yet.'
            : !user
            ? 'Sign in with the owner account (Profile → Sign in) to open this panel.'
            : 'This account does not have admin access.'}
        </p>
      </div>
    );
  }

  return shell(
    <div>
      <div className="mb-4 pr-10">
        <h3 className="font-display text-lg font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-violet-500" /> Owner Control Center
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as {user?.email}. Every action is checked by the server.</p>
      </div>

      {toast && (
        <div className={`p-2.5 rounded-xl text-xs font-semibold mb-3 flex items-center gap-2 border ${toast.ok ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'}`}>
          <Check className="w-4 h-4" /> {toast.msg}
        </div>
      )}

      <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] mb-4 text-xs font-semibold">
        <button onClick={() => setActiveTab('users')} className={`h-9 rounded-lg transition ${activeTab === 'users' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
          Players ({players.length})
        </button>
        <button onClick={() => setActiveTab('tools')} className={`h-9 rounded-lg transition ${activeTab === 'tools' ? 'bg-white dark:bg-white/10 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>
          God Mode &amp; Backup
        </button>
      </div>

      {activeTab === 'users' && (
        <div>
          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-900/[0.04] dark:bg-white/[0.05] border border-slate-900/10 dark:border-white/10 text-sm focus:outline-none focus:border-violet-500/60"
              />
            </div>
            <button onClick={loadPlayers} className="w-10 h-10 rounded-xl fz-btn-ghost flex items-center justify-center" title="Refresh" aria-label="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[55vh] overflow-y-auto pr-0.5">
            {loading && players.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
            ) : filtered.length === 0 ? (
              <div className="p-6 text-center text-slate-500 text-sm rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03]">
                No players yet. Players appear here after they create an account.
              </div>
            ) : (
              filtered.map((p) => (
                <div key={p.user_id} className="p-3 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/5 dark:border-white/[0.06]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold truncate">{p.username}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{p.email}</p>
                      <p className="text-[10px] text-slate-400">
                        Last active {new Date(p.updated_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => startEdit(p)} className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-300 flex items-center justify-center" title="Edit" aria-label={`Edit ${p.username}`}>
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setConfirmDeleteId(p.user_id)} className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-600 dark:text-rose-300 flex items-center justify-center" title="Delete progress" aria-label={`Delete ${p.username}`}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 mt-2 text-[10px] text-center">
                    {[
                      ['Arrow Lvl', p.arrow_level || 1],
                      ['IQ', p.stats?.iq ?? '-'],
                      ['Level', p.stats?.level ?? '-'],
                      ['Coins', p.stats?.coins ?? '-'],
                    ].map(([k, v]) => (
                      <div key={String(k)} className="p-1.5 rounded-lg bg-white dark:bg-white/[0.04]">
                        <span className="text-slate-500 block">{k}</span>
                        <span className="font-bold">{v}</span>
                      </div>
                    ))}
                  </div>

                  {confirmDeleteId === p.user_id && (
                    <div className="mt-2.5 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs">
                      <p className="font-semibold text-rose-700 dark:text-rose-300 mb-2">Delete all saved progress for {p.username}? This cannot be undone.</p>
                      <div className="flex gap-1.5">
                        <button onClick={() => deletePlayer(p)} className="flex-1 h-8 rounded-lg bg-rose-600 text-white font-bold">Delete</button>
                        <button onClick={() => setConfirmDeleteId(null)} className="px-3 h-8 rounded-lg fz-btn-ghost">Cancel</button>
                      </div>
                    </div>
                  )}

                  {editingId === p.user_id && (
                    <div className="mt-2.5 p-2.5 rounded-xl border border-violet-500/40 text-xs">
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        {([
                          ['arrow', 'Arrow Level (1-10000)'],
                          ['iq', 'IQ'],
                          ['level', 'Player Level'],
                          ['coins', 'Coins'],
                        ] as const).map(([key, label]) => (
                          <label key={key} className="block">
                            <span className="text-[10px] text-slate-500 block mb-0.5">{label}</span>
                            <input
                              type="number"
                              value={edit[key]}
                              onChange={(e) => setEdit((s) => ({ ...s, [key]: Number(e.target.value) }))}
                              className="w-full h-8 px-2 rounded-lg bg-slate-900/[0.04] dark:bg-white/[0.06] border border-slate-900/10 dark:border-white/10 font-bold"
                            />
                          </label>
                        ))}
                      </div>
                      <div className="flex gap-1.5">
                        <button onClick={() => saveEdit(p)} className="flex-1 h-8 rounded-lg fz-btn-primary font-bold">Save</button>
                        <button onClick={() => setEditingId(null)} className="px-3 h-8 rounded-lg fz-btn-ghost">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/10 border border-violet-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-bold">Owner God Mode (testing)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
              Sets <b>your own</b> account to Arrow level 10,000, IQ 200, level 100 and adds 50,000 coins. Note: this also puts you at the top of the leaderboard.
            </p>
            <button onClick={godMode} className="w-full h-10 rounded-xl fz-btn-primary text-xs font-bold">Activate God Mode</button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/5 dark:border-white/[0.06]">
            <p className="text-sm font-bold mb-1">Download player backup</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">JSON snapshot of every player's saved progress (includes emails, so keep it private).</p>
            <button onClick={exportBackup} className="w-full h-10 rounded-xl fz-btn-ghost text-xs font-semibold flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Export {players.length} players
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-900/5 dark:border-white/[0.06]">
            <p className="text-sm font-bold mb-1">Restore from backup</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Overwrites saved progress for the players in the file (accounts must still exist).</p>
            <label className="w-full h-10 rounded-xl fz-btn-ghost text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4" /> Choose backup file
              <input type="file" accept=".json,application/json" onChange={importBackup} className="hidden" />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
