import { ApertureFacets } from "./Aperture";
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
            <p>Software products by a solo developer — built to last.</p>
          </div>
          <div className="footer__col">
            <h5>Products</h5>
            {PRODUCT_LINKS.map((l) => (
              <a key={l.label} className="footer__link" href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
            <button className="footer__link" onClick={() => scrollToId("contact")}>
              Contact
            </button>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__copy">
            <ApertureFacets fill="var(--accent)" />
            <span>© 2026 MihailoBuilds. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
