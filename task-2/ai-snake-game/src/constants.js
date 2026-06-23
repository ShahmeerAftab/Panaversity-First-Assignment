// Game configuration — tweak these to change difficulty or board size
export const GRID_SIZE = 20

export const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 7, y: 10 },
  { x: 6, y: 10 },
]

export const INITIAL_DIRECTION = { x: 1, y: 0 } // starts moving right

export const INITIAL_SPEED = 150 // ms between moves (lower = faster)
export const MIN_SPEED     = 60  // speed cap
export const SPEED_STEP    = 5   // ms removed per food eaten

export const HIGH_SCORE_KEY = 'snake-high-score'
