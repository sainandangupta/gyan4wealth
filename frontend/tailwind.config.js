/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0F2A5C',
          dark: '#0a1d40',
        },
        blue: {
          DEFAULT: '#1450C4',
        },
        green: {
          DEFAULT: '#17A65A',
        },
        gold: {
          DEFAULT: '#F2A71B',
        },
        'off-white': '#F7F9FC',
        'green-tint': '#EAF7F0',
        'gold-tint': '#FFF6E5',
        'slate-text': '#475569',
      },
      borderRadius: {
        'sm': '12px',
        'card': '20px',
        'panel': '28px',
      },
      boxShadow: {
        resting: '0 4px 20px rgba(15,42,92,0.08)',
        'glow-gold': '0 12px 24px -4px rgba(242,167,27,0.25), 0 4px 12px -2px rgba(242,167,27,0.15)',
        'glow-green': '0 12px 24px -4px rgba(23,166,90,0.25), 0 4px 12px -2px rgba(23,166,90,0.15)',
        'glow-blue': '0 12px 24px -4px rgba(20,80,196,0.25), 0 4px 12px -2px rgba(20,80,196,0.15)',
        'glow-navy': '0 12px 24px -4px rgba(15,42,92,0.25), 0 4px 12px -2px rgba(15,42,92,0.15)',
        'glow-warm-green': '0 12px 24px -4px rgba(34,197,94,0.25), 0 4px 12px -2px rgba(34,197,94,0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['40px', { lineHeight: '1.6', fontWeight: '700' }],
        'h2': ['28px', { lineHeight: '1.6', fontWeight: '700' }],
        'h3': ['20px', { lineHeight: '1.6', fontWeight: '700' }],
        'body': ['15px', { lineHeight: '1.6' }],
        'body-lg': ['16px', { lineHeight: '1.6' }],
      }
    },
  },
  plugins: [],
}
