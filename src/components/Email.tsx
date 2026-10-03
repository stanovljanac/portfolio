import { Fragment } from "react";
import { CONTACT, useMounted } from "../data/contact";

/* Text written backwards in the HTML and displayed the right way round
   with CSS (.obf-rev), swapped for the real text after load. Same glyphs,
   same width — so nothing shifts. */
export function Obfuscated({ text }: { text: string }) {
  const mounted = useMounted();
  if (mounted) return <>{text}</>;
  return <span className="obf-rev">{[...text].reverse().join("")}</span>;
}

/* The email address; it becomes a mailto link after load. */
export function Email() {
  const mounted = useMounted();
  if (!mounted) return <Obfuscated text={CONTACT.email} />;
  return <a href={CONTACT.links.email}>{CONTACT.email}</a>;
}

/* Renders a dictionary string, replacing every "{email}" with <Email />. */
export function WithEmail({ text }: { text: string }) {
  const parts = text.split("{email}");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <Email /> : null}
        </Fragment>
      ))}
    </>
  );
}
