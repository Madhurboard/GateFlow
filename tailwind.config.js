/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Steel Blue
          light: '#DBEAFE',
          dark: '#1D4ED8',
        },
        secondary: {
          DEFAULT: '#64748B', // Slate
          light: '#F1F5F9',
          dark: '#334155',
        },
        success: {
          DEFAULT: '#10B981', // Emerald
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber
        },
        surface: {
          DEFAULT: '#FFFFFF',
          card: '#FFFFFF',
          border: '#E2E8F0',
          hover: '#F8FAFC',
          muted: '#F1F5F9',
        },
        // Dark mode surfaces
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
          hover: '#293548',
          muted: '#1E293B',
          surface: '#162032',
        }
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'soft-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 12px -2px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'card-dark': '0 2px 12px -2px rgba(0, 0, 0, 0.3)',
        'card-dark-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
