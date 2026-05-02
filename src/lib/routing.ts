import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type LanguageCode } from "@/lib/i18n";

const LANG_CODES = SUPPORTED_LANGUAGES.map((l) => l.code) as LanguageCode[];

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

/** Keeps i18n language in sync with the URL. */
export function useLanguageSync() {
  const { i18n } = useTranslation();
  const { pathname } = useLocation();

  useEffect(() => {
    const { lang } = parsePath(pathname);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [pathname, i18n]);
}

/** Returns a function to switch language while preserving the current sub-path. */
export function useSwitchLanguage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (lang: LanguageCode) => {
    const { rest } = parsePath(pathname);
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
