import { ExternalIcon } from "./icons";
import { Reveal } from "./Reveal";
import { PROJECTS, type Project } from "../data/projects";
import { useLocale } from "../i18n";

function ProjectCard({ p }: { p: Project }) {
  const { locale, t } = useLocale();
  return (
    <article className={"work-card" + (p.featured ? " work-card--featured" : "")}>
      <div className="work-card__shot">
        {p.image ? (
          <img src={p.image} alt="" loading="lazy" width={1280} height={800} />
        ) : (
          <div className="shot-placeholder">{t.work.shotPlaceholder}</div>
        )}
      </div>
      <div className="work-card__body">
        <p className="work-card__label">{p.label[locale]}</p>
        <h3 className="work-card__name">{p.name}</h3>
        <p className="work-card__desc">{p.desc[locale]}</p>
        <a className="work-card__link" href={p.url} target="_blank" rel="noopener noreferrer">
          {t.work.visit}
          <span className="sr-only">
            {" "}
            — {p.name} {t.work.newTab}
          </span>
          <ExternalIcon aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}

export function Projects() {
  const t = useLocale().t;
  const [featured, ...rest] = PROJECTS;
  return (
    <section id="work" className="section section--rule" aria-labelledby="work-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 id="work-title" className="section__title">
            {t.work.title}
          </h2>
          <p className="section__lede">{t.work.lede}</p>
        </Reveal>
        <Reveal>
          <ProjectCard p={featured} />
        </Reveal>
        <div className="work-grid">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
