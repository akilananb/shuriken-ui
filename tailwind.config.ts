/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "light-red": "#FFEDED",
        "noumura-light-red-500": "#FFEDED",
        "noumura-light-red-400": "#f7d2d2",
        "noumura-light-red-300": "#f7c6c6",

        "nomura-red": "#D71133",
        "nomura-red-400": "#ed1338",
        "nomura-red-300": "#f7284b",

        "nomura-white": "#FFF",
        "noumura-grey": "#999",
        "nomura-off-white": "#F9F9F9",
        "nomura-off-grey": "#D1D3D4",
        "nomura-dark-grey": "#323232",
      },
      fontSize: {
        "8px": "8px",
        "11px": "11px",
        "10px": "10px",
        "12px": "12px",
        "13px": "13px",
        "14px": "14px",
        "16px": "16px",
        "17px": "17px",
        "18px": "18px",
        "22px": "22px",
        "24px": "24px",
        "23px": "23px",
        "32px": "32px",
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
        "7xl": "5rem",
      },
    },
  },
  plugins: [],
};
export default config;
