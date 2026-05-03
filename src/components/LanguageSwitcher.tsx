import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n";
import { useCurrentLanguage, useSwitchLanguage } from "@/lib/routing";

export const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const current = useCurrentLanguage();
  const switchLang = useSwitchLanguage();
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === current) ?? SUPPORTED_LANGUAGES[0];
  const expanded = hover || open;

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const onPick = (code: LanguageCode) => {
    setOpen(false);
    setHover(false);
    if (code !== current) switchLang(code);
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        aria-label={t("lang.label")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:border-foreground/40"
      >
        <span className="text-base leading-none" aria-hidden>
          {currentLang.flag}
        </span>
        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-200 ${
            expanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          <span className="ml-1 normal-case tracking-normal">{currentLang.label}</span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const active = lang.code === current;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={active}
                onClick={() => onPick(lang.code)}
                className={`flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-accent ${
                  active ? "font-semibold" : "font-medium"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none" aria-hidden>
                    {lang.flag}
                  </span>
                  <span>{lang.label}</span>
                </span>
                {active && <Check className="h-3.5 w-3.5 text-foreground/70" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
