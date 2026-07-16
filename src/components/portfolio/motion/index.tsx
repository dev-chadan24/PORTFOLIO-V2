import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { duration, ease, viewport as vp } from "@/lib/motion";

type Common = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "section" | "p" | "h1" | "h2" | "h3";
} & Omit<MotionProps, "children">;

/** Dissolve — blur + opacity, no y-shift. Use for headlines and hero copy. */
export function Dissolve({
  children,
  delay = 0,
  className,
  as = "div",
  ...rest
}: Common) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(10px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)" }}
      viewport={vp}
      transition={{ duration: duration.long, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

/** Rise — small y + opacity. Body, cards, list items. */
export function Rise({
  children,
  delay = 0,
  y = 12,
  className,
  as = "div",
  ...rest
}: Common & { y?: number }) {
  const reduce = useReducedMotion();
  const Cmp = motion[as] as typeof motion.div;
  return (
    <Cmp
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: duration.standard, delay, ease }}
      className={className}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

/** MaskReveal — overflow-hidden with an inner slide. Use for names, dividers. */
export function MaskReveal({
  children,
  delay = 0,
  className,
  as = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const reduce = useReducedMotion();
  const Wrapper = as;
  return (
    <Wrapper
      className={className}
      style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
    >
      <motion.span
        initial={reduce ? { opacity: 0 } : { y: "108%" }}
        whileInView={reduce ? { opacity: 1 } : { y: "0%" }}
        viewport={vp}
        transition={{ duration: 1.05, delay, ease }}
        style={{ display: "inline-block" }}
      >
        {children}
      </motion.span>
    </Wrapper>
  );
}

/** Depth — subtle parallax handled by consumers; this exposes shared transition. */
export const depthTransition = { type: "spring" as const, stiffness: 60, damping: 20 };
