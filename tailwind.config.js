/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                'm-lg': { max: '1024px' },
            },
            spacing: {
                '65': '16.25rem',
                '75': '18.75rem',
                '83': '20.75rem',
            }
        },
    },
    plugins: [],
}
