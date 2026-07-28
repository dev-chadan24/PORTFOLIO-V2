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

    const timers = [
      setTimeout(() => setScene("name"), 100),
      setTimeout(() => setScene("line"), 1800),
      setTimeout(() => setScene("signature"), 3500),
      setTimeout(() => setExiting(true), 5500),
      setTimeout(finish, 6300),
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
    }, 800);
  };

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={exiting ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-bg"
          role="dialog"
          aria-label="Welcome"
        >
          <div className="relative w-full max-w-5xl h-[300px] flex items-center justify-center px-6">
            <AnimatePresence>
              {scene === "name" && (
                <motion.p
                  key="name"
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
                  transition={{ duration: 1.0, ease }}
                  className="absolute text-center text-text"
                  style={{
                    fontFamily: '"Fraunces", ui-serif, Georgia, serif',
                    fontWeight: 500,
                    letterSpacing: '-0.04em',
                    fontSize: 'clamp(2.8rem, 8vw, 6rem)',
                    lineHeight: 1.05,
                    fontFeatureSettings: '"cv11", "ss01"',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                >
                  Hi, I&apos;m Chandan.
                </motion.p>
              )}
              {scene === "line" && (
                <motion.p
                  key="line"
                  initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                  animate={{ opacity: 0.65, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(2px)" }}
                  transition={{ duration: 1.0, ease }}
                  className="absolute text-center text-text-muted"
                  style={{
                    fontFamily: '"Fraunces", ui-serif, Georgia, serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    letterSpacing: '-0.01em',
                    fontSize: 'clamp(1.5rem, 4vw, 2.8rem)',
                    textTransform: 'none',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                >
                  Where design meets development.
                </motion.p>
              )}
              {scene === "signature" && (
                <motion.div
                  key="sig"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.6, ease }}
                  className="absolute flex justify-center items-center w-full"
                >
                  <img
                    src={signatureImg}
                    alt="Chandan Mahapatra Signature"
                    className="w-[70vw] sm:w-[55vw] md:w-[55vw] lg:w-[50vw] max-w-[680px] h-auto object-contain select-none"
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
