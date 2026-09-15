import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <span className="text-6xl">🩺</span>
      <h1 className="text-3xl font-bold text-heading dark:text-white mt-4 mb-2">
        404 - Page Not Found
      </h1>
      <p className="text-muted mb-6">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="inline-block px-5 py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
