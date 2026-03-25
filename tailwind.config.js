/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sio-primary': '#3B82F6',
        'sio-primary-dark': '#2563EB',
        'sio-bg-base': '#FFFFFF',
        'sio-bg-elevated': '#F9FAFB',
        'sio-bg-subtle': '#F3F4F6',
        'sio-text-primary': '#0F132E',
        'sio-text-secondary': '#4B5563',
        'sio-text-muted': '#9CA3AF',
        
        clico: {
          'primary-dark': '#19274E',
          primary: '#19274E',
          mid: '#536D88',
          'accent-cyan': '#0CC0DF',
          'accent-orange': '#CD6E20',
          'warm-light': '#B49B85',
          'warm-pale': '#EAC195',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        ruda: ['Ruda', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        roboto: ['"Roboto Condensed"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
