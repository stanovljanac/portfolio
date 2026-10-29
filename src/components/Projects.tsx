import { Tag } from "../ds";
import { FEATURED, MORE, QA_PROJECT, type Project } from "../data/projects";
import { BrowserFrame } from "./BrowserFrame";
import { CheckIcon, ExternalIcon, GithubIcon, InfoIcon } from "./icons";
import { Ph } from "./Ph";
import { Reveal } from "./Reveal";

/* `sizes` for the screenshots; keep in step with .feature and .more-grid in
   site.css. Featured: the media column (3/5 of the card) minus its padding,
   or the whole card once it stacks (≤ 900px). Small cards: one, two or three
   columns. */
const FEATURE_SIZES = "(max-width: 640px) calc(100vw - 66px), (max-width: 900px) calc(100vw - 130px), (max-width: 1240px) calc(60vw - 100px), 640px";
const SMALL_SIZES = "(max-width: 640px) calc(100vw - 34px), (max-width: 980px) calc(50vw - 42px), 380px";

function Meta({ p }: { p: Pick<Project, "kind" | "year"> }) {
  return (
    <p className="proj__meta">
      {p.kind} · <Ph text={p.year} />
    </p>
  );
}

function Why({ text }: { text: string }) {
  return (
    <p className="proj__why">
      <span className="proj__why-label">Why I built it</span>
      <span>
        <Ph text={text} />
      </span>
    </p>
  );
}

function Note({ text }: { text: string }) {
  return (
    <p className="proj__note">
      <InfoIcon />
      <span>{text}</span>
    </p>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <ul className="proj__stack" aria-label="Built with">
      {items.map((t) => (
        <li key={t}>
          <Tag>{t}</Tag>
        </li>
      ))}
    </ul>
  );
}

/* "Visit site". Its ::after covers the whole card, so the card is one link. */
function Visit({ p }: { p: Project }) {
  if (!p.url) return null;
  return (
    <a className="proj__link" href={p.url} target="_blank" rel="noopener noreferrer">
      Visit site
      <span className="sr-only"> — {p.name} (opens in a new tab)</span>
      <ExternalIcon />
    </a>
  );
}

function FeatureCard({ p, flip }: { p: Project; flip: boolean }) {
  return (
    <article className={"feature proj-card" + (flip ? " feature--flip" : "")} aria-labelledby={`p-${p.slug}`}>
      <div className="feature__media">
        <BrowserFrame url={p.url} shot={p.shot} sizes={FEATURE_SIZES} />
      </div>
      <div className="feature__body">
        <Meta p={p} />
        <h3 id={`p-${p.slug}`} className="feature__name">
          {p.name}
        </h3>
        <p className="proj__desc">{p.desc}</p>
        <Why text={p.why} />
        {p.note ? <Note text={p.note} /> : null}
        <Stack items={p.stack} />
        <Visit p={p} />
      </div>
    </article>
  );
}

function SmallCard({ p }: { p: Project }) {
  return (
    <article className="small proj-card" aria-labelledby={`p-${p.slug}`}>
      <BrowserFrame url={p.url} shot={p.shot} sizes={SMALL_SIZES} className="small__frame">
        <div className="shot-placeholder">
          <span>
            {p.name}
            <br />
            {p.stack.join(" · ")}
          </span>
        </div>
      </BrowserFrame>
      <div className="small__body">
        <Meta p={p} />
        <h4 id={`p-${p.slug}`} className="small__name">
          {p.name}
        </h4>
        <p className="proj__desc">{p.desc}</p>
        <Why text={p.why} />
        {p.note ? <Note text={p.note} /> : null}
        <Stack items={p.stack} />
        <Visit p={p} />
      </div>
    </article>
  );
}

/* The QA project from the CV: no screenshot, but the pipeline it runs. */
function QaProjectCard() {
  const q = QA_PROJECT;
  return (
    <article className="qa-proj" aria-labelledby="p-accessibility-ci">
      <div className="qa-proj__body">
        <p className="proj__meta">
          QA project · {q.kind} · {q.year}
        </p>
        <h3 id="p-accessibility-ci" className="qa-proj__name">
          {q.name}
        </h3>
        <p className="proj__desc">{q.desc}</p>
        <Why text={q.why} />
        <Note text={q.note} />
        <Stack items={q.stack} />
        <a className="qa-proj__link" href={q.repo} target="_blank" rel="noopener noreferrer">
          <GithubIcon />
          View the code on GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <div className="qa-proj__visual">
        <p className="qa-proj__label" id="pipeline-label">
          On every push and pull request
        </p>
        <ol className="pipeline" aria-labelledby="pipeline-label">
          {q.pipeline.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="qa-proj__label" id="flows-label">
          Flows under test
        </p>
        <ul className="qa-proj__checks" aria-labelledby="flows-label">
          {q.checks.map((c) => (
            <li key={c}>
              <CheckIcon />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section section--alt" aria-labelledby="projects-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title" className="section__title">
            Built after hours, <span className="accent">shipped for real.</span>
          </h2>
          <p className="section__lede">
            Most of these started as an idea I couldn't drop. I built them with AI tools, tested them like a QA would,
            and put them live.
          </p>
        </Reveal>

        {/* One row per featured project; every other row has the screenshot on the right. */}
        <div className="feature-list">
          {FEATURED.map((p, i) => (
            <Reveal key={p.slug}>
              <FeatureCard p={p} flip={i % 2 === 1} />
            </Reveal>
          ))}
          <Reveal>
            <QaProjectCard />
          </Reveal>
        </div>

        <Reveal as="h3" className="sub-head">
          More projects
        </Reveal>
        <div className="more-grid">
          {MORE.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <SmallCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
