import { scrollToId } from "../lib/scroll";

const PRODUCT_LINKS: { label: string; href: string }[] = [
  { label: "Keeper", href: "https://keeper.mihailobuilds.com/" },
  { label: "Invoice Generator", href: "https://invoice.mihailobuilds.com/" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/logo-lockup.svg" alt="MihailoBuilds" />
            <p>Websites, web apps and SaaS products, built end to end by Mihailo Sebek.</p>
          </div>
          <nav className="footer__links" aria-label="Footer">
            {PRODUCT_LINKS.map((l) => (
              <a key={l.label} className="footer__link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
            <button className="footer__link" onClick={() => scrollToId("contact")}>
              Contact
            </button>
          </nav>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            <span>© 2026 MihailoBuilds. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
