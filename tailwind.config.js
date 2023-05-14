/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#7FFF00",    // Green Yellow
          secondary: "#32CD32",  // Lime Green
          accent: "#228B22",     // Forest Green
          neutral: "#F3F3F3",    // Light Gray
          "base-100": "#FFFFFF", // White
          info: "#6FA8DC",       // Sky Blue
          success: "#2E8B57",    // Sea Green
          warning: "#FFC125",    // Gold
          error: "#FF4500",      // Orange Red
        },
      },
    ],
  },
};
