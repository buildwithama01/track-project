/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Design Tokens
        background: '#F4F8FA',
        foreground: '#0F172A',
        primary: {
          DEFAULT: '#3FA9E2', // Blue
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#23A154', // Green
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#EA3138', // Red
          foreground: '#FFFFFF',
        },
        muted: {
          DEFAULT: '#EBF3F7',
          foreground: '#64748B',
        },
        destructive: {
          DEFAULT: '#BF863F', // Destructive amber
          foreground: '#FFFFFF',
        },
        border: '#DDE7ED',
        input: '#FFFFFF',
        card: '#FFFFFF',
        'card-foreground': '#0F172A',
      },
      borderRadius: {
        base: '10px',
      },
      boxShadow: {
        // High-quality subtle shadow from the image inspiration
        'custom-shadow': '-2px 4px 12px 4px rgba(51,51,51,0.05)',
      },
      fontFamily: {
        // Using Inter as primary sans
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}