// Shows current score and high score side by side
function ScoreBoard({ score, highScore }) {
  return (
    <div className="flex gap-3 w-full">
      <ScoreCard label="Score" value={score} highlight />
      <ScoreCard label="Best"  value={highScore} />
    </div>
  )
}

function ScoreCard({ label, value, highlight }) {
  return (
    <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
      <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
        {label}
      </p>
      <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${highlight ? 'text-green-400' : 'text-white'}`}>
        {value}
      </p>
    </div>
  )
}

export default ScoreBoard
