/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#E76F51', // terracotta
        'primary-50': '#FEF2F0', // terracotta-50
        'primary-100': '#FDE4DF', // terracotta-100
        'primary-200': '#FACDC0', // terracotta-200
        'primary-300': '#F6AE9A', // terracotta-300
        'primary-400': '#F18F74', // terracotta-400
        'primary-500': '#E76F51', // terracotta-500
        'primary-600': '#D85A3E', // terracotta-600
        'primary-700': '#B8472F', // terracotta-700
        'primary-800': '#983A26', // terracotta-800
        'primary-900': '#7D2F1F', // terracotta-900
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#F4A261', // turmeric
        'secondary-50': '#FFFBF5', // turmeric-50
        'secondary-100': '#FEF5E7', // turmeric-100
        'secondary-200': '#FDEACC', // turmeric-200
        'secondary-300': '#FBDEB0', // turmeric-300
        'secondary-400': '#F8D194', // turmeric-400
        'secondary-500': '#F4A261', // turmeric-500
        'secondary-600': '#E89344', // turmeric-600
        'secondary-700': '#D17E2A', // turmeric-700
        'secondary-800': '#B56A1C', // turmeric-800
        'secondary-900': '#945714', // turmeric-900
        'secondary-foreground': '#264653', // forest

        // Accent Colors
        'accent': '#2A9D8F', // sage
        'accent-50': '#F0FDFA', // sage-50
        'accent-100': '#CCFBF1', // sage-100
        'accent-200': '#99F6E4', // sage-200
        'accent-300': '#5EEAD4', // sage-300
        'accent-400': '#2DD4BF', // sage-400
        'accent-500': '#2A9D8F', // sage-500
        'accent-600': '#0D9488', // sage-600
        'accent-700': '#0F766E', // sage-700
        'accent-800': '#115E59', // sage-800
        'accent-900': '#134E4A', // sage-900
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#FEFAE0', // warm-cream
        'background-50': '#FEFAE0', // warm-cream-50
        'background-100': '#FEF7C3', // warm-cream-100
        'background-200': '#FEF08A', // warm-cream-200
        'background-300': '#FDE047', // warm-cream-300
        'background-400': '#FACC15', // warm-cream-400
        'background-500': '#EAB308', // warm-cream-500
        'background-600': '#CA8A04', // warm-cream-600
        'background-700': '#A16207', // warm-cream-700
        'background-800': '#854D0E', // warm-cream-800
        'background-900': '#713F12', // warm-cream-900

        // Surface Colors
        'surface': '#FFFFFF', // white
        'surface-50': '#FAFAFA', // gray-50
        'surface-100': '#F5F5F5', // gray-100
        'surface-200': '#EEEEEE', // gray-200
        'surface-300': '#E0E0E0', // gray-300
        'surface-400': '#BDBDBD', // gray-400
        'surface-500': '#9E9E9E', // gray-500
        'surface-600': '#757575', // gray-600
        'surface-700': '#616161', // gray-700
        'surface-800': '#424242', // gray-800
        'surface-900': '#212121', // gray-900

        // Text Colors
        'text-primary': '#264653', // forest
        'text-secondary': '#6B7280', // gray-500
        'text-muted': '#9CA3AF', // gray-400
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#10B981', // emerald-500
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-300': '#6EE7B7', // emerald-300
        'success-400': '#34D399', // emerald-400
        'success-500': '#10B981', // emerald-500
        'success-600': '#059669', // emerald-600
        'success-700': '#047857', // emerald-700
        'success-800': '#065F46', // emerald-800
        'success-900': '#064E3B', // emerald-900
        'success-foreground': '#FFFFFF', // white

        'warning': '#F59E0B', // amber-500
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-300': '#FCD34D', // amber-300
        'warning-400': '#FBBF24', // amber-400
        'warning-500': '#F59E0B', // amber-500
        'warning-600': '#D97706', // amber-600
        'warning-700': '#B45309', // amber-700
        'warning-800': '#92400E', // amber-800
        'warning-900': '#78350F', // amber-900
        'warning-foreground': '#FFFFFF', // white

        'error': '#EF4444', // red-500
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-300': '#FCA5A5', // red-300
        'error-400': '#F87171', // red-400
        'error-500': '#EF4444', // red-500
        'error-600': '#DC2626', // red-600
        'error-700': '#B91C1C', // red-700
        'error-800': '#991B1B', // red-800
        'error-900': '#7F1D1D', // red-900
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': 'rgba(42, 157, 143, 0.2)', // sage with opacity
        'border-light': 'rgba(42, 157, 143, 0.1)', // sage with light opacity
        'border-strong': 'rgba(42, 157, 143, 0.4)', // sage with strong opacity
      },
      fontFamily: {
        'heading': ['Mukta', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Mukta', 'sans-serif'],
        'data': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'cultural': '0 4px 12px rgba(231, 111, 81, 0.15)', // terracotta shadow
        'cultural-subtle': '0 2px 4px rgba(231, 111, 81, 0.1)', // subtle terracotta shadow
        'cultural-moderate': '0 8px 16px rgba(231, 111, 81, 0.12)', // moderate terracotta shadow
        'cultural-prominent': '0 16px 32px rgba(231, 111, 81, 0.18)', // prominent terracotta shadow
      },
      borderRadius: {
        'cultural': '8px',
        'cultural-sm': '4px',
        'cultural-lg': '12px',
        'cultural-xl': '16px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'confetti': 'confetti 1000ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
        },
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'cultural': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      maxWidth: {
        'content': '1200px',
      },
      minHeight: {
        'touch': '48px',
        'touch-mobile': '56px',
      },
      minWidth: {
        'touch': '48px',
        'touch-mobile': '56px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}