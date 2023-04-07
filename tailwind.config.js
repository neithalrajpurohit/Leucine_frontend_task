/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#f8d749",
            },
        },
    },
    daisyui: {
        themes: ["light"],
    },
    plugins: [require("daisyui")],
};
