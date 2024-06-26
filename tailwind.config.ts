import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        translateX: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        translateX0: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        translateY: {
          '0%': { transform: 'translateY(-150%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      animation: {
          translateX: 'translateX 1.5s ease-in-out',
          translateX0: 'translateX 1.5s ease-in-out',
          translateY: 'translateY 1.5s ease-in-out',
        },
      }
    },
  plugins: [],
}
export default config
