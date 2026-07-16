import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease, easeEmphasized, easeExit } from "../../lib/motion";
import { IntroSignature } from "./IntroSignature";

const KEY = "cm-intro-seen-v5";

/**
 * Cinematic 4-scene introduction. One continuous 6s sequence, no hard cuts.
 *   0.0–2.0s  "Hi, I'm Chandan."
 *   2.0–4.0s  "Where design meets development."
 *   4.0–5.5s  Handwritten signature draws
 *   5.5–6.0s  Dissolves into hero
 */
const T = {
  scene1: 0,
  scene2: 2000,
  scene3: 4000,
  exit: 5500,
  end: 6100,
} as const;

type Scene = "name" | "line" | "signature" | null;

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [scene, setScene] = useState<Scene>(null);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(KEY) === "1";

    if (seen) {
      setVisible(false);
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";

    if (reduced) {
      setScene("signature");
      const timers = [
        setTimeout(() => setExiting(true), 900),
        setTimeout(finish, 1500),
      ];
      return () => {
        timers.forEach(clearTimeout);
        document.body.style.overflow = "";
      };
    }

    const timers = [
      setTimeout(() => setScene("name"), T.scene1 + 100),
      setTimeout(() => setScene("line"), T.scene2),
      setTimeout(() => setScene("signature"), T.scene3),
      setTimeout(() => setExiting(true), T.exit),
      setTimeout(finish, T.end),
    ];

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 60);
    }, 550);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={
            exiting
              ? { opacity: 0, filter: "blur(10px)" }
              : { opacity: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.55, ease: easeExit }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden"
          style={{ background: "#050608" }}
          role="dialog"
          aria-label="Welcome"
        >
          {/* ambient accent glow */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.4, ease: easeEmphasized }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(900px circle at 50% 55%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          <div className="relative text-center px-6 min-h-[10rem] grid place-items-center">
            <AnimatePresence mode="wait">
              {scene === "name" && (
                <motion.p
                  key="name"
                  initial={{ opacity: 0, y: 8, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.9, ease: easeEmphasized }}
                  className="text-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] text-white"
                >
                  Hi, I&apos;m Chandan.
                </motion.p>
              )}
              {scene === "line" && (
                <motion.p
                  key="line"
                  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.9, ease: easeEmphasized }}
                  className="text-display italic text-[clamp(1.5rem,3.4vw,2.6rem)] leading-tight text-white/85"
                >
                  Where design meets development.
                </motion.p>
              )}
              {scene === "signature" && (
                <motion.div
                  key="sig"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: ease }}
                  style={{ mixBlendMode: "screen" }}
                >
                  <IntroSignature className="block" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={finish}
            className="absolute bottom-8 right-8 text-[11px] font-mono uppercase tracking-[0.22em] text-white/35 hover:text-white/80 transition-colors duration-500"
            aria-label="Skip intro"
          >
            skip →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
