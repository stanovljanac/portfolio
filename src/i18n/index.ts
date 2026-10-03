import { createContext, useContext } from "react";
import { sr, type Dict } from "./sr";
import { en } from "./en";

export type Locale = "sr" | "en";
export type Page = "home" | "privacy";
export type Localized = Record<Locale, string>;

export const DICTS: Record<Locale, Dict> = { sr, en };

/* Real URLs of every page, per language. */
export const PATHS: Record<Locale, Record<Page, string>> = {
  sr: { home: "/", privacy: "/privatnost/" },
  en: { home: "/en/", privacy: "/en/privacy/" },
};

export const otherLocale = (l: Locale): Locale => (l === "sr" ? "en" : "sr");

/* Link to a home-page section: a plain hash on the home page,
   the home URL + hash from any other page. */
export const sectionHref = (locale: Locale, page: Page, id: string) =>
  page === "home" ? `#${id}` : `${PATHS[locale].home}#${id}`;

type LocaleState = { locale: Locale; page: Page; t: Dict };

export const LocaleContext = createContext<LocaleState>({ locale: "sr", page: "home", t: sr });

export const useLocale = () => useContext(LocaleContext);
export const useT = () => useContext(LocaleContext).t;
