// Overlay shown when the snake crashes
function GameOverModal({ score, highScore, onRestart }) {
  const isNewHighScore = score > 0 && score >= highScore

  return (
    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl animate-pop-in mx-4 w-full max-w-xs">

        <div className="text-4xl mb-2">💀</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-red-400 mb-3">Game Over</h2>

        {isNewHighScore && (
          <p className="text-yellow-400 font-semibold text-sm mb-2 tracking-wide uppercase">
            🏆 New High Score!
          </p>
        )}

        <div className="bg-slate-900/60 rounded-xl p-4 mb-6">
          <p className="text-slate-400 text-sm mb-1">Your score</p>
          <p className="text-4xl font-bold text-white tabular-nums">{score}</p>
        </div>

        <button
          onClick={onRestart}
          className="w-full bg-green-500 hover:bg-green-400 active:scale-95 text-slate-900 font-bold py-3 px-8 rounded-xl text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOverModal
