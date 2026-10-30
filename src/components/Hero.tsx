import { useRef } from "react";
import { PROFILE } from "../data/profile";
import { PROJECTS } from "../data/projects";
import { Button } from "../ds";
import { usePointerVars } from "../lib/motion";
import { BrowserFrame } from "./BrowserFrame";
import { DownloadIcon } from "./icons";

/* Three web projects, fanned out: back right, back left, front (the ones
   after the studio demo). They repeat the cards below, so the group is
   decorative (aria-hidden). */
const [FRONT, BACK_LEFT, BACK_RIGHT] = PROJECTS.slice(1);
/* Frame widths in .hero__shots (site.css): 74% of the column, which is
   ~46% of the container on desktop and up to 560px below 900px. */
const SHOT_SIZES = "(max-width: 900px) min(78vw, 440px), 440px";

/* The first screen: what MihailoBuilds is, then the projects and the CV.
   Who I am in more detail is in About, below the projects. */
export function Hero() {
  const { name, cv } = PROFILE;
  const hero = useRef<HTMLElement>(null);
  const shots = useRef<HTMLDivElement>(null);
  usePointerVars(shots, hero);
  return (
    <section id="top" ref={hero} className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">{name} · QA engineer</p>
          <h1 id="hero-title" className="hero__title">
            I test software for a living. After hours, I build it.
          </h1>
          <p className="hero__lede">I do it in my free time, under the name MihailoBuilds.</p>
          <div className="hero__cta">
            <Button as="a" href="#projects" variant="primary" size="lg">
              See my projects
            </Button>
            <Button
              as="a"
              href={cv.href}
              download={cv.fileName}
              variant="secondary"
              size="lg"
              leadingIcon={<DownloadIcon />}
            >
              Download CV
            </Button>
          </div>
        </div>

        <div className="hero__shots" ref={shots} aria-hidden="true">
          <BrowserFrame className="hero__shot hero__shot--right" url={BACK_RIGHT.url} shot={BACK_RIGHT.shot} sizes={SHOT_SIZES} eager />
          <BrowserFrame className="hero__shot hero__shot--left" url={BACK_LEFT.url} shot={BACK_LEFT.shot} sizes={SHOT_SIZES} eager />
          <BrowserFrame className="hero__shot hero__shot--front" url={FRONT.url} shot={FRONT.shot} sizes={SHOT_SIZES} eager />
        </div>
      </div>
    </section>
  );
}
