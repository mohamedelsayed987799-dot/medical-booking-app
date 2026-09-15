import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../services/doctorsService";
import useAppointmentsStore from "../store/useAppointmentsStore";
import useLanguageStore from "../store/useLanguageStore";
import ErrorMessage from "../components/ErrorMessage";

const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { addAppointment } = useAppointmentsStore();
  const { t } = useLanguageStore();

  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const loadDoctor = async () => {
    setStatus("loading");
    try {
      const data = await getDoctorById(doctorId);
      setDoctor(data);
      setStatus("success");
    } catch (err) {
      setError("Could not load this doctor. Please go back and try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (formData) => {
    setSubmitError(null);
    try {
      await addAppointment({
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        date: formData.date,
        time: formData.time,
        notes: formData.notes || "",
        status: "confirmed",
      });
      setSubmitted(true);
      setTimeout(() => navigate("/appointments"), 1200);
    } catch (err) {
      setSubmitError("Something went wrong while booking. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="max-w-xl mx-auto px-4 py-16">
        <div className="skeleton h-6 w-1/2 rounded mb-4" />
        <div className="skeleton h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (status === "error") {
    return <ErrorMessage message={error} onRetry={loadDoctor} />;
  }

  return (
    <div className="max-w-xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-semibold text-heading dark:text-white mb-1">
        {t("book_title")}
      </h1>
      <p className="text-muted text-sm mb-6">
        {t("with_word")} <span className="font-medium text-heading dark:text-slate-100">{doctor.name}</span> &middot; {doctor.specialty}
      </p>

      {submitted && (
        <div className="mb-4 px-4 py-3 rounded bg-secondary-light text-secondary text-sm font-medium">
          ✅ {t("booked_success")}
        </div>
      )}
      {submitError && (
        <div className="mb-4 px-4 py-3 rounded bg-danger-light text-danger text-sm font-medium">
          {submitError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("full_name")}
          </label>
          <input
            type="text"
            {...register("patientName", {
              required: "Your name is required",
              minLength: { value: 2, message: "Name is too short" },
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="e.g. Mohamed Ahmed"
          />
          {errors.patientName && (
            <p className="text-danger text-xs mt-1">{errors.patientName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("phone_number")}
          </label>
          <input
            type="tel"
            {...register("patientPhone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\s-]{8,15}$/,
                message: "Enter a valid phone number",
              },
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="e.g. 01012345678"
          />
          {errors.patientPhone && (
            <p className="text-danger text-xs mt-1">{errors.patientPhone.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
              {t("date")}
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
              {t("time")}
            </label>
            <select
              {...register("time", { required: "Please select a time" })}
              className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              defaultValue=""
            >
              <option value="" disabled>
                {t("select_slot")}
              </option>
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
        </div>

        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("notes_optional")}
          </label>
          <textarea
            {...register("notes")}
            rows={3}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="Anything the doctor should know beforehand"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {isSubmitting ? t("booking") : t("confirm_appointment")}
        </button>
      </form>
    </div>
  );
}
