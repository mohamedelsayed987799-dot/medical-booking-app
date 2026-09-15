import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAppointmentsStore from "../store/useAppointmentsStore";
import useLanguageStore from "../store/useLanguageStore";
import AppointmentCard from "../components/AppointmentCard";
import RescheduleModal from "../components/RescheduleModal";
import { AppointmentCardSkeleton } from "../components/LoadingSkeleton";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";

export default function Appointments() {
  const {
    appointments,
    status,
    error,
    fetchAppointments,
    editAppointment,
    removeAppointment,
  } = useAppointmentsStore();
  const { t } = useLanguageStore();

  const [editingAppointment, setEditingAppointment] = useState(null);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleSaveReschedule = async (id, data) => {
    await editAppointment(id, { ...editingAppointment, ...data });
    setEditingAppointment(null);
  };

  const handleConfirmCancel = async () => {
    await removeAppointment(cancelId);
    setCancelId(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-heading dark:text-white">
          {t("appointments_title")}
        </h1>
        <Link
          to="/doctors"
          className="px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          + {t("new_appointment")}
        </Link>
      </div>

      {status === "loading" && (
        <div className="space-y-4">
          <AppointmentCardSkeleton />
          <AppointmentCardSkeleton />
        </div>
      )}

      {status === "error" && (
        <ErrorMessage message={error} onRetry={fetchAppointments} />
      )}

      {status === "success" && appointments.length === 0 && (
        <EmptyState
          icon="🗓️"
          title={t("no_appt_title")}
          description={t("no_appt_desc")}
        />
      )}

      {status === "success" && appointments.length > 0 && (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <AppointmentCard
              key={appt.id}
              appointment={appt}
              onEdit={setEditingAppointment}
              onCancel={setCancelId}
            />
          ))}
        </div>
      )}

      {editingAppointment && (
        <RescheduleModal
          appointment={editingAppointment}
          onClose={() => setEditingAppointment(null)}
          onSave={handleSaveReschedule}
        />
      )}

      {cancelId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-surface dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm text-center animate-fade-in">
            <span className="text-3xl">⚠️</span>
            <h2 className="font-semibold text-heading dark:text-white mt-2 mb-1">
              {t("confirm_cancel_title")}
            </h2>
            <p className="text-sm text-muted mb-5">{t("confirm_cancel_desc")}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
              >
                {t("keep_it")}
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded bg-danger text-white text-sm font-medium hover:bg-red-600 transition-colors"
              >
                {t("yes_cancel")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
