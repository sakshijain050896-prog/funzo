import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { DailyGrid } from './components/DailyGrid';
import { Game2048 } from './components/games/Game2048';
import { ArrowPuzzle } from './components/games/ArrowPuzzle';
import { SpillItHub } from './components/games/SpillItHub';
import { MysteryHub } from './components/games/MysteryHub';
import { IQRankMeter } from './components/IQRankMeter';
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
  getThemePreference,
  saveThemePreference,
  increasePlayerIQ
} from './lib/storage';
import { syncPlayerProgress } from './lib/authService';
import { sound } from './lib/soundEffects';
import { GenreType, ThemeMode } from './types';
import { Flame } from 'lucide-react';

type BrainSubGame = 'sudoku' | '2048' | 'arrows';

export const App: React.FC = () => {
  const [stats, setStats] = useState(getStoredStats);
  const [theme, setTheme] = useState<ThemeMode>(getThemePreference);
  const [soundEnabled, setSoundEnabled] = useState(getSoundPreference);
  const [activeGenre, setActiveGenre] = useState<GenreType>('brain');
  const [brainGame, setBrainGame] = useState<BrainSubGame>('sudoku');

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
  const [howToPlayGameId, setHowToPlayGameId] = useState<string>('sudoku');
  const [streakToast, setStreakToast] = useState<string | null>(null);

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

  // Celebration Dopamine Modal State
  const [celebrationOpen, setCelebrationOpen] = useState(false);
  const [celebrationTitle, setCelebrationTitle] = useState('FANTASTIC MOVE! 🌟');
  const [celebrationSubtitle, setCelebrationSubtitle] = useState('');
  const [celebrationIQGained, setCelebrationIQGained] = useState(15);

  // Ad simulation modal state
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adRewardTitle, setAdRewardTitle] = useState('');
  const [adOnReward, setAdOnReward] = useState<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    saveThemePreference(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    sound.playTap();
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

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
    } else if (activeGenre === 'brain') {
      setHowToPlayGameId(brainGame);
    } else if (activeGenre === 'social') {
      setHowToPlayGameId('spill-it');
    } else {
      setHowToPlayGameId('mystery');
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

  // Universal Victory & Level Complete Celebration (All genres)
  const handleLevelCelebration = (iqPoints: number, title: string, subtitle: string) => {
    const { stats: updated } = increasePlayerIQ(iqPoints);
    setStats(updated);
    syncPlayerProgress(updated);
    setCelebrationTitle(title);
    setCelebrationSubtitle(subtitle);
    setCelebrationIQGained(iqPoints);
    setCelebrationOpen(true);
  };

  // Sudoku solve handler
  const handleSudokuWin = (timeTakenSeconds: number, isDaily: boolean) => {
    const updated = recordGameWin(timeTakenSeconds, isDaily);
    setStats(updated);
    handleLevelCelebration(15, 'SUDOKU MASTERED! 🧩', 'Brilliant logical grid completion across all 81 cells.');
  };

  // Arrow Puzzle solve handler
  const handleArrowWin = () => {
    handleLevelCelebration(15, 'ARROWS ESCAPED! 🚀', 'Spatial trajectory mastered! All directional blocks cleared.');
  };

  const handleRequestAd = (rewardTitle: string, onReward: () => void) => {
    setAdRewardTitle(rewardTitle);
    setAdOnReward(() => onReward);
    setAdModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      theme === 'dark' ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Sticky Compact Header */}
      <Header
        stats={stats}
        theme={theme}
        soundEnabled={soundEnabled}
        activeGenre={activeGenre}
        onSelectGenre={(g) => {
          sound.playTap();
          setActiveGenre(g);
          handleGameActivity(g);
        }}
        onToggleTheme={handleToggleTheme}
        onToggleSound={handleToggleSound}
        onOpenStats={() => setIsStatsOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenHowToPlay={handleOpenHowToPlay}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Streak Notification Toast */}
      {streakToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 flex items-center gap-1.5 animate-bounce">
          <Flame className="w-3.5 h-3.5 fill-slate-950" />
          <span>{streakToast}</span>
        </div>
      )}

      {/* Main Single-Screen Game Stage (Keep-Alive: All games stay mounted in memory when switching) */}
      <main className="flex-1 w-full max-w-md mx-auto px-3 py-2 flex flex-col items-center justify-start">
        {/* 1. BRAIN GENRE (3 CURATED GAMES) */}
        <div className={`w-full flex flex-col items-center ${activeGenre === 'brain' ? 'block' : 'hidden'}`}>
          {/* Universal IQ & Rank Progress Meter in Brain Hub */}
          <IQRankMeter
            currentIQ={stats.iq || 105}
            sectionName="Cognitive Logic"
            onOpenStats={() => setIsStatsOpen(true)}
          />

          {/* Brain Sub-Game Pills (Sudoku, 2048, Arrow Escape) */}
          <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 text-xs font-bold mb-3 w-full">
            {[
              { id: 'sudoku', label: 'Sudoku' },
              { id: '2048', label: '2048' },
              { id: 'arrows', label: 'Arrow Out' },
            ].map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  sound.playTap();
                  setBrainGame(g.id as BrainSubGame);
                  handleGameActivity(g.id);
                }}
                className={`py-1.5 px-2 rounded-xl text-center transition active:scale-95 ${
                  brainGame === g.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-extrabold border border-slate-200/60 dark:border-slate-700/60'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* Preserved In-Progress Brain Games (Mounted in memory, never reset on switch) */}
          <div className={`w-full ${brainGame === 'sudoku' ? 'block' : 'hidden'}`}>
            <DailyGrid
              stats={stats}
              onWin={handleSudokuWin}
              onRequestAd={handleRequestAd}
            />
          </div>
          <div className={`w-full ${brainGame === '2048' ? 'block' : 'hidden'}`}>
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
          <div className={`w-full ${brainGame === 'arrows' ? 'block' : 'hidden'}`}>
            <ArrowPuzzle
              onWin={handleArrowWin}
              onRequestAd={handleRequestAd}
            />
          </div>
        </div>

        {/* 2. SOCIAL GENRE: SPILL IT! (Preserved In-Progress, never resets on switch) */}
        <div className={`w-full ${activeGenre === 'social' ? 'block' : 'hidden'}`}>
          <SpillItHub
            currentIQ={stats.iq || 105}
            onActivity={() => handleGameActivity('spill-it')}
            onWinLevel={handleLevelCelebration}
            onRequestAd={handleRequestAd}
            onOpenHowToPlay={handleOpenHowToPlay}
            onOpenStats={() => setIsStatsOpen(true)}
          />
        </div>

        {/* 3. MYSTERY GENRE: THE CASE FILES (Preserved In-Progress, never resets on switch) */}
        <div className={`w-full ${activeGenre === 'mystery' ? 'block' : 'hidden'}`}>
          <MysteryHub
            currentIQ={stats.iq || 105}
            onActivity={() => handleGameActivity('mystery')}
            onLevelWin={handleLevelCelebration}
            onRequestAd={handleRequestAd}
            onOpenHowToPlay={handleOpenHowToPlay}
            onOpenStats={() => setIsStatsOpen(true)}
          />
        </div>
      </main>

      {/* Global Modals */}
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
