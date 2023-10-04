/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '426px',
      md: '769px',
      'semimd': '901px',
      lg: '1281px'
    },
    extend: {
      colors: {
        'background': '#050505',
        'body': '#111215',
        'primary': '#6b3caa',
        'secondary': '#3b0a79',
        'second': '#1a191a',
        'third': '#282A2E',
        'accent': '#b076ff',
        'success': '#34eb4c',
        'deny': '#EB3434'
      },
      fontFamily: {
        'space': ['Space Mono', 'monospace']
      },
      keyframes: {
        shimmer: {
          '100%': {transform: 'translateX(100%)'}
        }
      }
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
