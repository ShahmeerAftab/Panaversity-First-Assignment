// Mobile D-pad — hidden on md+ screens where keyboard is available
function Controls({ onDirectionChange }) {
  const btnClass =
    'flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 text-xl ' +
    'bg-slate-800 border border-slate-700 rounded-xl text-white ' +
    'hover:bg-slate-700 active:bg-green-500 active:scale-95 ' +
    'transition-all duration-100 select-none focus:outline-none focus:ring-2 focus:ring-green-400'

  // Returns onClick + onTouchStart so the button works on both desktop and mobile
  function press(dir) {
    return {
      onClick:      ()  => onDirectionChange(dir),
      onTouchStart: (e) => { e.preventDefault(); onDirectionChange(dir) },
    }
  }

  return (
    // Layout:  [  ] [▲] [  ]
    //          [◀] [▼] [▶]
    <div className="md:hidden mt-4 grid grid-cols-3 gap-2 justify-items-center">
      <div />
      <button {...press({ x: 0, y: -1 })} className={btnClass} aria-label="Up">▲</button>
      <div />
      <button {...press({ x: -1, y: 0 })} className={btnClass} aria-label="Left">◀</button>
      <button {...press({ x: 0, y:  1 })} className={btnClass} aria-label="Down">▼</button>
      <button {...press({ x:  1, y: 0 })} className={btnClass} aria-label="Right">▶</button>
    </div>
  )
}

export default Controls
