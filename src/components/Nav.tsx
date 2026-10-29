import { Button } from "../ds";
import { useScrolled } from "../hooks/useScrolled";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#qa", label: "QA" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const scrolled = useScrolled();
  return (
    <header className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <a className="nav__logo" href="#top" aria-label="Mihailo Builds, back to top">
          <Logo size={36} />
        </a>
        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} className="nav__link" href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <ThemeToggle />
          <Button as="a" href="#contact" variant="primary" size="sm">
            Say hi
          </Button>
        </div>
      </div>
    </header>
  );
}
