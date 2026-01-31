import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      text_10_15: ['0.625rem', { lineHeight: '0.9375rem', letterSpacing: '0' }], // 10px, 15px, 0
      text_11_14: ['0.6875rem', { lineHeight: '0.875rem', letterSpacing: '0' }], // 11px, 14px, 0
      text_11_18: ['0.6875rem', { lineHeight: '1.125rem', letterSpacing: '0' }], // 11px, 18px, 0
      'text_11_20_m0.4': ['0.6875rem', { lineHeight: '1.25rem', letterSpacing: '-0.025rem' }], // 11px, 20px, -0.4px
      'text_11_22_m0.4': ['0.6875rem', { lineHeight: '1.375rem', letterSpacing: '-0.025rem' }], // 11px, 22px, -1px
      text_12_16: ['0.75rem', { lineHeight: '1rem', letterSpacing: '0' }], // 12px, 16px, 0
      text_12_18: ['0.75rem', { lineHeight: '1.125rem', letterSpacing: '0' }], // 12px, 18px, 0
      text_12_20: ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '0' }], // 12px, 20px, 0
      text_12_22: ['0.75rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 12px, 22px, 0
      text_12_24: ['0.75rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 12px, 24px, 0
      'text_12_20_m0.4': ['0.75rem', { lineHeight: '1.25rem', letterSpacing: '-0.025rem' }], // 12px, 20px, -1px
      text_13_18: ['0.8125rem', { lineHeight: '1.125rem', letterSpacing: '0' }], // 13px, 18px, 0
      text_13_20: ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0' }], // 13px, 20px, 0
      'text_13_20_m0.4': ['0.8125rem', { lineHeight: '1.25rem', letterSpacing: '0.025rem' }], // 13px, 20px, 0.4px
      text_13_22: ['0.8125rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 13px, 22px, 0
      text_13_24: ['0.8125rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 13px, 24px, 0
      text_14_20: ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0' }], // 14px, 20px, 0
      text_14_22: ['0.875rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 14px, 22px, 0
      text_14_24: ['0.875rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 14px, 24px, 0
      text_15_18: ['0.9375rem', { lineHeight: '1.125rem', letterSpacing: '0' }], // 15px, 18px, 0
      text_15_20: ['0.9375rem', { lineHeight: '1.25rem', letterSpacing: '0' }], // 15px, 20px, 0
      text_15_22: ['0.9375rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 15px, 22px, 0
      text_15_24: ['0.9375rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 15px, 24px, 0
      text_16_22: ['1rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 16px, 22px, 0
      text_16_24: ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 16px, 24px, 0
      text_16_26: ['1rem', { lineHeight: '1.625rem', letterSpacing: '0' }], // 16px, 26px, 0
      text_16_28: ['1rem', { lineHeight: '1.75rem', letterSpacing: '0' }], // 16px, 28px, 0
      text_17_28: ['1.0625rem', { lineHeight: '1.75rem', letterSpacing: '0' }], // 17px, 28px, 0
      text_18_22: ['1.125rem', { lineHeight: '1.375rem', letterSpacing: '0' }], // 18px, 22px, 0
      text_18_24: ['1.125rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 18px, 24px, 0
      text_20_24: ['1.25rem', { lineHeight: '1.5rem', letterSpacing: '0' }], // 20px, 24px, 0
      text_20_28: ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }], // 20px, 28px, 0
      'text_20_28_m0.4': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0.025rem' }], // 20px, 28px, 0.4px
      'text_22_28_m0.4': ['1.375rem', { lineHeight: '1.75rem', letterSpacing: '-0.025rem' }], // 22px, 28px, -1px
      text_28_32: ['1.75rem', { lineHeight: '2rem', letterSpacing: '0' }], // 28px, 32px, 0
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    extend: {
      fontFamily: {
        sans: ['GounBatang', 'var(--font-nanum)', 'sans-serif'],
        sfprodisplay: ['var(--font-sfprodisplay)', 'sans-serif'],
        nanum: ['var(--font-nanum)', 'sans-serif'],
        cookierun: ['var(--font-cookierun)', 'sans-serif'],
        blackhansans: ['var(--font-blackhansans)', 'sans-serif'],
        gangwon: ['var(--font-gangwon)', 'sans-serif'],
        gounbatang: ['GounBatang', 'sans-serif'],
      },
      colors: {
        // shadcn/ui colors
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // 기존 커스텀 색상 유지
        'primary-custom': '#3D1D1D',
        'secondary-custom': '#ef2222',
        teritary: '#101646',
        fourth: '#e0e9ff',
        'gray-06': '#929292',
        carrot: {
          primary: '#FF8C42',
          light: '#FFB366',
          dark: '#E6732A',
        },
        rabbit: {
          brown: '#8B4513',
          light: '#D2691E',
        },
        cream: {
          base: '#FFF8E7',
          light: '#FFFBF0',
        },
        element: {
          wood: '#4c8093',
          fire: '#e57576',
          earth: '#cfa05a',
          metal: '#968f88',
          water: '#4a4955',
        },
      },
      screens: {
        xsm: '320px',
        mobile: '430px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // 기존 커스텀 border radius 유지
        '2xsm': '0.25rem', // 4px
        xsm: '0.5rem', // 8px
        'sm-custom': '0.625rem', // 10px
        'md-custom': '0.75rem', // 12px
        'lg-custom': '0.875rem', // 14px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
    },
  },
  plugins: [require('tailwindcss-safe-area-capacitor')],
}
export default config
