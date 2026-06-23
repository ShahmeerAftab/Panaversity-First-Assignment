// PostCSS runs as part of the Vite build pipeline.
// It transforms our CSS — Tailwind generates utility classes,
// and Autoprefixer adds browser-specific prefixes automatically.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
