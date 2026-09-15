import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors py-1 ${
    isActive ? "text-primary" : "text-muted hover:text-heading dark:hover:text-white"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-surface/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            +
          </span>
          <span className="font-semibold text-lg tracking-tight dark:text-white">
            CuraCare
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            Doctors
          </NavLink>
          <NavLink to="/appointments" className={navLinkClass}>
            My Appointments
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <NavLink
            to="/doctors"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Book Visit
          </NavLink>
        </div>
      </div>
    </header>
  );
}
