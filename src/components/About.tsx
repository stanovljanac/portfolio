import { PROFILE } from "../data/profile";
import { GithubIcon, InstagramIcon, LinkedinIcon, PinIcon } from "./icons";

type Photo = { src: string; width: number; height: number };

function Portrait({ photo, alt, className }: { photo: Photo; alt: string; className: string }) {
  return (
    <div className={`about__photo ${className}`}>
      <img src={photo.src} alt={alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
    </div>
  );
}

/* Who is behind the projects: the portrait, where I am, my profiles.
   For now both portraits show, the CV photo left and the one by the sea
   right, to compare them; keep one and drop .about--compare. */
export function About() {
  const { name, photo, photoSea, location, qaSinceLabel, linkedin, github, instagram } = PROFILE;
  const links = [
    { href: linkedin, label: "LinkedIn", icon: <LinkedinIcon /> },
    { href: github, label: "GitHub", icon: <GithubIcon /> },
    { href: instagram, label: "Instagram", icon: <InstagramIcon /> },
  ];
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about about--compare">
        <Portrait photo={photo} alt={`Portrait of ${name}`} className="about__photo--cv" />
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
        <Portrait photo={photoSea} alt={`${name} by the sea`} className="about__photo--sea" />
      </div>
    </section>
  );
}
