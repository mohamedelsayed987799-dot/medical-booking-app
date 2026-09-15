export default function EmptyState({ icon = "🗒️", title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <span className="text-4xl mb-3">{icon}</span>
      <h3 className="font-semibold text-heading dark:text-white mb-1">{title}</h3>
      {description && <p className="text-sm text-muted max-w-sm">{description}</p>}
    </div>
  );
}
