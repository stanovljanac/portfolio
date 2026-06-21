import { Button } from "../ds";
import { ArrowIcon } from "./icons";
import { useScrolled } from "../hooks/useScrolled";
import { scrollToId } from "../lib/scroll";

export function Nav() {
  const scrolled = useScrolled();
  return (
    <nav className={"nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => scrollToId("top")} aria-label="MihailoBuilds — back to top">
          <img src="/logo-lockup.svg" alt="MihailoBuilds" />
        </button>
        <div className="nav__links">
          <button className="nav__link" onClick={() => scrollToId("about")}>About</button>
          <button className="nav__link" onClick={() => scrollToId("projects")}>Products</button>
          <button className="nav__link" onClick={() => scrollToId("contact")}>Contact</button>
        </div>
        <div className="nav__cta">
          <Button variant="primary" size="sm" trailingIcon={<ArrowIcon />} onClick={() => scrollToId("contact")}>
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
}
