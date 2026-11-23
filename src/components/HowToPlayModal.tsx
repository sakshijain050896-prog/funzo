import React, { useState } from 'react';
import { X, BookOpen, Smartphone, Laptop, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../lib/soundEffects';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGameId?: string;
}

interface GameInstruction {
  id: string;
  title: string;
  genre: string;
  icon: string;
  tagline: string;
  objective: string;
  mobileControls: string;
  desktopControls: string;
  rules: string[];
  proTips: string[];
}

const INSTRUCTIONS_DATA: GameInstruction[] = [
  {
    id: 'sudoku',
    title: 'Maths Puzzle',
    genre: 'Brain Math',
    icon: '🧮',
    tagline: 'Rapid mental arithmetic and equation solver',
    objective: 'Solve arithmetic equations, find missing operators, and race against the clock to score points and level up.',
    mobileControls: 'Tap any of the 4 big option buttons below the equation to choose your answer.',
    desktopControls: 'Click any answer button or use keyboard numbers 1–4 to pick your solution.',
    rules: [
      'Choose the correct answer before time runs out in Speed Run mode.',
      'Correct answers build up your multiplier streak for bonus points!',
      'Wrong answers reset your streak counter.',
      'Switch between Speed Run, Missing Operator, and Progressive Levels anytime.',
    ],
    proTips: [
      'In Missing Operator mode, calculate the result first to quickly spot whether +, -, ×, or ÷ fits.',
      'Maintain your streak to multiply bonus coins earned at the end of the round.',
      'Tap "Need a hint?" if you get stuck on a tricky calculation.',
    ],
  },
  {
    id: '2048',
    title: '2048 Rush',
    genre: 'Brain Grid',
    icon: '⚡',
    tagline: 'Addictive number-sliding arcade',
    objective: 'Slide numbered tiles across the 4x4 board to combine matching numbers and create the legendary 2048 tile!',
    mobileControls: 'Swipe your finger (Up, Down, Left, Right) anywhere across the game board, or use the on-screen direction arrows.',
    desktopControls: 'Use your keyboard Arrow Keys (↑ ↓ ← →) to slide all tiles in that direction.',
    rules: [
      'Every time you slide, all tiles glide as far as they can in that direction.',
      'When two tiles with the same number collide (e.g. 2 and 2), they merge into their sum (4).',
      '4 merges with 4 into 8, 8 into 16, 16 into 32... up to 2048 and beyond!',
      'After every move, a new 2 or 4 randomly appears in an empty cell.',
      'Game is over when the board is full and no adjacent tiles can merge.',
    ],
    proTips: [
      'Keep your largest number locked in one of the 4 corners (e.g. bottom-right) and never move it away!',
      'Build a snake-like descending chain (e.g. 512, 256, 128, 64) along the bottom row.',
      'Use the "Undo Move" button if an accidental swipe ruins your setup.',
    ],
  },
  {
    id: 'arrows',
    title: 'Arrow Escape',
    genre: 'Brain Grid',
    icon: '🏹',
    tagline: 'Directional block trajectory & escape puzzle',
    objective: 'Launch and clear all directional arrow blocks off the screen in the correct strategic sequence.',
    mobileControls: 'Tap any arrow block to launch it in its pointing direction.',
    desktopControls: 'Click any arrow block with your mouse.',
    rules: [
      'Each block points in one of 4 directions: Up ⬆️, Down ⬇️, Left ⬅️, or Right ➡️.',
      'A block can ONLY escape if its trajectory is completely open with no other blocks in its path.',
      'If another block is blocking its path, it will wobble/shake red and cannot fly away.',
      'Clear the outermost unblocked arrows first to open up paths for the trapped blocks inside!',
      'Puzzle is solved when all arrow blocks have successfully escaped the labyrinth.',
    ],
    proTips: [
      'Look along the outer edges of the board for arrows pointing outwards away from the cluster—they are always free to fly!',
      'Tap the "Hint" button if you get stuck to highlight an unblocked arrow with a glowing pulse.',
    ],
  },
  {
    id: 'spill-it',
    title: 'Spill It! (Social & Party)',
    genre: 'Social',
    icon: '💬',
    tagline: 'Icebreaker & kitty party games',
    objective: 'Unwind and have hilarious, dramatic, or revealing conversations with friends, family, or romantic partners.',
    mobileControls: 'Swipe cards, tap "Spin Truth" or "Spin Dare", and tap "Share" to send juicy cards straight to WhatsApp group chats.',
    desktopControls: 'Click draw buttons or category tabs. Read cards aloud to everyone in the room.',
    rules: [
      'Truth or Dare: Player must answer honestly or perform the dare. If they refuse, the group decides a harmless forfeit.',
      '2 Truths 1 Lie: Guess which statement is false to earn star points.',
      'Would You Rather: Cast your vote on dilemmas and see live community % results.',
      'Never Have I Ever: Everyone starts with 10 hearts. If you have done the prompt, tap "I Have Done This" and lose 1 heart. Last person with hearts wins!',
      'Most Likely To: Count to 3 and everyone points simultaneously at the person who fits the prompt best.',
    ],
    proTips: [
      'Use the Kitty & Friends deck for family gatherings and office game nights.',
      'Unlock the Spicy Couples deck via a quick video ad for romantic date nights or late-night party mode.',
    ],
  },
  {
    id: 'mystery',
    title: 'The Case Files',
    genre: 'Mystery',
    icon: '🔍',
    tagline: 'Interactive detective crime solving',
    objective: 'Examine crime scene hotspots, crack the victim’s safe, interrogate suspects, and arrest the real killer.',
    mobileControls: 'Tap hotspots on the crime illustration to reveal forensic evidence. Use the on-screen keypad to test 4-digit safe codes.',
    desktopControls: 'Click evidence spots and suspect profiles. Enter safe codes with mouse clicks.',
    rules: [
      'Crime Scene: Read each discovered clue carefully (e.g. shoe size, broken clock time, poison type). Match it to suspect alibis and attire.',
      'Vault Safe: 4-digit deduction. 🟢 Green means the digit is correct and in the right spot; 🟡 Yellow means the digit is in the code but in the wrong spot.',
      'Case Riddles: Read the story, think logically, unlock Clue 1 & 2 before viewing the detective’s breakdown.',
    ],
    proTips: [
      'In murder mysteries, check who has NO verified alibi at the exact time the victim died.',
      'In the safe vault, use unique digits on your first attempt (e.g. 1234) to quickly eliminate numbers.',
    ],
  },
];

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({
  isOpen,
  onClose,
  initialGameId = 'sudoku',
}) => {
  const [selectedGameId, setSelectedGameId] = useState<string>(initialGameId);

  if (!isOpen) return null;

  const currentGame = INSTRUCTIONS_DATA.find((g) => g.id === selectedGameId) || INSTRUCTIONS_DATA[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700/80 p-5 sm:p-6 shadow-2xl my-6 max-h-[90vh] flex flex-col text-slate-900 dark:text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">How to Play Guide</h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Rules, controls &amp; pro tips for all games</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Game Switcher Tabs */}
        <div className="flex gap-1.5 py-3 overflow-x-auto w-full no-scrollbar border-b border-slate-200 dark:border-slate-800/60">
          {INSTRUCTIONS_DATA.map((g) => {
            const isSelected = g.id === selectedGameId;
            return (
              <button
                key={g.id}
                onClick={() => {
                  sound.playTap();
                  setSelectedGameId(g.id);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span>{g.icon}</span>
                <span>{g.title}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Instruction Body */}
        <div className="overflow-y-auto pr-1 py-4 flex-1 text-left space-y-4 text-xs">
          {/* Title Banner */}
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-gradient-to-br dark:from-indigo-950/40 dark:via-slate-800/40 dark:to-slate-900 border border-indigo-200 dark:border-indigo-500/30">
            <div className="flex items-center justify-between mb-1">
              <span className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>{currentGame.icon}</span>
                <span>{currentGame.title}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold uppercase tracking-wider">
                {currentGame.genre}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{currentGame.tagline}</p>
          </div>

          {/* 1. Objective */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5 mb-1.5">
              <span>🎯</span> Game Objective
            </h4>
            <p className="text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
              {currentGame.objective}
            </p>
          </div>

          {/* 2. Controls (Mobile vs Laptop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <h5 className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mb-1 text-[11px]">
                <Smartphone className="w-3.5 h-3.5" /> Mobile Phone Controls
              </h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {currentGame.mobileControls}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <h5 className="font-bold text-cyan-400 flex items-center gap-1.5 mb-1 text-[11px]">
                <Laptop className="w-3.5 h-3.5" /> Laptop / Keyboard Controls
              </h5>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                {currentGame.desktopControls}
              </p>
            </div>
          </div>

          {/* 3. Rules */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5 mb-1.5">
              <span>📜</span> Rules &amp; Mechanics
            </h4>
            <ul className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {currentGame.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Pro Tips */}
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-wider text-yellow-400 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Pro Tips &amp; Strategies
            </h4>
            <ul className="space-y-1.5 bg-yellow-500/5 p-3 rounded-xl border border-yellow-500/20">
              {currentGame.proTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-yellow-200">
                  <span className="text-amber-400 font-bold shrink-0">💡</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Got It Button */}
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition active:scale-95"
          >
            Got It, Let&apos;s Play! 🎮
          </button>
        </div>
      </div>
    </div>
  );
};
