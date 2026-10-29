import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Textarea } from "../ds";
import { REASONS, submitError, validate, type Errors, type Failure } from "../lib/contact-form";
import { ArrowIcon, CheckIcon, MailIcon } from "./icons";
import { Reveal } from "./Reveal";
import { ContactLink, WithEmail } from "./Email";
import { CvLink, ProfileLinks } from "./About";

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
    const fields = { reason: field("reason"), name: field("name"), email: field("email"), message: field("message") };

    const next = validate(fields);
    setErrors(next);
    setFormError("");
    if (Object.keys(next).length) {
      // Move focus to the first field with an error.
      const first = (["reason", "name", "email", "message"] as const).find((k) => next[k]);
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
      const reason = REASONS.find((r) => r.value === fields.reason)?.label ?? fields.reason;
      data.append("access_key", WEB3FORMS_ACCESS_KEY);
      data.append("subject", `${reason}: new message from mihailobuilds.com`);
      data.append("from_name", "mihailobuilds.com");
      data.set("reason", reason);

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
    <section id="contact" className="section section--alt" aria-labelledby="contact-title">
      <div className="container">
        <Reveal className="section__head">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section__title">
            Saw something <span className="accent">you like?</span>
          </h2>
          <p className="section__lede">
            Write to me if you have an idea you think I could help with, or a job you think I'd be a good fit for.
          </p>
        </Reveal>

        <div className="contact">
          <div className="contact__main" aria-live="polite">
            {status !== "success" ? (
              <form className="contact__form" onSubmit={onSubmit} noValidate>
                <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: "none" }} />
                <fieldset
                  className="reasons"
                  role="radiogroup"
                  aria-labelledby="reason-legend"
                  aria-invalid={errors.reason ? true : undefined}
                  aria-describedby={errors.reason ? "reason-error" : undefined}
                >
                  <legend id="reason-legend" className="mb-field__label">
                    What's it about?
                  </legend>
                  <div className="reasons__opts">
                    {REASONS.map((r) => (
                      <label key={r.value} className="reason">
                        <input type="radio" name="reason" value={r.value} />
                        <span>{r.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.reason ? (
                    <span id="reason-error" className="mb-field__hint mb-field__hint--error">
                      {errors.reason}
                    </span>
                  ) : null}
                </fieldset>
                <div className="contact__row">
                  <Input label="Your name" name="name" autoComplete="name" error={errors.name} />
                  <Input label="Your email" name="email" type="email" autoComplete="email" error={errors.email} />
                </div>
                <Textarea label="Message" name="message" rows={5} error={errors.message} />
                {status === "error" && formError ? (
                  <p className="contact__error" role="alert">
                    <WithEmail text={formError} />
                  </p>
                ) : null}
                <div>
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    trailingIcon={<ArrowIcon />}
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Send message"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="contact__success">
                <div className="contact__success-icon">
                  <CheckIcon />
                </div>
                <h3>Thanks, your message is on its way.</h3>
                <p>I read every message and reply as soon as I can.</p>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            )}
          </div>

          <aside className="contact__aside" aria-labelledby="direct-title">
            <h3 id="direct-title" className="contact__aside-title">
              Or reach me directly
            </h3>
            <ContactLink className="channel">
              <MailIcon />
              <span>
                <b>Email me</b>
                <small>Opens your email app</small>
              </span>
            </ContactLink>
            <div className="contact__more">
              <CvLink variant="secondary" />
              <ProfileLinks />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
