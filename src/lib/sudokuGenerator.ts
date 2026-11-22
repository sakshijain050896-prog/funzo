import { Difficulty, SudokuCell } from '../types';

// Simple seedable pseudo-random number generator (Mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Check if placing num at (row, col) is valid
function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num && i !== col) return false;
    if (board[i][col] === num && i !== row) return false;
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      const curR = startRow + r;
      const curC = startCol + c;
      if (board[curR][curC] === num && (curR !== row || curC !== col)) return false;
    }
  }
  return true;
}

// Solve board using backtracking
function solveSudoku(board: number[][], rng: () => number = Math.random): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        // Randomize order of 1-9 to produce diverse boards
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => rng() - 0.5);
        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board, rng)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

export function generateDailyPuzzle(dateString: string = new Date().toISOString().slice(0, 10)): {
  initial: number[][];
  solution: number[][];
} {
  const seed = stringToSeed('daily-grid-' + dateString);
  const rng = mulberry32(seed);

  const board: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  solveSudoku(board, rng);

  // Clone full solution
  const solution: number[][] = board.map((row) => [...row]);

  // Remove cells to create puzzle (approx 36 given clues for daily balanced difficulty)
  const initial: number[][] = board.map((row) => [...row]);
  const cellsToRemove = 45; // 81 - 45 = 36 clues
  let removed = 0;

  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  // Shuffle positions deterministically
  positions.sort(() => rng() - 0.5);

  for (const [r, c] of positions) {
    if (removed >= cellsToRemove) break;
    initial[r][c] = 0;
    removed++;
  }

  return { initial, solution };
}

export function generatePracticePuzzle(difficulty: Difficulty): {
  initial: number[][];
  solution: number[][];
} {
  const board: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  solveSudoku(board, Math.random);
  const solution: number[][] = board.map((row) => [...row]);
  const initial: number[][] = board.map((row) => [...row]);

  let cluesCount = 38;
  if (difficulty === 'easy') cluesCount = 44;
  else if (difficulty === 'medium') cluesCount = 34;
  else if (difficulty === 'hard') cluesCount = 28;

  const cellsToRemove = 81 - cluesCount;
  const positions: [number, number][] = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      positions.push([r, c]);
    }
  }
  positions.sort(() => Math.random() - 0.5);

  let removed = 0;
  for (const [r, c] of positions) {
    if (removed >= cellsToRemove) break;
    initial[r][c] = 0;
    removed++;
  }

  return { initial, solution };
}

export function buildGridCells(initial: number[][], solution: number[][]): SudokuCell[][] {
  const grid: SudokuCell[][] = [];
  for (let r = 0; r < 9; r++) {
    const row: SudokuCell[] = [];
    for (let c = 0; c < 9; c++) {
      row.push({
        row: r,
        col: c,
        value: initial[r][c],
        solution: solution[r][c],
        isInitial: initial[r][c] !== 0,
        notes: new Set<number>(),
        isError: false,
      });
    }
    grid.push(row);
  }
  return grid;
}
