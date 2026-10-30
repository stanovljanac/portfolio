import { PROFILE } from "../data/profile";

export function Footer() {
  const { linkedin, github, instagram } = PROFILE;
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© 2026 Mihailo Builds</p>
        <ul className="footer__links">
          <li>
            <a href={linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href="#top">Back to top</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
