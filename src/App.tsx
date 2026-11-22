import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { DailyGrid } from './components/DailyGrid';
import { Game2048 } from './components/games/Game2048';
import { ZenTidy } from './components/games/ZenTidy';
import { SpillItHub } from './components/games/SpillItHub';
import { MysteryHub } from './components/games/MysteryHub';
import { IQRankMeter } from './components/IQRankMeter';
import { StatsModal } from './components/StatsModal';
import { ProfileModal } from './components/ProfileModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { CelebrationModal } from './components/CelebrationModal';
import { AdModal } from './components/AdModal';
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
import { sound } from './lib/soundEffects';
import { GenreType, ThemeMode } from './types';
import { Flame } from 'lucide-react';

type BrainSubGame = 'sudoku' | '2048' | 'tidy';

export const App: React.FC = () => {
  const [stats, setStats] = useState(getStoredStats);
  const [theme, setTheme] = useState<ThemeMode>(getThemePreference);
  const [soundEnabled, setSoundEnabled] = useState(getSoundPreference);
  const [activeGenre, setActiveGenre] = useState<GenreType>('brain');
  const [brainGame, setBrainGame] = useState<BrainSubGame>('sudoku');

  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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

  // Zen Tidy solve handler
  const handleTidyWin = () => {
    handleLevelCelebration(15, 'PERFECT HARMONY! ✨', 'Room clutter settled into soothing, flawless order.');
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
      />

      {/* Streak Notification Toast */}
      {streakToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-40 px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-xl shadow-amber-500/30 flex items-center gap-1.5 animate-bounce">
          <Flame className="w-3.5 h-3.5 fill-slate-950" />
          <span>{streakToast}</span>
        </div>
      )}

      {/* Main Single-Screen Game Stage */}
      <main className="flex-1 w-full max-w-lg mx-auto px-2.5 py-2 flex flex-col items-center justify-start">
        {/* 1. BRAIN GENRE (3 CURATED GAMES) */}
        {activeGenre === 'brain' && (
          <div className="w-full flex flex-col items-center">
            {/* Universal IQ & Rank Progress Meter in Brain Hub */}
            <IQRankMeter
              currentIQ={stats.iq || 105}
              sectionName="Brain Grid Arena"
              onOpenStats={() => setIsStatsOpen(true)}
            />

            {/* Brain Sub-Game Pills (Sudoku, 2048, Zen Tidy) */}
            <div className="flex items-center justify-between gap-1 mb-2 p-0.5 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-[11px] font-bold overflow-x-auto w-full">
              {[
                { id: 'sudoku', label: 'Sudoku Master' },
                { id: '2048', label: '2048 Rush' },
                { id: 'tidy', label: 'Zen Tidy ✨' },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    sound.playTap();
                    setBrainGame(g.id as BrainSubGame);
                    handleGameActivity(g.id);
                  }}
                  className={`flex-1 py-1.5 rounded-lg text-center transition active:scale-95 ${
                    brainGame === g.id
                      ? 'bg-indigo-600 text-white shadow-sm font-black'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Active Brain Game */}
            {brainGame === 'sudoku' && (
              <DailyGrid
                stats={stats}
                onWin={handleSudokuWin}
                onRequestAd={handleRequestAd}
              />
            )}
            {brainGame === '2048' && (
              <Game2048
                onWinOrScore={(s) => {
                  if (s > 100) handleGameActivity('2048');
                  if (s >= 512 && s % 512 === 0) {
                    handleLevelCelebration(15, '2048 RUSH ACHIEVED! ⚡', `Huge combo score of ${s}! Numerical logic master.`);
                  }
                }}
                onRequestAd={handleRequestAd}
              />
            )}
            {brainGame === 'tidy' && (
              <ZenTidy
                onWin={handleTidyWin}
                onRequestAd={handleRequestAd}
              />
            )}
          </div>
        )}

        {/* 2. SOCIAL GENRE: SPILL IT! */}
        {activeGenre === 'social' && (
          <SpillItHub
            currentIQ={stats.iq || 105}
            onActivity={() => handleGameActivity('spill-it')}
            onWinLevel={handleLevelCelebration}
            onRequestAd={handleRequestAd}
            onOpenHowToPlay={handleOpenHowToPlay}
            onOpenStats={() => setIsStatsOpen(true)}
          />
        )}

        {/* 3. MYSTERY GENRE: THE CASE FILES */}
        {activeGenre === 'mystery' && (
          <MysteryHub
            currentIQ={stats.iq || 105}
            onActivity={() => handleGameActivity('mystery')}
            onLevelWin={handleLevelCelebration}
            onRequestAd={handleRequestAd}
            onOpenHowToPlay={handleOpenHowToPlay}
            onOpenStats={() => setIsStatsOpen(true)}
          />
        )}
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
