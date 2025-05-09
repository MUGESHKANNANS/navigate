/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        secondary: '#6D28D9',
        background: '#1E1B4B',
        chatBg: '#2E1065',
        border: '#4C1D95',
        text: '#F5F3FF',
        sidebar: '#1E1B4B',
        accent: '#A78BFA',
      },
      boxShadow: {
        glow: '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-hover': '0 0 25px rgba(139, 92, 246, 0.4)',
      },
    },
  },
  plugins: [],
}