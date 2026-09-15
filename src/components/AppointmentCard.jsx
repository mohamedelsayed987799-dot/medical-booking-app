export default function AppointmentCard({ appointment, onEdit, onCancel }) {
  const statusColors = {
    confirmed: "bg-secondary-light text-secondary",
    pending: "bg-tertiary text-primary",
    cancelled: "bg-danger-light text-danger",
  };

  return (
    <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
      <div>
        <h3 className="font-semibold text-heading dark:text-white">
          {appointment.doctorName}
        </h3>
        <p className="text-sm text-muted">{appointment.specialty}</p>
        <p className="text-sm text-muted mt-1">
          📅 {appointment.date} &middot; 🕐 {appointment.time}
        </p>
        <p className="text-sm text-muted">👤 {appointment.patientName}</p>
      </div>

      <div className="flex flex-col items-start sm:items-end gap-2">
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
            statusColors[appointment.status] || statusColors.pending
          }`}
        >
          {appointment.status || "pending"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(appointment)}
            className="px-3 py-1.5 rounded border border-border dark:border-slate-600 text-sm text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
          >
            Reschedule
          </button>
          <button
            onClick={() => onCancel(appointment.id)}
            className="px-3 py-1.5 rounded border border-danger/30 text-sm text-danger hover:bg-danger-light transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
