/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        arcade: {
          bg: '#0f172a',
          card: '#1e293b',
          border: '#334155',
          accent: '#6366f1',
          gold: '#f59e0b',
        },
        // Premium "Nocturne" palette
        ink: {
          950: '#05060b',
          900: '#0a0b14',
          850: '#0e1020',
          800: '#13152a',
          700: '#1b1e38',
          600: '#272b4d',
        },
        neon: {
          violet: '#8b5cf6',
          fuchsia: '#d946ef',
          cyan: '#22d3ee',
          lime: '#a3e635',
          gold: '#fbbf24',
          rose: '#fb7185',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(139,92,246,.35), 0 10px 40px -10px rgba(139,92,246,.55)',
        'glow-sm': '0 0 0 1px rgba(139,92,246,.25), 0 6px 20px -8px rgba(139,92,246,.5)',
        reel: '0 24px 48px -16px rgba(0,0,0,.65), 0 0 0 1px rgba(255,255,255,.06)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0', transform: 'translateY(6px)' }, to: { opacity: '1', transform: 'none' } },
        'scale-in': { from: { opacity: '0', transform: 'scale(.96)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(220%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
        'reel-progress': { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        'slide-down': { from: { opacity: '0', transform: 'translate(-50%, -12px)' }, to: { opacity: '1', transform: 'translate(-50%, 0)' } },
      },
      animation: {
        'fade-in': 'fade-in .35s ease-out both',
        'scale-in': 'scale-in .25s ease-out both',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'reel-progress': 'reel-progress 5s linear infinite',
        'slide-down': 'slide-down .35s cubic-bezier(.2,.9,.3,1.2) both',
      },
    },
  },
  plugins: [],
}
