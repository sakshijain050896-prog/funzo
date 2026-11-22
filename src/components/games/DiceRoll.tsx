import React, { useState } from 'react';
import { Dices } from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface DiceRollProps {
  onWinBonus?: (coins: number) => void;
}

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export const DiceRoll: React.FC<DiceRollProps> = ({ onWinBonus }) => {
  const [dice1, setDice1] = useState<number>(3);
  const [dice2, setDice2] = useState<number>(4);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [betChoice, setBetChoice] = useState<'low' | 'seven' | 'high'>('high');
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [winStreak, setWinStreak] = useState<number>(0);
  const [totalCoinsWon, setTotalCoinsWon] = useState<number>(0);

  const rollDice = () => {
    if (isRolling) return;
    sound.playTap();
    setIsRolling(true);
    setResultMessage(null);

    let rollCount = 0;
    const interval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount > 8) {
        clearInterval(interval);
        const final1 = Math.floor(Math.random() * 6) + 1;
        const final2 = Math.floor(Math.random() * 6) + 1;
        setDice1(final1);
        setDice2(final2);
        setIsRolling(false);

        const sum = final1 + final2;
        let isWin = false;
        let coinsWon = 0;

        if (betChoice === 'low' && sum < 7) {
          isWin = true;
          coinsWon = 20;
        } else if (betChoice === 'high' && sum > 7) {
          isWin = true;
          coinsWon = 20;
        } else if (betChoice === 'seven' && sum === 7) {
          isWin = true;
          coinsWon = 50; // Lucky 7 pays big!
        }

        if (isWin) {
          sound.playVictory();
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
          setWinStreak((s) => s + 1);
          setTotalCoinsWon((c) => c + coinsWon);
          setResultMessage(`🎉 WIN! Sum was ${sum}! (+${coinsWon} Coins)`);
          if (onWinBonus) onWinBonus(coinsWon);
        } else {
          sound.playError();
          setWinStreak(0);
          setResultMessage(`Sum was ${sum}. Try your luck again!`);
        }
      }
    }, 80);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-4">
      {/* Top Stats */}
      <div className="w-full grid grid-cols-2 gap-2 mb-3 px-1">
        <div className="p-2.5 rounded-2xl bg-[#180d38] border border-[#2f1863] text-center">
          <span className="text-[10px] uppercase font-bold text-teal-400 block">Win Streak</span>
          <span className="text-base font-black text-white font-mono">{winStreak} 🔥</span>
        </div>
        <div className="p-2.5 rounded-2xl bg-[#1c1e2f] border border-white/10 text-center">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Coins Won</span>
          <span className="text-base font-black text-amber-400 font-mono">+{totalCoinsWon} 🪙</span>
        </div>
      </div>

      {/* 3D Dice Stage */}
      <div className="relative w-full aspect-[4/3] max-w-[320px] p-6 rounded-3xl bg-[#1c1e2f] border-2 border-white/10 shadow-2xl flex flex-col items-center justify-center mb-3.5">
        <div className="flex items-center gap-6 mb-3">
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-white to-slate-200 shadow-2xl flex items-center justify-center text-6xl text-slate-900 border-b-4 border-slate-300 transition-transform ${isRolling ? 'animate-spin' : 'hover:scale-105'}`}>
            {DICE_FACES[dice1 - 1]}
          </div>
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr from-white to-slate-200 shadow-2xl flex items-center justify-center text-6xl text-slate-900 border-b-4 border-slate-300 transition-transform ${isRolling ? 'animate-spin' : 'hover:scale-105'}`}>
            {DICE_FACES[dice2 - 1]}
          </div>
        </div>

        <div className="text-sm font-black text-teal-300">
          Sum Total: <span className="font-mono text-xl text-white font-extrabold">{dice1 + dice2}</span>
        </div>

        {resultMessage && (
          <div className="mt-2 text-xs font-bold text-center px-2 py-1 rounded-xl bg-teal-900/40 text-teal-200 animate-fade-in border border-teal-500/30">
            {resultMessage}
          </div>
        )}
      </div>

      {/* Betting Options */}
      <div className="w-full mb-3">
        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5 px-1">
          Select Your Prediction:
        </span>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => { sound.playTap(); setBetChoice('low'); }}
            className={`py-2 rounded-2xl font-black text-xs transition active:scale-95 ${
              betChoice === 'low'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                : 'bg-[#1c1e2f] border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            Under 7 (2-6)
          </button>
          <button
            onClick={() => { sound.playTap(); setBetChoice('seven'); }}
            className={`py-2 rounded-2xl font-black text-xs transition active:scale-95 ${
              betChoice === 'seven'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-md'
                : 'bg-[#1c1e2f] border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            Lucky 7 (x3)
          </button>
          <button
            onClick={() => { sound.playTap(); setBetChoice('high'); }}
            className={`py-2 rounded-2xl font-black text-xs transition active:scale-95 ${
              betChoice === 'high'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 shadow-md'
                : 'bg-[#1c1e2f] border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            Over 7 (8-12)
          </button>
        </div>
      </div>

      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-400 to-cyan-500 text-slate-950 font-black text-sm shadow-xl active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Dices className="w-5 h-5 stroke-[2.5]" />
        <span>{isRolling ? 'Rolling Dice...' : 'Roll Dice Now! 🎲'}</span>
      </button>
    </div>
  );
};
