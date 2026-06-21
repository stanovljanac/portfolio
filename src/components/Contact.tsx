import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Textarea } from "../ds";
import { ArrowIcon, CheckIcon, ClockIcon, MailIcon, ShieldIcon, UserIcon } from "./icons";
import { Reveal } from "./Reveal";

/* ------------------------------------------------------------------
   Web3Forms — free, no-backend email delivery for static sites.
   The access key lives in .env as VITE_WEB3FORMS_ACCESS_KEY. It is
   safe to expose in client-side code: it only ever delivers
   submissions to the inbox registered with Web3Forms, nothing else.
------------------------------------------------------------------ */
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "";

type Errors = { name?: string; email?: string; message?: string };
type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
    const name = (fields[0]?.value || "").trim();
    const email = (fields[1]?.value || "").trim();
    const message = (fields[2]?.value || "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please enter your name.";
    if (!email) next.email = "Email is required.";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!message) next.message = "Tell me a little about your project.";

    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    setFormError("");

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setFormError("The contact form isn't connected yet — add your Web3Forms access key to enable it.");
      return;
    }

    setStatus("submitting");
    try {
      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "New message from mihailobuilds.com");
      formData.append("from_name", "MihailoBuilds website");

      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setFormError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setFormError("Network error — please try again, or email me directly.");
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="contact__intro">
          <span className="eyebrow">Contact</span>
          <h2 className="section__title">Have something worth building?</h2>
          <p className="section__lede">Tell me about the problem. If it's a fit, I'll help you ship.</p>
        </Reveal>

        <div className="contact__grid">
          {status !== "success" ? (
            <Reveal as="form" className="contact__form" onSubmit={onSubmit} noValidate>
              <div className="contact__row">
                <Input label="Full name" name="name" placeholder="Ada Lovelace" leadingIcon={<UserIcon />} error={errors.name} />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  leadingIcon={<MailIcon />}
                  error={errors.email}
                />
              </div>
              <Textarea
                label="Message"
                name="message"
                placeholder="What are you trying to build?"
                rows={5}
                error={errors.message}
              />
              {status === "error" && formError ? (
                <p className="contact__note contact__note--error">{formError}</p>
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
            </Reveal>
          ) : (
            <Reveal className="contact__success">
              <div className="contact__success-icon">
                <CheckIcon />
              </div>
              <h3>Message received.</h3>
              <p>Thanks — I'll be in touch within one business day.</p>
              <div style={{ marginTop: 20 }}>
                <Button variant="secondary" onClick={() => setStatus("idle")}>
                  Send another
                </Button>
              </div>
            </Reveal>
          )}

          <Reveal as="aside" delay={100} className="contact__aside">
            <div className="contact__aside-glow" />
            <div className="contact__aside-head">
              <span className="eyebrow">Why reach out</span>
              <h3>A developer who ships, and stays.</h3>
            </div>
            <div className="contact__points">
              <div className="contact__point">
                <ClockIcon />
                <span>I reply within one business day.</span>
              </div>
              <div className="contact__point">
                <ShieldIcon />
                <span>Your details stay private — no lists, no spam.</span>
              </div>
              <div className="contact__point">
                <CheckIcon />
                <span>Straight answers, direct from the developer who builds it.</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
