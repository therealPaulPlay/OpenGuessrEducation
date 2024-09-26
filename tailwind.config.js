// tailwind.config.cjs
module.exports = {
  darkMode: 'class', // Enable dark mode switching via class
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.svelte',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff0808', // Set your primary color
      },
      borderRadius: {
        DEFAULT: '5px', // Set default border radius to 5px
        lg: '10px',
        xl: '15px',
      },
      fontFamily: {
        sans: ['Barlow', 'sans-serif'], // Use Barlow font as default
      },
    },
  },
  plugins: [require('daisyui')], // Add DaisyUI
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#ff0808',
          'secondary': '#ff6363',
          'accent': '#f5f5f5',
          'neutral': '#333333',
          'base-100': '#ffffff',
          'base-content': '#000000',
          'info': '#3ABFF8',
          'success': '#36D399',
          'warning': '#FBBD23',
          'error': '#F87272',
        },
      },
    ],
  },
};