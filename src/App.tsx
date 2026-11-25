import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sidebar, DashboardNavTab } from './components/dashboard/Sidebar';
import { TopBar } from './components/dashboard/TopBar';
import { AllGamesCatalog, CategoryFilter } from './components/dashboard/AllGamesCatalog';
import { GameKey } from './components/dashboard/PopularGames';
import { DashboardWidgets } from './components/dashboard/DashboardWidgets';
import { LeaderboardView } from './components/dashboard/LeaderboardView';
import { RewardsView } from './components/dashboard/RewardsView';
import { getGameArt } from './components/dashboard/GameArt';

// Game Components
import { MathPuzzle } from './components/games/MathPuzzle';
import { Game2048 } from './components/games/Game2048';
import { ArrowPuzzle } from './components/games/ArrowPuzzle';
import { SpillItHub } from './components/games/SpillItHub';
import { MysteryHub } from './components/games/MysteryHub';
import { TicTacToe } from './components/games/TicTacToe';
import { MemoryMatch } from './components/games/MemoryMatch';
import { BalloonPop } from './components/games/BalloonPop';
import { QuizUp } from './components/games/QuizUp';

// Modals
import { StatsModal } from './components/StatsModal';
import { ProfileModal } from './components/ProfileModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { CelebrationModal } from './components/CelebrationModal';
import { AdModal } from './components/AdModal';
import { AdminModal } from './components/AdminModal';
import { NotificationModal } from './components/NotificationModal';
import { InstallAppModal } from './components/InstallAppModal';

import { 
  getStoredStats, 
  recordDailyAttempt,
  recordGameWin, 
  getSoundPreference, 
  saveSoundPreference,
  getThemePreference,
  saveThemePreference,
  saveStats,
  markDailyChallengeDone,
} from './lib/storage';
import { syncPlayerProgress, reconcileProgress, useAuthUser, onPasswordRecovery } from './lib/authService';
import { ResetPasswordModal } from './components/ResetPasswordModal';
import { sound } from './lib/soundEffects';
import { 
  subscribeToInstallPrompt, 
  promptInstallApp, 
  registerBackButtonHandler, 
  triggerHaptic 
} from './lib/mobileApp';
import { PlayerStats, ThemeMode, AppNotification } from './types';
import { ArrowLeft, HelpCircle, Flame } from 'lucide-react';

const NOTIFICATIONS_STORAGE_KEY = 'funzo_user_notifications_v1';
const DAILY_CHALLENGE_BONUS = 100;
const WIN_COINS = 25; // coins recordGameWin awards per win

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-welcome-gift',
    title: 'Daily Welcome Gift 🎁',
    message: 'Welcome back to Funzo! Claim your daily gift of +25 coins to unlock new custom avatars!',
    time: 'Today',
    type: 'reward',
    icon: '🎁',
    isRead: false,
    rewardCoins: 25,
    claimed: false,
    actionLabel: 'Claim +25 🪙',
  },
  {
    id: 'notif-kids-adventure',
    title: 'Kids Adventure Mode Live! 🎈',
    message: 'Play the new timed Balloon Pop countdown challenge and Animal Memory Match stages with your family!',
    time: '2 hours ago',
    type: 'update',
    icon: '🎈',
    isRead: false,
    actionCategory: 'kids',
    actionGameId: 'balloon',
    actionLabel: 'Play Balloon Pop ➔',
  },
  {
    id: 'notif-streak-tracker',
    title: 'Streak Multiplier Active 🔥',
    message: 'Maintain your daily puzzle streak to boost your Mushroom leaderboard ranking!',
    time: 'Yesterday',
    type: 'streak',
    icon: '⭐',
    isRead: false,
    actionCategory: 'all',
    actionGameId: 'sudoku',
    actionLabel: 'Play Maths Puzzle 🧮',
  },
  {
    id: 'notif-brain-challenge',
    title: 'Weekly Brain Challenge 🧠',
    message: 'Test your bluffing detector in 2 Truths & 1 Lie or challenge your reflexes in 2048 Rush!',
    time: '2 days ago',
    type: 'challenge',
    icon: '🎯',
    isRead: true,
    actionCategory: 'all',
    actionGameId: '2t1l',
    actionLabel: 'Play 2T1L ➔',
  },
];

const loadNotifications = (): AppNotification[] => {
  if (typeof window === 'undefined') return INITIAL_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading notifications', e);
  }
  return INITIAL_NOTIFICATIONS;
};

export const App: React.FC = () => {
  const [stats, setStats] = useState<PlayerStats>(getStoredStats);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getSoundPreference);
  const [theme, setTheme] = useState<ThemeMode>(getThemePreference);

  // Synchronize Web Audio synth directly with soundEnabled state
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);
  const [activeNavTab, setActiveNavTab] = useState<DashboardNavTab>('home');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [activeGame, setActiveGame] = useState<GameKey | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Modals
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [howToPlayGameId, setHowToPlayGameId] = useState<string>('sudoku');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(loadNotifications);
  const [streakToast, setStreakToast] = useState<string | null>(null);
  const [canInstallPwa, setCanInstallPwa] = useState<boolean>(false);

  // Subscribe to PWA Installation Availability
  useEffect(() => {
    return subscribeToInstallPrompt((canInstall) => {
      setCanInstallPwa(canInstall);
    });
  }, []);

  // Native Android Hardware Back-Button Management
  useEffect(() => {
    return registerBackButtonHandler(() => {
      if (isInstallModalOpen) { setIsInstallModalOpen(false); return true; }
      if (isProfileOpen) { setIsProfileOpen(false); return true; }
      if (isStatsOpen) { setIsStatsOpen(false); return true; }
      if (isAdminOpen) { setIsAdminOpen(false); return true; }
      if (isHowToPlayOpen) { setIsHowToPlayOpen(false); return true; }
      if (isNotificationsOpen) { setIsNotificationsOpen(false); return true; }
      if (isMobileSidebarOpen) { setIsMobileSidebarOpen(false); return true; }
      if (activeGame !== null) {
        setActiveGame(null);
        return true;
      }
      return false;
    });
  }, [isInstallModalOpen, isProfileOpen, isStatsOpen, isAdminOpen, isHowToPlayOpen, isNotificationsOpen, isMobileSidebarOpen, activeGame]);

  const saveNotificationsState = (updated: AppNotification[]) => {
    setNotifications(updated);
    try {
      localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving notifications', e);
    }
  };

  const handleMarkAsRead = (id: string) => {
    sound.playTap();
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    saveNotificationsState(updated);
  };

  const handleMarkAllAsRead = () => {
    sound.playTap();
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    saveNotificationsState(updated);
  };

  const handleClaimReward = (id: string, coins: number) => {
    sound.playVictory();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.3 },
    });
    const currentStats = getStoredStats();
    const updatedStats: PlayerStats = {
      ...currentStats,
      coins: (currentStats.coins || 0) + coins,
    };
    saveStats(updatedStats);
    setStats(updatedStats);
    syncPlayerProgress(updatedStats);

    const updatedNotifications = notifications.map((n) =>
      n.id === id ? { ...n, claimed: true, isRead: true } : n
    );
    saveNotificationsState(updatedNotifications);
  };

  const handleNavigateGameFromNotification = (gameId?: string, category?: string) => {
    sound.playTap();
    if (category) {
      setActiveCategory(category as CategoryFilter);
    }
    if (gameId) {
      handleLaunchGame(gameId as GameKey);
    }
  };

  const handleSpendCoins = (amount: number): boolean => {
    const current = getStoredStats();
    if ((current.coins || 0) < amount) {
      sound.playError();
      alert(`Oops! You need ${amount} coins for this booster, but only have ${current.coins || 0} coins. Complete levels or claim daily gifts to earn more! 🪙`);
      return false;
    }
    const updated: PlayerStats = {
      ...current,
      coins: (current.coins || 0) - amount,
    };
    saveStats(updated);
    setStats(updated);
    syncPlayerProgress(updated);
    sound.playTap();
    return true;
  };

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  // Celebration Dopamine Modal State
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState('FANTASTIC MOVE! 🌟');
  const [celebrationSubtitle, setCelebrationSubtitle] = useState('');
  const [celebrationIQGained, setCelebrationIQGained] = useState(15);
  const [celebrationCoins, setCelebrationCoins] = useState(WIN_COINS);
  const milestone2048Ref = useRef<number | null>(null);
  // Party/mystery games call onActivity on every card; a "game played" is already
  // counted once when the game is launched, so per-card activity must not add more.
  const noopActivity = useCallback(() => {}, []);

  // ---- Cloud account: resume sync on app open + password-reset links ----
  const { user: authUser, ready: authReady } = useAuthUser();
  const didResumeRef = useRef(false);
  useEffect(() => {
    if (!authReady || didResumeRef.current) return;
    didResumeRef.current = true;
    if (authUser) {
      reconcileProgress('resume').then((restored) => {
        if (restored) setStats(restored);
      });
    }
  }, [authReady, authUser]);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  useEffect(() => onPasswordRecovery(() => setIsResetPasswordOpen(true)), []);

  // Persist + render + cloud-sync any stats change coming from a view/modal.
  // (Rewards/Profile/Admin previously only updated React state, so claimed coins
  // were lost on reload or overwritten by the next game action.)
  const applyStats = useCallback((newStats: PlayerStats) => {
    saveStats(newStats);
    setStats(newStats);
    syncPlayerProgress(newStats);
  }, []);

  // Ad simulation modal state
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adRewardTitle, setAdRewardTitle] = useState('');
  const [adOnReward, setAdOnReward] = useState<() => void>(() => {});

  // Sync theme with html root class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemePreference(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    sound.playTap();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Keyboard shortcut for Owner Admin Panel (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleSound = () => {
    triggerHaptic();
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    saveSoundPreference(next);
  };

  const handleOpenHowToPlay = (gameId?: string) => {
    sound.playTap();
    if (gameId) {
      setHowToPlayGameId(gameId);
    } else if (activeGame) {
      setHowToPlayGameId(activeGame);
    } else {
      setHowToPlayGameId('sudoku');
    }
    setIsHowToPlayOpen(true);
  };

  const handleGameActivity = (gameId: string) => {
    const { stats: updated, isNewStreakDay, coinsEarned } = recordDailyAttempt(gameId);
    setStats(updated);
    syncPlayerProgress(updated);

    if (isNewStreakDay) {
      sound.playVictory();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.2 },
      });
      setStreakToast(`🔥 Day ${updated.streak} Streak Maintained! (+${coinsEarned} Coins)`);
      setTimeout(() => setStreakToast(null), 4000);
    }
  };

  // Records exactly ONE win: +1 won, +25 coins (WIN_COINS), +XP, and an IQ boost.
  // (Previously a win was counted 2–3 times and coins didn't match the modal.)
  const recordSingleWin = (gameId: string | undefined, iqPoints: number, bonusCoins = 0): PlayerStats => {
    const before = getStoredStats();
    const winUpdated = recordGameWin(gameId, undefined, false); // +1 won, +25 coins, +50 XP
    const finalStats: PlayerStats = {
      ...winUpdated,
      iq: (before.iq || 100) + iqPoints,
      coins: winUpdated.coins + bonusCoins,
    };
    saveStats(finalStats);
    setStats(finalStats);
    syncPlayerProgress(finalStats);
    return finalStats;
  };

  // Universal Victory & Level Complete Celebration (Records real wins across all games)
  const handleLevelCelebration = (iqPoints: number, title: string, subtitle: string, gameId?: string, bonusCoins = 0) => {
    recordSingleWin(gameId, iqPoints, bonusCoins);
    setCelebrationTitle(title);
    setCelebrationSubtitle(subtitle);
    setCelebrationIQGained(iqPoints);
    setCelebrationCoins(WIN_COINS + bonusCoins);
    setCelebrationOpen(true);
  };

  // Kids games show their own "level cleared" screen, so record the win quietly.
  const handleQuietWin = (gameId: string) => {
    recordSingleWin(gameId, 5);
  };

  const handleMathWin = (_score: number) => {
    // Daily Challenge: first Maths Puzzle level cleared today earns +100 bonus coins (once per day).
    const bonus = markDailyChallengeDone() ? DAILY_CHALLENGE_BONUS : 0;
    handleLevelCelebration(
      15,
      bonus ? 'DAILY CHALLENGE DONE! 🧮' : 'MATH GENIUS! 🧮',
      bonus ? `Maths Puzzle cleared! +${DAILY_CHALLENGE_BONUS} daily bonus coins added.` : 'Outstanding arithmetic calculation and speed!',
      'sudoku',
      bonus,
    );
  };

  const handleArrowWin = () => {
    handleLevelCelebration(15, 'ARROWS ESCAPED! 🚀', 'Spatial trajectory mastered! All directional blocks cleared.', 'arrows');
  };

  const handleRequestAd = (rewardTitle: string, onReward: () => void) => {
    setAdRewardTitle(rewardTitle);
    setAdOnReward(() => onReward);
    setAdModalOpen(true);
  };

  const handleLaunchGame = (gameKey: GameKey, subTab?: string) => {
    sound.playTap();
    setActiveGame(gameKey);
    if (gameKey === 'quizup') {
      setActiveCategory('quiz');
    } else if (gameKey === 'balloon' || gameKey === 'memory' || gameKey === 'tictactoe') {
      setActiveCategory('kids');
    } else if (gameKey === 'sudoku' || gameKey === 'arrows' || gameKey === '2048') {
      setActiveCategory('brain');
    } else if (gameKey === 'tod' || gameKey === '2t1l') {
      setActiveCategory('social');
    }

    if (subTab) {
      setActiveSubTab(subTab);
    } else if (gameKey === '2t1l') {
      setActiveSubTab('two-truths');
    } else if (gameKey === 'tod') {
      setActiveSubTab('truth-or-dare');
    } else if (gameKey === 'mystery') {
      setActiveSubTab('crime-scene');
    } else {
      setActiveSubTab(null);
    }
    handleGameActivity(gameKey);
  };

  const handleBackToHub = () => {
    sound.playTap();
    if (activeGame === 'quizup') {
      setActiveCategory('quiz');
    } else if (activeGame === 'balloon' || activeGame === 'memory' || activeGame === 'tictactoe') {
      setActiveCategory('kids');
    }
    setActiveGame(null);
  };

  const handleBackToKids = () => {
    sound.playTap();
    setActiveCategory('kids');
    setActiveGame(null);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#f5f5fb] dark:bg-[#0a0b14] text-slate-800 dark:text-slate-100 flex overflow-x-hidden transition-colors duration-300 relative font-sans">
      {/* Ambient aurora + grid backdrop */}
      <div className="fz-aurora" aria-hidden="true" />
      <div className="fz-grid-overlay" aria-hidden="true" />

      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        stats={stats}
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          if (tab === 'profile') {
            setIsProfileOpen(true);
          } else {
            setActiveNavTab(tab);
            setActiveGame(null); // Return to view
          }
        }}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRewards={() => {
          setActiveNavTab('rewards');
          setActiveGame(null);
          setIsMobileSidebarOpen(false);
        }}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        canInstallApp={canInstallPwa}
        onInstallApp={promptInstallApp}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-h-[100dvh] w-full lg:pl-64">
        {/* Top Header Bar */}
        <TopBar
          stats={stats}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenNotifications={() => {
            sound.playTap();
            setIsNotificationsOpen(true);
          }}
          unreadNotificationCount={unreadNotificationCount}
          onOpenMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          canInstallApp={canInstallPwa}
          onInstallApp={promptInstallApp}
          onOpenInstallModal={() => setIsInstallModalOpen(true)}
        />

        {/* Streak Notification Toast */}
        {streakToast && (
          <div className="fixed top-[calc(7rem+env(safe-area-inset-top))] sm:top-[calc(5rem+env(safe-area-inset-top))] left-1/2 -translate-x-1/2 z-50 pl-2 pr-4 h-11 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-[0_18px_40px_-12px_rgba(249,115,22,.8)] border border-white/25 flex items-center gap-2 animate-slide-down whitespace-nowrap">
            <span className="w-7 h-7 rounded-full bg-white/25 flex items-center justify-center"><Flame className="w-4 h-4 fill-white" /></span>
            <span>{streakToast}</span>
          </div>
        )}

        {/* Main Body Area */}
        <main className="relative z-10 flex-1 px-3 py-4 sm:p-6 lg:p-8 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:pb-[calc(1.5rem+env(safe-area-inset-bottom))] lg:pb-[calc(2rem+env(safe-area-inset-bottom))] max-w-7xl mx-auto w-full">
          {/* ---------------- SCENARIO A: ACTIVE GAME PLAYER MODE ---------------- */}
          {activeGame !== null ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              {/* Back Bar & Game Navigation */}
              <div className="w-full flex items-center justify-between gap-2 mb-4 sm:mb-6 p-2 sm:p-2.5 rounded-2xl fz-glass shadow-[0_20px_40px_-28px_rgba(0,0,0,.6)]">
                <button
                  onClick={handleBackToHub}
                  className="h-10 px-3 sm:px-4 rounded-xl fz-btn-ghost text-xs sm:text-sm font-semibold flex items-center gap-1.5 shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Back to Games</span>
                  <span className="sm:hidden">Back</span>
                </button>

                <div className="flex items-center gap-2 sm:gap-3 overflow-hidden min-w-0">
                  {(() => {
                    const art = getGameArt(activeGame, activeSubTab || undefined);
                    const ArtIcon = art.icon;
                    return (
                      <span
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/20 shadow-[0_8px_20px_-8px_rgba(0,0,0,.6)]"
                        style={{ background: `linear-gradient(145deg, ${art.from}, ${art.via} 60%, ${art.to})` }}
                      >
                        <ArtIcon className="w-[18px] h-[18px] text-white" />
                      </span>
                    );
                  })()}
                  <div className="flex flex-col min-w-0 text-left">
                  <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.9)]" />
                    Now playing
                  </span>
                  <span className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                    {activeGame === 'tod' && (
                      activeSubTab === 'would-you-rather' ? 'Would You Rather' :
                      activeSubTab === 'never-have-i-ever' ? 'Never Have I Ever' :
                      activeSubTab === 'most-likely-to' ? 'Most Likely To' :
                      'Truth or Dare'
                    )}
                    {activeGame === 'quizup' && (
                      activeSubTab === 'cinema' ? 'Quiz Up: Cinema (Bolly & Holly)' :
                      activeSubTab === 'science' ? 'Quiz Up: Science & Biology' :
                      activeSubTab === 'physics' ? 'Quiz Up: Physics & Energy' :
                      activeSubTab === 'chemistry' ? 'Quiz Up: Chemistry & Elements' :
                      activeSubTab === 'history' ? 'Quiz Up: World History' :
                      activeSubTab === 'math' ? 'Quiz Up: Math & Logic' :
                      activeSubTab === 'geography' ? 'Quiz Up: Geography & Wonders' :
                      activeSubTab === 'tech' ? 'Quiz Up: Tech & Inventions' :
                      activeSubTab === 'sports' ? 'Quiz Up: Sports & Olympics' :
                      'Quiz Up'
                    )}
                    {activeGame === 'sudoku' && 'Maths Puzzle'}
                    {activeGame === '2t1l' && '2 Truths & 1 Lie'}
                    {activeGame === 'tictactoe' && 'Tic Tac Toe'}
                    {activeGame === 'memory' && 'Memory Match'}
                    {activeGame === 'balloon' && 'Balloon Pop'}
                    {activeGame === 'arrows' && 'Arrow Out'}
                    {activeGame === '2048' && '2048 Rush'}
                    {activeGame === 'mystery' && (
                      activeSubTab === 'safe-code' ? 'Vault Safe Codebreaker' :
                      activeSubTab === 'daily-riddles' ? 'Detective Riddles' :
                      'The Case Files'
                    )}
                  </span>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenHowToPlay(activeGame)}
                  className="h-10 px-3 rounded-xl fz-btn-ghost text-xs font-semibold flex items-center gap-1.5 shrink-0"
                  title="How to Play"
                >
                  <HelpCircle className="w-4 h-4 text-violet-500 dark:text-violet-400" />
                  <span className="hidden sm:inline">How to play</span>
                </button>
              </div>

              {/* Mounted Active Game Stages (Kept alive in memory) */}
              <div className={`w-full ${activeGame === 'sudoku' ? 'block' : 'hidden'}`}>
                <MathPuzzle
                  stats={stats}
                  onWin={handleMathWin}
                  onRequestAd={handleRequestAd}
                  onSpendCoins={handleSpendCoins}
                />
              </div>

              <div className={`w-full ${activeGame === 'arrows' ? 'block' : 'hidden'}`}>
                <ArrowPuzzle
                  onWin={handleArrowWin}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === '2048' ? 'block' : 'hidden'}`}>
                <Game2048
                  onWinOrScore={(s) => {
                    // Celebrate each time the score CROSSES a 512-point milestone
                    // (was: only when the score landed exactly on a multiple of 512,
                    // and every move over 100 pts counted as a new "game played").
                    const milestone = Math.floor(s / 512);
                    if (milestone2048Ref.current === null || milestone < milestone2048Ref.current) {
                      milestone2048Ref.current = milestone; // first move of a session / after restart
                    } else if (milestone > milestone2048Ref.current) {
                      milestone2048Ref.current = milestone;
                      handleLevelCelebration(15, '2048 RUSH ACHIEVED! ⚡', `Crossed ${milestone * 512} points! Numerical logic master.`, '2048');
                    }
                  }}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === 'tod' || activeGame === '2t1l' ? 'block' : 'hidden'}`}>
                <SpillItHub
                  currentIQ={stats.iq || 105}
                  initialTab={(activeSubTab as any) || (activeGame === '2t1l' ? 'two-truths' : 'truth-or-dare')}
                  onActivity={noopActivity}
                  onWinLevel={(iq, title, sub) => handleLevelCelebration(iq, title, sub, 'spill-it')}
                  onRequestAd={handleRequestAd}
                  onOpenHowToPlay={handleOpenHowToPlay}
                  onOpenStats={() => setIsStatsOpen(true)}
                />
              </div>

              <div className={`w-full ${activeGame === 'mystery' ? 'block' : 'hidden'}`}>
                <MysteryHub
                  currentIQ={stats.iq || 105}
                  initialTab={(activeSubTab as any) || 'crime-scene'}
                  onActivity={noopActivity}
                  onLevelWin={(iq, title, sub) => handleLevelCelebration(iq, title, sub, 'mystery')}
                  onRequestAd={handleRequestAd}
                  onOpenHowToPlay={handleOpenHowToPlay}
                  onOpenStats={() => setIsStatsOpen(true)}
                />
              </div>

              <div className={`w-full ${activeGame === 'tictactoe' ? 'block' : 'hidden'}`}>
                <TicTacToe
                  onWinOrActivity={() => {
                    // TicTacToe only calls this when the human player wins (see TicTacToe.tsx)
                    handleLevelCelebration(10, 'TICTACTOE VICTORY! 👑', '3-in-a-row domination! Strategic intellect leveled up.', 'tictactoe');
                  }}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === 'memory' ? 'block' : 'hidden'}`}>
                <MemoryMatch
                  coins={stats.coins}
                  onSpendCoins={handleSpendCoins}
                  onWin={() => handleQuietWin('memory')}
                  onBackToKids={handleBackToKids}
                />
              </div>

              <div className={`w-full ${activeGame === 'balloon' ? 'block' : 'hidden'}`}>
                <BalloonPop
                  coins={stats.coins}
                  onSpendCoins={handleSpendCoins}
                  onWin={() => handleQuietWin('balloon')}
                  onBackToKids={handleBackToKids}
                />
              </div>

              <div className={`w-full ${activeGame === 'quizup' ? 'block' : 'hidden'}`}>
                <QuizUp
                  coins={stats.coins}
                  onSpendCoins={handleSpendCoins}
                  onWin={(score, accuracy) => {
                    handleLevelCelebration(25, 'TRIVIA GENIUS! 💡', `Scored ${score} pts with ${accuracy}% accuracy in Quiz Up!`, 'quizup');
                  }}
                  initialTopic={(activeSubTab as any) || 'all'}
                  stats={stats}
                />
              </div>
            </div>
          ) : (
            /* ---------------- SCENARIO B: DASHBOARD VIEWS ---------------- */
            <>
              {activeNavTab === 'home' && (
                <div className="w-full flex flex-col animate-fade-in">

                  {/* All Game Genres & Games Catalog with Live Search & Filter */}
                  <AllGamesCatalog
                    selectedCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                    onSelectGame={handleLaunchGame}
                    searchQuery={searchQuery}
                  />

                  {/* Dashboard Widgets: Stats, Daily Challenge, Leaderboard, Rewards, Top Games */}
                  <DashboardWidgets
                    stats={stats}
                    onOpenStats={() => setIsStatsOpen(true)}
                    onOpenLeaderboard={() => setActiveNavTab('leaderboard')}
                    onOpenRewards={() => {
          setActiveNavTab('rewards');
          setActiveGame(null);
          setIsMobileSidebarOpen(false);
        }}
                    onPlayDailyChallenge={() => handleLaunchGame('sudoku')}
                  />
                </div>
              )}

              {activeNavTab === 'leaderboard' && (
                <LeaderboardView
                  stats={stats}
                  onBackToHome={() => setActiveNavTab('home')}
                />
              )}

              {activeNavTab === 'rewards' && (
                <RewardsView
                  stats={stats}
                  onUpdateStats={applyStats}
                  onRequestAd={handleRequestAd}
                  onBackToHome={() => setActiveNavTab('home')}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* ---------------- GLOBAL MODALS ---------------- */}
      <NotificationModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onClaimReward={handleClaimReward}
        onNavigateGame={handleNavigateGameFromNotification}
      />

      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
        onUpdateStats={applyStats}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        stats={stats}
        onUpdateStats={applyStats}
      />

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        initialGameId={howToPlayGameId}
      />

      <CelebrationModal
        isOpen={celebrationOpen}
        onClose={() => setCelebrationOpen(false)}
        title={celebrationTitle}
        subtitle={celebrationSubtitle}
        iqGained={celebrationIQGained}
        currentIQ={stats.iq || 105}
        coinsGained={celebrationCoins}
      />

      <AdModal
        isOpen={adModalOpen}
        onClose={() => setAdModalOpen(false)}
        onReward={adOnReward}
        rewardTitle={adRewardTitle}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
      />

      <InstallAppModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        canInstallPwa={canInstallPwa}
        onInstallPwa={promptInstallApp}
      />
    </div>
  );
};

export default App;
