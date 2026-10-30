import { Button } from "../ds";
import { useScrolled } from "../hooks/useScrolled";
import { Logo } from "./Logo";

const LINKS = [
  { href: "#projects", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
];

export function Nav() {
  const scrolled = useScrolled();
  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__logo" href="#top" aria-label="Mihailo Builds, back to top">
          <Logo size={34} />
        </a>
        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <Button as="a" href="#contact" variant="primary" size="sm" className="nav__cta">
          Contact
        </Button>
      </div>
    </header>
  );
}
