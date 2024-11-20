/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'], // Adjust based on your project structure
  darkMode: 'class', // Use 'class' mode for toggling dark mode
  theme: {
    extend: {
      colors: {
        // Light mode theme colors
        primary: '#D2CEFA',
        secondary: '#64748b',
        bgColor: '#fafafa',
        borderColor: '#AAAAAA',
        textColor: '#484848',
        primaryTextColor: '#D2CEFA',
        cardBg: '#FAFAFA',

        // Dark mode theme colors
        darkPrimary: '#D2CEFA',
        darkSecondary: '#334155',
        darkBgColor: '#272727',
        darkBorderColor: '#343434',
        darkTextColor: '#AAAAAA',
        darkPrimaryTextColor: '#D2CEFA',
        darkCardBg: '#211F1F'
      },
      height: {
        "5v": "5vh",
        "10v": "10vh",
        "15v": "15vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "85v": "85vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [],
}
