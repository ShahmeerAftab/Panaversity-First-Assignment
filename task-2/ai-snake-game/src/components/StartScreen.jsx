// Overlay shown before the first game starts
function StartScreen({ onStart }) {
  return (
    <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-2xl animate-pop-in mx-4 w-full max-w-xs">

        <div className="text-5xl mb-3">🐍</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-400 mb-2">Snake Game</h1>

        {/* How to play instructions */}
        <div className="bg-slate-900/60 rounded-xl p-4 mb-6 text-left space-y-2">
          <p className="text-slate-300 text-sm font-semibold mb-2 text-center">How to play</p>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="font-mono bg-slate-700 px-2 py-0.5 rounded text-xs text-white">↑ ↓ ← →</span>
            <span>or</span>
            <span className="font-mono bg-slate-700 px-2 py-0.5 rounded text-xs text-white">W A S D</span>
            <span>to move</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="text-red-400">🔴</span>
            <span>Eat food to grow & score</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span>💥</span>
            <span>Avoid walls and yourself</span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-green-500 hover:bg-green-400 active:scale-95 text-slate-900 font-bold py-3 px-8 rounded-xl text-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default StartScreen
