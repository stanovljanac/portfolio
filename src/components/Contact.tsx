import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Textarea } from "../ds";
import { submitError, validate, type Errors, type Failure } from "../lib/contact-form";
import { PROFILE } from "../data/profile";
import { CheckIcon, LinkedinIcon, MailIcon, ViberIcon, WhatsappIcon } from "./icons";
import { ContactLink, WithEmail } from "./Email";

/* ------------------------------------------------------------------
   Web3Forms — free, no-backend email delivery for static sites.
   The access key lives in .env as VITE_WEB3FORMS_ACCESS_KEY (and in the
   Vercel env vars). It is safe to expose in client-side code: it only
   ever delivers submissions to the inbox registered with Web3Forms.
------------------------------------------------------------------ */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  // Guards against double submits before the "submitting" state re-renders.
  const busy = useRef(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy.current) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    // Honeypot: real visitors never see or tick this box.
    if (data.get("botcheck")) {
      setStatus("success");
      return;
    }
    const field = (name: string) => String(data.get(name) ?? "");
    const fields = { name: field("name"), email: field("email"), message: field("message") };

    const next = validate(fields);
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      // Move focus to the first field with an error.
      const first = (["name", "email", "message"] as const).find((k) => next[k]);
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const fail = (f: Failure) => {
      setStatus("error");
      setFormError(submitError(f));
    };
    if (!WEB3FORMS_ACCESS_KEY) return fail({ kind: "no-key" });

    busy.current = true;
    setStatus("submitting");
    try {
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", "New message from mihailobuilds.com");
      data.append("from_name", "mihailobuilds.com");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) setStatus("success");
      else fail({ kind: "http", status: res.status, message: typeof json.message === "string" ? json.message : undefined });
    } catch {
      fail({ kind: "network" });
    } finally {
      busy.current = false;
    }
  }

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      {/* One grid for the heading, the form and the card, so the card can
          end where the message field ends (.contact in site.css). */}
      <div className="container contact">
        <div className="section__head contact__head">
          <h2 id="contact-title" className="section__title">
            Contact
          </h2>
          <p className="section__lede">
            Looking for a QA engineer, or want to talk about one of my projects? Send me a message.
          </p>
        </div>

        <div className="contact__main" aria-live="polite">
          {status !== "success" ? (
            <form className="contact__form" onSubmit={onSubmit} noValidate>
              {/* Honeypot for bots, hidden from people and assistive tech. */}
              <div hidden>
                <label>
                  Leave this box empty
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" />
                </label>
              </div>
              <div className="contact__row">
                <Input label="Name" name="name" autoComplete="name" error={errors.name} />
                <Input label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
              </div>
              <Textarea label="Message" name="message" rows={5} error={errors.message} />
              {status === "error" && formError ? (
                <p className="contact__error" role="alert">
                  <WithEmail text={formError} />
                </p>
              ) : null}
              <div>
                <Button variant="primary" size="lg" type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "Sending…" : "Send message"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="contact__success">
              <div className="contact__success-icon">
                <CheckIcon />
              </div>
              <h3>Message sent</h3>
              <p>Thanks. I'll reply to the email address you entered.</p>
              <Button variant="secondary" onClick={() => setStatus("idle")}>
                Send another message
              </Button>
            </div>
          )}
        </div>

        <aside className="contact__aside" aria-labelledby="direct-title">
          <h3 id="direct-title" className="contact__aside-title">
            Or contact me directly
          </h3>
          <ul className="channels">
            <li>
              <ContactLink kind="email">
                <MailIcon />
                <span>
                  <b>Email</b>
                  <small>Opens your email app</small>
                </span>
              </ContactLink>
            </li>
            <li>
              <ContactLink kind="viber">
                <ViberIcon />
                <span>
                  <b>Viber</b>
                  <small>Opens Viber</small>
                </span>
              </ContactLink>
            </li>
            <li>
              <ContactLink kind="whatsapp">
                <WhatsappIcon />
                <span>
                  <b>WhatsApp</b>
                  <small>Opens WhatsApp</small>
                </span>
              </ContactLink>
            </li>
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
                <span>
                  <b>LinkedIn</b>
                  <small>Opens my profile in a new tab</small>
                </span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
