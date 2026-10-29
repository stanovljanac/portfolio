import { Fragment } from "react";
import type { MouseEvent, ReactNode } from "react";
import { emailHref } from "../data/contact";

/* A link to my email that shows no address. Its href points to the contact
   form; the real mailto: address is set only when the visitor clicks (or
   middle-clicks), and the browser then opens their email app. */
export function ContactLink({ className, children }: { className?: string; children: ReactNode }) {
  const reveal = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = emailHref();
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
          {i < parts.length - 1 ? <ContactLink>by email</ContactLink> : null}
        </Fragment>
      ))}
    </>
  );
}
