import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/lib/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const SiteHeader = () => {
  const { t } = useTranslation();
  const localized = useLocalizedHref();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close on route/hash change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <nav className="sticky top-3 z-40 w-full px-3 sm:top-4 sm:px-4">
      <div className="glass glass-highlight mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full px-3 py-2 sm:px-5 sm:py-2.5">
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
          <Link to={localized("/#generator")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground">
            {t("nav.generator")}
          </Link>
          <Link to={localized("/#platforms")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground">
            {t("nav.platforms")}
          </Link>
          <Link to={localized("/privacy")} className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/70 transition-colors hover:text-foreground">
            {t("nav.privacy")}
          </Link>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="https://github.com/samsnow850/app-icon-alchemist"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-primary px-4 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
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
            className="glass relative inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-white/30"
          >
            <Menu
              className={`absolute h-4 w-4 transition-all duration-300 ${
                menuOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-4 w-4 transition-all duration-300 ${
                menuOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown — floating glass overlay */}
      <div
        className={`absolute left-0 right-0 top-full px-3 sm:px-4 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`mx-auto mt-2 max-w-6xl origin-top transition-all duration-300 ease-out ${
            menuOpen ? "translate-y-0 scale-100 opacity-100" : "-translate-y-2 scale-95 opacity-0"
          }`}
          aria-hidden={!menuOpen}
        >
          <div className="glass-heavy glass-highlight rounded-3xl p-3">
          <div className="flex flex-col">
            <Link onClick={close} to={localized("/#generator")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-white/20">
              {t("nav.generator")}
            </Link>
            <Link onClick={close} to={localized("/#platforms")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-white/20">
              {t("nav.platforms")}
            </Link>
            <Link onClick={close} to={localized("/privacy")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 transition-colors hover:bg-white/20">
              {t("nav.privacy")}
            </Link>
            <a
              href="https://github.com/samsnow850/app-icon-alchemist"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-gradient-primary px-4 text-xs font-semibold uppercase tracking-wider text-white shadow-md hover:shadow-lg hover:brightness-110"
            >
              {t("nav.github")}
              <span aria-hidden>›</span>
            </a>
          </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
