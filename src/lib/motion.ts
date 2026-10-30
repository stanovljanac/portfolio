import { useEffect, useState, type RefObject } from "react";

/* Motion is an extra layer. The prerendered page already shows every
   element in its final state; these hooks only add movement on top, and do
   nothing with reduced motion (or on touch, for the pointer effects). */

const query = (q: string) => typeof matchMedia === "function" && matchMedia(q).matches;
const motionOK = () => query("(prefers-reduced-motion: no-preference)");
const finePointer = () => motionOK() && query("(hover: hover) and (pointer: fine)");

/* Writes the pointer's position over `area` to --mx and --my on `target`,
   from -0.5 to 0.5 (0 when the pointer leaves). CSS turns them into
   parallax or tilt. */
export function usePointerVars(target: RefObject<HTMLElement>, area: RefObject<HTMLElement> = target) {
  useEffect(() => {
    const el = target.current;
    const zone = area.current;
    if (!el || !zone || !finePointer()) return;
    let frame = 0;
    const set = (x: number, y: number) => {
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = zone.getBoundingClientRect();
        set((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      set(0, 0);
    };
    zone.addEventListener("pointermove", move);
    zone.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      zone.removeEventListener("pointermove", move);
      zone.removeEventListener("pointerleave", leave);
    };
  }, [target, area]);
}

/* "done" until JavaScript runs. If the element is still below the fold
   then, it becomes "ready" (the start of its animation), and "run" once a
   good part of it is on screen. */
export type RunState = "done" | "ready" | "run";

export function useRunOnView(ref: RefObject<HTMLElement>, threshold = 0.35): RunState {
  const [state, setState] = useState<RunState>("done");
  useEffect(() => {
    const el = ref.current;
    if (!el || !motionOK() || typeof IntersectionObserver !== "function") return;
    if (el.getBoundingClientRect().top < innerHeight) return;
    setState("ready");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("run");
        io.disconnect();
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return state;
}
