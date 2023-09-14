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
        'secondary': '#3b0a79',
        'second': '#1a191a',
        'third': '#282A2E',
        'accent': '#b076ff',
        'success': '#34eb4c',
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace']
      },
    },
  },
  plugins: [],
}

// GOVNO
// 'text': '#f9f8fc',
// 'background': '#100e1b',
// 'primary': '#3b2447',
// 'secondary': '#251322',
// accent: '#ab599e',

// DEFAULT
// 'text': '#ededee',
// 'background': '#050505',
// 'primary': '#6b3caa',
// 'secondary': '#1b1d1b',
// 'accent': '#86857e',

// STEPAN
// --text: #ededee;
// --background: #050505;
// --primary: #6b3caa;
// --secondary: #3b0a79;
// --accent: #b076ff;

// GREEN
// 'background': '#040902',
// 'background-second': '#293520',
// 'primary': '#45961d',
// 'secondary': '#0c1b05',
// 'second': '#002E00',
// 'accent': '#b5eb9a',