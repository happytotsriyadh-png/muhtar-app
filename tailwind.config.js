/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2FAB99',
          50: '#E6F7F4',
          100: '#C2EDE5',
          200: '#8EDBCB',
          300: '#5BC9B1',
          400: '#2FAB99',
          500: '#279685',
          600: '#1F7A6B',
          700: '#175E52',
          800: '#0F4239',
          900: '#082620',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FBF6E5',
          100: '#F6EBC0',
          200: '#EDD988',
          300: '#E3C550',
          400: '#D4AF37',
          500: '#B8952E',
          600: '#947824',
          700: '#70591B',
          800: '#4C3B12',
          900: '#281E09',
        },
        accent: {
          DEFAULT: '#005448',
        },
      },
      fontFamily: {
        arabic: ['Tajawal', 'sans-serif'],
        english: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};