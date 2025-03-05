import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js", // For datepicker styles
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"], // Use Plus Jakarta Sans as the default sans font
        serif: ["var(--font-instrument)", "serif"], // Use Instrument Serif as the default serif font
      },
    },
  },
  plugins: [
    require("tailwindcss"), // Add the animation plugin
  ],
} satisfies Config;