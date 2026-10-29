/* Time since `since` ("YYYY-MM") as a short label: whole months for the
   first year, then whole half-years rounded down ("1+ year", "1.5+ years").
   Called with the build date, so the label never goes stale. */
export function experienceLabel(since: string, now: Date): string {
  const [year, month] = since.split("-").map(Number);
  const months = (now.getUTCFullYear() - year) * 12 + (now.getUTCMonth() + 1 - month);
  if (months < 12) {
    const n = Math.max(months, 1);
    return `${n} month${n === 1 ? "" : "s"}`;
  }
  const years = Math.floor(months / 6) / 2;
  return `${years}+ year${years === 1 ? "" : "s"}`;
}
