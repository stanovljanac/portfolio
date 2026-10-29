import { LIVE, QA_PROJECT } from "../data/projects";
import { PROFILE } from "../data/profile";
import { isPlaceholder } from "./Ph";
import { Logo } from "./Logo";

export function Footer() {
  const { github, linkedin, cv } = PROFILE;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <Logo size={32} />
            <p>QA engineer by day. Builder after hours.</p>
          </div>
          <nav className="footer__col" aria-labelledby="footer-projects">
            <p id="footer-projects" className="footer__heading">
              Projects
            </p>
            {LIVE.map((p) => (
              <a key={p.slug} href={p.url} target="_blank" rel="noopener noreferrer">
                {p.name}
              </a>
            ))}
            <a href={QA_PROJECT.repo} target="_blank" rel="noopener noreferrer">
              {QA_PROJECT.name}
            </a>
          </nav>
          <nav className="footer__col" aria-labelledby="footer-elsewhere">
            <p id="footer-elsewhere" className="footer__heading">
              Elsewhere
            </p>
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {linkedin && !isPlaceholder(linkedin) ? (
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            ) : null}
            <a href={cv.href} download={cv.fileName}>
              Download CV
            </a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© 2026 MihailoBuilds</span>
          <a href="#top">Back to top</a>
        </div>
      </div>
    </footer>
  );
}
