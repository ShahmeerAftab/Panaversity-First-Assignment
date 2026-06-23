/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        'food-pulse': {
          '0%, 100%': { transform: 'scale(0.75)' },
          '50%':      { transform: 'scale(1)' },
        },
        'pop-in': {
          from: { transform: 'scale(0.85)', opacity: '0' },
          to:   { transform: 'scale(1)',    opacity: '1' },
        },
        'head-glow': {
          '0%, 100%': { boxShadow: '0 0 6px 2px rgba(74,222,128,0.6)' },
          '50%':      { boxShadow: '0 0 12px 4px rgba(74,222,128,0.9)' },
        },
      },
      animation: {
        'food-pulse': 'food-pulse 0.8s ease-in-out infinite',
        'pop-in':     'pop-in 0.2s ease-out both',
        'head-glow':  'head-glow 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
