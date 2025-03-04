/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                logoBarBlue: "#252a48",
                customBlue: "#181e38",
                buttonBlue: "#605fc9",
                customGrey: "#3c4157"
            },
        },
    },
    plugins: [],
}

