import useLanguageStore from "../store/useLanguageStore";

export default function Footer() {
  const { lang } = useLanguageStore();
  const copy =
    lang === "ar"
      ? "مشروع طالب - مش خدمة طبية حقيقية."
      : "Student project - not a real medical service.";

  return (
    <footer className="border-t border-border dark:border-slate-700 mt-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted">
        <p>&copy; {new Date().getFullYear()} CuraCare. {copy}</p>
        <p>Built with React, Zustand &amp; React Hook Form</p>
      </div>
    </footer>
  );
}
