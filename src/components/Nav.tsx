import { Button } from "../ds";
import { ArrowIcon } from "./icons";
import { useScrolled } from "../hooks/useScrolled";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";
import { PATHS, sectionHref, useLocale } from "../i18n";

export function Nav() {
  const { locale, page, t } = useLocale();
  const scrolled = useScrolled();
  const href = (id: string) => sectionHref(locale, page, id);

  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__logo" href={PATHS[locale].home} aria-label={t.nav.home}>
          <Logo />
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
          <span className="nav__sep" aria-hidden="true" />
          <LangSwitch />
          <Button as="a" href={href("contact")} variant="primary" size="sm" trailingIcon={<ArrowIcon />}>
            {t.nav.cta}
          </Button>
        </div>
      </div>
    </header>
  );
}
