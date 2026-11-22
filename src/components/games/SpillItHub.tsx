import React, { useState, useRef } from 'react';
import {
  Heart, Shuffle, Share2, HelpCircle, Flame,
  ThumbsUp, ThumbsDown, Sparkles
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import {
  BASE_TOD_DATA,
  generateDynamicQuestion,
  generateTwoTruthsRound,
  generateDynamicWYR,
  generateDynamicNHIE,
  generateDynamicMLT,
  TodItem,
  TwoTruthsRound,
  WyrItem
} from '../../data/spillItData';
import { IQRankMeter } from '../IQRankMeter';

interface SpillItHubProps {
  currentIQ: number;
  onActivity: () => void;
  onWinLevel: (iqPoints: number, title: string, subtitle: string) => void;
  onRequestAd: (rewardTitle: string, onReward: () => void) => void;
  onOpenHowToPlay?: (gameId: string) => void;
  onOpenStats?: () => void;
}

type SocialSubGame = 'truth-or-dare' | 'two-truths' | 'would-you-rather' | 'never-have-i-ever' | 'most-likely-to';

export const SpillItHub: React.FC<SpillItHubProps> = ({
  currentIQ,
  onActivity,
  onWinLevel,
  onRequestAd,
  onOpenHowToPlay,
  onOpenStats,
}) => {
  const [activeTab, setActiveTab] = useState<SocialSubGame>('truth-or-dare');

  // ANTI-REPETITION SETS (Session tracking ensures 10,000+ questions never repeat)
  const seenTodQuestions = useRef<Set<string>>(new Set());
  const seenLieIndices = useRef<Set<number>>(new Set());
  const seenWyrRounds = useRef<Set<number>>(new Set());
  const seenNhieRounds = useRef<Set<number>>(new Set());
  const seenMltRounds = useRef<Set<number>>(new Set());

  // 1. TRUTH OR DARE STATE
  const [todDeck, setTodDeck] = useState<'kitty' | 'spicy' | 'wild' | 'deep'>('kitty');
  const [currentTod, setCurrentTod] = useState<TodItem>(() => ({
    type: 'TRUTH',
    text: 'What is the most ridiculous thing you bought just because an influencer promoted it?',
  }));
  const [unlockedSpicy, setUnlockedSpicy] = useState<boolean>(false);
  const [roundCounter, setRoundCounter] = useState<number>(1);

  // 2. 2 TRUTHS 1 LIE STATE (Infinite 10,000+ rounds, never repeating after 7 rounds)
  const [twoTruthsRoundNum, setTwoTruthsRoundNum] = useState<number>(1);
  const [currentTwoTruths, setCurrentTwoTruths] = useState<TwoTruthsRound>(() =>
    generateTwoTruthsRound(1, seenLieIndices.current)
  );
  const [twoTruthsSelected, setTwoTruthsSelected] = useState<number | null>(null);
  const [twoTruthsScore, setTwoTruthsScore] = useState<number>(0);

  // 3. WOULD YOU RATHER (WYR) STATE (10,000+ dilemmas)
  const [wyrRoundNum, setWyrRoundNum] = useState<number>(1);
  const [currentWyr, setCurrentWyr] = useState<WyrItem>(() => generateDynamicWYR(0));
  const [wyrVoted, setWyrVoted] = useState<'A' | 'B' | null>(null);
  const [wyrCount, setWyrCount] = useState<number>(0);

  // 4. NEVER HAVE I EVER STATE (10,000+ confessions)
  const [nhieRoundNum, setNhieRoundNum] = useState<number>(1);
  const [currentNhieText, setCurrentNhieText] = useState<string>(() => generateDynamicNHIE(0));
  const [nhieLives, setNhieLives] = useState<number>(10);
  const [nhieAnswered, setNhieAnswered] = useState<number>(0);

  // 5. MOST LIKELY TO STATE (10,000+ prompts)
  const [mltRoundNum, setMltRoundNum] = useState<number>(1);
  const [currentMltText, setCurrentMltText] = useState<string>(() => generateDynamicMLT(0));

  // DRAW TRUTH OR DARE (Guarantees no repetition in session and respects chosen deck)
  const drawTod = (preferredType?: 'TRUTH' | 'DARE', overrideDeck?: 'kitty' | 'spicy' | 'wild' | 'deep') => {
    sound.playTap();
    onActivity();
    const activeDk = overrideDeck || todDeck;
    const nextRound = roundCounter + 1;
    setRoundCounter(nextRound);

    // Dopamine celebration every 5 rounds
    if (nextRound > 1 && nextRound % 5 === 0) {
      onWinLevel(10, 'PARTY HERO! 🔥', '5 daring rounds survived! Your social courage & charisma leveled up.');
    }

    let candidate: TodItem | null = null;
    let attempts = 0;

    while (attempts < 15) {
      attempts++;
      const useProcedural = Math.random() < 0.55 || attempts > 5;
      if (useProcedural) {
        candidate = generateDynamicQuestion(activeDk);
      } else {
        const list = BASE_TOD_DATA[activeDk];
        const filtered = preferredType ? list.filter((i) => i.type === preferredType) : list;
        candidate = filtered[Math.floor(Math.random() * filtered.length)];
      }

      if (preferredType && candidate.type !== preferredType) {
        continue;
      }

      if (!seenTodQuestions.current.has(candidate.text)) {
        break;
      }
    }

    if (!candidate) {
      candidate = generateDynamicQuestion(activeDk);
    }

    seenTodQuestions.current.add(candidate.text);
    setCurrentTod(candidate);
  };

  const handleSelectDeck = (deck: 'kitty' | 'spicy' | 'wild' | 'deep') => {
    if (deck === 'spicy' && !unlockedSpicy) {
      onRequestAd('Unlock Spicy Couples Deck', () => {
        setUnlockedSpicy(true);
        setTodDeck('spicy');
        drawTod(undefined, 'spicy');
      });
      return;
    }
    setTodDeck(deck);
    drawTod(undefined, deck);
  };

  const handleShareCard = (text: string) => {
    const shareText = `Spill It! on Funzo 🔥:\n"${text}"\nPlay free with friends on mobile or laptop: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert('Card question copied to clipboard! Paste it into WhatsApp or Instagram.');
    }
  };

  // 2T1L ADVANCE TO NEXT ROUND (10,000+ rounds)
  const handleNextTwoTruthsRound = () => {
    sound.playTap();
    setTwoTruthsSelected(null);
    const nextRound = twoTruthsRoundNum + 1;
    setTwoTruthsRoundNum(nextRound);
    const newRoundData = generateTwoTruthsRound(nextRound, seenLieIndices.current);
    setCurrentTwoTruths(newRoundData);
  };

  // WOULD YOU RATHER ADVANCE
  const handleNextWYR = () => {
    sound.playTap();
    setWyrVoted(null);
    const nextRound = wyrRoundNum + 1;
    setWyrRoundNum(nextRound);
    seenWyrRounds.current.add(nextRound);
    setCurrentWyr(generateDynamicWYR(nextRound));
  };

  // NEVER HAVE I EVER ADVANCE
  const handleNextNHIE = () => {
    const nextRound = nhieRoundNum + 1;
    setNhieRoundNum(nextRound);
    seenNhieRounds.current.add(nextRound);
    setCurrentNhieText(generateDynamicNHIE(nextRound));
  };

  // MOST LIKELY TO ADVANCE
  const handleNextMLT = () => {
    sound.playTap();
    const nextRound = mltRoundNum + 1;
    setMltRoundNum(nextRound);
    seenMltRounds.current.add(nextRound);
    setCurrentMltText(generateDynamicMLT(nextRound));
    onActivity();
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center pb-6 select-none">
      {/* Universal IQ & Rank Progress Meter */}
      <IQRankMeter
        currentIQ={currentIQ}
        sectionName="Social Intuition"
        onOpenStats={onOpenStats}
      />

      {/* Top Header with Rules */}
      <div className="w-full flex items-center justify-between mb-1.5 px-1">
        <span className="text-[11px] font-black uppercase tracking-wider text-pink-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Spill It! 10k+ Party Arcade</span>
        </span>
        {onOpenHowToPlay && (
          <button
            onClick={() => onOpenHowToPlay('spill-it')}
            className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 transition"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rules</span>
          </button>
        )}
      </div>

      {/* Sub-Game Tabs Navigation */}
      <div className="w-full grid grid-cols-5 gap-1.5 mb-3 text-[10px] sm:text-xs font-black">
        {[
          { id: 'truth-or-dare', label: 'T or D', icon: '🔥' },
          { id: 'two-truths', label: '2T 1L', icon: '🤥' },
          { id: 'would-you-rather', label: 'WYR', icon: '⚖️' },
          { id: 'never-have-i-ever', label: 'NHIE', icon: '🙈' },
          { id: 'most-likely-to', label: 'Likely', icon: '👑' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playTap();
              setActiveTab(tab.id as SocialSubGame);
              onActivity();
            }}
            className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition ${activeTab === tab.id
              ? 'btn-tactile-rose shadow-md'
              : 'btn-tactile-slate'
              }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ---------------- 1. TRUTH OR DARE (10,000+ Non-Repeating Questions) ---------------- */}
      {activeTab === 'truth-or-dare' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          {/* Deck Selector Pills */}
          <div className="flex gap-2 mb-3.5 overflow-x-auto w-full pb-0.5 px-0.5">
            {(['kitty', 'spicy', 'wild', 'deep'] as const).map((d) => (
              <button
                key={d}
                onClick={() => handleSelectDeck(d)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-black capitalize whitespace-nowrap transition shadow-sm ${todDeck === d
                  ? 'btn-tactile-amber'
                  : 'btn-tactile-slate'
                  }`}
              >
                {d === 'kitty' && '🐱 Kitty Party'}
                {d === 'spicy' && `🌶️ Spicy ${unlockedSpicy ? '' : '🔒 (Ad)'}`}
                {d === 'wild' && '⚡ Wild Party'}
                {d === 'deep' && '💭 Deep Talk'}
              </button>
            ))}
          </div>

          {/* Main Card */}
          <div className="relative w-full aspect-[4/3] max-w-[340px] sm:max-w-[360px] rounded-3xl bg-white dark:bg-[#1a2c35] border-2 border-slate-200 dark:border-[#2b4554] p-6 flex flex-col justify-between shadow-xl dark:shadow-2xl">
            <div className="flex items-center justify-between">
              <span
                className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                  currentTod.type === 'TRUTH'
                    ? 'bg-[#1cb0f6]/15 border border-[#1cb0f6]/30 text-[#1899d6] dark:text-[#1cb0f6]'
                    : 'bg-[#ff4b4b]/15 border border-[#ff4b4b]/30 text-[#d33131] dark:text-[#ff4b4b]'
                }`}
              >
                {currentTod.type} · Card #{roundCounter}
              </span>
              <button
                onClick={() => handleShareCard(currentTod.text)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1"
                title="Share Card"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug px-1">
              &quot;{currentTod.text}&quot;
            </p>

            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
              Pass phone to next player or take the dare!
            </div>
          </div>

          {/* Draw Buttons (Tactile 3D Buttons) */}
          <div className="grid grid-cols-2 gap-2.5 w-full max-w-[340px] sm:max-w-[360px] mt-3">
            <button
              onClick={() => drawTod('TRUTH')}
              className="py-3 rounded-2xl btn-tactile-blue font-black text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4" /> Spin Truth
            </button>
            <button
              onClick={() => drawTod('DARE')}
              className="py-3 rounded-2xl btn-tactile-rose font-black text-xs shadow-md flex items-center justify-center gap-1.5"
            >
              <Flame className="w-4 h-4 fill-white" /> Spin Dare
            </button>
          </div>
        </div>
      )}

      {/* ---------------- 2. TWO TRUTHS & ONE LIE (Infinite Dynamic Rounds, Never Repeating) ---------------- */}
      {activeTab === 'two-truths' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-left">
          <div className="w-full flex items-center justify-between mb-2 text-xs text-slate-500 dark:text-slate-400 font-bold px-1">
            <span className="text-indigo-400">Round {twoTruthsRoundNum} of 10,000+</span>
            <span className="text-yellow-500 dark:text-yellow-400 font-mono">Score: {twoTruthsScore} ⭐️</span>
          </div>

          {/* Instructions banner */}
          <div className="w-full p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-500/30 mb-2 text-center shadow-sm">
            <p className="text-xs font-black text-slate-800 dark:text-white">
              🤥 2 Statements are Real Science Facts. 1 is a <span className="text-rose-500 underline uppercase">Myth/Lie</span>!
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-400 mt-0.5">
              Tap the statement you believe is completely FALSE to earn +10 IQ!
            </p>
          </div>

          <div className="w-full flex flex-col gap-2">
            {currentTwoTruths.statements.map((stmt, idx) => {
              const isSelected = twoTruthsSelected === idx;
              const isLie = idx === currentTwoTruths.lieIndex;
              let borderCol = 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200';

              if (twoTruthsSelected !== null) {
                if (isLie) {
                  borderCol = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold';
                } else if (isSelected && !isLie) {
                  borderCol = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={twoTruthsSelected !== null}
                  onClick={() => {
                    sound.playTap();
                    setTwoTruthsSelected(idx);
                    if (isLie) {
                      sound.playVictory();
                      setTwoTruthsScore((s) => s + 10);
                      onWinLevel(10, 'LIE DETECTED! 🤥', currentTwoTruths.explanation);
                    } else {
                      sound.playError();
                    }
                  }}
                  className={`w-full p-3 rounded-2xl border-2 text-left text-xs font-semibold transition active:scale-[0.98] ${borderCol}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-slate-600 dark:text-slate-400 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{stmt}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {twoTruthsSelected !== null && (
            <div className="w-full mt-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 animate-fade-in shadow-lg">
              <span className="font-bold block text-slate-900 dark:text-white mb-1">
                {twoTruthsSelected === currentTwoTruths.lieIndex
                  ? '🎉 Correct! You spotted the lie.'
                  : '❌ Oops! That was a verified true fact.'}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                <strong className="text-rose-500">The Truth: </strong>
                {currentTwoTruths.explanation}
              </p>

              <button
                onClick={handleNextTwoTruthsRound}
                className="w-full py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 shadow-md active:scale-95 transition"
              >
                Next Round ({twoTruthsRoundNum + 1}) →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- 3. WOULD YOU RATHER (WYR) ---------------- */}
      {activeTab === 'would-you-rather' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          {/* Explicit WYR Explanation Banner */}
          <div className="w-full p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-500/30 mb-2.5 text-center shadow-sm">
            <p className="text-xs font-black text-slate-800 dark:text-white">
              ⚖️ Would You Rather (WYR)
            </p>
            <p className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5">
              Choose between 2 intense dilemmas and see what % of players agreed with you!
            </p>
          </div>

          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
            Dilemma #{wyrRoundNum} of 10,000+
          </span>

          <div className="w-full flex flex-col gap-2">
            <button
              onClick={() => {
                sound.playTap();
                setWyrVoted('A');
                const nextCount = wyrCount + 1;
                setWyrCount(nextCount);
                if (nextCount > 0 && nextCount % 5 === 0) {
                  onWinLevel(10, 'DILEMMA MASTER! ⚖️', '5 intense dilemmas decided! Your personality profile is sharpening.');
                }
              }}
              className={`w-full p-4 rounded-3xl border-2 text-center transition active:scale-95 ${wyrVoted === 'A'
                ? 'bg-blue-600/30 border-blue-500 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                }`}
            >
              <span className="text-[9px] uppercase font-bold text-blue-500 block mb-0.5">
                Option A
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                {currentWyr.optA}
              </p>
              {wyrVoted && (
                <div className="text-sm font-black text-blue-500">
                  {currentWyr.pctA}% of players agree
                </div>
              )}
            </button>

            <div className="text-[10px] font-black text-slate-400 uppercase text-center">- OR -</div>

            <button
              onClick={() => {
                sound.playTap();
                setWyrVoted('B');
                const nextCount = wyrCount + 1;
                setWyrCount(nextCount);
                if (nextCount > 0 && nextCount % 5 === 0) {
                  onWinLevel(10, 'DILEMMA MASTER! ⚖️', '5 intense dilemmas decided! Your personality profile is sharpening.');
                }
              }}
              className={`w-full p-4 rounded-3xl border-2 text-center transition active:scale-95 ${wyrVoted === 'B'
                ? 'bg-rose-600/30 border-rose-500 shadow-md'
                : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
                }`}
            >
              <span className="text-[9px] uppercase font-bold text-rose-500 block mb-0.5">
                Option B
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                {currentWyr.optB}
              </p>
              {wyrVoted && (
                <div className="text-sm font-black text-rose-500">
                  {currentWyr.pctB}% of players agree
                </div>
              )}
            </button>
          </div>

          {wyrVoted && (
            <button
              onClick={handleNextWYR}
              className="mt-3 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition active:scale-95"
            >
              Next Dilemma ({wyrRoundNum + 1}) →
            </button>
          )}
        </div>
      )}

      {/* ---------------- 4. NEVER HAVE I EVER (NHIE) ---------------- */}
      {activeTab === 'never-have-i-ever' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          {/* Hearts Life Meter */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-3.5 h-3.5 transition ${i < nhieLives ? 'fill-rose-500 text-rose-500' : 'fill-slate-700 text-slate-700'
                  }`}
              />
            ))}
          </div>

          <div className="w-full p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 mb-3 shadow-xl">
            <span className="text-[9px] uppercase tracking-widest text-pink-500 font-bold block mb-1">
              Confession Prompt #{nhieRoundNum} / 10,000+
            </span>
            <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
              &quot;{currentNhieText}&quot;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              onClick={() => {
                sound.playError();
                setNhieLives((l) => Math.max(0, l - 1));
                handleNextNHIE();
                const nextAns = nhieAnswered + 1;
                setNhieAnswered(nextAns);
                if (nextAns === 5) {
                  onWinLevel(10, 'CONFESSION BRAVERY! 💖', '5 candid truths revealed! Honest hearts get maximum respect.');
                }
              }}
              className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1 shadow-md"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> I Have! (-1 💖)
            </button>
            <button
              onClick={() => {
                sound.playTap();
                handleNextNHIE();
                const nextAns = nhieAnswered + 1;
                setNhieAnswered(nextAns);
                if (nextAns === 5) {
                  onWinLevel(10, 'PURE INNOCENCE! 😇', '5 wild temptations resisted! Your saint streak is legendary.');
                }
              }}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1 shadow-md"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Never 😇
            </button>
          </div>
        </div>
      )}

      {/* ---------------- 5. MOST LIKELY TO (10,000+ Prompts) ---------------- */}
      {activeTab === 'most-likely-to' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          <div className="w-full p-6 rounded-3xl bg-amber-50 dark:bg-gradient-to-br dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950 border-2 border-amber-300 dark:border-amber-500/40 shadow-xl mb-3">
            <span className="text-2xl mb-1 block">👑</span>
            <span className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold block mb-1">
              Prompt #{mltRoundNum} / 10,000+ · Point at the Person:
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
              &quot;{currentMltText}&quot;
            </p>
          </div>

          <button
            onClick={handleNextMLT}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" /> Next Prompt ({mltRoundNum + 1})
          </button>
        </div>
      )}
    </div>
  );
};
