/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '425px',
      md: '768px',
      'semimd': '900px',
      lg: '1280px'
    },
    extend: {
      colors: {
        'background': '#0D0E11',
        'primary': '#6b3caa',
        'secondary': '#3e1435',
        accent: '#578E8E', 
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace']
      },
    },
  },
  plugins: [],
}
