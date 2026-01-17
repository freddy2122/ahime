/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs primaires : Bleu nuit et Orange
        primary: {
          // Bleu nuit
          50: '#e6e8f0',
          100: '#b8bdd3',
          200: '#8a92b6',
          300: '#5c6799',
          400: '#3d4a7c',
          500: '#1e2d5f', // Bleu nuit principal
          600: '#18244a',
          700: '#121b35',
          800: '#0c1220',
          900: '#06090b',
        },
        accent: {
          // Orange
          50: '#fff4e6',
          100: '#ffe0b3',
          200: '#ffcc80',
          300: '#ffb84d',
          400: '#ffa41a',
          500: '#ff9000', // Orange principal
          600: '#cc7300',
          700: '#995600',
          800: '#663900',
          900: '#331c00',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Raleway', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
        cta: ['Raleway', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
