import { NavLink, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import useAuthStore from "../store/useAuthStore";
import useLanguageStore from "../store/useLanguageStore";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors py-1 ${
    isActive ? "text-primary" : "text-muted hover:text-heading dark:hover:text-white"
  }`;

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const { t } = useLanguageStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-surface/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-border dark:border-slate-700">
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
            +
          </span>
          <span className="font-semibold text-lg tracking-tight dark:text-white">
            CuraCare
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navLinkClass} end>
            {t("nav_home")}
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            {t("nav_doctors")}
          </NavLink>
          <NavLink to="/appointments" className={navLinkClass}>
            {t("nav_appointments")}
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            {t("nav_contact")}
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle />

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm text-muted">
                {t("hello")}, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
              >
                {t("nav_logout")}
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded border border-border dark:border-slate-600 text-sm font-medium text-heading dark:text-slate-100 hover:bg-background dark:hover:bg-slate-700 transition-colors"
            >
              {t("nav_login")}
            </NavLink>
          )}

          <NavLink
            to="/doctors"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            {t("nav_book_visit")}
          </NavLink>
        </div>
      </div>
    </header>
  );
}
