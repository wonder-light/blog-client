/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'm-lg': { max: '1024px' },
            },
            spacing: {
                '65': '16.25rem',
                '75': '18.75rem',
                '83': '20.75rem',
            },
            animation: {
                'text-flashing': 'text-flashing 4s linear 0s infinite both',
            },
            keyframes: {
                'text-flashing': {
                    '0%, 100%': { color: '#55f5c7' },
                    '25%': { color: '#fff360' },
                    '50%': { color: '#ff72cd' },
                    '75%': { color: '#948aff' },
                }
            },
            rotate: {
                '30': '30deg',
                '60': '60deg',
            }
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
    ],
    prefix: 'tw-'
}
