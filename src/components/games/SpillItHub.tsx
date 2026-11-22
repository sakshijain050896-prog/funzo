import React, { useState } from 'react';
import { 
  Heart, Shuffle, Share2, HelpCircle, Flame, 
  ThumbsUp, ThumbsDown
} from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import { 
  BASE_TOD_DATA, 
  generateDynamicQuestion, 
  EXPANDED_TWO_TRUTHS, 
  EXPANDED_WYR, 
  EXPANDED_NHIE, 
  EXPANDED_MLT,
  TodItem 
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

  // TRUTH OR DARE STATE
  const [todDeck, setTodDeck] = useState<'kitty' | 'spicy' | 'wild' | 'deep'>('kitty');
  const [currentTod, setCurrentTod] = useState<TodItem>({
    type: 'TRUTH',
    text: 'What is the most ridiculous thing you bought just because an influencer promoted it?',
  });
  const [unlockedSpicy, setUnlockedSpicy] = useState<boolean>(false);
  const [roundCounter, setRoundCounter] = useState<number>(1);

  // 2 TRUTHS 1 LIE STATE
  const [twoTruthsIndex, setTwoTruthsIndex] = useState<number>(0);
  const [twoTruthsSelected, setTwoTruthsSelected] = useState<number | null>(null);
  const [twoTruthsScore, setTwoTruthsScore] = useState<number>(0);

  // WOULD YOU RATHER STATE
  const [wyrIndex, setWyrIndex] = useState<number>(0);
  const [wyrVoted, setWyrVoted] = useState<'A' | 'B' | null>(null);
  const [wyrCount, setWyrCount] = useState<number>(0);

  // NEVER HAVE I EVER STATE
  const [nhieIndex, setNhieIndex] = useState<number>(0);
  const [nhieLives, setNhieLives] = useState<number>(10);
  const [nhieAnswered, setNhieAnswered] = useState<number>(0);

  // MOST LIKELY TO STATE
  const [mltIndex, setMltIndex] = useState<number>(0);

  // DRAW TRUTH OR DARE (Alternates between curated base list and procedural generator)
  const drawTod = (preferredType?: 'TRUTH' | 'DARE') => {
    sound.playTap();
    onActivity();
    const nextRound = roundCounter + 1;
    setRoundCounter(nextRound);

    // Dopamine celebration every 5 rounds
    if (nextRound > 1 && nextRound % 5 === 0) {
      onWinLevel(10, 'PARTY HERO! 🔥', '5 daring rounds survived! Your social courage & charisma leveled up.');
    }

    const useProcedural = Math.random() < 0.45; // 45% chance to generate infinite fresh scenarios!
    if (useProcedural) {
      const dynamic = generateDynamicQuestion(todDeck);
      setCurrentTod(dynamic);
      return;
    }

    const list = BASE_TOD_DATA[todDeck];
    const filtered = preferredType ? list.filter((i) => i.type === preferredType) : list;
    const item = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentTod(item);
  };

  const handleSelectDeck = (deck: 'kitty' | 'spicy' | 'wild' | 'deep') => {
    if (deck === 'spicy' && !unlockedSpicy) {
      onRequestAd('Unlock Spicy Couples Deck', () => {
        setUnlockedSpicy(true);
        setTodDeck('spicy');
      });
      return;
    }
    setTodDeck(deck);
    sound.playTap();
  };

  const handleShareCard = (text: string) => {
    const shareText = `Spill It! on Funzo 🔥:\n"${text}"\nPlay free with friends on mobile or laptop: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert('Card question copied to clipboard! Paste it into WhatsApp or Instagram.');
    }
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
        <span className="text-[11px] font-black uppercase tracking-wider text-pink-500">
          Party Arcade
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
      <div className="w-full grid grid-cols-5 gap-1 p-0.5 bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl mb-3 text-[11px] font-bold">
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
            className={`py-1.5 px-0.5 rounded-lg flex flex-col items-center justify-center transition active:scale-95 ${
              activeTab === tab.id
                ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-md font-black'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="text-xs">{tab.icon}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ---------------- 1. TRUTH OR DARE ---------------- */}
      {activeTab === 'truth-or-dare' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          {/* Deck Selector Pills */}
          <div className="flex gap-1 mb-2.5 overflow-x-auto w-full pb-0.5 px-0.5">
            {(['kitty', 'spicy', 'wild', 'deep'] as const).map((d) => (
              <button
                key={d}
                onClick={() => handleSelectDeck(d)}
                className={`px-2.5 py-1 rounded-xl text-xs font-bold capitalize whitespace-nowrap transition ${
                  todDeck === d
                    ? 'bg-rose-500 text-white shadow-md'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
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
          <div className="relative w-full aspect-[4/3] max-w-[340px] rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-rose-500/40 p-5 flex flex-col justify-between shadow-2xl">
            <div className="flex items-center justify-between">
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  currentTod.type === 'TRUTH'
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {currentTod.type} #{roundCounter}
              </span>
              <button
                onClick={() => handleShareCard(currentTod.text)}
                className="text-slate-400 hover:text-white p-1"
                title="Share Card"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-sm sm:text-base font-bold text-white leading-snug px-1">
              &quot;{currentTod.text}&quot;
            </p>

            <div className="text-[10px] text-slate-500">
              Pass phone to next player or take the dare!
            </div>
          </div>

          {/* Draw Buttons */}
          <div className="grid grid-cols-2 gap-2 w-full max-w-[340px] mt-2.5">
            <button
              onClick={() => drawTod('TRUTH')}
              className="py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Spin Truth
            </button>
            <button
              onClick={() => drawTod('DARE')}
              className="py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5" /> Spin Dare
            </button>
          </div>
        </div>
      )}

      {/* ---------------- 2. TWO TRUTHS & ONE LIE ---------------- */}
      {activeTab === 'two-truths' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-left">
          <div className="w-full flex items-center justify-between mb-2 text-xs text-slate-500 dark:text-slate-400 font-bold">
            <span>Round {twoTruthsIndex + 1} of {EXPANDED_TWO_TRUTHS.length}</span>
            <span className="text-yellow-500 dark:text-yellow-400">Score: {twoTruthsScore} ⭐️</span>
          </div>

          <h3 className="text-xs font-black text-slate-800 dark:text-white mb-2 text-center w-full">
            Tap the statement that is a <span className="text-rose-500 underline">LIE</span>!
          </h3>

          <div className="w-full flex flex-col gap-2">
            {EXPANDED_TWO_TRUTHS[twoTruthsIndex].statements.map((stmt, idx) => {
              const isSelected = twoTruthsSelected === idx;
              const isLie = idx === EXPANDED_TWO_TRUTHS[twoTruthsIndex].lieIndex;
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
                      onWinLevel(10, 'LIE DETECTED! 🤥', EXPANDED_TWO_TRUTHS[twoTruthsIndex].explanation);
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
            <div className="w-full mt-3 p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 animate-fade-in">
              <span className="font-bold block text-slate-900 dark:text-white mb-0.5">
                {twoTruthsSelected === EXPANDED_TWO_TRUTHS[twoTruthsIndex].lieIndex
                  ? '🎉 Correct! That is the lie.'
                  : '❌ Oops! You fell for the truth.'}
              </span>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed mb-2.5">
                {EXPANDED_TWO_TRUTHS[twoTruthsIndex].explanation}
              </p>

              <button
                onClick={() => {
                  sound.playTap();
                  setTwoTruthsSelected(null);
                  setTwoTruthsIndex((prev) => (prev + 1) % EXPANDED_TWO_TRUTHS.length);
                }}
                className="w-full py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500"
              >
                Next Round →
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- 3. WOULD YOU RATHER ---------------- */}
      {activeTab === 'would-you-rather' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-2">
            Dilemma #{wyrIndex + 1} of {EXPANDED_WYR.length}
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
              className={`w-full p-4 rounded-3xl border-2 text-center transition active:scale-95 ${
                wyrVoted === 'A'
                  ? 'bg-blue-600/30 border-blue-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-blue-500 block mb-0.5">
                Option A
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                {EXPANDED_WYR[wyrIndex].optA}
              </p>
              {wyrVoted && (
                <div className="text-sm font-black text-blue-500">
                  {EXPANDED_WYR[wyrIndex].pctA}% of players
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
              className={`w-full p-4 rounded-3xl border-2 text-center transition active:scale-95 ${
                wyrVoted === 'B'
                  ? 'bg-rose-600/30 border-rose-500 shadow-md'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-800'
              }`}
            >
              <span className="text-[9px] uppercase font-bold text-rose-500 block mb-0.5">
                Option B
              </span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mb-1">
                {EXPANDED_WYR[wyrIndex].optB}
              </p>
              {wyrVoted && (
                <div className="text-sm font-black text-rose-500">
                  {EXPANDED_WYR[wyrIndex].pctB}% of players
                </div>
              )}
            </button>
          </div>

          {wyrVoted && (
            <button
              onClick={() => {
                sound.playTap();
                setWyrVoted(null);
                setWyrIndex((i) => (i + 1) % EXPANDED_WYR.length);
              }}
              className="mt-3 px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs"
            >
              Next Dilemma →
            </button>
          )}
        </div>
      )}

      {/* ---------------- 4. NEVER HAVE I EVER ---------------- */}
      {activeTab === 'never-have-i-ever' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-3.5 h-3.5 transition ${
                  i < nhieLives ? 'fill-rose-500 text-rose-500' : 'fill-slate-700 text-slate-700'
                }`}
              />
            ))}
          </div>

          <div className="w-full p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 mb-3 shadow-xl">
            <span className="text-[9px] uppercase tracking-widest text-pink-500 font-bold block mb-1">
              Confession Prompt #{nhieIndex + 1}
            </span>
            <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-relaxed">
              &quot;{EXPANDED_NHIE[nhieIndex]}&quot;
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            <button
              onClick={() => {
                sound.playError();
                setNhieLives((l) => Math.max(0, l - 1));
                setNhieIndex((i) => (i + 1) % EXPANDED_NHIE.length);
                const nextAns = nhieAnswered + 1;
                setNhieAnswered(nextAns);
                if (nextAns === 5) {
                  onWinLevel(10, 'CONFESSION BRAVERY! 💖', '5 candid truths revealed! Honest hearts get maximum respect.');
                }
              }}
              className="py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1"
            >
              <ThumbsDown className="w-3.5 h-3.5" /> I Have! (-1 💖)
            </button>
            <button
              onClick={() => {
                sound.playTap();
                setNhieIndex((i) => (i + 1) % EXPANDED_NHIE.length);
                const nextAns = nhieAnswered + 1;
                setNhieAnswered(nextAns);
                if (nextAns === 5) {
                  onWinLevel(10, 'PURE INNOCENCE! 😇', '5 wild temptations resisted! Your saint streak is legendary.');
                }
              }}
              className="py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs active:scale-95 transition flex items-center justify-center gap-1"
            >
              <ThumbsUp className="w-3.5 h-3.5" /> Never 😇
            </button>
          </div>
        </div>
      )}

      {/* ---------------- 5. MOST LIKELY TO ---------------- */}
      {activeTab === 'most-likely-to' && (
        <div className="w-full flex flex-col items-center animate-fade-in text-center">
          <div className="w-full p-6 rounded-3xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border-2 border-amber-500/40 shadow-xl mb-3">
            <span className="text-2xl mb-1 block">👑</span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-1">
              Point at the Person Who Is:
            </span>
            <p className="text-base sm:text-lg font-black text-white leading-snug">
              &quot;{EXPANDED_MLT[mltIndex]}&quot;
            </p>
          </div>

          <button
            onClick={() => {
              sound.playTap();
              setMltIndex((i) => (i + 1) % EXPANDED_MLT.length);
              onActivity();
            }}
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Shuffle className="w-3.5 h-3.5" /> Next Prompt
          </button>
        </div>
      )}
    </div>
  );
};
