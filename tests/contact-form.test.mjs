import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, submitError } from "../src/lib/contact-form.ts";

const ok = { reason: "idea", name: "Ada", email: "ada@example.com", message: "Hello" };

test("a complete message has no errors", () => {
  assert.deepEqual(validate(ok), {});
});

test("every empty field gets its own message", () => {
  const e = validate({ reason: "", name: " ", email: "", message: "\n" });
  assert.equal(e.reason, "Choose what your message is about.");
  assert.equal(e.name, "Please enter your name.");
  assert.equal(e.email, "Please enter your email, so I can reply.");
  assert.equal(e.message, "Please write a message.");
});

test("an email without a domain is called out as invalid", () => {
  assert.equal(validate({ ...ok, email: "ada@" }).email, "That email address doesn't look right. Check for typos.");
});

test("an unknown reason is rejected", () => {
  assert.equal(validate({ ...ok, reason: "spam" }).reason, "Choose what your message is about.");
});

test("a missing access key says the form is not connected", () => {
  assert.match(submitError({ kind: "no-key" }), /isn't connected/);
});

test("a network failure says the service could not be reached", () => {
  assert.match(submitError({ kind: "network" }), /Couldn't reach the form service/);
});

test("HTTP 429 says to wait before trying again", () => {
  assert.match(submitError({ kind: "http", status: 429 }), /Too many messages/);
});

test("a rejection quotes the service's own reason", () => {
  assert.match(submitError({ kind: "http", status: 400, message: "Invalid access key" }), /“Invalid access key”/);
});

test("a rejection without a reason still names the status", () => {
  assert.match(submitError({ kind: "http", status: 500 }), /\(HTTP 500\)/);
});

test("every error offers email as the way out", () => {
  for (const o of [{ kind: "no-key" }, { kind: "network" }, { kind: "http", status: 500 }]) {
    assert.match(submitError(o), /\{email\}/);
  }
});
