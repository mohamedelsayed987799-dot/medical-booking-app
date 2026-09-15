import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import useLanguageStore from "../store/useLanguageStore";

export default function Login() {
  const { login, status, error } = useAuthStore();
  const { t } = useLanguageStore();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectTo = location.state?.from || "/appointments";

  const onSubmit = async (formData) => {
    try {
      await login(formData.email, formData.password);
      navigate(redirectTo, { replace: true });
    } catch {
      // error is already reflected via the store's `error` state
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 md:px-8 py-16">
      <h1 className="text-2xl font-semibold text-heading dark:text-white mb-1">
        {t("login_title")}
      </h1>
      <p className="text-muted text-sm mb-6">{t("login_subtitle")}</p>

      {error && (
        <div className="mb-4 px-4 py-3 rounded bg-danger-light text-danger text-sm font-medium">
          {t("login_error")}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-surface dark:bg-slate-800 border border-border dark:border-slate-700 rounded-lg p-6 space-y-5"
      >
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
            placeholder="demo@curacare.com"
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
            {...register("password", { required: t("required_field") })}
            className="w-full px-3.5 py-2.5 rounded border border-border dark:border-slate-600 bg-surface dark:bg-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-danger text-xs mt-1">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full py-2.5 rounded bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {status === "loading" ? t("logging_in") : t("login_button")}
        </button>

        <p className="text-xs text-muted text-center pt-1">
          {t("login_demo_hint")} demo@curacare.com / 123456
        </p>
      </form>
    </div>
  );
}
