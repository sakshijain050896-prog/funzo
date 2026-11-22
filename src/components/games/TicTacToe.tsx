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
    <div className="w-full max-w-sm mx-auto flex flex-col items-center select-none pb-4">
      {/* Mode Switcher & Status */}
      <div className="w-full flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#180d38] border border-[#2f1863]">
          <button
            onClick={() => { sound.playTap(); setVsAI(true); handleRestart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
              vsAI ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>vs AI</span>
          </button>
          <button
            onClick={() => { sound.playTap(); setVsAI(false); handleRestart(); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
              !vsAI ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>2 Players</span>
          </button>
        </div>

        <button
          onClick={handleRestart}
          className="p-2 rounded-xl bg-[#180d38] border border-[#2f1863] text-slate-300 hover:text-white transition active:scale-95"
          title="Restart Round"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Score Counter */}
      <div className="w-full grid grid-cols-3 gap-2 mb-3.5">
        <div className={`p-2.5 rounded-2xl text-center border ${isXNext && !winner ? 'bg-amber-500/10 border-amber-500/50' : 'bg-[#180d38] border-[#2f1863]'}`}>
          <span className="text-[10px] uppercase font-bold text-amber-400 block">Player X</span>
          <span className="text-lg font-black text-white font-mono">{scores.X}</span>
        </div>
        <div className="p-2.5 rounded-2xl text-center bg-[#180d38] border border-[#2f1863]">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Ties</span>
          <span className="text-lg font-black text-slate-300 font-mono">{scores.ties}</span>
        </div>
        <div className={`p-2.5 rounded-2xl text-center border ${!isXNext && !winner ? 'bg-purple-500/10 border-purple-500/50' : 'bg-[#180d38] border-[#2f1863]'}`}>
          <span className="text-[10px] uppercase font-bold text-purple-400 block">{vsAI ? 'Bot (O)' : 'Player O'}</span>
          <span className="text-lg font-black text-white font-mono">{scores.O}</span>
        </div>
      </div>

      {/* 3x3 Grid Board */}
      <div className="relative w-full aspect-square max-w-[320px] p-3 rounded-3xl bg-[#130a2e] border-2 border-[#2f1863] shadow-2xl grid grid-cols-3 grid-rows-3 gap-2.5">
        {board.map((cell, idx) => {
          const isWinningCell = winningLine?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleCellClick(idx)}
              className={`rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black transition-all active:scale-95 ${
                isWinningCell
                  ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-xl shadow-amber-500/40 animate-pulse'
                  : cell === 'X'
                  ? 'bg-[#1e1045] border-2 border-amber-500/40 text-amber-400 shadow-md'
                  : cell === 'O'
                  ? 'bg-[#1e1045] border-2 border-purple-500/40 text-purple-400 shadow-md'
                  : 'bg-[#180d38] hover:bg-[#231352] border border-[#2f1863]/60'
              }`}
            >
              {cell}
            </button>
          );
        })}

        {/* Winner Overlay Banner */}
        {winner && (
          <div className="absolute inset-0 bg-[#0f0724]/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-4 z-20 animate-fade-in text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2 animate-bounce">
              <Trophy className="w-6 h-6 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-white mb-1">
              {winner === 'TIE' ? 'Cat’s Game (Tie)!' : `Player ${winner} Won! 👑`}
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              {winner === 'TIE' ? 'Well matched logical battle!' : `Brilliant 3-in-a-row victory!`}
            </p>
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg active:scale-95 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
