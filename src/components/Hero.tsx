import { Button } from "../ds";
import { ArrowIcon } from "./icons";
import { useT } from "../i18n";

/* Path of the salon's mobile screenshot shown in the phone frame.
   Until the file exists, a visible placeholder is rendered instead. */
const SALON_MOBILE_SHOT: string | undefined = undefined; // e.g. "/projects/mb-hair-salon-mobile.png"

/* The hero deliberately does not use <Reveal>: it must be visible in the
   prerendered HTML immediately, before any JavaScript runs. */
export function Hero() {
  const t = useT();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {t.hero.titleLead} <span className="accent">{t.hero.titleAccent}</span>
          </h1>
          <p className="hero__lede">{t.hero.lede}</p>
          <div className="hero__cta">
            <Button as="a" href="#work" variant="primary" size="lg" trailingIcon={<ArrowIcon />}>
              {t.hero.ctaWork}
            </Button>
            <Button as="a" href="#contact" variant="secondary" size="lg">
              {t.hero.ctaStart}
            </Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="phone">
            <div className="phone__screen">
              {SALON_MOBILE_SHOT ? (
                <img src={SALON_MOBILE_SHOT} alt={t.hero.shotAlt} width={390} height={844} />
              ) : (
                <div className="shot-placeholder">{t.hero.shotPlaceholder}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
