/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#02081a',
          900: '#050f2a',
          800: '#0a1a3d',
          700: '#0d1f4e',
          600: '#122268',
          500: '#183087'
        },
        lime: {
          300: '#b5f231',
          400: '#9de020',
          500: '#7DC400',
          600: '#6aaa00',
          700: '#558800'
        }
      },
      fontFamily: {
        display: ['Tahoma', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em'
      }
    }
  },
  plugins: []
}
