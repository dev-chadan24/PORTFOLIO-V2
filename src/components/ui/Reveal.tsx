import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { easeEmphasized } from "../../lib/motion";

export function Reveal({
  children,
  delay = 0,
  y = 10,
  className,
  as: As = "div" as const,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
} & MotionProps) {
  const reduced = useReducedMotion();
  const Cmp = motion[As as "div"] as typeof motion.div;
  return (
    <Cmp
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: easeEmphasized }}
      className={className}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

export function RevealLines({
  lines,
  className,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: reduced ? "0%" : "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: delay + i * 0.07, ease: easeEmphasized }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
