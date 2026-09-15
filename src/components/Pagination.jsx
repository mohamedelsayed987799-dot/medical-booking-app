export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded border border-border dark:border-slate-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background dark:hover:bg-slate-700 transition-colors"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded text-sm font-medium transition-colors ${
            page === currentPage
              ? "bg-primary text-white"
              : "border border-border dark:border-slate-600 text-muted hover:text-heading dark:hover:text-white"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded border border-border dark:border-slate-600 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-background dark:hover:bg-slate-700 transition-colors"
      >
        Next
      </button>
    </div>
  );
}
