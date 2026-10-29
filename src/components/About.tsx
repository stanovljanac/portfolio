import { CV_LABEL, PROFILE } from "../data/profile";
import { DownloadIcon, GithubIcon, LinkedinIcon } from "./icons";
import { isPlaceholder, Ph } from "./Ph";
import { Reveal } from "./Reveal";

/* GitHub and LinkedIn as small outlined links (About and Contact). */
export function ProfileLinks() {
  const { github, linkedin } = PROFILE;
  return (
    <>
      <a className="ext-link" href={github} target="_blank" rel="noopener noreferrer">
        <GithubIcon />
        GitHub
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      {linkedin === null ? null : isPlaceholder(linkedin) ? (
        <span className="ext-link">
          <LinkedinIcon />
          LinkedIn <Ph text={linkedin} />
        </span>
      ) : (
        <a className="ext-link" href={linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedinIcon />
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </>
  );
}

/* "Download CV (PDF, ~84 KB)". The file name comes from `download`. */
export function CvLink({ variant = "primary" }: { variant?: "primary" | "secondary" }) {
  return (
    <a className={`mb-btn mb-btn--${variant} mb-btn--md cv-link`} href={PROFILE.cv.href} download={PROFILE.cv.fileName}>
      <span className="mb-btn__icon">
        <DownloadIcon />
      </span>
      Download CV
      <span className="cv-meta">
        (<Ph text={CV_LABEL} />)
      </span>
    </a>
  );
}

export function About() {
  const { education, languages, location, photo } = PROFILE;
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <Reveal className="about__photo">
          {photo ? (
            <img src={photo} alt={`Portrait of ${PROFILE.name}`} width={480} height={600} loading="lazy" decoding="async" />
          ) : (
            <div className="shot-placeholder">
              <span>
                <Ph text="[[photo]]" />
                <br />
                Portrait photo
              </span>
            </div>
          )}
        </Reveal>
        <Reveal delay={80} className="about__copy">
          <p className="eyebrow">About</p>
          <h2 id="about-title" className="section__title">
            Hi, I'm <span className="accent">Mihailo.</span>
          </h2>
          <p className="about__para">
            By day I'm a manual QA engineer. I test websites before they reach clients, and I'm usually the one asking
            “what happens if…?”.
          </p>
          <p className="about__para">
            After hours I build things with AI-assisted development, and the QA habits come with me: I test what I
            build the same way I test at work.
          </p>
          <p className="about__para">
            Most of my projects start the same way: an idea I can't stop thinking about, until I build it.
          </p>
          <dl className="facts">
            <div>
              <dt>Education</dt>
              <dd>
                {education.school} · <span className="nowrap">{education.years}</span>
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{languages}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                <Ph text={location} />
              </dd>
            </div>
          </dl>
          <div className="about__links">
            <CvLink />
            <ProfileLinks />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
