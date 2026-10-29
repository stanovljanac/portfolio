import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
/* The browser bar colour per theme: --bg-base. Keep in step with the
   inline script in index.html, which sets both before the first paint. */
const THEME_COLOR: Record<Theme, string> = { light: "#FFFFFF", dark: "#070B16" };

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

function stored(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

/* Light/dark switch. The icon follows <html data-theme> through CSS, so it is
   right from the first paint; aria-pressed catches up after hydration
   (server and first client render both say "light"). */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    // Follow the system setting until the visitor picks a theme here.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (stored()) return;
      const t: Theme = mq.matches ? "dark" : "light";
      apply(t);
      setTheme(t);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the switch still works for this visit.
    }
  };

  return (
    <button type="button" className="theme-toggle" aria-pressed={theme === "dark"} aria-label="Dark theme" title="Dark theme" onClick={toggle}>
      <MoonIcon className="theme-toggle__moon" />
      <SunIcon className="theme-toggle__sun" />
    </button>
  );
}
