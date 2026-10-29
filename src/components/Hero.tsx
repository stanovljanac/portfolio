import { Button } from "../ds";
import { FEATURED } from "../data/projects";
import { PROFILE } from "../data/profile";
import { ArrowIcon } from "./icons";
import { BrowserFrame } from "./BrowserFrame";
import { Ph } from "./Ph";

/* The three featured projects, fanned out: back right, back left, front.
   They repeat the cards below, so the group is decorative (aria-hidden). */
const [FRONT, BACK_LEFT, BACK_RIGHT] = FEATURED;
/* Frame widths in .hero__shots (site.css): 74% of the column, which is
   ~46% of the container on desktop and up to 560px below 900px. */
const SHOT_SIZES = "(max-width: 900px) min(78vw, 440px), 440px";

/* The hero deliberately does not use <Reveal>: it must be visible in the
   prerendered HTML immediately, before any JavaScript runs. */
export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow">{PROFILE.name} · QA engineer &amp; AI enthusiast</p>
          <h1 id="hero-title" className="hero__title">
            I test software for a living. <span className="accent">After hours, I build it.</span>
          </h1>
          <p className="hero__lede">
            I'm Mihailo, a manual QA engineer and AI enthusiast. When an idea won't leave me alone, I build it with AI
            tools, test it like a QA would, and ship it.
          </p>
          <p className="hero__now">
            <span className="hero__now-dot" aria-hidden="true" />
            <span>
              Currently building: <b><Ph text={PROFILE.currentlyBuilding} /></b>
            </span>
          </p>
          <div className="hero__cta">
            <Button as="a" href="#projects" variant="primary" size="lg" trailingIcon={<ArrowIcon />}>
              See my projects
            </Button>
            <Button as="a" href="#qa" variant="secondary" size="lg">
              My QA experience
            </Button>
          </div>
        </div>

        <div className="hero__shots" aria-hidden="true">
          <BrowserFrame className="hero__shot hero__shot--right" url={BACK_RIGHT.url} shot={BACK_RIGHT.shot} sizes={SHOT_SIZES} eager />
          <BrowserFrame className="hero__shot hero__shot--left" url={BACK_LEFT.url} shot={BACK_LEFT.shot} sizes={SHOT_SIZES} eager />
          <BrowserFrame className="hero__shot hero__shot--front" url={FRONT.url} shot={FRONT.shot} sizes={SHOT_SIZES} eager />
        </div>
      </div>
    </section>
  );
}
