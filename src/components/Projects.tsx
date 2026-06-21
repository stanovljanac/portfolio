import { useState } from "react";
import { Badge, Card, Tag } from "../ds";
import { ApertureColor, ApertureFacets, ApertureSolid } from "./Aperture";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Reveal";
import { FILTERS, PROJECTS, type Filter, type Project } from "../data/projects";

function ProjectCard({ p }: { p: Project }) {
  const clickable = p.live && !!p.url;
  return (
    <Card
      interactive
      padded={false}
      as={clickable ? "a" : "article"}
      className={"proj-card" + (clickable ? "" : " proj-card--static")}
      {...(clickable ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="proj-card__cover" style={{ background: p.cover }}>
        {p.markGold ? (
          <ApertureColor className="proj-card__mark" />
        ) : (
          <ApertureSolid fill="#1a1206" className="proj-card__mark proj-card__mark--dark" />
        )}
        <ApertureFacets fill={p.wmColor} className="proj-card__wm" />
        {p.image ? (
          <img
            className="proj-card__img"
            src={p.image}
            alt={p.name}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : null}
      </div>
      <div className="proj-card__body">
        <div className="proj-card__top">
          <span className="proj-card__cat">{p.category}</span>
          <Badge variant={p.statusVariant} dot>
            {p.statusLabel}
          </Badge>
        </div>
        <div className="proj-card__name">{p.name}</div>
        <div className="proj-card__desc">{p.desc}</div>
        <div className="proj-card__foot">
          <div className="proj-card__tags">
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {clickable ? (
            <span className="proj-card__visit">
              Visit <ArrowIcon />
            </span>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.kinds.includes(filter));

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="proj__head">
          <Reveal className="proj__intro">
            <span className="eyebrow">Products</span>
            <h2 className="section__title">Things I've built.</h2>
            <p className="section__lede">
              A growing collection of products. Each one stands on its own — and shares the MihailoBuilds standard.
            </p>
          </Reveal>
          <Reveal className="proj__filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={"mb-tag" + (f === filter ? " mb-tag--accent" : "")}
                onClick={() => setFilter(f)}
                aria-pressed={f === filter}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </div>

        <div className="proj__grid">
          {list.map((p) => (
            <ProjectCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
