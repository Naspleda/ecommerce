import type { Config } from 'tailwindcss'

export default {
    content: [
        './app/components/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#FF6B00',
                    50: '#FFF3E6',
                    100: '#FFE0BF',
                    200: '#FFCC99',
                    300: '#FFB366',
                    400: '#FF9933',
                    500: '#FF6B00',
                    600: '#E65C00',
                    700: '#CC5200',
                    800: '#B34700',
                    900: '#993D00',
                },
                dark: {
                    DEFAULT: '#0D0D0D',
                    50: '#404040',
                    100: '#363636',
                    200: '#2D2D2D',
                    300: '#262626',
                    400: '#1F1F1F',
                    500: '#1A1A1A',
                    600: '#141414',
                    700: '#0F0F0F',
                    800: '#0D0D0D',
                    900: '#080808',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glow': '0 0 20px rgba(255, 107, 0, 0.3)',
                'glow-lg': '0 0 40px rgba(255, 107, 0, 0.4)',
            },
        },
    },
    plugins: [],
} satisfies Config
