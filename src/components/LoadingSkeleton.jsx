export function DoctorCardSkeleton() {
  return (
    <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-5 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-14 h-14 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="skeleton h-3 w-full rounded" />
      <div className="skeleton h-3 w-4/5 rounded" />
      <div className="flex gap-2 mt-1">
        <div className="skeleton h-9 flex-1 rounded" />
        <div className="skeleton h-9 flex-1 rounded" />
      </div>
    </div>
  );
}

export function DoctorGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <DoctorCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AppointmentCardSkeleton() {
  return (
    <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-5 flex items-center justify-between">
      <div className="space-y-2 w-2/3">
        <div className="skeleton h-4 w-1/2 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-3 w-2/3 rounded" />
      </div>
      <div className="skeleton h-9 w-20 rounded" />
    </div>
  );
}
