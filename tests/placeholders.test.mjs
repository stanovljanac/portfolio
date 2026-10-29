import { test } from "node:test";
import assert from "node:assert/strict";
import { findPlaceholders, isStrict } from "../scripts/placeholders.mjs";

test("lists each placeholder once, in order of appearance", () => {
  const html = '<p>[[photo]]</p><a href="[[linkedin-url]]">x</a><mark class="ph">[[photo]]</mark>';
  assert.deepEqual(findPlaceholders(html), ["[[photo]]", "[[linkedin-url]]"]);
});

test("finds placeholders with prefixes and colons", () => {
  assert.deepEqual(findPlaceholders("Why: [[why:keeper]] draft"), ["[[why:keeper]]"]);
});

test("finds nothing in finished HTML", () => {
  assert.deepEqual(findPlaceholders("<p>Hi, I'm Mihailo.</p>"), []);
});

test("the production deploy on Vercel is strict", () => {
  assert.equal(isStrict({ VERCEL_ENV: "production" }), true);
});

test("STRICT_PLACEHOLDERS=1 makes a local build strict", () => {
  assert.equal(isStrict({ STRICT_PLACEHOLDERS: "1" }), true);
});

test("preview and local builds only warn", () => {
  assert.equal(isStrict({ VERCEL_ENV: "preview" }), false);
  assert.equal(isStrict({}), false);
});
