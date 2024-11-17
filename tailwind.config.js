/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' }, // Increased rotation
          '50%': { transform: 'rotate(-20deg)' }, // Increased rotation
          '75%': { transform: 'rotate(10deg)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(200deg)' },
          '60%': { transform: 'rotate(300deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shake: 'shake 0.5s ease-in-out',
        spinSlow: 'spinSlow 0.6s ease-out',
      },
    },
  },
  plugins: [],
};