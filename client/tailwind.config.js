/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'semimd': '900px'
    },
    extend: {
      colors: {
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
