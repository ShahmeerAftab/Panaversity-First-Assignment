import { useSnakeGame } from './hooks/useSnakeGame'
import GameBoard      from './components/GameBoard'
import ScoreBoard     from './components/ScoreBoard'
import GameOverModal  from './components/GameOverModal'
import StartScreen    from './components/StartScreen'
import Controls       from './components/Controls'

function App() {
  const {
    snake, food, score, highScore,
    isGameOver, isRunning,
    startGame, restartGame, changeDirection,
  } = useSnakeGame()

  const showStartScreen = !isRunning && !isGameOver

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 flex flex-col items-center justify-center gap-4 p-4">

      <h1 className="text-2xl sm:text-3xl font-extrabold tracking-widest text-white">
        🐍 <span className="text-green-400">Snake</span> Game
      </h1>

      <div className="w-full max-w-[480px]">
        <ScoreBoard score={score} highScore={highScore} />
      </div>

      {/*
        w-[min(90vw,80vh)] — fits portrait phones AND landscape screens
        aspect-square      — keeps the board perfectly square
        relative           — lets modal overlays use absolute positioning
      */}
      <div className="relative w-[min(90vw,80vh)] max-w-[480px] aspect-square">
        <GameBoard snake={snake} food={food} />
        {showStartScreen && <StartScreen onStart={startGame} />}
        {isGameOver && (
          <GameOverModal score={score} highScore={highScore} onRestart={restartGame} />
        )}
      </div>

      {/* D-pad for mobile — hidden on desktop */}
      <Controls onDirectionChange={changeDirection} />

      {/* Keyboard hint — hidden on mobile */}
      <p className="hidden md:block text-slate-500 text-xs tracking-wide">
        Use Arrow Keys or{' '}
        <kbd className="bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-slate-300">
          W A S D
        </kbd>{' '}
        to move
      </p>
    </div>
  )
}

export default App
