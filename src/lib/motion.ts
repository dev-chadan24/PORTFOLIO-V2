// Single motion vocabulary for the portfolio.
// Vertical motion tokens: 8–12px. Anything larger is rejected.

import { useEffect, type RefObject } from "react";
import { useMotionValue, useSpring, useReducedMotion, type MotionValue } from "framer-motion";

// Kept as the default tuple for legacy imports (`ease`).
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeEmphasized = [0.16, 1, 0.3, 1] as const;
export const easeExit = [0.4, 0, 1, 1] as const;
export const easeOut = easeEmphasized;

export const duration = {
  instant: 0.18,
  quick: 0.35,
  standard: 0.7,
  long: 1.2,
  cinematic: 2.0,
} as const;

export const spring = {
  soft: { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.8 },
  snappy: { type: "spring" as const, stiffness: 220, damping: 26 },
  magnetic: { type: "spring" as const, stiffness: 220, damping: 22, mass: 0.6 },
} as const;

export const variants = {
  dissolve: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  rise: {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
} as const;

export const viewport = { once: true, margin: "-80px" } as const;

/**
 * Magnetic hover — pointer inside the element pulls it toward the cursor
 * via a soft spring. Respects prefers-reduced-motion.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.35,
): { x: MotionValue<number>; y: MotionValue<number> } {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring.magnetic);
  const sy = useSpring(y, spring.magnetic);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = e.clientX - (r.left + r.width / 2);
      const cy = e.clientY - (r.top + r.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(cx * strength);
        y.set(cy * strength);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      x.set(0);
      y.set(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, [ref, strength, reduced, x, y]);

  return { x: sx, y: sy };
}
