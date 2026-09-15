import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useLanguageStore from "../store/useLanguageStore";

export default function Register() {
  const { register: registerUser, status, error } = useAuthStore();
  const { t } = useLanguageStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate("/appointments", { replace: true });
    } catch {
      // error already reflected via the store's `error` state
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 md:px-8 py-16">
      <h1 className="text-2xl font-semibold text-heading dark:text-white mb-1">
        {t("register_title")}
      </h1>
      <p className="text-muted text-sm mb-6">{t("register_subtitle")}</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded bg-danger-light text-danger text-sm font-medium">
          {error === "An account with this email already exists"
            ? t("register_email_taken")
            : t("register_error")}
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
            {...register("name", {
              required: t("required_field"),
              minLength: { value: 2, message: "Name is too short" },
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="e.g. Mohamed Ahmed"
          />
          {errors.name && (
            <p className="text-danger text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("email")}
          </label>
          <input
            type="email"
            {...register("email", {
              required: t("required_field"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-danger text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("password")}
          </label>
          <input
            type="password"
            {...register("password", {
              required: t("required_field"),
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-danger text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-heading dark:text-slate-100 mb-1.5">
            {t("confirm_password")}
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: t("required_field"),
              validate: (value) => value === password || t("passwords_no_match"),
            })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-danger text-xs mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {status === "loading" ? t("registering") : t("register_button")}
        </button>

        <p className="text-xs text-muted text-center pt-1">
          {t("already_have_account")}{" "}
          <Link to="/login" className="text-primary font-medium">
            {t("login_button")}
          </Link>
        </p>
      </form>
    </div>
  );
}
