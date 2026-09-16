import { useState } from "react";
import { useForm } from "react-hook-form";
import useLanguageStore from "../store/useLanguageStore";
import { createComplaint } from "../services/complaintsService";

const contactNumbers = [
  { key: "contact_general", icon: "📞", number: "19865" },
  { key: "contact_appointments_desk", icon: "🗓️", number: "+20 11 010 96128" },
  { key: "contact_emergency", icon: "🚑", number: "123" },
];

export default function Contact() {
  const { t } = useLanguageStore();
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    setSubmitError(null);
    try {
      await createComplaint({
        ...formData,
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl font-semibold text-heading dark:text-white mb-1">
        {t("contact_title")}
      </h1>
      <p className="text-muted text-sm mb-8">{t("contact_subtitle")}</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact numbers */}
        <div>
          <h2 className="font-semibold text-heading dark:text-white mb-4">
            {t("contact_numbers")}
          </h2>
          <div className="space-y-3">
            {contactNumbers.map((c) => (
              <div
                key={c.key}
                className="flex items-center gap-3 bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-4"
              >
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <p className="text-sm text-muted">{t(c.key)}</p>
                  <p
                    className="font-semibold text-heading dark:text-white"
                    dir="ltr"
                  >
                    {c.number}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Complaint / inquiry form */}
        <div>
          <h2 className="font-semibold text-heading dark:text-white mb-4">
            {t("complaint_form_title")}
          </h2>

          {submitted && (
            <div className="mb-4 px-4 py-3 rounded bg-secondary-light text-secondary text-sm font-medium">
              ✅ {t("complaint_success")}
            </div>
          )}
          {submitError && (
            <div className="mb-4 px-4 py-3 rounded bg-danger-light text-danger text-sm font-medium">
              {submitError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-5 space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
                {t("full_name")}
              </label>
              <input
                type="text"
                {...register("name", { required: t("required_field") })}
                className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.name && (
                <p className="text-danger text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
                {t("phone_number")}
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: t("required_field"),
                  pattern: {
                    value: /^[0-9+\s-]{8,15}$/,
                    message: "Enter a valid phone number",
                  },
                })}
                className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.phone && (
                <p className="text-danger text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
                {t("subject")}
              </label>
              <select
                {...register("subject", { required: t("required_field") })}
                defaultValue=""
                className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="" disabled>
                  {t("subject_placeholder")}
                </option>
                <option value="general">{t("subject_general")}</option>
                <option value="complaint">{t("subject_complaint")}</option>
                <option value="appointment_issue">
                  {t("subject_appointment_issue")}
                </option>
                <option value="other">{t("subject_other")}</option>
              </select>
              {errors.subject && (
                <p className="text-danger text-xs mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
                {t("message")}
              </label>
              <textarea
                rows={4}
                {...register("message", {
                  required: t("required_field"),
                  minLength: {
                    value: 10,
                    message: "Please add a bit more detail",
                  },
                })}
                className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
              {errors.message && (
                <p className="text-danger text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
