import { Badge, Button } from "../ds";
import { ApertureColor, ApertureSolid } from "./Aperture";
import { ArrowIcon, PlusIcon } from "./icons";
import { Reveal } from "./Reveal";
import { scrollToId } from "../lib/scroll";

const TILES: { name: string; cat: string; gold: boolean }[] = [
  { name: "Keeper", cat: "Photography", gold: false },
  { name: "Invoice Generator", cat: "Automation", gold: true },
];

function Tile({ name, cat, gold, delay }: { name: string; cat: string; gold: boolean; delay: number }) {
  return (
    <div className="hero-tile" style={{ animationDelay: `${delay}s` }}>
      <span className="hero-tile__mark">{gold ? <ApertureColor /> : <ApertureSolid fill="var(--accent)" />}</span>
      <span className="hero-tile__text">
        <b>{name}</b>
        <small>{cat}</small>
      </span>
    </div>
  );
}

function GhostTile({ delay }: { delay: number }) {
  return (
    <div className="hero-tile hero-tile--ghost" style={{ animationDelay: `${delay}s` }}>
      <span className="hero-tile__plus">
        <PlusIcon />
      </span>
      <span className="hero-tile__text">
        <b>More coming</b>
        <small>The portfolio keeps growing</small>
      </span>
    </div>
  );
}

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
          Building professional web apps and SaaS products — crafted to be fast, reliable and genuinely useful.
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

      <div className="hero__floaters" aria-hidden="true">
        <div className="hero__floater hero__floater--l1">
          <Tile {...TILES[0]} delay={0} />
        </div>
        <div className="hero__floater hero__floater--r1">
          <Tile {...TILES[1]} delay={-1.7} />
        </div>
        <div className="hero__floater hero__floater--r2">
          <GhostTile delay={-0.8} />
        </div>
      </div>
    </header>
  );
}
