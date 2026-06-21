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
            Independent developer
          </Badge>
        </Reveal>

        <Reveal as="h1" delay={60} className="hero__title">
          Websites, Web Apps &amp; SaaS Products,
          <br />
          built <span className="accent">end to end</span>.
        </Reveal>

        <Reveal as="p" delay={120} className="hero__lede">
          I'm Mihailo, a solo developer building modern websites, custom web applications and SaaS products. From
          business websites to AI-powered tools, I turn ideas into software people actually use.
        </Reveal>

        <Reveal delay={180} className="hero__cta">
          <Button variant="primary" size="lg" trailingIcon={<ArrowIcon />} onClick={() => scrollToId("projects")}>
            View my work
          </Button>
          <Button variant="secondary" size="lg" onClick={() => scrollToId("contact")}>
            Start a project
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
