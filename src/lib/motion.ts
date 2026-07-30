// Centralized motion vocabulary — Linear/Apple/Raycast calibration.
// Philosophy: fast reveal, zero blur, spring-like easing, small vertical travel.

import { useEffect, useCallback, useState, type RefObject } from "react";
import { useMotionValue, useSpring, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

// Primary easing: fast-start, smooth arrival. Matches iOS spring character.
export const ease = [0.25, 0.1, 0.25, 1] as const;
// Emphasized: slight overshoot feel, used for entrances.
export const easeEmphasized = [0.22, 1, 0.36, 1] as const;
// Exit: fast out. Used for things leaving the screen.
export const easeExit = [0.4, 0, 1, 1] as const;
export const easeOut = easeEmphasized;

export const duration = {
  instant:  0.12,
  quick:    0.22,
  standard: 0.45,
  long:     0.75,
  cinematic: 1.2,
} as const;

// Springs: non-bouncy, grounded. Stiffness 300 = snappy. Damping 30 = no overshoot.
export const spring = {
  // Crisp UI feedback
  snappy:   { type: "spring" as const, stiffness: 340, damping: 30, mass: 0.7 },
  // Natural, slightly slower — for cards, modals
  soft:     { type: "spring" as const, stiffness: 200, damping: 25, mass: 0.9 },
  // For cursor-following magnetic effects
  magnetic: { type: "spring" as const, stiffness: 160, damping: 22, mass: 0.6 },
  // For nav pill layout animations
  nav:      { type: "spring" as const, stiffness: 400, damping: 36, mass: 0.5 },
} as const;

// Scroll reveal: no blur, small y-travel, fast duration.
export const variants = {
  // Simple fade + subtle rise. No blur — it's heavy on mobile.
  rise: {
    hidden: { opacity: 0, y: 10 },
    show:   { opacity: 1, y: 0 },
  },
  // Pure fade — for elements that should appear without movement.
  fadeIn: {
    hidden: { opacity: 0 },
    show:   { opacity: 1 },
  },
  // Slide from left — for horizontal reveals.
  slideIn: {
    hidden: { opacity: 0, x: -12 },
    show:   { opacity: 1, x: 0 },
  },
} as const;

export const viewport = { once: true, margin: "-60px" } as const;

/**
 * useMagnetic — pointer inside the element pulls it toward the cursor.
 * Respects prefers-reduced-motion.
 */
export function useMagnetic(
  ref: RefObject<HTMLElement | null>,
  strength = 0.3,
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

/**
 * useScrollDissolve — scroll-driven opacity/scale/blur for hero elements.
 * Respects prefers-reduced-motion.
 */
export function useScrollDissolve(inputRange: [number, number, number]) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, inputRange, [1, 0.6, 0]);
  const scale = useTransform(scrollY, [inputRange[0], inputRange[2]], [1, 0.92]);
  const blurPx = useTransform(scrollY, [inputRange[0], inputRange[2]], [0, 8]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);
  const y = useTransform(scrollY, [inputRange[0], inputRange[2]], [0, -24]);
  return { opacity, scale, filter, y };
}

/**
 * useActiveSection — IntersectionObserver-based active section tracker.
 * Respects the nav's rootMargin convention: fires when section crosses 45% viewport center.
 */
export function useActiveSection(
  ids: string[],
  rootMargin = "-45% 0px -50% 0px",
): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin, threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids, rootMargin]);

  return active;
}
