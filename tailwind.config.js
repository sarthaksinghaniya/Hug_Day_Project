/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cocoa': '#3E2723',
        'cocoa-light': '#5D4037',
        'rose-beige': '#F3E5F5',
        'soft-peach': '#FFE0B2',
        'dim-amber': '#FF6F00',
        'warm-glow': '#FF8F00',
        'candle-light': '#FFA726',
        'romantic-bg': '#1A0E0A',
        'intimate-dark': '#2D1B1B',
      },
      animation: {
        'breathing': 'breathing 4s ease-in-out infinite',
        'heartbeat': 'heartbeat 3s ease-in-out infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
      },
      keyframes: {
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
          '50%': { transform: 'scale(1.02)', opacity: 1 },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(1.05)' },
          '20%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(1.03)' },
          '40%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}
