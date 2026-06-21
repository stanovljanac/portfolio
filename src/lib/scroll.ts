/* Smooth-scroll to a section, offset for the fixed 68px nav. */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top: y, behavior: "smooth" });
}
