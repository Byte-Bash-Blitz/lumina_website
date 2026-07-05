/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        minecraft: {
          green: '#55FF55',
          blue: '#5555FF',
          dark: '#1a1a2e',
          darker: '#0f0f1e',
          orange: '#FFAA00',
          red: '#FF5555',
          yellow: '#FFFF55',
          gray: '#AAAAAA',
        },
        forest: {
          900: '#134e4a'
        }
      },
      fontFamily: {
        'minecraft': ['"Press Start 2P"', 'Courier New', 'monospace'],
        'pixel': ['"Press Start 2P"', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': ['0.65rem', { lineHeight: '1.4' }],
        'sm': ['0.75rem', { lineHeight: '1.5' }],
        'base': ['0.875rem', { lineHeight: '1.6' }],
        'lg': ['1rem', { lineHeight: '1.6' }],
        'xl': ['1.125rem', { lineHeight: '1.6' }],
        '2xl': ['1.25rem', { lineHeight: '1.5' }],
        '3xl': ['1.5rem', { lineHeight: '1.4' }],
        '4xl': ['2rem', { lineHeight: '1.3' }],
        '5xl': ['2.5rem', { lineHeight: '1.2' }],
        '6xl': ['3rem', { lineHeight: '1.1' }],
        '7xl': ['3.5rem', { lineHeight: '1.1' }],
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}