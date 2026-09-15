import useLanguageStore from "../store/useLanguageStore";

export default function ErrorMessage({ message, onRetry }) {
  const { t } = useLanguageStore();
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <span className="text-4xl mb-3">⚠️</span>
      <h3 className="font-semibold text-danger mb-1">{t("error_title")}</h3>
      <p className="text-sm text-muted max-w-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          {t("try_again")}
        </button>
      )}
    </div>
  );
}
