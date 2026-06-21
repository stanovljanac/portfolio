import { Badge, Button } from "../ds";
import { ApertureColor, ApertureSolid } from "./Aperture";
import { ArrowIcon, PlusIcon } from "./icons";
import { Reveal } from "./Reveal";
import { scrollToId } from "../lib/scroll";

const TILES: { name: string; cat: string; gold: boolean }[] = [
  { name: "Keeper", cat: "Photography", gold: false },
  { name: "Invoice Generator", cat: "Automation", gold: true },
];

export function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__glows" aria-hidden="true">
        <span className="hero__glow glow-a" />
        <span className="hero__glow glow-b" />
        <span className="hero__glow glow-c" />
      </div>
      <div className="hero__grid" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__copy">
          <Reveal style={{ display: "inline-flex" }}>
            <Badge variant="gold" dot>
              Solo AI developer
            </Badge>
          </Reveal>

          <Reveal as="h1" delay={60} className="hero__title">
            Building software that solves
            <br />
            <span className="accent">real</span> problems.
          </Reveal>

          <Reveal as="p" delay={120} className="hero__lede">
            Independent SaaS, AI and automation products — each designed to do one job well, and built to keep doing it.
          </Reveal>

          <Reveal delay={180} className="hero__cta">
            <Button variant="primary" size="lg" trailingIcon={<ArrowIcon />} onClick={() => scrollToId("projects")}>
              View products
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToId("contact")}>
              Contact
            </Button>
          </Reveal>

          <Reveal delay={260} className="hero__stat-single">
            <b>2</b>
            <span>products shipped</span>
          </Reveal>
        </div>

        <Reveal delay={160} className="hero__showcase" aria-hidden="true">
          <div className="hero__tiles">
            {TILES.map((t, i) => (
              <div className="hero-tile" style={{ animationDelay: `${i * -1.7}s` }} key={t.name}>
                <span className="hero-tile__mark">
                  {t.gold ? <ApertureColor /> : <ApertureSolid fill="var(--accent)" />}
                </span>
                <span className="hero-tile__text">
                  <b>{t.name}</b>
                  <small>{t.cat}</small>
                </span>
                <span className="hero-tile__status">
                  <i /> Live
                </span>
              </div>
            ))}
            <div className="hero-tile hero-tile--ghost" style={{ animationDelay: "-0.8s" }}>
              <span className="hero-tile__plus">
                <PlusIcon />
              </span>
              <span className="hero-tile__text">
                <b>More coming</b>
                <small>The portfolio keeps growing</small>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
