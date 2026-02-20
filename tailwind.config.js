/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#6366F1', // Brighter Indigo
          glow: 'rgba(99, 102, 241, 0.6)', 
        },
        success: {
          DEFAULT: '#22C55E', // Brighter Green
          glow: 'rgba(34, 197, 94, 0.6)',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          glow: 'rgba(245, 158, 11, 0.6)',
        },
        neutral: {
          DEFAULT: '#94A3B8', // Slate 400
          glow: 'rgba(148, 163, 184, 0.4)',
        },
        surface: {
          card: 'rgba(255, 255, 255, 0.03)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.06)',
        }
      },
      boxShadow: {
        'glow-primary': '0 0 25px rgba(99, 102, 241, 0.4)',
        'glow-success': '0 0 25px rgba(34, 197, 94, 0.4)',
        'glow-warning': '0 0 25px rgba(245, 158, 11, 0.4)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
