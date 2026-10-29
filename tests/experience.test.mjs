import { test } from "node:test";
import assert from "node:assert/strict";
import { experienceLabel } from "../src/lib/experience.ts";

test("under a year shows whole months", () => {
  assert.equal(experienceLabel("2025-03", new Date("2025-08-15")), "5 months");
});

test("the first month counts as one month", () => {
  assert.equal(experienceLabel("2025-03", new Date("2025-03-20")), "1 month");
});

test("12 to 17 months shows 1+ year", () => {
  assert.equal(experienceLabel("2025-03", new Date("2026-03-01")), "1+ year");
  assert.equal(experienceLabel("2025-03", new Date("2026-08-31")), "1+ year");
});

test("after that it rounds down to whole half-years", () => {
  assert.equal(experienceLabel("2025-03", new Date("2026-09-01")), "1.5+ years");
  assert.equal(experienceLabel("2025-03", new Date("2026-10-29")), "1.5+ years");
  assert.equal(experienceLabel("2025-03", new Date("2027-03-01")), "2+ years");
  assert.equal(experienceLabel("2025-03", new Date("2027-09-30")), "2.5+ years");
});
