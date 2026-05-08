import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/lib/routing";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const localized = useLocalizedHref();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20">
      <div className="text-center">
        <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{t("notFound.title")}</h1>
        <p className="mb-6 text-muted-foreground md:text-lg">{t("notFound.description")}</p>
        <Link
          to={localized("/")}
          className="text-sm font-semibold uppercase tracking-[0.14em] text-primary underline-offset-4 hover:underline"
        >
          {t("notFound.home")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
