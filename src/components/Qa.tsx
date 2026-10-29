import { PROFILE } from "../data/profile";
import { experienceLabel } from "../lib/experience";
import { CheckIcon, ExternalIcon } from "./icons";
import { isPlaceholder, Ph } from "./Ph";
import { Reveal } from "./Reveal";

/* Professional QA experience, from the CV. The employer is deliberately not named. */
const DO = [
  "Manual testing of websites: functionality, usability and accessibility (WCAG)",
  "Checking that what was built matches what the client asked for",
  "Final checks before each deploy, and the documentation that goes with them",
];
const TYPES = ["Manual", "Regression", "Functional", "Accessibility", "WordPress testing", "Bug reporting"];
const TOOLS_WORK = ["Jira", "Axe DevTools / axe-core", "Git", "GitHub Actions"];
const TOOLS_PROJECTS = ["Playwright", "Selenium", "axe-core in CI (thesis)"];

const HELP = [
  {
    title: "Manual and regression testing",
    text: "Testing your web app before each release: the new features, and the old ones they might have broken.",
  },
  {
    title: "Accessibility audits",
    text: "Checking pages against WCAG with axe and by hand (keyboard, focus, contrast, labels), with clear fixes.",
  },
  {
    title: "Playwright and axe in CI",
    text: "Setting up automated checks that run on every pull request, so regressions are caught before merge.",
  },
  {
    title: "Clear bug reports",
    text: "Reports a developer can act on: steps, expected and actual result, evidence, and QA documentation.",
  },
];

/* Link to the commit with the fix and the new check in the public demo repo. */
const QA_COMMIT = "[[qa-commit-link]]";

function CaseStudy() {
  return (
    <Reveal as="article" className="case" aria-labelledby="case-title">
      <div className="case__head">
        <p className="eyebrow">Case study</p>
        <h3 id="case-title" className="case__title">
          From bug to regression check
        </h3>
        <p className="case__lede">
          A real, repeatable case from one of my own projects: a stale link on my own development branch, not a bug
          in anyone else's system.
        </p>
      </div>
      <ol className="case__steps">
        <li>
          <b>Steps</b>
          <span>
            On the development branch of my web studio site, open the Work section and click “Visit site” on the MB
            Hair Salon card.
          </span>
        </li>
        <li>
          <b>Expected</b>
          <span>The live salon website opens.</span>
        </li>
        <li>
          <b>Actual</b>
          <span>
            <code>mbhairsalon.mihailobuilds.com</code> did not resolve in DNS when I checked. The site lives at{" "}
            <code>demohairsalon.mihailobuilds.com</code>; the link on the card was out of date.
          </span>
        </li>
        <li>
          <b>Cause</b>
          <span>
            The site's link check (<code>scripts/qa/site.mjs</code>) requested internal links only. For external
            links it checked just <code>target</code> and <code>rel</code>, so the dead link got through.
          </span>
        </li>
        <li>
          <b>Fix</b>
          <span>
            The URL in <code>src/data/projects.ts</code>.
          </span>
        </li>
        <li>
          <b>Regression check</b>
          <span>
            <code>site.mjs</code> now requests every external project link (HEAD, with GET as a fallback) and fails
            the run unless it answers 2xx.
          </span>
        </li>
        <li>
          <b>Proof</b>
          <span>
            {isPlaceholder(QA_COMMIT) ? (
              <Ph text={QA_COMMIT} />
            ) : (
              <a className="text-link" href={QA_COMMIT} target="_blank" rel="noopener noreferrer">
                The commit in the public demo repo
                <span className="sr-only"> (opens in a new tab)</span>
                <ExternalIcon />
              </a>
            )}
          </span>
        </li>
      </ol>
    </Reveal>
  );
}

export function Qa() {
  const experience = experienceLabel(PROFILE.qaSince, new Date(__BUILD_DATE__));
  return (
    <section id="qa" className="section section--alt" aria-labelledby="qa-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">QA experience</p>
          <h2 id="qa-title" className="section__title">
            QA is my <span className="accent">day job.</span>
          </h2>
          <p className="section__lede">
            I test websites before they reach clients. This is what that involves, and how it could help your team.
          </p>
        </Reveal>

        <div className="qa-grid">
          <Reveal className="qa-role">
            <p className="qa-role__title">{PROFILE.role}</p>
            <p className="qa-role__since">
              Since {PROFILE.qaSinceLabel} · {experience}
            </p>
            <h3 className="qa-sub">What I do</h3>
            <ul className="checklist">
              {DO.map((d) => (
                <li key={d}>
                  <CheckIcon />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={80} className="qa-side">
            <h3 className="qa-sub">Types of testing</h3>
            <ul className="chips">
              {TYPES.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <h3 className="qa-sub">Tools</h3>
            <div className="tools">
              <div>
                <p className="tools__group">At work</p>
                <ul className="chips">
                  {TOOLS_WORK.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="tools__group">In projects &amp; thesis</p>
                <ul className="chips">
                  {TOOLS_PROJECTS.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal as="h3" className="sub-head">
          How I can help if you hire me
        </Reveal>
        <ul className="help-grid">
          {HELP.map((h, i) => (
            <Reveal as="li" key={h.title} delay={i * 70} className="help">
              <span className="help__num">0{i + 1}</span>
              <h4 className="help__title">{h.title}</h4>
              <p className="help__text">{h.text}</p>
            </Reveal>
          ))}
        </ul>

        <CaseStudy />
      </div>
    </section>
  );
}
