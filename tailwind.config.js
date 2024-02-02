/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        font: "Inter",
        fontHeading: "Dune Rise",
      },
      colors: {
        primary: "#FF9800",
        secondary: "#FFA726",
        color: "rgba(255,255,255,0.8)",
        color2: "rgba(255,255,255,0.6)",
        color3: "rgba(255,255,255,0.4)",
        heading: "#FFFFFF",
        bg: "#1a1510",
        header: "#272727",
        popup: "#272727",
        box: "#323232",
        dark: "#2D3744",
        dark2: "#1b1b1b",
        border: "#343F51",
      },
      flex: {
        auto: "0 0 auto",
      },
      screens: {
        lg: "991px",
        // => @media (min-width: 991px) { ... }
      },
      backgroundImage: {
        main1: "url('/public/images/bgmain-1.png')",
        main2: "url('/public/images/bg-main2.png')",
        ser: "url('/public/images/bg-ser.jpg')",
      },
    },
  },
  plugins: [],
};
