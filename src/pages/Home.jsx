import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDoctorsStore from "../store/useDoctorsStore";
import DoctorCard from "../components/DoctorCard";
import { DoctorGridSkeleton } from "../components/LoadingSkeleton";
import ErrorMessage from "../components/ErrorMessage";

const features = [
  {
    icon: "🩺",
    title: "Verified Specialists",
    text: "Every doctor listed is board-verified across a wide range of specialties.",
  },
  {
    icon: "⏱️",
    title: "Easy Scheduling",
    text: "Pick a time that works for you and book in just a few clicks.",
  },
  {
    icon: "🔔",
    title: "Manage Anytime",
    text: "Reschedule or cancel your appointments whenever your plans change.",
  },
];

export default function Home() {
  const { doctors, status, error, fetchDoctors } = useDoctorsStore();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const featured = doctors.slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Hero */}
      <section className="py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-tertiary text-primary text-xs font-semibold uppercase tracking-wide mb-4">
            Accessible &amp; Gentle Care
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-heading dark:text-white leading-tight mb-4">
            Book Your Doctor Appointment Easily
          </h1>
          <p className="text-muted text-base md:text-lg mb-6 max-w-md">
            Find verified specialists, pick a convenient time slot, and manage
            your health consultations with simplicity and peace of mind.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/doctors"
              className="px-5 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              View Doctors →
            </Link>
            <Link
              to="/appointments"
              className="px-5 py-2.5 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-800 transition-colors"
            >
              My Appointments
            </Link>
          </div>
        </div>

        <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6 shadow-soft">
          <p className="text-sm font-medium text-muted mb-3">
            Available Tomorrow
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
            <span>✅ In-person or Video Consultation</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-16">
        <div className="text-center max-w-lg mx-auto mb-10">
          <span className="text-primary text-xs font-semibold uppercase tracking-widest">
            The CuraCare Difference
          </span>
          <h2 className="text-2xl font-semibold text-heading dark:text-white mt-2">
            Care designed around calm clarity
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
            Featured Doctors
          </h2>
          <Link to="/doctors" className="text-primary text-sm font-medium">
            See all →
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
