import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import signatureImg from "../../assets/Images/Signature.png";

const KEY = "cm-intro-seen-v9";

type Scene = "name" | "line" | "signature" | null;

export function Intro({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [scene, setScene] = useState<Scene>(null);
  const [exiting, setExiting] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const seen = localStorage.getItem(KEY) === "1";

    if (seen) {
      setVisible(false);
      onDone();
      return;
    }

    document.body.style.overflow = "hidden";

    if (reduced) {
      setScene("signature");
      const timers = [
        setTimeout(() => setExiting(true), 1500),
        setTimeout(finish, 2300),
      ];
      return () => {
        timers.forEach(clearTimeout);
        document.body.style.overflow = "";
      };
    }

    // Cinematic timing: name → pause → tagline → pause → signature → hold → dissolve
    const timers = [
      setTimeout(() => setScene("name"), 120),
      setTimeout(() => setScene("line"), 1900),
      setTimeout(() => setScene("signature"), 3600),
      setTimeout(() => setExiting(true), 5800),
      setTimeout(finish, 6700),
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
  }, []);

  const finish = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    document.body.style.overflow = "";
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 60);
    }, 900);
  };

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
  const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.9, ease }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden"
          style={{ backgroundColor: "var(--bg)" }}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome"
        >
          {/* Ambient radial glow — deep center pulse */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, var(--glow-strong), transparent 75%)",
              animation: "intro-glow-pulse 4s ease-in-out infinite",
            }}
          />

          {/* Grain texture for depth */}
          <div aria-hidden className="grain-overlay" />

          <div className="relative w-full max-w-5xl h-[340px] flex items-center justify-center px-8">
            <AnimatePresence mode="wait">
              {scene === "name" && (
                <motion.p
                  key="name"
                  initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -14, filter: "blur(3px)" }}
                  transition={{ duration: 1.1, ease }}
                  className="absolute text-center text-text"
                  style={{
                    fontFamily: '"Fraunces", ui-serif, Georgia, serif',
                    fontWeight: 460,
                    letterSpacing: "-0.045em",
                    fontSize: "clamp(3rem, 8.5vw, 6.5rem)",
                    lineHeight: 1.02,
                    fontFeatureSettings: '"cv11", "ss01"',
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  Hi, I&apos;m Chandan.
                </motion.p>
              )}
              {scene === "line" && (
                <motion.p
                  key="line"
                  initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                  animate={{ opacity: 0.7, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                  transition={{ duration: 1.1, ease }}
                  className="absolute text-center"
                  style={{
                    color: "var(--text-muted)",
                    fontFamily: '"Fraunces", ui-serif, Georgia, serif',
                    fontWeight: 360,
                    fontStyle: "italic",
                    letterSpacing: "-0.015em",
                    fontSize: "clamp(1.55rem, 4.2vw, 3rem)",
                    lineHeight: 1.2,
                    WebkitFontSmoothing: "antialiased",
                    MozOsxFontSmoothing: "grayscale",
                  }}
                >
                  Where design meets development.
                </motion.p>
              )}
              {scene === "signature" && (
                <motion.div
                  key="sig"
                  initial={{ opacity: 0, scale: 0.96, filter: "blur(3px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 1.8, ease: easeOut }}
                  className="absolute flex justify-center items-center w-full"
                >
                  <img
                    src={signatureImg}
                    alt="Chandan Mahapatra Signature"
                    className="w-[72vw] sm:w-[58vw] md:w-[56vw] lg:w-[52vw] max-w-[700px] h-auto object-contain select-none"
                    style={{
                      mixBlendMode: "var(--signature-blend)" as any,
                      filter: "var(--signature-filter)",
                      opacity: "var(--signature-opacity)" as any,
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Escape hint — fades in after 1s */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.2, duration: 1.0 }}
            onClick={finish}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 hover:opacity-70 transition-opacity"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-subtle)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Press Esc to skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
