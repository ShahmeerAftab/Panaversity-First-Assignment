import { useState, useEffect, useCallback, useRef } from 'react'
import {
  GRID_SIZE,
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  INITIAL_SPEED,
  MIN_SPEED,
  SPEED_STEP,
  HIGH_SCORE_KEY,
} from '../constants'

// Returns a random cell not occupied by the snake
function getRandomFoodPosition(snake) {
  let pos
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (snake.some((seg) => seg.x === pos.x && seg.y === pos.y))
  return pos
}

// Custom hook — owns all game state and logic
export function useSnakeGame() {
  const [snake, setSnake]         = useState(INITIAL_SNAKE)
  const [food, setFood]           = useState(() => getRandomFoodPosition(INITIAL_SNAKE))
  const [score, setScore]         = useState(0)
  const [speed, setSpeed]         = useState(INITIAL_SPEED)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [highScore, setHighScore] = useState(
    () => Number(localStorage.getItem(HIGH_SCORE_KEY) || 0),
  )

  // Refs let the interval callback read fresh values without restarting
  const directionRef = useRef(INITIAL_DIRECTION)
  const foodRef      = useRef(food)

  useEffect(() => { foodRef.current = food }, [food])

  // Save high score to localStorage whenever it's beaten
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem(HIGH_SCORE_KEY, String(score))
    }
  }, [score, highScore])

  const startGame = useCallback(() => {
    const initialFood = getRandomFoodPosition(INITIAL_SNAKE)
    directionRef.current = INITIAL_DIRECTION
    foodRef.current      = initialFood

    setSnake(INITIAL_SNAKE)
    setFood(initialFood)
    setScore(0)
    setSpeed(INITIAL_SPEED)
    setIsGameOver(false)
    setIsRunning(true)
  }, [])

  // Keyboard controls (Arrow keys + WASD)
  useEffect(() => {
    const KEY_MAP = {
      ArrowUp:    { x: 0,  y: -1 },
      ArrowDown:  { x: 0,  y:  1 },
      ArrowLeft:  { x: -1, y:  0 },
      ArrowRight: { x:  1, y:  0 },
      w: { x: 0,  y: -1 }, W: { x: 0,  y: -1 },
      s: { x: 0,  y:  1 }, S: { x: 0,  y:  1 },
      a: { x: -1, y:  0 }, A: { x: -1, y:  0 },
      d: { x:  1, y:  0 }, D: { x:  1, y:  0 },
    }

    function handleKeyDown(e) {
      const newDir = KEY_MAP[e.key]
      if (!newDir) return
      if (e.key.startsWith('Arrow')) e.preventDefault() // stop page scroll
      const cur = directionRef.current
      // Block reversing into self
      if (cur.x + newDir.x !== 0 || cur.y + newDir.y !== 0) {
        directionRef.current = newDir
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Main game loop — reruns when speed changes to apply the new interval
  useEffect(() => {
    if (!isRunning || isGameOver) return

    const interval = setInterval(() => {
      setSnake((prev) => {
        const dir     = directionRef.current
        const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y }

        const hitWall =
          newHead.x < 0 || newHead.x >= GRID_SIZE ||
          newHead.y < 0 || newHead.y >= GRID_SIZE
        const hitSelf = prev.some((seg) => seg.x === newHead.x && seg.y === newHead.y)

        if (hitWall || hitSelf) {
          setIsGameOver(true)
          setIsRunning(false)
          return prev
        }

        const newSnake = [newHead, ...prev]
        const ateFood  = newHead.x === foodRef.current.x && newHead.y === foodRef.current.y

        if (ateFood) {
          const nextFood = getRandomFoodPosition(newSnake)
          foodRef.current = nextFood
          setFood(nextFood)
          setScore((s) => s + 1)
          setSpeed((s) => Math.max(MIN_SPEED, s - SPEED_STEP)) // speed up
        } else {
          newSnake.pop() // keep length the same
        }

        return newSnake
      })
    }, speed)

    return () => clearInterval(interval)
  }, [isRunning, isGameOver, speed])

  // Used by on-screen D-pad buttons
  const changeDirection = useCallback((newDir) => {
    const cur = directionRef.current
    if (cur.x + newDir.x !== 0 || cur.y + newDir.y !== 0) {
      directionRef.current = newDir
    }
  }, [])

  return {
    snake, food, score, highScore,
    isGameOver, isRunning,
    startGame, restartGame: startGame,
    changeDirection,
  }
}
