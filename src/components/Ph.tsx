import { Fragment } from "react";

/** True for a [[placeholder]] value that is still waiting for real content. */
export const isPlaceholder = (s: string) => /^\[\[[^\]]*\]\]$/.test(s.trim());

/* Renders text, marking every [[placeholder]] in it so it stands out on
   previews. The build lists them and refuses them in production. */
export function Ph({ text }: { text: string }) {
  const parts = text.split(/(\[\[[^\]]*\]\])/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <mark key={i} className="ph">
            {p}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}
