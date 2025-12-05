export interface PuzzleItem {
  id: string;
  x: number;
  y: number;
}

export const pieces: PuzzleItem[] = [
  { id: '1', x: 0, y: 0 },
  { id: '2', x: 50, y: 0 },
  { id: '3', x: 100, y: 0 },
  { id: '4', x: 0, y: 50 },
  { id: '5', x: 50, y: 50 },
  { id: '6', x: 100, y: 50 },
  { id: '7', x: 0, y: 100 },
  { id: '8', x: 50, y: 100 },
  { id: '9', x: 100, y: 100 },
];