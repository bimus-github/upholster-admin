/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-one-time": "spin 2s linear 1",
        "spin-speed-one-time": "spin 1s linear 1",
        "animate-bounce-one-time": "bounce 2s linear 1",
        "ping-one-time": "ping-sm 1s linear 1",
        "ping-sm": "ping-sm 1s linear infinite",
        "flip-load": "flip-load 2s linear infinite",
      },
      keyframes: {
        "ping-sm": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(0.9)", opacity: "0.9" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "flip-load": {
          "0%": { transform: "rotateX(0deg) rotateY(0deg)" },
          "25%": { transform: "rotateX(0deg) rotateY(180deg)" },
          "50%": { transform: "rotateX(180deg) rotateY(180deg)" },
          "75%": { transform: "rotateX(180deg) rotateY(0deg)" },
          "100%": { transform: "rotateX(0deg) rotateY(0deg)" },
        },
      },
    },
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }

      xs: { max: "479px" },
    },
  },
  plugins: [],
};
