import { heroui, semanticColors } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(autocomplete|avatar|button|card|chip|date-picker|divider|dropdown|input|link|number-input|tabs|user|ripple|spinner|form|listbox|popover|scroll-shadow|calendar|date-input|menu).js',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fefce8',
              100: '#fef9c3',
              200: '#fef08a',
              300: '#fef08a',
              400: '#facc15',
              500: '#eab308',
              600: '#ca8a04',
              700: '#a16207',
              800: '#854d0e',
              900: '#713f12',
              foreground: semanticColors.light.background.DEFAULT,
              DEFAULT: '#facc15',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#fefce8',
              100: '#fef9c3',
              200: '#fef08a',
              300: '#fef08a',
              400: '#facc15',
              500: '#eab308',
              600: '#ca8a04',
              700: '#a16207',
              800: '#854d0e',
              900: '#713f12',
              foreground: semanticColors.dark.background.DEFAULT,
              DEFAULT: '#facc15',
            },
          },
        },
      },
      layout: {
        radius: {
          small: '1px',
          medium: '2px',
          large: '4px',
        },
      },
    }),
  ],
} satisfies Config;
