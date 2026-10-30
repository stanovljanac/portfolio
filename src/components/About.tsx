import { PROFILE } from "../data/profile";
import { GithubIcon, InstagramIcon, LinkedinIcon, PinIcon } from "./icons";

/* Who is behind the projects: the portrait, where I am, my profiles. */
export function About() {
  const { name, photo, location, qaSinceLabel, linkedin, github, instagram } = PROFILE;
  const links = [
    { href: linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
    { href: github, label: "GitHub", icon: <GithubIcon /> },
    { href: instagram, label: "Instagram", icon: <InstagramIcon /> },
  ];
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about">
        <div className="about__photo">
          <img
            src={photo.src}
            alt={`Portrait of ${name}`}
            width={photo.width}
            height={photo.height}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="about__copy">
          <h2 id="about-title" className="section__title">
            About
          </h2>
          <p className="about__intro">I'm {name}, a QA engineer and AI enthusiast.</p>
          <p className="about__text">
            Since {qaSinceLabel} I've been testing websites for functionality, usability and accessibility.
          </p>
          <p className="about__place">
            <PinIcon />
            <span className="sr-only">Based in </span>
            {location}
          </p>
          <ul className="about__links">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.icon}
                  {l.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
