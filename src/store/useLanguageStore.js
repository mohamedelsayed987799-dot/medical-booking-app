import { create } from "zustand";
import translations from "../i18n/translations";

const STORAGE_KEY = "curacare_lang";

const getInitialLang = () => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem(STORAGE_KEY) || "en";
};

const useLanguageStore = create((set, get) => ({
  lang: getInitialLang(),

  setLang: (lang) => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    set({ lang });
  },

  toggleLang: () => {
    const next = get().lang === "en" ? "ar" : "en";
    get().setLang(next);
  },

  // Translation helper: t("home_title") -> matching string in current language
  t: (key) => {
    const { lang } = get();
    return translations[lang]?.[key] || translations.en[key] || key;
  },

  initLang: () => {
    const { lang } = get();
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  },
}));

export default useLanguageStore;
