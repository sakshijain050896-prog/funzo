import React, { useState, useEffect } from 'react';
import { 
  X, Check, UserCheck, Phone, KeyRound, 
  LogIn, LogOut, Cloud, Sparkles, AlertCircle
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
  UserAccount 
} from '../lib/authService';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: PlayerStats;
  onUpdateStats: (newStats: PlayerStats) => void;
  onOpenAdmin?: () => void;
}

type AuthTab = 'phone' | 'password' | 'google' | 'profile';

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats,
  onOpenAdmin,
}) => {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [activeTab, setActiveTab] = useState<AuthTab>(() => (getCurrentUser() ? 'profile' : 'phone'));

  // Avatar & Nickname state
  const [selectedAvatarId, setSelectedAvatarId] = useState<string>(stats.avatarId || 'fox');
  const [username, setUsername] = useState<string>(stats.username || 'LuckyGamer');
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

  // Sync state on open
  useEffect(() => {
    if (isOpen) {
      const user = getCurrentUser();
      setCurrentUser(user);
      if (user) {
        setUsername(user.username);
        setSelectedAvatarId(user.avatarId);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
  const nextLevelXP = stats.level * 100;
  const currentXPInLevel = stats.xp % 100;

  // 1. SAVE LOCAL PROFILE
  const handleSaveProfile = () => {
    sound.playVictory();
    const updated = updateProfile(username, selectedAvatarId);
    onUpdateStats(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
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
      if (res.otp) setOtpInput(res.otp); // Auto-fill demo OTP for instant convenience
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
      onUpdateStats(res.user.stats);
      setAuthToast({ message: res.message, type: 'success' });
      setTimeout(() => {
        setAuthToast(null);
        setActiveTab('profile');
      }, 1500);
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
        onUpdateStats(res.user.stats);
        setAuthToast({ message: res.message, type: 'success' });
        setTimeout(() => {
          setAuthToast(null);
          setActiveTab('profile');
        }, 1500);
      } else {
        sound.playError();
        setAuthToast({ message: res.message, type: 'error' });
      }
    } else {
      const res = loginWithPassword(pwdIdentifier, pwdPassword);
      if (res.success && res.user) {
        sound.playVictory();
        setCurrentUser(res.user);
        onUpdateStats(res.user.stats);
        setAuthToast({ message: res.message, type: 'success' });
        setTimeout(() => {
          setAuthToast(null);
          setActiveTab('profile');
        }, 1500);
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
    onUpdateStats(res.user.stats);
    setAuthToast({ message: res.message, type: 'success' });
    setTimeout(() => {
      setAuthToast(null);
      setActiveTab('profile');
    }, 1500);
  };

  // 5. LOGOUT FLOW
  const handleLogout = () => {
    sound.playTap();
    logoutUser();
    setCurrentUser(null);
    setActiveTab('phone');
    setAuthToast({ message: 'Logged out. Play as guest or sign in anytime!', type: 'info' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 p-5 shadow-2xl text-center my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white transition"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cloud Account Status Banner */}
        {currentUser ? (
          <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-3">
            <span className="flex items-center gap-1.5">
              <Cloud className="w-4 h-4 text-emerald-400" />
              <span>Cloud Level Synced: Lvl {stats.level}</span>
            </span>
            <button
              onClick={handleLogout}
              className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-0.5"
            >
              <LogOut className="w-3 h-3" /> Log Out
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-3">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Log in to back up levels &amp; IQ!</span>
            </span>
          </div>
        )}

        {/* Navigation Tabs (Phone OTP, Password, Google, Profile) */}
        <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/80 border border-slate-800/80 rounded-2xl mb-3 text-[10px] font-bold">
          <button
            onClick={() => { sound.playTap(); setActiveTab('phone'); }}
            className={`py-1.5 rounded-lg transition ${
              activeTab === 'phone' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            📱 Phone OTP
          </button>
          <button
            onClick={() => { sound.playTap(); setActiveTab('password'); }}
            className={`py-1.5 rounded-lg transition ${
              activeTab === 'password' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            🔑 Password
          </button>
          <button
            onClick={() => { sound.playTap(); setActiveTab('google'); }}
            className={`py-1.5 rounded-lg transition ${
              activeTab === 'google' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌐 Google
          </button>
          <button
            onClick={() => { sound.playTap(); setActiveTab('profile'); }}
            className={`py-1.5 rounded-lg transition ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white font-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            🎨 Avatar
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

        {/* ---------------- 1. PHONE NUMBER + OTP TAB ---------------- */}
        {activeTab === 'phone' && (
          <div className="w-full text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-indigo-400" />
              <span>Instant Mobile OTP Login</span>
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              Enter your mobile number to restore your exact level, IQ, and achievements!
            </p>

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
                    className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono font-bold text-sm focus:border-indigo-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition active:scale-95"
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
                    className="w-full py-2 px-3 text-center tracking-widest rounded-xl bg-slate-950 border-2 border-indigo-500 text-white font-mono font-black text-lg focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-md transition active:scale-95"
                >
                  Verify OTP &amp; Restore Level
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

        {/* ---------------- 2. PASSWORD LOGIN / REGISTER TAB ---------------- */}
        {activeTab === 'password' && (
          <div className="w-full text-left">
            <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isRegisterMode ? 'Create Cloud Account' : 'Password Sign In'}</span>
            </h4>
            <p className="text-[11px] text-slate-400 mb-3">
              {isRegisterMode
                ? 'Save your current progress to a new account with a password.'
                : 'Sign in to sync and restore your progress on this device.'}
            </p>

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
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:border-indigo-500 focus:outline-none"
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
                  className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{isRegisterMode ? 'Sign Up & Back Up Level' : 'Sign In & Restore Level'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 text-center font-semibold mt-1"
              >
                {isRegisterMode ? 'Already have an account? Sign In' : 'New user? Create a password account'}
              </button>
            </form>
          </div>
        )}

        {/* ---------------- 3. GOOGLE AUTHENTICATION TAB ---------------- */}
        {activeTab === 'google' && (
          <div className="w-full text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mx-auto mb-2.5 shadow-lg">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <h4 className="text-sm font-black text-white mb-1">One-Click Google Sign-In</h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Connect your Google account to automatically synchronize your scores and level rankings across phones and desktops.
            </p>

            <button
              onClick={handleGoogleAuth}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-black text-xs shadow-lg flex items-center justify-center gap-2 active:scale-95 transition"
            >
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {/* ---------------- 4. AVATAR & STATS TAB ---------------- */}
        {activeTab === 'profile' && (
          <div>
            {/* Current Caricature Display */}
            <div className="relative mx-auto w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-1 flex items-center justify-center shadow-xl shadow-indigo-500/20 mb-2">
              <span className="text-3xl">{currentAvatar.emoji}</span>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black text-[9px]">
                Lvl {stats.level}
              </span>
            </div>

            <h3 className="text-base font-black text-white">{username || 'Player'}</h3>
            <span className="text-[11px] text-indigo-400 font-semibold">{currentAvatar.name}</span>

            {/* Level XP Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2 my-2.5 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-300"
                style={{ width: `${(currentXPInLevel / 100) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-3">
              <span>{stats.xp} Total XP</span>
              <span>Next Lvl: {nextLevelXP} XP</span>
            </div>

            {/* Nickname Input */}
            <div className="text-left mb-3">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                Player Nickname
              </label>
              <input
                type="text"
                maxLength={18}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold text-xs focus:border-indigo-500 focus:outline-none transition"
                placeholder="Enter nickname..."
              />
            </div>

            {/* Avatar Caricature Grid */}
            <div className="text-left mb-4">
              <label className="text-[10px] font-bold text-slate-300 uppercase tracking-wider block mb-1.5">
                Choose Cartoon Caricature
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
                      className={`p-2 rounded-2xl flex flex-col items-center justify-center transition active:scale-95 border ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 shadow-md ring-2 ring-indigo-400'
                          : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <span className="text-xl mb-0.5">{av.emoji}</span>
                      <span className="text-[9px] font-semibold text-slate-300 truncate w-full">
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
              className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/25 active:scale-95 transition flex items-center justify-center gap-1.5"
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
        )}

        {/* Secret Owner Admin Panel Access */}
        {onOpenAdmin && (
          <div className="mt-3 pt-2.5 border-t border-slate-800 text-center">
            <button
              onClick={() => {
                onClose();
                onOpenAdmin();
              }}
              className="text-[10px] text-slate-500 hover:text-indigo-400 font-mono transition flex items-center justify-center gap-1 mx-auto"
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
