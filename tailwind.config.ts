import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-hind)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // Palette taken from the Figma tokens (Bazardor / Color / Light)
    themes: [
      {
        bazar: {
          primary: "#05893e",
          "primary-content": "#f3fbf4",
          secondary: "#1a9951",
          "secondary-content": "#ffffff",
          accent: "#1a9951",
          neutral: "#1d271f",
          "neutral-content": "#fafcfa",
          "base-100": "#fafcfa",
          "base-200": "#f0f5f0",
          "base-300": "#e1e8e1",
          "base-content": "#1d271f",
          success: "#1a9951",
          error: "#d03739",
          "error-content": "#fff6f5",
        },
      },
    ],
  },
};
export default config;
