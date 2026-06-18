/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apex: {
          dark: '#13253f',
          navy: '#13253f',
          slate: '#1a3050',
          card: '#1a3050',
          amber: '#f4a62a',
          teal: '#0f766e',
          'teal-light': '#14b8a6',
          gold: '#ffd56a',
          accent: '#f4a62a',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(244,166,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,166,42,0.04) 1px, transparent 1px)',
        'hero-gradient':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(244,166,42,0.22), transparent), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(15,118,110,0.15), transparent)',
      },
    },
  },
  plugins: [],
};
