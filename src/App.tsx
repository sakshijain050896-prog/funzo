import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sidebar, DashboardNavTab } from './components/dashboard/Sidebar';
import { TopBar } from './components/dashboard/TopBar';
import { AllGamesCatalog } from './components/dashboard/AllGamesCatalog';
import { GameKey } from './components/dashboard/PopularGames';
import { DashboardWidgets } from './components/dashboard/DashboardWidgets';
import { LeaderboardView } from './components/dashboard/LeaderboardView';
import { RewardsView } from './components/dashboard/RewardsView';

// Game Components
import { DailyGrid } from './components/DailyGrid';
import { Game2048 } from './components/games/Game2048';
import { ArrowPuzzle } from './components/games/ArrowPuzzle';
import { SpillItHub } from './components/games/SpillItHub';
import { MysteryHub } from './components/games/MysteryHub';
import { TicTacToe } from './components/games/TicTacToe';
import { MemoryMatch } from './components/games/MemoryMatch';
import { DiceRoll } from './components/games/DiceRoll';

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
  increasePlayerIQ
} from './lib/storage';
import { syncPlayerProgress } from './lib/authService';
import { sound } from './lib/soundEffects';
import { PlayerStats } from './types';
import { ArrowLeft, HelpCircle, Flame } from 'lucide-react';

export const App: React.FC = () => {
  const [stats, setStats] = useState<PlayerStats>(getStoredStats);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(getSoundPreference);
  const [activeNavTab, setActiveNavTab] = useState<DashboardNavTab>('home');
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

  // Universal Victory & Level Complete Celebration
  const handleLevelCelebration = (iqPoints: number, title: string, subtitle: string) => {
    const { stats: updated } = increasePlayerIQ(iqPoints);
    setStats(updated);
    syncPlayerProgress(updated);
    setCelebrationTitle(title);
    setCelebrationSubtitle(subtitle);
    setCelebrationIQGained(iqPoints);
    setCelebrationOpen(true);
  };

  const handleSudokuWin = (timeTakenSeconds: number, isDaily: boolean) => {
    const updated = recordGameWin(timeTakenSeconds, isDaily);
    setStats(updated);
    handleLevelCelebration(15, 'SUDOKU MASTERED! 🧩', 'Brilliant logical grid completion across all 81 cells.');
  };

  const handleArrowWin = () => {
    handleLevelCelebration(15, 'ARROWS ESCAPED! 🚀', 'Spatial trajectory mastered! All directional blocks cleared.');
  };

  const handleRequestAd = (rewardTitle: string, onReward: () => void) => {
    setAdRewardTitle(rewardTitle);
    setAdOnReward(() => onReward);
    setAdModalOpen(true);
  };

  const handleLaunchGame = (gameKey: GameKey, subTab?: string) => {
    sound.playTap();
    setActiveGame(gameKey);
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
    setActiveGame(null);
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#12131f] text-slate-100 flex overflow-x-hidden">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        stats={stats}
        activeTab={activeNavTab}
        onSelectTab={(tab) => {
          setActiveNavTab(tab);
          if (tab === 'profile') {
            setIsProfileOpen(true);
          } else {
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
        />

        {/* Streak Notification Toast */}
        {streakToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-[#ff9600] border-b-4 border-[#cc7800] text-slate-950 font-black text-xs shadow-xl flex items-center gap-1.5 animate-bounce">
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
              <div className="w-full flex items-center justify-between mb-4 p-3 rounded-2xl bg-[#1c1e2f] border border-white/10 shadow-xl">
                <button
                  onClick={handleBackToHub}
                  className="px-4 py-2 rounded-xl bg-[#24273d] border border-white/10 text-xs font-black text-slate-200 hover:text-white hover:bg-violet-600 transition flex items-center gap-1.5 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Hub</span>
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black text-white">
                    {activeGame === 'tod' && (
                      activeSubTab === 'would-you-rather' ? 'Would You Rather' :
                      activeSubTab === 'never-have-i-ever' ? 'Never Have I Ever' :
                      activeSubTab === 'most-likely-to' ? 'Most Likely To' :
                      'Truth or Dare'
                    )}
                    {activeGame === 'sudoku' && 'Sudoku Master'}
                    {activeGame === '2t1l' && '2 Truths & 1 Lie'}
                    {activeGame === 'tictactoe' && 'Tic Tac Toe'}
                    {activeGame === 'memory' && 'Memory Match'}
                    {activeGame === 'dice' && 'Dice Roll'}
                    {activeGame === 'arrows' && 'Arrow Out'}
                    {activeGame === '2048' && '2048 Rush'}
                    {activeGame === 'mystery' && (
                      activeSubTab === 'safe-code' ? 'Vault Safe Codebreaker' :
                      activeSubTab === 'daily-riddles' ? 'Detective Riddles' :
                      'The Case Files'
                    )}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-violet-500/20 text-[10px] font-bold text-violet-300 uppercase border border-violet-500/30">
                    Playing
                  </span>
                </div>

                <button
                  onClick={() => handleOpenHowToPlay(activeGame)}
                  className="p-2 rounded-xl bg-[#24273d] border border-white/10 text-slate-300 hover:text-white hover:bg-violet-600 transition"
                  title="How to Play"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>

              {/* Mounted Active Game Stages (Kept alive in memory) */}
              <div className={`w-full ${activeGame === 'sudoku' ? 'block' : 'hidden'}`}>
                <DailyGrid
                  stats={stats}
                  onWin={handleSudokuWin}
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
                      handleLevelCelebration(15, '2048 RUSH ACHIEVED! ⚡', `Huge combo score of ${s}! Numerical logic master.`);
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
                  onWinLevel={handleLevelCelebration}
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
                  onLevelWin={handleLevelCelebration}
                  onRequestAd={handleRequestAd}
                  onOpenHowToPlay={handleOpenHowToPlay}
                  onOpenStats={() => setIsStatsOpen(true)}
                />
              </div>

              <div className={`w-full ${activeGame === 'tictactoe' ? 'block' : 'hidden'}`}>
                <TicTacToe
                  onWinOrActivity={() => {
                    handleGameActivity('tictactoe');
                    handleLevelCelebration(10, 'TICTACTOE VICTORY! 👑', '3-in-a-row domination! Strategic intellect leveled up.');
                  }}
                  onRequestAd={handleRequestAd}
                />
              </div>

              <div className={`w-full ${activeGame === 'memory' ? 'block' : 'hidden'}`}>
                <MemoryMatch
                  onWin={(m, s) => {
                    handleGameActivity('memory');
                    handleLevelCelebration(15, 'MEMORY CONQUERED! 🧠', `All 8 pairs matched in ${m} moves and ${s} seconds!`);
                  }}
                />
              </div>

              <div className={`w-full ${activeGame === 'dice' ? 'block' : 'hidden'}`}>
                <DiceRoll
                  onWinBonus={(coinsWon) => {
                    handleGameActivity('dice');
                    const updated = { ...stats, coins: stats.coins + coinsWon };
                    setStats(updated);
                    syncPlayerProgress(updated);
                  }}
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
