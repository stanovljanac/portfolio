import { Fragment } from "react";
import type { MouseEvent, ReactNode } from "react";
import { contactHref, type ContactKind } from "../data/contact";

/* A link to email / Viber / WhatsApp that shows no address or number.
   Its href points to the contact section; the real address is set only when
   the visitor clicks (or middle-clicks), and the browser then opens the
   matching app. */
export function ContactLink({ kind, className, children }: { kind: ContactKind; className?: string; children: ReactNode }) {
  const reveal = (e: MouseEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    a.href = contactHref(kind);
    if (kind === "whatsapp") {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
  };
  return (
    <a href="#contact" className={className} onClick={reveal} onAuxClick={reveal}>
      {children}
    </a>
  );
}

/* Renders a message, replacing every "{email}" with a "by email" link. */
export function WithEmail({ text }: { text: string }) {
  const parts = text.split("{email}");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? <ContactLink kind="email">by email</ContactLink> : null}
        </Fragment>
      ))}
    </>
  );
}
