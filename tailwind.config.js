/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },
        secondary: {
          DEFAULT: "#10B981",
          light: "#ECFDF5",
        },
        tertiary: "#EBF3FA",
        surface: "#FFFFFF",
        background: "#F8FAFC",
        border: "#E2E8F0",
        muted: "#64748B",
        placeholder: "#94A3B8",
        heading: "#1E293B",
        danger: {
          DEFAULT: "#EF4444",
          light: "#FEF2F2",
        },
      },
      borderRadius: {
        sm: "0.375rem",
        DEFAULT: "0.5rem",
        lg: "1rem",
        full: "9999px",
      },
      boxShadow: {
        soft: "0 1px 3px rgba(15, 23, 42, 0.06)",
        card: "0 1px 8px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};
