import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, RTL_LANGS, detectBrowserLanguage, type LanguageCode } from "@/lib/i18n";

const LANG_CODES = SUPPORTED_LANGUAGES.map((l) => l.code) as LanguageCode[];
const PREF_KEY = "icon-forge:lang";

/** Extract { lang, rest } from a pathname like "/ja/privacy" -> { lang: "ja", rest: "/privacy" } */
export function parsePath(pathname: string): { lang: LanguageCode; rest: string } {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] as LanguageCode | undefined;
  if (first && LANG_CODES.includes(first)) {
    return { lang: first, rest: "/" + segments.slice(1).join("/") };
  }
  return { lang: "en", rest: pathname || "/" };
}

/** Build a path with the given language prefix (English = no prefix). */
export function buildPath(lang: LanguageCode, rest: string): string {
  const clean = rest.startsWith("/") ? rest : "/" + rest;
  if (lang === "en") return clean === "/" ? "/" : clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

function getStoredLang(): LanguageCode | null {
  try {
    const v = localStorage.getItem(PREF_KEY);
    if (v && (LANG_CODES as string[]).includes(v)) return v as LanguageCode;
  } catch {
    /* ignore */
  }
  return null;
}

function setStoredLang(lang: LanguageCode) {
  try {
    localStorage.setItem(PREF_KEY, lang);
  } catch {
    /* ignore */
  }
}

/** Keeps i18n language in sync with the URL and auto-detects on first visit. */
export function useLanguageSync() {
  const { i18n } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0] as LanguageCode | undefined;
    const hasPrefix = !!first && (LANG_CODES as string[]).includes(first);

    // First-visit auto-redirect: only when URL has no language prefix
    if (!hasPrefix) {
      const preferred = getStoredLang() ?? detectBrowserLanguage();
      if (preferred !== "en") {
        navigate(buildPath(preferred, pathname || "/") + search + hash, { replace: true });
        return;
      }
    }

    const { lang } = parsePath(pathname);
    if (i18n.language !== lang) i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (RTL_LANGS as string[]).includes(lang) ? "rtl" : "ltr";
  }, [pathname, search, hash, i18n, navigate]);
}

/** Returns a function to switch language while preserving the current sub-path. */
export function useSwitchLanguage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (lang: LanguageCode) => {
    const { rest } = parsePath(pathname);
    setStoredLang(lang);
    navigate(buildPath(lang, rest));
  };
}

/** Returns the current language code based on the URL. */
export function useCurrentLanguage(): LanguageCode {
  const { pathname } = useLocation();
  return parsePath(pathname).lang;
}

/** Build a localized link relative to the current language. */
export function useLocalizedHref() {
  const lang = useCurrentLanguage();
  return (rest: string) => buildPath(lang, rest);
}
