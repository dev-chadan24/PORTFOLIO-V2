import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { ease, spring, useMagnetic } from "../../lib/motion";

/**
 * Premium liquid-glass Back-to-Top FAB. Appears after one viewport of
 * scroll, magnetic hover, smooth scroll to top.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const { x, y } = useMagnetic(ref, 0.35);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVisible(window.scrollY > window.innerHeight);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          ref={ref}
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={scrollTop}
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.92 }}
          transition={spring.magnetic}
          style={{ x, y }}
          className="glass-nav back-to-top fixed bottom-6 right-6 z-40 grid place-items-center rounded-full w-11 h-11 text-text hover:text-accent"
        >
          <motion.span
            initial={false}
            whileTap={reduced ? undefined : { y: -6, opacity: 0.6 }}
            transition={{ duration: 0.22, ease: ease }}
            className="grid place-items-center"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
