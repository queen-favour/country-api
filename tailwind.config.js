/** @type {import('tailwindcss').Config} */
export default {
  // darkMode: ['selector', '[data-mode="dark"]'],
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

  ],
  theme: {
    extend: {
      colors:{
      'Lighter-gray': 'hsl(0, 0%, 98%)', //light gray background
      'dark-blue': 'hsl(209, 23%, 22%)',//dark mode element
      'darker-blue1': 'hsl(207, 26%, 17%)', //Dark Mode Background
      'darker-blue2': 'hsl(200, 15%, 8%)', //Light Mode Text
      'dark-gray': 'hsl(0, 0%, 52%)', //Light Mode Input
      'white': 'hsl(0, 0%, 100%)' //Dark Mode Text & Light Mode Element
    }
    },
  },
  plugins: [],
}

