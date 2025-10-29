/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#667eea',
          purple: '#764ba2',
          sky: '#0284c7',
          skyDark: '#0369a1',
          green: '#48bb78',
          orange: '#f6ad55',
          red: '#f56565',
          dark: '#000300',
        }
      }
    },
  },
  plugins: [],
}

