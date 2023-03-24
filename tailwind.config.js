/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    content: [],
    theme: {
        screens: {
            'laptop': '1500px',
            'PC': '1700px'
        },
        extend: {},
    },
    plugins: [],
}
