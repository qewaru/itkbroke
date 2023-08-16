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
        'background': '#050505',
        'primary': '#6b3caa',
        'secondary': '#1b1d1b',
        accent: '#86857e',
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace']
      },
    },
  },
  plugins: [],
}

// 'text': '#f9f8fc',
// 'background': '#100e1b',
// 'primary': '#3b2447',
// 'secondary': '#251322',
// accent: '#ab599e',

// 'text': '#ededee',
// 'background': '#050505',
// 'primary': '#6b3caa',
// 'secondary': '#1b1d1b',
// 'accent': '#86857e',