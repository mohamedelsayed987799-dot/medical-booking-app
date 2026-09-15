import { useEffect } from "react";
import useThemeStore from "../store/useThemeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme, initTheme } = useThemeStore();

  useEffect(() => {
    initTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="w-9 h-9 rounded-full border border-border dark:border-slate-600 flex items-center justify-center text-muted hover:text-primary transition-colors"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
