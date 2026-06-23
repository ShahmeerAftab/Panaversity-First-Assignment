import { GRID_SIZE } from '../constants'

// Renders the 20×20 CSS grid with snake segments and food
function GameBoard({ snake, food }) {
  return (
    <div
      className="grid board-bg w-full h-full rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl shadow-black/60"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        gridTemplateRows:    `repeat(${GRID_SIZE}, 1fr)`,
      }}
    >
      {/* Food — +1 because CSS grid is 1-indexed */}
      <div
        className="bg-red-500 rounded-full m-[10%] animate-food-pulse"
        style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
      />

      {/* Snake segments */}
      {snake.map((seg, i) => (
        <div
          key={`${i}-${seg.x}-${seg.y}`}
          className={
            i === 0
              ? 'bg-green-400 rounded-sm m-[5%] animate-head-glow' // head
              : 'bg-green-600 rounded-sm m-[8%] opacity-90'         // body
          }
          style={{ gridColumn: seg.x + 1, gridRow: seg.y + 1 }}
        />
      ))}
    </div>
  )
}

export default GameBoard
