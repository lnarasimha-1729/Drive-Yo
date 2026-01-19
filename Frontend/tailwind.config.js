module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
  keyframes: {
    placeholderSlideUp: {
      "0%": {
        opacity: "0",
        transform: "translateY(6px)"
      },
      "100%": {
        opacity: "1",
        transform: "translateY(0)"
      }
    }
  },
  animation: {
    placeholderSlideUp: "placeholderSlideUp 0.35s ease forwards"
  },
  fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
    },
}


  },
  plugins: []
};
