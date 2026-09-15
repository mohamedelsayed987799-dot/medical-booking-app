import { useForm } from "react-hook-form";

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export default function RescheduleModal({ appointment, onClose, onSave }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      date: appointment.date,
      time: appointment.time,
    },
  });

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    await onSave(appointment.id, data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-surface dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm animate-fade-in">
        <h2 className="font-semibold text-heading dark:text-white mb-1">
          Reschedule Appointment
        </h2>
        <p className="text-sm text-muted mb-4">
          {appointment.doctorName} &middot; {appointment.specialty}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
              New Date
            </label>
            <input
              type="date"
              min={today}
              {...register("date", { required: "Please select a date" })}
              className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            {errors.date && (
              <p className="text-danger text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
              New Time
            </label>
            <select
              {...register("time", { required: "Please select a time" })}
              className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            {errors.time && (
              <p className="text-danger text-xs mt-1">{errors.time.message}</p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
