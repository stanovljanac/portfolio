/* Contact form states, against the built site with the Web3Forms API mocked
   (nothing is sent). Needs a build with VITE_WEB3FORMS_ACCESS_KEY set; without
   one it checks the "not connected" message instead.
   - empty submit: an error per field, focus on the first one
   - invalid email
   - success; a double click on Send makes exactly one request
   - the service's own error message, HTTP 429, and a network failure
   The real delivery is checked on the Vercel preview, with the real key. */
import { BASE, launch, log, newContext } from "./_lib.mjs";

const API = "https://api.web3forms.com/submit";
const b = await launch();
let failed = 0;
const check = (ok, msg) => {
  log(ok ? "ok  " : "FAIL", msg);
  if (!ok) failed++;
};

async function open(reply) {
  const ctx = await newContext(b);
  const p = await ctx.newPage();
  const calls = [];
  await p.route(API, async (route) => {
    calls.push(route.request().postData() ?? "");
    await new Promise((r) => setTimeout(r, 300));
    if (reply === "network") return route.abort("internetdisconnected");
    await route.fulfill({ status: reply.status, contentType: "application/json", body: JSON.stringify(reply.body) });
  });
  await p.goto(BASE + "/#contact", { waitUntil: "networkidle" });
  return { ctx, p, calls };
}

async function fill(p) {
  await p.fill('input[name="name"]', "Ada Lovelace");
  await p.fill('input[name="email"]', "ada@example.com");
  await p.fill('textarea[name="message"]', "Hello from the QA script.");
}

const errorText = (p) => p.locator(".contact__error").textContent({ timeout: 3000 }).catch(() => "");

{
  const { ctx, p } = await open({ status: 200, body: { success: true } });
  await p.click('.contact__form button[type="submit"]');
  const errs = await p.locator(".mb-field__hint--error").allTextContents();
  const focused = await p.evaluate(() => document.activeElement.getAttribute("name"));
  check(errs.length === 3 && focused === "name", `empty submit: ${errs.length} field errors, focus on "${focused}"`);
  await fill(p);
  await p.fill('input[name="email"]', "ada@");
  await p.click('.contact__form button[type="submit"]');
  check((await p.locator(".mb-field__hint--error").allTextContents()).some((t) => /doesn't look right/.test(t)), "invalid email is called out");
  await ctx.close();
}

const keyed = await (async () => {
  const { ctx, p } = await open({ status: 200, body: { success: true } });
  await fill(p);
  await p.click('.contact__form button[type="submit"]');
  const t = await errorText(p);
  await ctx.close();
  return !/isn't connected/.test(t);
})();

if (!keyed) {
  log("(build has no Web3Forms key: only the not-connected message is checked)");
  const { ctx, p } = await open({ status: 200, body: { success: true } });
  await fill(p);
  await p.click('.contact__form button[type="submit"]');
  check(/isn't connected.*by email/.test(await errorText(p)), "no key: says so and offers email");
  await ctx.close();
} else {
  {
    const { ctx, p, calls } = await open({ status: 200, body: { success: true } });
    await fill(p);
    await p.locator('.contact__form button[type="submit"]').dblclick();
    await p.waitForSelector(".contact__success", { timeout: 5000 }).catch(() => {});
    const ok = await p.locator(".contact__success").isVisible();
    check(ok && calls.length === 1, `success after a double click, requests made: ${calls.length}`);
    check(/name="subject"\r\n\r\nNew message from mihailobuilds\.com/.test(calls[0] ?? ""), "the subject is sent");
    check(/name="botcheck"/.test(calls[0] ?? "") === false, "the empty honeypot is not sent");
    await ctx.close();
  }
  for (const [reply, re, label] of [
    [{ status: 400, body: { success: false, message: "Invalid access key" } }, /“Invalid access key”/, "service error quotes its reason"],
    [{ status: 429, body: { success: false } }, /Too many messages/, "HTTP 429"],
    ["network", /Couldn't reach the form service/, "network failure"],
  ]) {
    const { ctx, p } = await open(reply);
    await fill(p);
    await p.click('.contact__form button[type="submit"]');
    const t = await errorText(p);
    check(re.test(t) && /by email/.test(t), `${label}: "${t}"`);
    await ctx.close();
  }
}

await b.close();
log(failed ? `\n${failed} check(s) failed` : "\nall checks passed");
process.exit(failed ? 1 : 0);
