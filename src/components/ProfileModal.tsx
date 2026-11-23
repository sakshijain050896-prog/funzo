import React, { useState, useEffect } from 'react';
import { 
  X, Check, UserCheck, KeyRound, 
  LogIn, LogOut, Cloud, AlertCircle
} from 'lucide-react';
import { PlayerStats, CARTOON_AVATARS } from '../types';
import { updateProfile } from '../lib/storage';
import { sound } from '../lib/soundEffects';
import { 
  getCurrentUser, 
  requestPhoneOtp, 
  verifyPhoneOtp, 
  loginWithPassword, 
  registerWithPassword, 
  loginWithGoogle, 
  logoutUser,
  updateCurrentUserProfile,
  UserAccount 
} from '../lib/authService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onOpenAdmin?: () => void;
}

type AuthTab = 'phone' | 'password' | 'google';

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
  onOpenAdmin,
}) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [authTab, setAuthTab] = useState<AuthTab>('phone');

  // Avatar & Nickname state
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(stats.avatarId || 'fox');
  const [username, setUsername] = useState<string>(stats.username || 'Player');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Phone OTP state
  const [phoneInput, setPhoneInput] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [authToast, setAuthToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Password state
  const [pwdIdentifier, setPwdIdentifier] = useState<string>('');
  const [pwdPassword, setPwdPassword] = useState<string>('');
  const [isRegisterMode, setIsRegisterMode] = useState<boolean>(false);

  // Sync state whenever modal opens or stats change
  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      setCurrentUser(user);
      const activeName = stats.username || (user ? user.username : 'Player');
      const activeAvatar = stats.avatarId || (user ? user.avatarId : 'fox');
      setUsername(activeName);
      setSelectedAvatarId(activeAvatar);
      setAuthToast(null);
    }
  }, [isOpen, stats.username, stats.avatarId]);

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
  const nextLevelXP = stats.level * 100;
  const currentXPInLevel = stats.xp % 100;

  // 1. SAVE PROFILE (Updates both local stats & active cloud session)
  const handleSaveProfile = () => {
    sound.playVictory();
    const cleanName = username.trim() || 'Player';
    const updatedStats = updateProfile(cleanName, selectedAvatarId);
    const updatedUser = updateCurrentUserProfile(cleanName, selectedAvatarId);
    
    if (updatedUser) {
      setCurrentUser(updatedUser);
    }
    onUpdateStats(updatedStats);
    setIsSaved(true);
    setAuthToast({ message: 'Profile name & avatar saved successfully!', type: 'success' });
    
    setTimeout(() => {
      setIsSaved(false);
      setAuthToast(null);
      onClose();
    }, 800);
  };

  // 2. PHONE OTP FLOW
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    const res = requestPhoneOtp(phoneInput);
    if (res.success) {
      setOtpSent(true);
      setAuthToast({ message: res.message, type: 'info' });
      if (res.otp) setOtpInput(res.otp); // Convenience auto-fill demo OTP
    } else {
      setAuthToast({ message: res.message, type: 'error' });
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyPhoneOtp(phoneInput, otpInput);
    if (res.success && res.user) {
      sound.playVictory();
      setCurrentUser(res.user);
      setUsername(res.user.username);
      setSelectedAvatarId(res.user.avatarId);
      onUpdateStats(res.user.stats);
      setAuthToast({ message: res.message, type: 'success' });
      setTimeout(() => setAuthToast(null), 1500);
    } else {
      sound.playError();
      setAuthToast({ message: res.message, type: 'error' });
    }
  };

  // 3. PASSWORD FLOW
  const handlePasswordAuth = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playTap();
    if (isRegisterMode) {
      const res = registerWithPassword(pwdIdentifier, pwdPassword, username);
      if (res.success && res.user) {
        sound.playVictory();
        setCurrentUser(res.user);
        setUsername(res.user.username);
        setSelectedAvatarId(res.user.avatarId);
        onUpdateStats(res.user.stats);
        setAuthToast({ message: res.message, type: 'success' });
        setTimeout(() => setAuthToast(null), 1500);
      } else {
        sound.playError();
        setAuthToast({ message: res.message, type: 'error' });
      }
    } else {
      const res = loginWithPassword(pwdIdentifier, pwdPassword);
      if (res.success && res.user) {
        sound.playVictory();
        setCurrentUser(res.user);
        setUsername(res.user.username);
        setSelectedAvatarId(res.user.avatarId);
        onUpdateStats(res.user.stats);
        setAuthToast({ message: res.message, type: 'success' });
        setTimeout(() => setAuthToast(null), 1500);
      } else {
        sound.playError();
        setAuthToast({ message: res.message, type: 'error' });
      }
    }
  };

  // 4. GOOGLE AUTH FLOW
  const handleGoogleAuth = () => {
    sound.playVictory();
    const res = loginWithGoogle();
    setCurrentUser(res.user);
    setUsername(res.user.username);
    setSelectedAvatarId(res.user.avatarId);
    onUpdateStats(res.user.stats);
    setAuthToast({ message: res.message, type: 'success' });
    setTimeout(() => setAuthToast(null), 1500);
  };

  // 5. LOGOUT FLOW
  const handleLogout = () => {
    sound.playTap();
    logoutUser();
    setCurrentUser(null);
    setAuthToast({ message: 'Logged out. You can sign in anytime to restore progress.', type: 'info' });
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm rounded-3xl bg-white dark:bg-[#181d2f] border-4 border-black p-5 shadow-[6px_6px_0_#000] text-center my-6 font-['Fredoka'] max-h-[92vh] overflow-y-auto"
      >
        {/* Top Header Bar with prominent Title and Red Mario Close Button */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xl">👤</span>
            <h2 className="text-base font-black text-slate-900 dark:text-white font-['Fredoka']">
              Player Profile
            </h2>
          </div>
          <button
            onClick={() => { sound.playTap(); onClose(); }}
            className="w-9 h-9 rounded-2xl bg-[#e52521] hover:bg-[#ff3b37] border-2 border-black text-white flex items-center justify-center shadow-[2px_2px_0_#000] active:translate-y-0.5 transition cursor-pointer shrink-0"
            title="Close (✕)"
            aria-label="Close"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Feedback Alert Toast */}
        {authToast && (
          <div className={`p-2.5 rounded-xl text-xs mb-3 text-left font-semibold flex items-center gap-2 ${
            authToast.type === 'success'
              ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-200'
              : authToast.type === 'error'
              ? 'bg-rose-950/60 border border-rose-500 text-rose-200'
              : 'bg-indigo-950/60 border border-indigo-500 text-indigo-200'
          }`}>
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authToast.message}</span>
          </div>
        )}

        {/* ---------------- STATE A: USER IS ALREADY LOGGED IN ---------------- */}
        {currentUser ? (
          <div className="w-full flex flex-col items-center animate-fade-in">
            {/* Cloud Connected Header */}
            <div className="w-full flex items-center justify-between p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
              <span className="flex items-center gap-1.5 truncate">
                <Cloud className="w-4 h-4 shrink-0" />
                <span className="truncate">
                  {currentUser.authType === 'phone' && `📱 ${currentUser.phone}`}
                  {currentUser.authType === 'google' && `🌐 ${currentUser.email || 'Google Account'}`}
                  {currentUser.authType === 'password' && `🔑 ${currentUser.username}`}
                </span>
              </span>
              <button
                onClick={handleLogout}
                className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-500/10 shrink-0 transition"
                title="Log Out"
              >
                <LogOut className="w-3 h-3" />
                <span>Log Out</span>
              </button>
            </div>

            {/* Avatar & Level Display */}
            <div className="relative mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-violet-600 to-indigo-600 p-1 flex items-center justify-center shadow-xl shadow-violet-500/20 mb-2">
              <span className="text-3xl">{currentAvatar.emoji}</span>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shadow">
                Lvl {stats.level}
              </span>
            </div>

            <h3 className="text-base font-black text-slate-900 dark:text-white">{username}</h3>
            <span className="text-[11px] text-violet-600 dark:text-violet-400 font-semibold mb-2">{currentAvatar.name}</span>

            {/* Level XP Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-[#24273d] rounded-full h-2 my-1 overflow-hidden border border-slate-300 dark:border-white/5">
              <div
                className="bg-gradient-to-r from-violet-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${(currentXPInLevel / 100) * 100}%` }}
              />
            </div>
            <div className="w-full flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mb-4">
              <span>{stats.xp} Total XP</span>
              <span>Next Lvl: {nextLevelXP} XP</span>
            </div>

            {/* Profile Nickname Edit Input */}
            <div className="w-full text-left mb-3">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1">
                Player Nickname
              </label>
              <input
                type="text"
                maxLength={18}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-[#12131f] border-2 border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold text-xs focus:border-[#e52521] focus:outline-none transition"
                placeholder="Enter player nickname..."
              />
            </div>

            {/* Cartoon Avatar Picker */}
            <div className="w-full text-left mb-4">
              <label className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block mb-1.5">
                Choose Avatar Caricature
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {CARTOON_AVATARS.map((av) => {
                  const isSelected = av.id === selectedAvatarId;
                  return (
                    <button
                      key={av.id}
                      onClick={() => {
                        sound.playTap();
                        setSelectedAvatarId(av.id);
                      }}
                      className={`p-2 rounded-2xl flex flex-col items-center justify-center transition active:scale-95 border-2 ${
                        isSelected
                          ? 'bg-violet-100 dark:bg-violet-600/30 border-violet-500 shadow-md ring-2 ring-violet-400'
                          : 'bg-slate-50 dark:bg-[#24273d] border-slate-200 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl mb-0.5">{av.emoji}</span>
                      <span className="text-[9px] font-bold text-slate-700 dark:text-slate-300 truncate w-full">
                        {av.name.split(' ')[1] || av.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Save Profile Button */}
            <button
              onClick={handleSaveProfile}
              className="w-full py-2.5 rounded-2xl bg-[#00a859] hover:bg-[#00c868] border-b-4 border-[#006633] text-white font-black text-xs shadow-md active:translate-y-0.5 transition flex items-center justify-center gap-1.5 font-['Fredoka']"
            >
              {isSaved ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Profile Saved!</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* ---------------- STATE B: USER NOT LOGGED IN (AUTH TABS) ---------------- */
          <div className="w-full flex flex-col items-center animate-fade-in">
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">Sign In &amp; Restore Progress</h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Back up your game progress, coins, and streak across devices.
            </p>

            {/* Login Navigation Tabs */}
            <div className="w-full grid grid-cols-3 gap-1 p-1 bg-[#12131f] border border-white/10 rounded-2xl mb-4 text-[10px] font-bold">
              <button
                onClick={() => { sound.playTap(); setAuthTab('phone'); }}
                className={`py-1.5 rounded-xl transition ${
                  authTab === 'phone' ? 'bg-violet-600 text-white font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                📱 Phone OTP
              </button>
              <button
                onClick={() => { sound.playTap(); setAuthTab('password'); }}
                className={`py-1.5 rounded-xl transition ${
                  authTab === 'password' ? 'bg-violet-600 text-white font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                🔑 Password
              </button>
              <button
                onClick={() => { sound.playTap(); setAuthTab('google'); }}
                className={`py-1.5 rounded-xl transition ${
                  authTab === 'google' ? 'bg-violet-600 text-white font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                🌐 Google
              </button>
            </div>

            {/* Phone OTP Tab */}
            {authTab === 'phone' && (
              <div className="w-full text-left">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="flex flex-col gap-2.5">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        className="w-full py-2.5 px-3 rounded-xl bg-[#12131f] border border-white/10 text-white font-mono font-bold text-sm focus:border-violet-400 focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-xs shadow-md transition active:scale-95"
                    >
                      Send OTP Code →
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="flex flex-col gap-2.5">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                        Enter 6-Digit OTP Code
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full py-2.5 px-3 text-center tracking-widest rounded-xl bg-[#12131f] border-2 border-violet-500 text-white font-mono font-black text-lg focus:outline-none"
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-md transition active:scale-95"
                    >
                      Verify OTP &amp; Restore Progress
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[11px] text-slate-400 hover:text-white text-center"
                    >
                      Change phone number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Password Tab */}
            {authTab === 'password' && (
              <div className="w-full text-left">
                <form onSubmit={handlePasswordAuth} className="flex flex-col gap-2.5">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Username or Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Username or Phone"
                      value={pwdIdentifier}
                      onChange={(e) => setPwdIdentifier(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#12131f] border border-white/10 text-white font-bold text-xs focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter Password"
                      value={pwdPassword}
                      onChange={(e) => setPwdPassword(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#12131f] border border-white/10 text-white font-bold text-xs focus:border-violet-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>{isRegisterMode ? 'Sign Up & Save Progress' : 'Sign In & Restore Progress'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsRegisterMode(!isRegisterMode)}
                    className="text-[11px] text-violet-400 hover:text-violet-300 text-center font-semibold mt-1"
                  >
                    {isRegisterMode ? 'Already have an account? Sign In' : 'New user? Create a password account'}
                  </button>
                </form>
              </div>
            )}

            {/* Google Tab */}
            {authTab === 'google' && (
              <div className="w-full text-center py-2">
                <button
                  onClick={handleGoogleAuth}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition mb-3"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Continue with Google</span>
                </button>
                <p className="text-[10px] text-slate-400">
                  Instant one-click sync across all your devices.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Bottom Close Button */}
        <button
          onClick={() => { sound.playTap(); onClose(); }}
          className="w-full mt-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-slate-200 text-xs font-black transition flex items-center justify-center gap-1.5 active:translate-y-0.5 cursor-pointer font-['Fredoka']"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
          <span>Close Window</span>
        </button>

        {/* Secret Owner Admin Panel Access (PIN 8899) */}
        {onOpenAdmin && (
          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="text-[10px] text-slate-500 hover:text-violet-400 font-mono transition flex items-center justify-center gap-1 mx-auto"
            >
              <KeyRound className="w-3 h-3" />
              <span>Owner &amp; Admin Panel (PIN: 8899)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
