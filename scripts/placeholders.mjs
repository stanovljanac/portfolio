// Placeholders are written as [[…]] wherever real content is still missing
// (see src/data/profile.ts). They must never reach production.

/** Every distinct [[placeholder]] in `text`, in order of first appearance. */
export function findPlaceholders(text) {
  return [...new Set(text.match(/\[\[[^\]]*\]\]/g) ?? [])];
}

/** Whether leftover placeholders fail the build: the production deploy on
    Vercel (VERCEL_ENV=production, i.e. `main`), or STRICT_PLACEHOLDERS=1
    locally. Preview and local builds only warn, so previews keep working. */
export function isStrict(env) {
  return env.VERCEL_ENV === "production" || env.STRICT_PLACEHOLDERS === "1";
}
