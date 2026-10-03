import { Email } from "./Email";
import { LangSwitch } from "./LangSwitch";
import { PATHS, sectionHref, useLocale } from "../i18n";

export function Footer() {
  const { locale, page, t } = useLocale();
  const href = (id: string) => sectionHref(locale, page, id);
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/logo-lockup-dark.svg" alt="MihailoBuilds" width={198} height={44} />
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label={t.footer.navLabel}>
          <a href={href("work")}>{t.nav.work}</a>
          <a href={href("services")}>{t.nav.services}</a>
          <a href={href("process")}>{t.nav.process}</a>
          <a href={href("faq")}>{t.nav.faq}</a>
          <a href={href("contact")}>{t.contact.eyebrow}</a>
          <a href={PATHS[locale].privacy}>{t.footer.privacy}</a>
        </nav>
        <div className="footer__meta">
          <Email />
          <LangSwitch />
          <span>{t.footer.copy}</span>
        </div>
      </div>
    </footer>
  );
}
