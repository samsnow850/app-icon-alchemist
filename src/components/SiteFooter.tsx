import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/lib/routing";

const SiteFooter = () => {
  const { t } = useTranslation();
  const localized = useLocalizedHref();

  return (
    <footer className="glass glass-highlight mx-auto mt-16 max-w-6xl rounded-[2rem] p-10">
      <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            {t("footer.heading")}
          </p>
          <p className="mt-2 max-w-md text-sm text-foreground/60">
            {t("footer.body")}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <Link
            to={localized("/privacy")}
            className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground"
          >
            {t("footer.privacy")}
          </Link>
          <a
            href="https://github.com/samsnow850/app-icon-alchemist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground"
          >
            <Github className="h-3.5 w-3.5" />
            {t("footer.github")}
          </a>
        </div>
      </div>
      <p className="mt-10 text-[11px] uppercase tracking-[0.18em] text-foreground/40">
        © {new Date().getFullYear()} Icon Forge
      </p>
    </footer>
  );
};

export default SiteFooter;
