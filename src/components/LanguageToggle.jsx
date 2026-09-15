import { useEffect } from "react";
import useLanguageStore from "../store/useLanguageStore";

export default function LanguageToggle() {
  const { lang, toggleLang, initLang } = useLanguageStore();

  useEffect(() => {
    initLang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className="px-2.5 h-9 rounded-full border border-border dark:border-slate-600 text-xs font-semibold text-muted hover:text-primary transition-colors"
    >
      {lang === "en" ? "AR" : "EN"}
    </button>
  );
}
