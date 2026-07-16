import { motion, useReducedMotion } from "framer-motion";
import { ease } from "../../lib/motion";
import signatureAsset from "../../assets/Images/Signature.png";

/**
 * Renders the actual handwritten Chandan signature asset (Signature.png).
 * Theme adaptation via CSS filter:
 *   • Dark theme  → invert(1) brightness(1.1)  (black ink → white)
 *   • Light theme → invert(0) brightness(0.12) (black ink → deep graphite)
 * Animation: fade + slight upward movement — same timing as original intro.
 */

export function IntroSignature({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <motion.img
      src={signatureAsset}
      alt="Chandan — signature"
      role="img"
      draggable={false}
      className={className}
      initial={shouldAnimate ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldAnimate
          ? { duration: 0.75, ease }
          : { duration: 0 }
      }
      style={{
        /*
         * Fluid hero scaling — grows with the viewport, stops at ultrawide.
         *   Mobile  (375px): 280px floor  (~75vw)
         *   Tablet  (768px): 65vw = 499px
         *   Laptop (1440px): 65vw = 936px
         *   Desktop(1920px): 65vw = 1248px
         *   Ultra  (2560px): 1400px ceiling (~55vw)
         */
        width: "clamp(280px, 65vw, 1400px)",
        maxWidth: "100%",
        height: "auto",
        aspectRatio: "2 / 1",
        objectFit: "contain",
        userSelect: "none",
        /*
         * The intro overlay is always dark (#050608) regardless of theme.
         * filter  → invert turns black ink white, white bg becomes black
         * blend   → screen makes the black bg fully transparent
         */
        filter: "invert(1) brightness(1.08)",
        mixBlendMode: "screen",
      }}
    />
  );
}

/** Static, non-animated mark for footer / résumé reuse. */
export function SignatureMark({ className }: { className?: string }) {
  return <IntroSignature className={className} animate={false} />;
}
