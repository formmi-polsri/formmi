/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'mono': 'var(--font-mono)'
    },
    colors: {
      'primary-blue': 'var(--primary-blue)',
      'primary-orange': 'var(--primary-orange)',
      'secondary-orange': 'var(--secondary-orange)',
      'primary-gray': 'var(--primary-gray)',
      'primary-green': 'var(--primary-green)',
      'font-gray': 'var(--font-gray)',

      'white': '#fff'
    }
  },
  plugins: [],
}
