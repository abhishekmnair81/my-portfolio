/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mc: {
          bg: "#0a0a0a",
          card: "#111111",
          border: "#2a2a2a",
          green: "#5b8a32",
          gold: "#ffaa00",
          diamond: "#4de6ff",
          text: "#f0f0f0",
          muted: "#888888",
        }
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        pixel: '4px 4px 0px #000',
      }
    },
  },
  plugins: [],
}
