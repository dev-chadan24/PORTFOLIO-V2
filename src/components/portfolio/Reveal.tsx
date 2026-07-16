import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 16,
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
  const Cmp = motion[As as "div"] as typeof motion.div;
  return (
    <Cmp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
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
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: delay + i * 0.08, ease }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
