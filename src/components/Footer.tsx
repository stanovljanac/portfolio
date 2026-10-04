import { Button } from "../ds";
import { ArrowIcon } from "./icons";
import { ContactLink } from "./Email";
import { LangSwitch } from "./LangSwitch";
import { Logo } from "./Logo";
import { OFFER } from "../data/pricing";
import { PATHS, sectionHref, useLocale } from "../i18n";

/* TEMP (two themes): Kobalt shows the call to action, column headings,
   Viber/WhatsApp and the bottom bar; Industrial hides them in themes.css
   and keeps its original footer. The DOM is the same for both themes. */
export function Footer() {
  const { locale, page, t } = useLocale();
  const href = (id: string) => sectionHref(locale, page, id);
  return (
    <footer className="footer">
      <div className="container footer__cta">
        <div>
          <p className="footer__cta-title">{t.footer.ctaTitle}</p>
          {OFFER.open ? (
            <p className="footer__offer">
              <b>{t.services.offer.eyebrow}:</b> {t.footer.offer}
            </p>
          ) : null}
        </div>
        <Button as="a" href={href("contact")} variant="primary" size="lg" trailingIcon={<ArrowIcon />}>
          {t.nav.cta}
        </Button>
      </div>
      <div className="container footer__inner">
        <div className="footer__brand">
          <Logo size={36} />
          <p>{t.footer.tagline}</p>
        </div>
        <nav className="footer__links" aria-label={t.footer.navLabel}>
          <p className="footer__heading">{t.footer.navTitle}</p>
          <a href={href("work")}>{t.nav.work}</a>
          <a href={href("services")}>{t.nav.services}</a>
          <a href={href("process")}>{t.nav.process}</a>
          <a href={href("faq")}>{t.nav.faq}</a>
          <a href={href("contact")}>{t.contact.eyebrow}</a>
          <a className="footer__privacy" href={PATHS[locale].privacy}>
            {t.footer.privacy}
          </a>
        </nav>
        <div className="footer__meta">
          <div className="footer__group">
            <p className="footer__heading">{t.contact.eyebrow}</p>
            <ContactLink kind="email">{t.contact.email}</ContactLink>
            <ContactLink kind="viber" className="footer__extra">
              {t.contact.viber}
            </ContactLink>
            <ContactLink kind="whatsapp" className="footer__extra">
              {t.contact.whatsapp}
            </ContactLink>
          </div>
          <div className="footer__group">
            <p className="footer__heading">{t.nav.langLabel}</p>
            <LangSwitch />
          </div>
          <span className="footer__copy">{t.footer.copy}</span>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>{t.footer.copy}</span>
        <a href={PATHS[locale].privacy}>{t.footer.privacy}</a>
      </div>
    </footer>
  );
}
