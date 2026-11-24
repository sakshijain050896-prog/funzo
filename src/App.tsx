import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sidebar, DashboardNavTab } from './components/dashboard/Sidebar';
import { TopBar } from './components/dashboard/TopBar';
import { AllGamesCatalog, CategoryFilter } from './components/dashboard/AllGamesCatalog';
import { GameKey } from './components/dashboard/PopularGames';
import { DashboardWidgets } from './components/dashboard/DashboardWidgets';
import { LeaderboardView } from './components/dashboard/LeaderboardView';
import { RewardsView } from './components/dashboard/RewardsView';

// Game Components
import { MathPuzzle } from './components/games/MathPuzzle';
import { Game2048 } from './components/games/Game2048';
import { ArrowPuzzle } from './components/games/ArrowPuzzle';
import { SpillItHub } from './components/games/SpillItHub';
import { MysteryHub } from './components/games/MysteryHub';
import { TicTacToe } from './components/games/TicTacToe';
import { MemoryMatch } from './components/games/MemoryMatch';
import { BalloonPop } from './components/games/BalloonPop';

// Modals
import { StatsModal } from './components/StatsModal';
import { ProfileModal } from './components/ProfileModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { CelebrationModal } from './components/CelebrationModal';
import { AdModal } from './components/AdModal';
import { AdminModal } from './components/AdminModal';

import { 
  getStoredStats, 
  recordDailyAttempt,
  recordGameWin, 
  getSoundPreference, 
  saveSoundPreference,
  increasePlayerIQ,
  getThemePreference,
  saveThemePreference,
  saveStats
} from './lib/storage';
import { syncPlayerProgress } from './lib/authService';
import { sound } from './lib/soundEffects';
import { PlayerStats, ThemeMode } from './types';
import { ArrowLeft, HelpCircle, Flame } from 'lucide-react';

export const App: React.FC = () => {
  const [stats, setStats] = useState<PlayerStats>(getStoredStats);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getSoundPreference);
  const [theme, setTheme] = useState<ThemeMode>(getThemePreference);
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
  const [streakToast, setStreakToast] = useState<string | null>(null);

  // Celebration Dopamine Modal State
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState('FANTASTIC MOVE! 🌟');
  const [celebrationSubtitle, setCelebrationSubtitle] = useState('');
  const [celebrationIQGained, setCelebrationIQGained] = useState(15);

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

  // Universal Victory & Level Complete Celebration (Records real wins across all games)
  const handleLevelCelebration = (iqPoints: number, title: string, subtitle: string, gameId?: string) => {
    const winUpdated = recordGameWin(gameId, undefined, false);
    const { stats: updated } = increasePlayerIQ(iqPoints);
    const finalStats: PlayerStats = {
      ...updated,
      totalGamesWon: Math.max(winUpdated.totalGamesWon, (updated.totalGamesWon || 0) + 1),
      totalGamesPlayed: Math.max(winUpdated.totalGamesPlayed, updated.totalGamesPlayed),
      coins: updated.coins,
    };
    saveStats(finalStats);
    setStats(finalStats);
    syncPlayerProgress(finalStats);
    setCelebrationTitle(title);
    setCelebrationSubtitle(subtitle);
    setCelebrationIQGained(iqPoints);
    setCelebrationOpen(true);
  };

  const handleMathWin = (score: number) => {
    recordGameWin('sudoku', score, false);
    handleLevelCelebration(15, 'MATH GENIUS! 🧮', 'Outstanding arithmetic calculation and speed!', 'sudoku');
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
    if (gameKey === 'balloon' || gameKey === 'memory' || gameKey === 'tictactoe') {
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
    if (activeGame === 'balloon' || activeGame === 'memory' || activeGame === 'tictactoe') {
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
    <div className="min-h-[100dvh] w-full bg-gradient-to-br from-[#fdfbf7] via-[#f4f6fc] to-[#eff4fb] dark:from-[#111420] dark:via-[#161a29] dark:to-[#1a1f32] text-slate-800 dark:text-slate-100 flex overflow-x-hidden transition-colors duration-200 relative font-['Fredoka']">
      {/* Mario Overworld Retro Floating Clouds */}
      <div className="fixed inset-0 pointer-events-none opacity-15 dark:opacity-5 overflow-hidden z-0 select-none">
        <div className="absolute top-12 left-[8%] text-5xl">☁️</div>
        <div className="absolute top-28 left-[58%] text-6xl">☁️</div>
        <div className="absolute top-52 left-[32%] text-4xl">☁️</div>
        <div className="absolute top-80 left-[82%] text-5xl">☁️</div>
      </div>

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
        onOpenRewards={() => setActiveNavTab('rewards')}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
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
          onOpenMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Streak Notification Toast */}
        {streakToast && (
          <div className="fixed top-24 sm:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#ff9600] border-b-4 border-[#cc7800] text-slate-950 font-black text-xs shadow-xl flex items-center gap-1.5 animate-bounce">
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>{streakToast}</span>
          </div>
        )}

        {/* Main Body Area */}
        <main className="flex-1 p-2.5 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* ---------------- SCENARIO A: ACTIVE GAME PLAYER MODE ---------------- */}
          {activeGame !== null ? (
            <div className="w-full flex flex-col items-center animate-fade-in">
              {/* Back Bar & Game Navigation */}
              <div className="w-full flex items-center justify-between gap-2 mb-4 p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 backdrop-blur-md border-2 border-slate-200 dark:border-slate-700/60 shadow-sm">
                <button
                  onClick={handleBackToHub}
                  className="px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#a7f3d0] hover:bg-[#6ee7b7] border-2 border-[#6ee7b7] border-b-4 border-b-[#059669] text-xs font-black text-[#064e3b] transition flex items-center gap-1 active:translate-y-0.5 shadow-sm font-['Fredoka'] shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">← Back to Games</span>
                  <span className="sm:hidden">Back</span>
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 text-center overflow-hidden">
                  <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white font-['Fredoka'] leading-tight break-words">
                    {activeGame === 'tod' && (
                      activeSubTab === 'would-you-rather' ? 'Would You Rather' :
                      activeSubTab === 'never-have-i-ever' ? 'Never Have I Ever' :
                      activeSubTab === 'most-likely-to' ? 'Most Likely To' :
                      'Truth or Dare'
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
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-lg bg-[#fecdd3] text-[#9f1239] text-[9px] font-black uppercase border border-[#fda4af] font-['Fredoka'] shrink-0">
                    PLAYING
                  </span>
                </div>

                <button
                  onClick={() => handleOpenHowToPlay(activeGame)}
                  className="p-2 sm:p-2.5 rounded-xl bg-[#fef08a] hover:bg-[#fde047] border-2 border-[#facc15] text-[#854d0e] transition active:translate-y-0.5 shadow-sm shrink-0"
                  title="How to Play"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Mounted Active Game Stages (Kept alive in memory) */}
              <div className={`w-full ${activeGame === 'sudoku' ? 'block' : 'hidden'}`}>
                <MathPuzzle
                  stats={stats}
                  onWin={handleMathWin}
                  onRequestAd={handleRequestAd}
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
                    if (s > 100) handleGameActivity('2048');
                    if (s >= 512 && s % 512 === 0) {
                      handleLevelCelebration(15, '2048 RUSH ACHIEVED! ⚡', `Huge combo score of ${s}! Numerical logic master.`, '2048');
                    }
                  }}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === 'tod' || activeGame === '2t1l' ? 'block' : 'hidden'}`}>
                <SpillItHub
                  currentIQ={stats.iq || 105}
                  initialTab={(activeSubTab as any) || (activeGame === '2t1l' ? 'two-truths' : 'truth-or-dare')}
                  onActivity={() => handleGameActivity('spill-it')}
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
                  onActivity={() => handleGameActivity('mystery')}
                  onLevelWin={(iq, title, sub) => handleLevelCelebration(iq, title, sub, 'mystery')}
                  onRequestAd={handleRequestAd}
                  onOpenHowToPlay={handleOpenHowToPlay}
                  onOpenStats={() => setIsStatsOpen(true)}
                />
              </div>

              <div className={`w-full ${activeGame === 'tictactoe' ? 'block' : 'hidden'}`}>
                <TicTacToe
                  onWinOrActivity={() => {
                    handleGameActivity('tictactoe');
                    handleLevelCelebration(10, 'TICTACTOE VICTORY! 👑', '3-in-a-row domination! Strategic intellect leveled up.', 'tictactoe');
                  }}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === 'memory' ? 'block' : 'hidden'}`}>
                <MemoryMatch
                  onWin={() => {
                    handleGameActivity('memory');
                  }}
                  onBackToKids={handleBackToKids}
                />
              </div>

              <div className={`w-full ${activeGame === 'balloon' ? 'block' : 'hidden'}`}>
                <BalloonPop
                  onWin={() => {
                    handleGameActivity('balloon');
                  }}
                  onBackToKids={handleBackToKids}
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
                    onOpenRewards={() => setActiveNavTab('rewards')}
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
                  onUpdateStats={(newStats) => {
                    setStats(newStats);
                    syncPlayerProgress(newStats);
                  }}
                  onRequestAd={handleRequestAd}
                  onBackToHome={() => setActiveNavTab('home')}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* ---------------- GLOBAL MODALS ---------------- */}
      <StatsModal
        isOpen={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        stats={stats}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        stats={stats}
        onUpdateStats={(newStats) => setStats(newStats)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        stats={stats}
        onUpdateStats={(newStats) => setStats(newStats)}
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
        coinsGained={25}
      />

      <AdModal
        isOpen={adModalOpen}
        onClose={() => setAdModalOpen(false)}
        onReward={adOnReward}
        rewardTitle={adRewardTitle}
      />
    </div>
  );
};

export default App;
