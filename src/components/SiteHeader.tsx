import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/lib/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const SiteHeader = () => {
  const { t } = useTranslation();
  const localized = useLocalizedHref();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-3 z-40 w-full px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border/60 bg-background/80 px-3 py-2 shadow-elegant backdrop-blur-md sm:px-5 sm:py-2.5">
        <Link to={localized("/")} className="flex items-center gap-2.5">
          <div className="grid grid-cols-2 gap-0.5">
            <span className="h-2 w-2 rounded-sm bg-foreground" />
            <span className="h-2 w-2 rounded-sm bg-foreground/30" />
            <span className="h-2 w-2 rounded-sm bg-foreground/30" />
            <span className="h-2 w-2 rounded-sm bg-foreground" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Icon Forge</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to={localized("/#generator")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
            {t("nav.generator")}
          </Link>
          <Link to={localized("/#platforms")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
            {t("nav.platforms")}
          </Link>
          <Link to={localized("/privacy")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
            {t("nav.privacy")}
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/samsnow850/app-icon-alchemist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("nav.github")}
            <span aria-hidden>›</span>
          </a>
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground/40"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-border/60 bg-background/95 p-3 shadow-elegant backdrop-blur-md md:hidden">
          <div className="flex flex-col">
            <Link onClick={() => setMenuOpen(false)} to={localized("/#generator")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.generator")}
            </Link>
            <Link onClick={() => setMenuOpen(false)} to={localized("/#platforms")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.platforms")}
            </Link>
            <Link onClick={() => setMenuOpen(false)} to={localized("/privacy")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.privacy")}
            </Link>
            <a
              href="https://github.com/samsnow850/app-icon-alchemist"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              {t("nav.github")}
              <span aria-hidden>›</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SiteHeader;
