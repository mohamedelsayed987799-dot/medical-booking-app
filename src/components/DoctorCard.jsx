import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <div className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-5 flex flex-col gap-3 hover:shadow-card transition-shadow animate-fade-in">
      <div className="flex items-center gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-14 h-14 rounded-full object-cover bg-tertiary"
        />
        <div>
          <h3 className="font-semibold text-heading dark:text-white">{doctor.name}</h3>
          <p className="text-sm text-muted">{doctor.specialty}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span className="flex items-center gap-1">
          ⭐ {doctor.rating}{" "}
          <span className="text-placeholder">({doctor.reviews} reviews)</span>
        </span>
        <span className="font-medium text-heading dark:text-slate-100">
          ${doctor.price}
        </span>
      </div>

      <p className="text-sm text-muted line-clamp-2">{doctor.bio}</p>

      <div className="flex gap-2 mt-1">
        <Link
          to={`/doctors/${doctor.id}`}
          className="flex-1 text-center px-3 py-2 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
        >
          View Profile
        </Link>
        <Link
          to={`/book/${doctor.id}`}
          className="flex-1 text-center px-3 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
