import type { ReactNode } from "react";
import { CodeIcon, GlobeIcon, LayersIcon, SparkIcon } from "./icons";
import { Reveal } from "./Reveal";

const CARDS: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <GlobeIcon />,
    title: "Websites",
    desc: "Fast, modern websites designed to convert visitors into customers.",
  },
  {
    icon: <CodeIcon />,
    title: "Web Applications",
    desc: "Custom applications that streamline workflows and solve business problems.",
  },
  {
    icon: <LayersIcon />,
    title: "SaaS Products",
    desc: "Subscription-based software built for long-term growth and scalability.",
  },
  {
    icon: <SparkIcon />,
    title: "AI & Automation",
    desc: "Practical AI and automation that removes repetitive work and saves time.",
  },
];

export function About() {
  return (
    <section id="about" className="section">
      <div className="about__grid">
        <Reveal className="about__intro">
          <span className="eyebrow">About</span>
          <h2 className="section__title">I build my own products — and software for others.</h2>
          <p className="section__lede">
            I'm Mihailo, an independent developer focused on websites, web applications and SaaS products.
          </p>
          <p className="about__para">
            Some are products I build and grow myself. Others are built for businesses and founders who need software
            that works, scales and delivers real value.
          </p>
          <p className="about__para">From idea to launch, I handle design, development and deployment myself.</p>
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
