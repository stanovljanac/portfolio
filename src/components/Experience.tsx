import { PROFILE } from "../data/profile";
import { experienceLabel } from "../lib/experience";
import { BriefcaseIcon, CapIcon } from "./icons";

/* Work and education from the CV, with the skills next to them; each
   entry is marked with an icon on the timeline.
   The employer is deliberately not named. */
const DUTIES = [
  "Manual testing of websites for functionality, usability and WCAG compliance",
  "Reviewing client requests and checking they are implemented accurately",
  "Final quality checks before each deployment, and the documentation that goes with them",
];

const SKILLS = [
  { title: "Testing", items: ["Manual", "Regression", "Functional", "Accessibility (WCAG)", "WordPress", "Bug reporting"] },
  { title: "Tools", items: ["Jira", "axe DevTools", "axe-core", "Playwright", "Selenium", "Git", "GitHub Actions"] },
  { title: "Development", items: ["HTML, CSS, JavaScript", "React", "Next.js", "React Native", "Node.js", "Supabase", "SQL"] },
  { title: "AI tools", items: ["Claude", "Cursor", "ChatGPT"] },
  { title: "Languages", items: ["Serbian (native)", "English (B2)"] },
];

export function Experience() {
  const { role, qaSince, qaSinceLabel, education } = PROFILE;
  const length = experienceLabel(qaSince, new Date(__BUILD_DATE__));
  return (
    <section id="experience" className="section section--alt" aria-labelledby="experience-title">
      <div className="container">
        <div className="section__head">
          <h2 id="experience-title" className="section__title">
            Experience
          </h2>
        </div>
        <div className="exp">
          <ol className="timeline">
            <li className="timeline__item">
              <span className="timeline__icon" aria-hidden="true">
                <BriefcaseIcon />
              </span>
              <h3 className="timeline__title">{role}</h3>
              <p className="timeline__when">
                {qaSinceLabel} – present <span className="timeline__length">({length})</span>
              </p>
              <ul className="timeline__list">
                {DUTIES.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </li>
            <li className="timeline__item">
              <span className="timeline__icon" aria-hidden="true">
                <CapIcon />
              </span>
              <h3 className="timeline__title">Bachelor's studies</h3>
              <p className="timeline__when">
                {education.school}, <span className="nowrap">{education.years}</span>
              </p>
              <ul className="timeline__list">
                <li>
                  Thesis: <a href="#p-thesis">Accessibility CI Testing</a>
                </li>
                <li>Team project: Volta, a web app for monitoring an energy microgrid (Angular, C#, MongoDB, SQLite)</li>
              </ul>
            </li>
          </ol>

          <div className="skills">
            {SKILLS.map((g) => (
              <div key={g.title} className="skills__group">
                <h3 className="skills__title">{g.title}</h3>
                <ul className="chips">
                  {g.items.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
