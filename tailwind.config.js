/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clico: {
          'primary-dark': 'var(--color-primary-dark)',
          primary: 'var(--color-primary)',
          mid: 'var(--color-mid)',
          'accent-cyan': 'var(--color-accent-cyan)',
          'accent-orange': 'var(--color-accent-orange)',
          'warm-light': 'var(--color-warm-light)',
          'warm-pale': 'var(--color-warm-pale)',
          white: 'var(--color-white)',
          
          'bg-primary': 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-warm': 'var(--bg-warm)',
          'text-primary': 'var(--text-primary)',
          'text-body': 'var(--text-body)',
          'text-muted': 'var(--text-muted)',
          'cta-up': 'var(--cta-up)',
          'cta-down': 'var(--cta-down)',
          'accent-line': 'var(--accent-line)',
        }
      },
      fontFamily: {
        ruda: ['Ruda', 'sans-serif'],
        lexend: ['Lexend', 'sans-serif'],
        roboto: ['"Roboto Condensed"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
