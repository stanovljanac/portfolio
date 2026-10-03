import { Button } from "../ds";
import { ArrowIcon } from "./icons";
import { useScrolled } from "../hooks/useScrolled";
import { PATHS, otherLocale, sectionHref, useLocale } from "../i18n";

export function Nav() {
  const { locale, page, t } = useLocale();
  const scrolled = useScrolled();
  const other = otherLocale(locale);
  const href = (id: string) => sectionHref(locale, page, id);

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__logo" href={PATHS[locale].home} aria-label={t.nav.home}>
          <img className="nav__logo-full" src="/logo-lockup-dark.svg" alt="" width={207} height={46} />
          <img className="nav__logo-mark" src="/mark-aperture.svg" alt="" width={42} height={42} />
        </a>
        <nav className="nav__links" aria-label={t.nav.label}>
          <a className="nav__link" href={href("work")}>
            {t.nav.work}
          </a>
          <a className="nav__link" href={href("services")}>
            {t.nav.services}
          </a>
          <a className="nav__link" href={href("process")}>
            {t.nav.process}
          </a>
          <a className="nav__link" href={href("faq")}>
            {t.nav.faq}
          </a>
        </nav>
        <div className="nav__actions">
          <a className="nav__lang" href={PATHS[other][page]} hrefLang={other} lang={other} aria-label={t.nav.langName}>
            {t.nav.lang}
          </a>
          <Button as="a" href={href("contact")} variant="primary" size="sm" trailingIcon={<ArrowIcon />}>
            {t.nav.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}
