/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "h-[427px]",
    "h-[300px]"
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      main: "#252B42",
      'light-gray-1': "#FAFAFA",
      'muted-text-color': "#BDBDBD",
      gray: "#737373",
      'light-blue': "#8EC2F2",
      'primary-blue': "#23A6F0",
      'success-green': "#2DC071",
      'dark-green': "#23856D"
    },
    extend: {
      fontFamily: {
        'montserrat': ['"Montserrat"'],
      },
      lineHeight: {
        '5.5': "1.375rem",  //22px
        '7.5': '1.875rem',  //30px
        '8': '1.5rem',      //24px
        '12.5': '3.125rem', //50px
        '20': '5rem',       //80px
      },
      maxWidth: {
        'page-content': '1050px',
      },
      fontSize: {
        '4.5xl': '2.5rem',  //40px 
        '6xl': '3.625rem'   //58px
      },
      borderWidth: {
        '1': '1px'
      }
    },

  },
  plugins: [],
}

