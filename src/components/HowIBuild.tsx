import { CheckIcon } from "./icons";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    title: "Idea",
    text: "It starts with a problem I keep running into, or an idea that won't leave me alone. I write down who it's for and what “done” looks like.",
  },
  {
    title: "Prototype with AI",
    text: "AI coding tools get me to a working version fast. I review every change, steer the design and keep only code I understand.",
  },
  {
    title: "Test like QA",
    text: "Then I test it the way I test at work: different screens, keyboard only, edge cases and error states, not just the happy path.",
  },
  {
    title: "Ship",
    text: "Every change gets a preview link first. It goes live after I've checked the preview, and the checks run again on the next change.",
  },
];

/* Concrete checks behind "Test like QA". */
const CHECKS = [
  "Keyboard only: every link and button reachable, focus always visible",
  "An axe scan for WCAG issues, and small text at a contrast of at least 4.5:1",
  "Layouts from 320 px phones to wide desktops, with no sideways scrolling",
  "A clean browser console and no broken links",
  "Forms: every error message, the success state, and a double click on Send",
  "No layout shift while the page and its fonts load",
];

export function HowIBuild() {
  return (
    <section id="how" className="section" aria-labelledby="how-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">How I build</p>
          <h2 id="how-title" className="section__title">
            Idea, prototype, <span className="accent">test</span>, ship.
          </h2>
          <p className="section__lede">
            AI tools make building fast. Testing is what makes it safe to put live, and that is the part I know best.
          </p>
        </Reveal>

        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 70} className={"step" + (i === 2 ? " step--qa" : "")}>
              <span className="step__num">0{i + 1}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="checks">
          <h3 className="checks__title">What “test like QA” means on my projects</h3>
          <ul className="checklist checks__list">
            {CHECKS.map((c) => (
              <li key={c}>
                <CheckIcon />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <p className="checks__note">
            On my sites most of these run as scripted build quality and hygiene checks (layout shift, overflow,
            contrast, focus, console errors, the contact form, and contact details leaking into the build), so they
            repeat on every change instead of depending on my memory.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
