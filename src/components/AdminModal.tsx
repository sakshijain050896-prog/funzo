import React, { useState, useEffect } from 'react';
import { 
  X, ShieldAlert, Download, Upload, Trash2, 
  Search, Edit3, Check, Trophy, 
  Lock, FolderOpen, Terminal
} from 'lucide-react';
import { PlayerStats } from '../types';
import { getAllAccounts, UserAccount } from '../lib/authService';
import { sound } from '../lib/soundEffects';
import { saveStats } from '../lib/storage';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
}

const DEFAULT_ADMIN_PIN = '8899';
const ADMIN_PIN_STORAGE_KEY = 'funzo_admin_pin_v1';

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
}) => {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string | null>(null);

  // Accounts state
  const [accounts, setAccounts] = useState<Record<string, UserAccount>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'users' | 'tools' | 'files'>('users');

  // Editing state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editLevel, setEditLevel] = useState<number>(1);
  const [editIQ, setEditIQ] = useState<number>(105);
  const [editCoins, setEditCoins] = useState<number>(100);
  const [editArrowLevel, setEditArrowLevel] = useState<number>(1);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Load current PIN and accounts
  useEffect(() => {
    if (isOpen) {
      loadAccounts();
    }
  }, [isOpen]);

  const getAdminPin = (): string => {
    try {
      return localStorage.getItem(ADMIN_PIN_STORAGE_KEY) || DEFAULT_ADMIN_PIN;
    } catch {
      return DEFAULT_ADMIN_PIN;
    }
  };

  const loadAccounts = () => {
    const data = getAllAccounts();
    setAccounts(data);
  };

  if (!isOpen) return null;

  // PIN Unlock Handler
  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === getAdminPin()) {
      sound.playVictory();
      setIsUnlocked(true);
      setPinError(null);
      setPinInput('');
    } else {
      sound.playError();
      setPinError('Incorrect Owner PIN. (Default PIN: 8899)');
    }
  };

  // Toast helper
  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // 1. MANUALLY EDIT USER DATA
  const handleStartEdit = (user: UserAccount) => {
    setEditingUserId(user.id);
    setEditLevel(user.stats.level);
    setEditIQ(user.stats.iq);
    setEditCoins(user.stats.coins);
    setEditArrowLevel(user.arrowLevel || 1);
  };

  const handleSaveUserEdit = (userId: string) => {
    sound.playVictory();
    const updated = { ...accounts };
    if (updated[userId]) {
      updated[userId].stats.level = Number(editLevel);
      updated[userId].stats.iq = Number(editIQ);
      updated[userId].stats.coins = Number(editCoins);
      updated[userId].arrowLevel = Number(editArrowLevel);
      localStorage.setItem('funzo_cloud_accounts_v2', JSON.stringify(updated));
      setAccounts(updated);

      // If active current player was modified, update live state
      const currentRaw = localStorage.getItem('funzo_active_session_v2');
      if (currentRaw && JSON.parse(currentRaw).userId === userId) {
        saveStats(updated[userId].stats);
        localStorage.setItem('funzo_arrow_level', editArrowLevel.toString());
        onUpdateStats(updated[userId].stats);
      }
      showToast(`User ${updated[userId].username} updated successfully!`);
    }
    setEditingUserId(null);
  };

  // 2. DELETE USER
  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to permanently delete this user account?')) {
      const updated = { ...accounts };
      delete updated[userId];
      localStorage.setItem('funzo_cloud_accounts_v2', JSON.stringify(updated));
      setAccounts(updated);
      showToast('User deleted from database.');
    }
  };

  // 3. EXPORT ALL DATA TO JSON FILE
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(accounts, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `funzo_users_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchorElem.click();
    showToast('Database exported to JSON file on your machine!');
  };

  // 4. IMPORT DATA
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          localStorage.setItem('funzo_cloud_accounts_v2', JSON.stringify(parsed));
          setAccounts(parsed);
          showToast('Database restored successfully from file!');
        } catch {
          alert('Invalid backup JSON file.');
        }
      };
    }
  };

  // 5. GOD MODE: INSTANTLY UNLOCK 10,000 LEVELS & 200 IQ FOR OWNER
  const handleGodMode = () => {
    sound.playVictory();
    localStorage.setItem('funzo_arrow_level', '10000');
    const newStats: PlayerStats = {
      ...stats,
      level: 100,
      xp: 10000,
      iq: 200,
      coins: stats.coins + 50000,
      streak: Math.max(stats.streak, 30),
    };
    saveStats(newStats);
    onUpdateStats(newStats);
    showToast('🚀 GOD MODE ACTIVATED: Arrow Level 10,000 & 200 IQ Applied!');
  };

  const accountList = Object.values(accounts);
  const filteredAccounts = accountList.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.username.toLowerCase().includes(q) ||
      (a.phone && a.phone.includes(q)) ||
      (a.email && a.email.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#1a2c35] border-2 border-slate-200 dark:border-[#2b4554] p-5 sm:p-6 shadow-2xl text-left my-4 text-slate-900 dark:text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
          title="Close Admin Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ---------------- STAGE 1: PIN GATE ---------------- */}
        {!isUnlocked ? (
          <div className="flex flex-col items-center text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-3">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-1">Owner &amp; Admin Panel</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 max-w-xs">
              Enter your Owner Security PIN to view user accounts, live game levels, and make manual changes.
            </p>

            <form onSubmit={handleUnlock} className="flex flex-col items-center gap-2.5 w-full max-w-xs">
              <input
                type="password"
                maxLength={8}
                placeholder="Enter PIN (Default: 8899)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full py-2.5 px-4 text-center tracking-widest text-lg font-mono font-black rounded-xl bg-slate-100 dark:bg-slate-950 border-2 border-indigo-500 text-slate-900 dark:text-white focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition active:scale-95"
              >
                Unlock Admin Dashboard →
              </button>
            </form>

            {pinError && (
              <p className="text-xs text-rose-400 font-semibold mt-2.5 animate-shake">
                {pinError}
              </p>
            )}
            <span className="text-[10px] text-slate-500 mt-3 font-mono">
              Default Owner PIN is: <strong className="text-slate-300">8899</strong>
            </span>
          </div>
        ) : (
          /* ---------------- STAGE 2: UNLOCKED DASHBOARD ---------------- */
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-400" />
                  <span>Funzo Owner Control Center</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Full visibility of user logins, gameplay progress, and manual overrides.
                </p>
              </div>
              <button
                onClick={() => setIsUnlocked(false)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-[11px] font-bold"
              >
                Lock Panel
              </button>
            </div>

            {/* Notification Toast */}
            {successToast && (
              <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs font-bold mb-3 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{successToast}</span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="grid grid-cols-3 gap-1 p-0.5 bg-slate-950 rounded-xl mb-4 text-xs font-bold">
              <button
                onClick={() => setActiveTab('users')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'users' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                👥 Players Roster ({accountList.length})
              </button>
              <button
                onClick={() => setActiveTab('tools')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'tools' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                🛠️ God Mode &amp; Backup
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'files' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
                }`}
              >
                📂 Codebase Sitemap
              </button>
            </div>

            {/* ---------------- TAB 1: USERS ROSTER ---------------- */}
            {activeTab === 'users' && (
              <div>
                {/* Search Bar */}
                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search player by phone number or username..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-9 pr-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-bold focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Users List */}
                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-0.5">
                  {filteredAccounts.length === 0 ? (
                    <div className="p-6 text-center text-slate-500 text-xs rounded-2xl bg-slate-950/60 border border-slate-800">
                      No registered accounts found yet. Users appear here when they log in via Phone OTP, Password, or Google!
                    </div>
                  ) : (
                    filteredAccounts.map((user) => (
                      <div
                        key={user.id}
                        className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-black text-white">{user.username}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-400 uppercase font-bold">
                                {user.authType}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5 font-mono">
                              {user.phone && <span>📱 {user.phone}</span>}
                              {user.email && <span>✉️ {user.email}</span>}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleStartEdit(user)}
                              className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 text-xs"
                              title="Edit user values"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs"
                              title="Delete user"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Player Metrics Pill Bar */}
                        <div className="grid grid-cols-4 gap-1.5 mt-2 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-center">
                          <div className="p-1 rounded bg-slate-900">
                            <span className="text-slate-500 block">Arrow Lvl</span>
                            <span className="text-cyan-400 font-bold">{user.arrowLevel || 1}</span>
                          </div>
                          <div className="p-1 rounded bg-slate-900">
                            <span className="text-slate-500 block">Mind IQ</span>
                            <span className="text-amber-400 font-bold">{user.stats.iq}</span>
                          </div>
                          <div className="p-1 rounded bg-slate-900">
                            <span className="text-slate-500 block">Player Lvl</span>
                            <span className="text-purple-400 font-bold">Lvl {user.stats.level}</span>
                          </div>
                          <div className="p-1 rounded bg-slate-900">
                            <span className="text-slate-500 block">Coins</span>
                            <span className="text-yellow-400 font-bold">{user.stats.coins}</span>
                          </div>
                        </div>

                        {/* Games History Breakdown */}
                        {user.stats.gamesPlayedHistory && (
                          <div className="mt-1.5 text-[9px] text-slate-500">
                            <strong>Games Played: </strong>
                            {Object.entries(user.stats.gamesPlayedHistory).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                          </div>
                        )}

                        {/* Inline Edit Form */}
                        {editingUserId === user.id && (
                          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900 border border-indigo-500 text-xs">
                            <strong className="block text-indigo-400 mb-1.5">
                              Manual Override for {user.username}:
                            </strong>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div>
                                <label className="text-[10px] text-slate-400 block">Arrow Level (1-10000):</label>
                                <input
                                  type="number"
                                  value={editArrowLevel}
                                  onChange={(e) => setEditArrowLevel(Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 block">Player IQ:</label>
                                <input
                                  type="number"
                                  value={editIQ}
                                  onChange={(e) => setEditIQ(Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 block">Player Level:</label>
                                <input
                                  type="number"
                                  value={editLevel}
                                  onChange={(e) => setEditLevel(Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-white font-bold"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-slate-400 block">Coins Balance:</label>
                                <input
                                  type="number"
                                  value={editCoins}
                                  onChange={(e) => setEditCoins(Number(e.target.value))}
                                  className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded text-white font-bold"
                                />
                              </div>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleSaveUserEdit(user.id)}
                                className="flex-1 py-1 rounded bg-emerald-600 text-white font-bold text-xs"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => setEditingUserId(null)}
                                className="px-3 py-1 rounded bg-slate-800 text-slate-400 text-xs"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ---------------- TAB 2: GOD MODE & BACKUP TOOLS ---------------- */}
            {activeTab === 'tools' && (
              <div className="flex flex-col gap-3">
                {/* God Mode Card */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-black text-white">Owner God Mode</span>
                  </div>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                    Instantly sets your device to <strong>Arrow Escape Max Level</strong>, unlocks <strong>200 IQ (Cosmic Deity)</strong>, and grants <strong>+50,000 Coins</strong> for immediate testing.
                  </p>
                  <button
                    onClick={handleGodMode}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-slate-950 font-black text-xs shadow-md transition active:scale-95"
                  >
                    Activate God Mode 🚀
                  </button>
                </div>

                {/* Database Backup & Export */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-black text-white block mb-1">
                    📥 Download Full User Database Backup
                  </span>
                  <p className="text-[11px] text-slate-400 mb-2.5">
                    Save a complete JSON snapshot of all registered players and levels to your computer.
                  </p>
                  <button
                    onClick={handleExportData}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Download className="w-4 h-4" /> Export All Accounts to JSON
                  </button>
                </div>

                {/* Restore Database */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="text-xs font-black text-white block mb-1">
                    📤 Restore Database from JSON Backup
                  </span>
                  <p className="text-[11px] text-slate-400 mb-2.5">
                    Upload a previously exported backup file to restore accounts.
                  </p>
                  <label className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
                    <Upload className="w-4 h-4" /> Select Backup File
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportData}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )}

            {/* ---------------- TAB 3: CODEBASE SITEMAP ---------------- */}
            {activeTab === 'files' && (
              <div className="flex flex-col gap-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="font-black text-indigo-400 block mb-1 flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4" /> Project Files Location on Your Machine
                  </span>
                  <p className="text-[11px] text-slate-300 font-mono bg-slate-900 p-2 rounded-xl border border-slate-800 select-all mb-2">
                    C:\Users\Aman Dayma\Desktop\FunzoGamePortal
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    You can open this folder in VS Code anytime to modify questions, game rules, and designs.
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="font-black text-white block mb-1">
                    Where to Make Manual Changes:
                  </span>
                  <ul className="text-[11px] text-slate-300 flex flex-col gap-1.5">
                    <li>• <strong>Games:</strong> <code className="text-cyan-400">src/components/games/ArrowPuzzle.tsx</code>, <code className="text-cyan-400">MysteryHub.tsx</code>, <code className="text-cyan-400">SpillItHub.tsx</code></li>
                    <li>• <strong>Questions &amp; Facts:</strong> <code className="text-amber-400">src/data/spillItData.ts</code>, <code className="text-amber-400">src/data/mysteryData.ts</code></li>
                    <li>• <strong>Auth &amp; Database:</strong> <code className="text-purple-400">src/lib/authService.ts</code>, <code className="text-purple-400">src/lib/storage.ts</code></li>
                  </ul>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                  <span className="font-black text-white block mb-1 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" /> Auto-Deploying to Live URL
                  </span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    After saving any changes, run:
                  </p>
                  <code className="block bg-slate-900 p-2 rounded-xl border border-slate-800 text-[11px] text-emerald-300 font-mono mt-1">
                    npx vercel --prod
                  </code>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
