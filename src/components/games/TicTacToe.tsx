import React, { useState } from 'react';
import { RotateCcw, Trophy, Users, Bot } from 'lucide-react';
import { sound } from '../../lib/soundEffects';
import confetti from 'canvas-confetti';

interface TicTacToeProps {
  onWinOrActivity?: (winner: string) => void;
  onRequestAd?: (rewardTitle: string, onReward: () => void) => void;
}

type BoardCell = 'X' | 'O' | null;

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6],           // Diagonals
];

export const TicTacToe: React.FC<TicTacToeProps> = ({ onWinOrActivity }) => {
  const [board, setBoard] = useState<BoardCell[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [vsAI, setVsAI] = useState<boolean>(true);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [winner, setWinner] = useState<'X' | 'O' | 'TIE' | null>(null);

  const checkWinner = (cells: BoardCell[]) => {
    for (const combo of WINNING_COMBOS) {
      const [a, b, c] = combo;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return { winner: cells[a] as 'X' | 'O', line: combo };
      }
    }
    if (cells.every((c) => c !== null)) {
      return { winner: 'TIE' as const, line: null };
    }
    return null;
  };

  const makeAIMove = (currentBoard: BoardCell[]) => {
    const emptyIndices = currentBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((val): val is number => val !== null);

    if (emptyIndices.length === 0) return;

    // 1. Check if AI can win in 1 move
    for (const idx of emptyIndices) {
      const testBoard = [...currentBoard];
      testBoard[idx] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') {
        executeMove('O', testBoard);
        return;
      }
    }

    // 2. Check if player X can win and block
    for (const idx of emptyIndices) {
      const testBoard = [...currentBoard];
      testBoard[idx] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') {
        const aiBoard = [...currentBoard];
        aiBoard[idx] = 'O';
        executeMove('O', aiBoard);
        return;
      }
    }

    // 3. Take center if free
    if (currentBoard[4] === null) {
      const aiBoard = [...currentBoard];
      aiBoard[4] = 'O';
      executeMove('O', aiBoard);
      return;
    }

    // 4. Random available move
    const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const aiBoard = [...currentBoard];
    aiBoard[randomIdx] = 'O';
    executeMove('O', aiBoard);
  };

  const executeMove = (player: 'X' | 'O', newBoard: BoardCell[]) => {
    sound.playTap();
    setBoard(newBoard);
    const winResult = checkWinner(newBoard);

    if (winResult) {
      if (winResult.winner === 'TIE') {
        setWinner('TIE');
        setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
      } else {
        setWinner(winResult.winner);
        setWinningLine(winResult.line);
        setScores((prev) => ({ ...prev, [winResult.winner]: prev[winResult.winner] + 1 }));
        if (winResult.winner === 'X' || !vsAI) {
          sound.playVictory();
          confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
        }
        if (onWinOrActivity) onWinOrActivity(winResult.winner);
      }
    } else {
      setIsXNext(player === 'O');
    }
  };

  const handleCellClick = (idx: number) => {
    if (board[idx] || winner) return;

    const newBoard = [...board];
    newBoard[idx] = isXNext ? 'X' : 'O';
    executeMove(isXNext ? 'X' : 'O', newBoard);

    if (vsAI && isXNext && !checkWinner(newBoard)) {
      setTimeout(() => {
        makeAIMove(newBoard);
      }, 350);
    }
  };

  const handleRestart = () => {
    sound.playTap();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinningLine(null);
    setWinner(null);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-4 font-sans">
      {/* Mode Switcher & Status */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => { sound.playTap(); setVsAI(true); handleRestart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
              vsAI ? 'bg-[#ffedd5] border border-[#fed7aa] text-[#c2410c] shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>vs AI</span>
          </button>
          <button
            onClick={() => { sound.playTap(); setVsAI(false); handleRestart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
              !vsAI ? 'bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2 Players</span>
          </button>
        </div>

        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-white dark:bg-[#181d2f] border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-rose-500 transition active:scale-95 shadow-xs"
          title="Restart Round"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Score Counter */}
      <div className="w-full grid grid-cols-3 gap-2 mb-3.5">
        <div className={`p-2.5 rounded-2xl text-center border-2 transition ${isXNext && !winner ? 'bg-[#ffedd5] border-[#fed7aa] text-[#c2410c]' : 'bg-white/90 dark:bg-[#181d2f]/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'} shadow-xs`}>
          <span className="text-[10px] uppercase font-bold block">Player X</span>
          <span className="text-lg font-black font-pixel">{scores.X}</span>
        </div>
        <div className="p-2.5 rounded-2xl text-center bg-white/90 dark:bg-[#181d2f]/90 border-2 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shadow-xs">
          <span className="text-[10px] uppercase font-bold block">Ties</span>
          <span className="text-lg font-black font-pixel text-slate-800 dark:text-slate-200">{scores.ties}</span>
        </div>
        <div className={`p-2.5 rounded-2xl text-center border-2 transition ${!isXNext && !winner ? 'bg-[#e0f2fe] border-[#bae6fd] text-[#0369a1]' : 'bg-white/90 dark:bg-[#181d2f]/90 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'} shadow-xs`}>
          <span className="text-[10px] uppercase font-bold block">{vsAI ? 'Bot (O)' : 'Player O'}</span>
          <span className="text-lg font-black font-pixel">{scores.O}</span>
        </div>
      </div>

      {/* 3x3 Grid Board */}
      <div className="relative w-full aspect-square max-w-[320px] p-3 rounded-3xl bg-white/95 dark:bg-[#181d2f]/95 border-2 border-slate-200 dark:border-slate-800 shadow-md grid grid-cols-3 grid-rows-3 gap-2.5">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black transition-all active:scale-95 ${
                isWinningCell
                  ? 'bg-gradient-to-tr from-[#fef08a] to-[#fde047] text-[#854d0e] border-2 border-[#facc15] shadow-md animate-bounce'
                  : cell === 'X'
                  ? 'bg-[#ffedd5] dark:bg-[#7c2d12]/40 border-2 border-[#fed7aa] dark:border-[#9a3412] text-[#c2410c] dark:text-[#fed7aa] shadow-xs'
                  : cell === 'O'
                  ? 'bg-[#e0f2fe] dark:bg-[#0c4a6e]/40 border-2 border-[#bae6fd] dark:border-[#0284c7] text-[#0369a1] dark:text-[#bae6fd] shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-[#22283a] dark:hover:bg-[#2c344b] border-2 border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {cell}
            </button>
          );
        })}

        {/* Winner Overlay Banner */}
        {winner && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#fef08a] text-[#854d0e] border-2 border-[#facc15] flex items-center justify-center mb-2 animate-bounce">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-1">
              {winner === 'TIE' ? 'Cat’s Game (Tie)!' : `Player ${winner} Won! 👑`}
            </h3>
            <p className="text-xs text-slate-200 mb-4">
              {winner === 'TIE' ? 'Well matched logical battle!' : `Brilliant 3-in-a-row victory!`}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl bg-[#6ee7b7] hover:bg-[#34d399] border-b-4 border-[#059669] text-[#064e3b] font-black text-xs shadow-md active:scale-95 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
