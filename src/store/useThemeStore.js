import { create } from "zustand";

const getInitialTheme = () => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useThemeStore = create((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    document.documentElement.classList.toggle("dark", next === "dark");
    set({ theme: next });
  },
  initTheme: () => {
    document.documentElement.classList.toggle("dark", get().theme === "dark");
  },
}));

export default useThemeStore;
