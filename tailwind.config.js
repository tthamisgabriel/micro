module.exports = {
  content: ["./apps/**/*.{js,jsx,html}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c"
        }
      },
      boxShadow: {
        panel: "0 20px 45px -25px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: []
};
