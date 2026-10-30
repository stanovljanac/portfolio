import { useRef, type CSSProperties } from "react";
import { Tag } from "../ds";
import { PROJECTS, THESIS, type Project } from "../data/projects";
import { usePointerVars, useRunOnView } from "../lib/motion";
import { BrowserFrame } from "./BrowserFrame";
import { CheckIcon, ExternalIcon, GithubIcon } from "./icons";

/* `sizes` for the screenshots; keep in step with .proj-grid and .proj--wide
   in site.css: two columns in the container, one column (minus the card
   padding) below 760px; the wide card's frame takes ~60% of the container. */
const SHOT_SIZES = "(max-width: 760px) calc(100vw - 66px), (max-width: 1180px) calc(50vw - 74px), 500px";
const WIDE_SIZES = "(max-width: 900px) calc(100vw - 66px), (max-width: 1180px) calc(60vw - 60px), 640px";

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="proj__stack" aria-label="Tech stack">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

/* The whole card is one link: the "Visit site" link's ::after covers it.
   On hover it tilts toward the pointer (--mx/--my, see .proj in site.css).
   A wide card shows the screenshot left; `flip` puts it on the right. */
function ProjectCard({ p, wide = false, flip = false }: { p: Project; wide?: boolean; flip?: boolean }) {
  const card = useRef<HTMLElement>(null);
  usePointerVars(card);
  const className = ["proj", wide && "proj--wide", flip && "proj--flip"].filter(Boolean).join(" ");
  return (
    <article ref={card} className={className} aria-labelledby={`p-${p.slug}`}>
      <BrowserFrame url={p.url} shot={p.shot} sizes={wide ? WIDE_SIZES : SHOT_SIZES} className="proj__frame" />
      <div className="proj__body">
        <p className="proj__kind">{p.kind}</p>
        <h3 id={`p-${p.slug}`} className="proj__name">
          {p.name}
        </h3>
        <p className="proj__desc">{p.desc}</p>
        <Stack items={p.stack} />
        <a className="proj__link" href={p.url} target="_blank" rel="noopener noreferrer">
          Visit site
          <span className="sr-only"> — {p.name} (opens in a new tab)</span>
          <ExternalIcon />
        </a>
      </div>
    </article>
  );
}

/* When the card comes into view, the pipeline "runs": each step passes in
   turn, then the flows get their checks (data-run, see .thesis in site.css). */
function ThesisCard() {
  const t = THESIS;
  const card = useRef<HTMLElement>(null);
  const run = useRunOnView(card);
  return (
    <article ref={card} className="thesis" data-run={run} aria-labelledby="p-thesis">
      <div className="thesis__body">
        <p className="proj__kind">{t.kind}</p>
        <h3 id="p-thesis" className="thesis__name">
          {t.name}
        </h3>
        <p className="proj__desc">{t.desc}</p>
        <Stack items={t.stack} />
        <a className="thesis__link" href={t.repo} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
          View the code
          <span className="sr-only"> on GitHub (opens in a new tab)</span>
        </a>
      </div>
      {/* The pipeline, then the flows: stacked beside the text, side by side
          under it (below 900px). */}
      <div className="thesis__visual">
        <div className="thesis__group">
          <h4 className="thesis__label" id="pipeline-label">
            CI pipeline
          </h4>
          <ol className="pipeline" aria-labelledby="pipeline-label">
            {t.pipeline.map((s, i) => (
              <li key={s} style={{ "--i": i } as CSSProperties}>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="thesis__group">
          <h4 className="thesis__label" id="flows-label">
            Flows under test
          </h4>
          <ul className="thesis__flows" aria-labelledby="flows-label">
            {t.flows.map((f, i) => (
              <li key={f} style={{ "--i": i } as CSSProperties}>
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [first, second, ...rest] = PROJECTS;
  return (
    <section id="projects" className="section section--alt" aria-labelledby="projects-title">
      <div className="container">
        <div className="section__head">
          <h2 id="projects-title" className="section__title">
            Projects
          </h2>
        </div>
        <ProjectCard p={first} wide />
        <ProjectCard p={second} wide flip />
        <div className="proj-grid">
          {rest.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        <ThesisCard />
      </div>
    </section>
  );
}
