import useLanguageStore from "../store/useLanguageStore";

export default function FilterChips({ options, active, onSelect }) {
  const { t } = useLanguageStore();

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option === active;
        const label = option === "All" ? t("filter_all") : option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
              isActive
                ? "bg-tertiary border-primary text-primary font-medium"
                : "bg-surface dark:bg-slate-800 border-border dark:border-slate-600 text-muted hover:text-heading dark:hover:text-white"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
