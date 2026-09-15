export default function SearchBar({ value, onChange, placeholder = "Search doctors by name..." }) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-placeholder">
        🔍
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-800 dark:text-white text-sm placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
      />
    </div>
  );
}
