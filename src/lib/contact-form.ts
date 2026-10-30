/* Validation and error messages for the contact form, kept out of the
   component so they can be tested. "{email}" in a message is rendered as
   an email link by <WithEmail>. */

export type Fields = { name: string; email: string; message: string };
export type Errors = Partial<Record<keyof Fields, string>>;

export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Enter your name.";
  const email = f.email.trim();
  if (!email) e.email = "Enter your email, so I can reply.";
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = "That email address doesn't look right. Check for typos.";
  if (!f.message.trim()) e.message = "Write a message.";
  return e;
}

export type Failure =
  | { kind: "no-key" }
  | { kind: "network" }
  | { kind: "http"; status: number; message?: string };

export function submitError(f: Failure): string {
  if (f.kind === "no-key") return "The form isn't connected right now, so nothing was sent. You can reach me {email}.";
  if (f.kind === "network")
    return "Couldn't reach the form service. Check your connection and try again, or reach me {email}.";
  if (f.status === 429) return "Too many messages in a short time. Wait a minute and try again, or reach me {email}.";
  const why = f.message ? `“${f.message}”` : `(HTTP ${f.status})`;
  return `The form service didn't accept the message ${why}. Try again, or reach me {email}.`;
}
