import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/components/(autocomplete|avatar|button|card|chip|date-picker|divider|dropdown|input|link|number-input|user|ripple|spinner|form|listbox|popover|scroll-shadow|calendar|date-input|menu).js',
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
