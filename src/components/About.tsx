import type { ReactNode } from "react";
import { BoltIcon, LayersIcon, ShieldIcon, SparkIcon } from "./icons";
import { Reveal } from "./Reveal";

const CARDS: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <LayersIcon />,
    title: "Products, not projects",
    desc: "I build and own software for the long term — supported, maintained and improved over years.",
  },
  {
    icon: <SparkIcon />,
    title: "AI where it earns its place",
    desc: "Intelligent features that remove real work — never bolted-on novelty for its own sake.",
  },
  {
    icon: <BoltIcon />,
    title: "Automation by default",
    desc: "The boring, repetitive parts run themselves so people focus on what actually matters.",
  },
  {
    icon: <ShieldIcon />,
    title: "Built to be trusted",
    desc: "Security, privacy and reliability are foundations from day one — never afterthoughts.",
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="about__grid">
        <Reveal className="about__intro">
          <span className="eyebrow">About</span>
          <h2 className="section__title">I'm Mihailo — I design, build and run every product myself.</h2>
          <p className="section__lede">
            I'm a solo developer behind MihailoBuilds. I design, build, launch and maintain every product myself — SaaS,
            AI and automation tools that solve real problems and keep running long after launch. No team, no hand-offs:
            one person who owns each product end to end.
          </p>
        </Reveal>

        <div className="about__cards">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className="about-card">
              <div className="about-card__icon">{c.icon}</div>
              <div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
