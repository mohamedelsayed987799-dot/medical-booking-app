import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDoctorById } from "../services/doctorsService";
import ErrorMessage from "../components/ErrorMessage";

export default function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);

  const loadDoctor = async () => {
    setStatus("loading");
    try {
      const data = await getDoctorById(id);
      setDoctor(data);
      setStatus("success");
    } catch (err) {
      setError("Could not load this doctor's profile. Please try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    loadDoctor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === "loading") {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
        <div className="skeleton h-40 w-full rounded-lg mb-4" />
        <div className="skeleton h-6 w-1/2 rounded mb-2" />
        <div className="skeleton h-4 w-1/3 rounded" />
      </div>
    );
  }

  if (status === "error") {
    return <ErrorMessage message={error} onRetry={loadDoctor} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
      <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6 md:p-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-28 h-28 rounded-xl object-cover bg-tertiary"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-heading dark:text-white">
              {doctor.name}
            </h1>
            <p className="text-primary font-medium">{doctor.specialty}</p>
            <div className="flex items-center gap-4 text-sm text-muted mt-2">
              <span>⭐ {doctor.rating} ({doctor.reviews} reviews)</span>
              <span>💲 ${doctor.price} / visit</span>
              <span>📍 {doctor.location}</span>
            </div>
          </div>
          <Link
            to={`/book/${doctor.id}`}
            className="px-5 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors whitespace-nowrap"
          >
            Book Appointment
          </Link>
        </div>

        <hr className="my-6 border-border dark:border-slate-700" />

        <div>
          <h2 className="font-semibold text-heading dark:text-white mb-2">About</h2>
          <p className="text-muted text-sm leading-relaxed">{doctor.bio}</p>
        </div>

        {doctor.education && (
          <div className="mt-5">
            <h2 className="font-semibold text-heading dark:text-white mb-2">
              Education
            </h2>
            <p className="text-muted text-sm">{doctor.education}</p>
          </div>
        )}

        {doctor.availableDays && (
          <div className="mt-5">
            <h2 className="font-semibold text-heading dark:text-white mb-2">
              Available Days
            </h2>
            <div className="flex flex-wrap gap-2">
              {doctor.availableDays.map((day) => (
                <span
                  key={day}
                  className="px-3 py-1 rounded-full bg-tertiary text-primary text-sm"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
