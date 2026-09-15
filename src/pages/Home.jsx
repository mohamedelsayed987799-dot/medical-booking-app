import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDoctorsStore from "../store/useDoctorsStore";
import useLanguageStore from "../store/useLanguageStore";
import DoctorCard from "../components/DoctorCard";
import { DoctorGridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { doctors, status, error, fetchDoctors } = useDoctorsStore();
  const { t } = useLanguageStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const featured = doctors.slice(0, 3);

  const features = [
    { icon: "🩺", title: t("feat1_title"), text: t("feat1_text") },
    { icon: "⏱️", title: t("feat2_title"), text: t("feat2_text") },
    { icon: "🔔", title: t("feat3_title"), text: t("feat3_text") },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-tertiary text-primary text-xs font-semibold uppercase tracking-wide mb-4">
            {t("home_badge")}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-heading dark:text-white leading-tight mb-4">
            {t("home_title")}
          </h1>
          <p className="text-muted text-base md:text-lg mb-6 max-w-md">
            {t("home_subtitle")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/doctors"
              className="px-5 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              {t("home_view_doctors")} →
            </Link>
            <Link
              to="/appointments"
              className="px-5 py-2.5 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-800 transition-colors"
            >
              {t("home_my_appointments")}
            </Link>
          </div>
        </div>

        <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6 shadow-soft">
          <p className="text-sm font-medium text-muted mb-3">
            {t("home_available_tomorrow")}
          </p>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {["09:30 AM", "11:15 AM", "03:45 PM"].map((slot, i) => (
              <span
                key={slot}
                className={`text-center py-2 rounded text-sm font-medium ${
                  i === 1
                    ? "bg-primary text-white"
                    : "bg-background dark:bg-slate-700 text-heading dark:text-slate-100"
                }`}
              >
                {slot}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-sm text-muted">
            <span>✅ {t("home_video_or_inperson")}</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-16">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">
            {t("home_diff_label")}
          </span>
          <h2 className="text-2xl font-semibold text-heading dark:text-white mt-2">
            {t("home_diff_title")}
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6"
            >
              <span className="text-3xl">{f.icon}</span>
              <h3 className="font-semibold text-heading dark:text-white mt-3 mb-1">
                {f.title}
              </h3>
              <p className="text-sm text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured doctors */}
      <section className="py-10 md:py-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-heading dark:text-white">
            {t("home_featured")}
          </h2>
          <Link to="/doctors" className="text-primary text-sm font-medium">
            {t("home_see_all")} →
          </Link>
        </div>

        {status === "loading" && <DoctorGridSkeleton count={3} />}
        {status === "error" && <ErrorMessage message={error} onRetry={fetchDoctors} />}
        {status === "success" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
