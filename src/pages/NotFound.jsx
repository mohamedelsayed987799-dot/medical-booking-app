import { Link } from "react-router-dom";
import useLanguageStore from "../store/useLanguageStore";

export default function NotFound() {
  const { t } = useLanguageStore();
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <span className="text-6xl">🩺</span>
      <h1 className="text-3xl font-bold text-heading dark:text-white mt-4 mb-2">
        {t("not_found_title")}
      </h1>
      <p className="text-muted mb-6">{t("not_found_desc")}</p>
      <Link
        to="/"
        className="inline-block px-5 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
      >
        {t("back_home")}
      </Link>
    </div>
  );
}
