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
          DEFAULT: '#4F46E5', // Indigo
          glow: 'rgba(79, 70, 229, 0.5)', 
        },
        success: {
          DEFAULT: '#10B981', // Emerald
          glow: 'rgba(16, 185, 129, 0.5)',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
          glow: 'rgba(245, 158, 11, 0.5)',
        },
        neutral: {
          DEFAULT: '#94A3B8', // Slate 400
          glow: 'rgba(148, 163, 184, 0.5)',
        },
        surface: {
          card: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(255, 255, 255, 0.08)',
        }
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(79, 70, 229, 0.3)',
        'glow-success': '0 0 20px rgba(16, 185, 129, 0.3)',
        'glow-warning': '0 0 20px rgba(245, 158, 11, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
