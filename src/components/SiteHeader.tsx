import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocalizedHref } from "@/lib/routing";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export const SiteHeader = () => {
  const { t } = useTranslation();
  const localized = useLocalizedHref();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const lastY = useRef(0);
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

  // Shrink on scroll down, expand on scroll up or near top
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 40) {
        setShrunk(false);
      } else if (delta > 4 && y > 80) {
        setShrunk(true);
      } else if (delta < -4) {
        setShrunk(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setMenuOpen(false);


  const collapsed = shrunk && !menuOpen;

  return (
    <nav className="sticky top-3 z-40 w-full px-3 sm:top-4 sm:px-4">
      <div
        className={`mx-auto flex items-center justify-between gap-3 rounded-full border border-border/60 bg-background/80 shadow-elegant backdrop-blur-md transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          collapsed
            ? "max-w-fit px-2 py-1.5 sm:px-3 sm:py-2"
            : "max-w-6xl px-3 py-2 sm:px-5 sm:py-2.5"
        }`}
      >
        <Link to={localized("/")} className="flex items-center gap-2.5">
          <div className="grid grid-cols-2 gap-0.5">
            <span className="h-2 w-2 rounded-sm bg-foreground" />
            <span className="h-2 w-2 rounded-sm bg-foreground/30" />
            <span className="h-2 w-2 rounded-sm bg-foreground/30" />
            <span className="h-2 w-2 rounded-sm bg-foreground" />
          </div>
          <span
            className={`overflow-hidden whitespace-nowrap text-sm font-semibold tracking-tight transition-all duration-300 ${
              collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
            }`}
          >
            Icon Forge
          </span>
        </Link>
        <div
          className={`hidden items-center overflow-hidden transition-all duration-500 md:flex ${
            collapsed ? "max-w-0 gap-0 opacity-0" : "max-w-[600px] gap-8 opacity-100"
          }`}
        >
          <Link to={localized("/#generator")} className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
            {t("nav.generator")}
          </Link>
          <Link to={localized("/#platforms")} className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
            {t("nav.platforms")}
          </Link>
          <Link to={localized("/privacy")} className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground">
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
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                collapsed ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"
              }`}
            >
              {t("nav.github")}
            </span>
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
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:border-foreground/40"
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

      {/* Mobile dropdown — floating overlay */}
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
          <div className="rounded-3xl border border-border/60 bg-background/95 p-3 shadow-elegant backdrop-blur-md">
          <div className="flex flex-col">
            <Link onClick={close} to={localized("/#generator")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.generator")}
            </Link>
            <Link onClick={close} to={localized("/#platforms")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.platforms")}
            </Link>
            <Link onClick={close} to={localized("/privacy")} className="rounded-2xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-foreground/80 hover:bg-accent">
              {t("nav.privacy")}
            </Link>
            <a
              href="https://github.com/samsnow850/app-icon-alchemist"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-2 inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-4 text-xs font-semibold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
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
