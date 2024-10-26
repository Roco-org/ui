// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "white-bg": "#FFFFFF", // White background
        "black-text": "#000000", // Black text
        "gray-bg": "#F0F0F0", // Light gray background for contrast
        "border-gray": "#D1D1D1", // Gray for borders
      },
    },
  },
  plugins: [],
};

export default config;
