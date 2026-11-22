import React, { useState } from 'react';
import { 
  Search, ShieldAlert, KeyRound, HelpCircle, Lock
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import { CRIME_CASES, DETECTIVE_RIDDLES } from '../../data/mysteryData';
import { IQRankMeter } from '../IQRankMeter';

interface MysteryHubProps {
  currentIQ: number;
  onActivity: () => void;
  onLevelWin: (iqPoints: number, title: string, subtitle: string) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
  onOpenHowToPlay: (gameId: string) => void;
  onOpenStats?: () => void;
}

type MysterySubGame = 'crime-scene' | 'safe-code' | 'daily-riddles';

export const MysteryHub: React.FC<MysteryHubProps> = ({ 
  currentIQ,
  onActivity, 
  onLevelWin,
  onRequestAd,
  onOpenHowToPlay,
  onOpenStats,
}) => {
  const [activeTab, setActiveTab] = useState<MysterySubGame>('crime-scene');

  // ---------------- 1. CRIME SCENE CASES STATE ----------------
  const [currentCaseIndex, setCurrentCaseIndex] = useState<number>(0);
  const activeCase = CRIME_CASES[currentCaseIndex] || CRIME_CASES[0];
  const [discoveredClues, setDiscoveredClues] = useState<Set<string>>(new Set());
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [accusedSuspect, setAccusedSuspect] = useState<string | null>(null);
  const [caseSolved, setCaseSolved] = useState<boolean>(false);

  // ---------------- 2. SAFE CODEBREAKER STATE ----------------
  const [secretCode, setSecretCode] = useState<string>(() => generateRandomCode());
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<{ guess: string; exact: number; misplaced: number }[]>([]);
  const [safeUnlocked, setSafeUnlocked] = useState<boolean>(false);

  function generateRandomCode(): string {
    const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    digits.sort(() => Math.random() - 0.5);
    return digits.slice(0, 4).join('');
  }

  const handleGuessCode = () => {
    if (currentGuess.length !== 4) return;
    sound.playTap();
    onActivity();

    let exact = 0;
    let misplaced = 0;
    const secretArr = secretCode.split('');
    const guessArr = currentGuess.split('');

    for (let i = 0; i < 4; i++) {
      if (guessArr[i] === secretArr[i]) {
        exact++;
        secretArr[i] = '#';
        guessArr[i] = '*';
      }
    }

    for (let i = 0; i < 4; i++) {
      if (guessArr[i] !== '*') {
        const foundIdx = secretArr.indexOf(guessArr[i]);
        if (foundIdx !== -1) {
          misplaced++;
          secretArr[foundIdx] = '#';
        }
      }
    }

    const newAttempts = [...attempts, { guess: currentGuess, exact, misplaced }];
    setAttempts(newAttempts);
    setCurrentGuess('');

    if (exact === 4) {
      sound.playVictory();
      setSafeUnlocked(true);
      onLevelWin(20, 'VAULT CRACKED! 🔐', 'Your logical deduction cracked the 4-digit security safe!');
    } else {
      sound.playError();
    }
  };

  const restartSafe = () => {
    sound.playTap();
    setSecretCode(generateRandomCode());
    setCurrentGuess('');
    setAttempts([]);
    setSafeUnlocked(false);
  };

  // ---------------- 3. 5-MINUTE DETECTIVE RIDDLES STATE ----------------
  const [riddleIndex, setRiddleIndex] = useState<number>(0);
  const activeRiddle = DETECTIVE_RIDDLES[riddleIndex] || DETECTIVE_RIDDLES[0];
  const [revealedCluesCount, setRevealedCluesCount] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Switch Crime Case
  const handleSelectCase = (idx: number) => {
    sound.playTap();
    setCurrentCaseIndex(idx);
    setDiscoveredClues(new Set());
    setSelectedHotspot(null);
    setAccusedSuspect(null);
    setCaseSolved(false);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center pb-6 select-none">
      {/* Universal IQ & Rank Progress Meter */}
      <IQRankMeter
        currentIQ={currentIQ}
        sectionName="Mystery & Forensics"
        onOpenStats={onOpenStats}
      />

      {/* Sub-Game Switcher Tabs */}
      <div className="w-full flex items-center justify-between mb-1.5 px-1">
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-500">
          Case Files &amp; Riddles
        </span>
        {onOpenHowToPlay && (
          <button
            onClick={() => onOpenHowToPlay('mystery')}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rules</span>
          </button>
        )}
      </div>

      <div className="w-full grid grid-cols-3 gap-1 p-0.5 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl mb-3 text-xs font-bold">
        {[
          { id: 'crime-scene', label: `Cases (${CRIME_CASES.length})`, icon: '🔍' },
          { id: 'safe-code', label: 'Vault Safe', icon: '🔐' },
          { id: 'daily-riddles', label: `Riddles (${DETECTIVE_RIDDLES.length})`, icon: '📜' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setActiveTab(tab.id as MysterySubGame);
              onActivity();
            }}
            className={`py-1.5 px-1 rounded-lg flex items-center justify-center gap-1 transition active:scale-95 ${
              activeTab === tab.id
                ? 'bg-amber-600 text-white shadow-sm font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ---------------- 1. CRIME SCENE INVESTIGATION ---------------- */}
      {activeTab === 'crime-scene' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-left">
          {/* Case Selector Pills */}
          <div className="flex gap-1.5 mb-2.5 overflow-x-auto w-full pb-1">
            {CRIME_CASES.map((c, idx) => (
              <button
                key={c.caseId}
                onClick={() => handleSelectCase(idx)}
                className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  currentCaseIndex === idx
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700'
                }`}
              >
                Case #{101 + idx}
              </button>
            ))}
          </div>

          {/* Active Case Narrative Card */}
          <div className="w-full p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 mb-3 shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5" /> {activeCase.title}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Clues: {discoveredClues.size}/{activeCase.hotspots.length}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
              {activeCase.story}
            </p>

            {/* Hotspots Grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {activeCase.hotspots.map((h) => {
                const isFound = discoveredClues.has(h.id);
                return (
                  <button
                    key={h.id}
                    onClick={() => {
                      sound.playTap();
                      setSelectedHotspot(h.id);
                      setDiscoveredClues((prev) => new Set(prev).add(h.id));
                      onActivity();
                    }}
                    className={`p-2 rounded-xl border text-left transition active:scale-95 ${
                      isFound
                        ? 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-white leading-tight">{h.name}</div>
                    <div className="text-[9px] text-slate-400">{h.location}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clue Inspector Dialog */}
          {selectedHotspot && (
            <div className="w-full p-3 rounded-xl bg-slate-900 border border-indigo-500/40 mb-3 text-xs animate-fade-in">
              {(() => {
                const item = activeCase.hotspots.find((h) => h.id === selectedHotspot);
                return (
                  <div>
                    <span className="font-bold text-indigo-400 block mb-0.5 flex items-center gap-1">
                      <Search className="w-3.5 h-3.5" /> Clue Evidence: {item?.name}
                    </span>
                    <p className="text-slate-200 leading-relaxed text-[11px]">{item?.clue}</p>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Suspects Lineup & Accusation */}
          <div className="w-full">
            <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
              Interrogate &amp; Arrest Suspect
            </h4>

            <div className="flex flex-col gap-1.5">
              {activeCase.suspects.map((sus) => (
                <div
                  key={sus.id}
                  className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                >
                  <div className="mb-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{sus.name}</span>
                      <span className="text-[10px] text-slate-400">{sus.role}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 mt-0.5">
                      <strong>Wearing/Appearance:</strong> {sus.wearing}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      <strong>Alibi:</strong> {sus.alibi}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sound.playTap();
                      setAccusedSuspect(sus.id);
                      if (sus.isKiller) {
                        setCaseSolved(true);
                        onLevelWin(activeCase.rewardIQ, 'CASE SOLVED! 🔍', activeCase.solutionExplanation);
                      } else {
                        sound.playError();
                        setCaseSolved(false);
                      }
                    }}
                    className="w-full py-1.5 rounded-xl bg-slate-800 hover:bg-rose-600 hover:text-white text-rose-400 font-bold text-xs border border-rose-500/20 transition active:scale-95"
                  >
                    Arrest {sus.name}
                  </button>
                </div>
              ))}
            </div>

            {/* Wrong Arrest Message */}
            {accusedSuspect && !caseSolved && (
              <div className="mt-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-500 text-xs text-rose-200 animate-fade-in">
                <strong>❌ Wrongful Arrest!</strong> That suspect had an airtight alibi or their physical clues did not match. Re-inspect the hotspots!
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------------- 2. SAFE CODEBREAKER ---------------- */}
      {activeTab === 'safe-code' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          <div className="w-full p-4 rounded-3xl bg-slate-900 border-2 border-slate-800 mb-3 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 flex items-center justify-center mx-auto mb-1.5">
              {safeUnlocked ? <KeyRound className="w-5 h-5 text-emerald-400" /> : <Lock className="w-5 h-5" />}
            </div>
            <h3 className="text-sm font-black text-white">Crack the 4-Digit Vault Safe</h3>
            <p className="text-[11px] text-slate-400">
              🟢 = Correct digit &amp; spot, 🟡 = Right digit in wrong spot.
            </p>
          </div>

          {/* Past Attempts */}
          <div className="w-full flex flex-col gap-1 mb-3 max-h-32 overflow-y-auto">
            {attempts.map((att, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono"
              >
                <span className="font-bold text-white text-sm tracking-widest">{att.guess}</span>
                <div className="flex gap-2 text-[11px]">
                  <span className="text-emerald-400 font-bold">🟢 {att.exact} Exact</span>
                  <span className="text-yellow-400 font-bold">🟡 {att.misplaced} Place</span>
                </div>
              </div>
            ))}
          </div>

          {!safeUnlocked ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full flex items-center justify-between gap-1.5 mb-2.5">
                <input
                  type="text"
                  maxLength={4}
                  value={currentGuess}
                  readOnly
                  placeholder="----"
                  className="w-full py-2.5 text-center text-xl font-mono font-black tracking-widest bg-slate-950 border-2 border-indigo-500/60 rounded-xl text-white"
                />
                <button
                  onClick={handleGuessCode}
                  disabled={currentGuess.length !== 4}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 disabled:opacity-40 text-white font-bold text-xs shadow-md"
                >
                  Test Code
                </button>
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-5 gap-1.5 w-full">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      if (currentGuess.length < 4) {
                        sound.playTap();
                        setCurrentGuess((g) => g + num.toString());
                      }
                    }}
                    className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition active:scale-90"
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="flex justify-between w-full mt-2 text-xs">
                <button
                  onClick={() => setCurrentGuess('')}
                  className="text-slate-400 hover:text-white"
                >
                  Clear Digits
                </button>

                <button
                  onClick={() => {
                    onRequestAd('Reveal 1 Vault Digit', () => {
                      alert(`Forensic safe hint: The 1st digit is ${secretCode[0]}`);
                    });
                  }}
                  className="text-amber-400 font-bold flex items-center gap-1"
                >
                  💡 Need Hint? Watch Ad
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-center w-full">
              <span className="text-base font-black text-emerald-400 block mb-1">
                Vault Unlocked! 💎
              </span>
              <p className="text-xs text-slate-300 mb-3">
                You cracked the safe! +20 IQ Points Awarded.
              </p>
              <button
                onClick={restartSafe}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Crack Another Safe
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- 3. DETECTIVE RIDDLES ---------------- */}
      {activeTab === 'daily-riddles' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-left">
          <div className="w-full p-4 rounded-3xl bg-slate-900 border-2 border-slate-800 mb-3 shadow-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest">
                Case Riddle #{riddleIndex + 1} of {DETECTIVE_RIDDLES.length}
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">
                +{activeRiddle.rewardIQ} IQ
              </span>
            </div>
            <h3 className="text-sm font-black text-white mb-1.5">
              {activeRiddle.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeRiddle.story}
            </p>
          </div>

          {/* Clues */}
          <div className="w-full flex flex-col gap-1.5 mb-3">
            {revealedCluesCount >= 1 && (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fade-in">
                <strong className="text-indigo-400 block mb-0.5">Forensic Clue #1:</strong>
                {activeRiddle.clue1}
              </div>
            )}
            {revealedCluesCount >= 2 && (
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 animate-fade-in">
                <strong className="text-indigo-400 block mb-0.5">Forensic Clue #2:</strong>
                {activeRiddle.clue2}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="w-full flex flex-col gap-2">
            {revealedCluesCount < 2 && (
              <button
                onClick={() => {
                  sound.playTap();
                  setRevealedCluesCount((c) => c + 1);
                }}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Unlock Clue #{revealedCluesCount + 1}
              </button>
            )}

            {!showSolution ? (
              <button
                onClick={() => {
                  sound.playTap();
                  setShowSolution(true);
                  onLevelWin(activeRiddle.rewardIQ, 'RIDDLE SOLVED! 🧠', activeRiddle.solution);
                }}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md"
              >
                Solve Riddle &amp; Reveal Solution
              </button>
            ) : (
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500 text-xs text-emerald-200 animate-fade-in">
                <strong className="block text-xs font-bold text-white mb-0.5">
                  Detective&apos;s Solution:
                </strong>
                <p className="leading-relaxed mb-2.5 text-[11px]">{activeRiddle.solution}</p>
                <button
                  onClick={() => {
                    sound.playTap();
                    setShowSolution(false);
                    setRevealedCluesCount(0);
                    setRiddleIndex((i) => (i + 1) % DETECTIVE_RIDDLES.length);
                  }}
                  className="w-full py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                >
                  Next Riddle Case →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
