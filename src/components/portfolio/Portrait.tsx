import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Hero portrait frame.
 *
 * To swap in the real photograph, only change the `src` prop where
 * <Portrait /> is used (Hero.tsx). Recommended: 1200x1440 (5:6), .jpg,
 * ~85% quality, with a small margin around the subject.
 */
export function Portrait({
  src,
  alt = "Portrait of Chandan Mahapatra",
}: {
  src?: string | null;
  alt?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const rotY = useTransform(sx, [-1, 1], [-4, 4]);
  const rotX = useTransform(sy, [-1, 1], [3, -3]);
  const shiftX = useTransform(sx, [-1, 1], [-6, 6]);
  const shiftY = useTransform(sy, [-1, 1], [-6, 6]);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      ref={wrap}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative w-full max-w-[420px] mx-auto"
      style={{ perspective: 1400 }}
    >
      {/* ambient glow */}
      <motion.div
        aria-hidden
        style={{ x: shiftX, y: shiftY }}
        className="absolute -inset-8 rounded-[42px] opacity-70 blur-3xl pointer-events-none"
      >
        <div
          className="w-full h-full rounded-[42px]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 65%)",
          }}
        />
      </motion.div>

      {/* frame */}
      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="relative aspect-[5/6] rounded-[28px] overflow-hidden portrait-frame transition-shadow duration-700"
      >
        {/* photo */}
        {src ? (
          src.endsWith('.mp4') ? (
            <video
              src={src}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ objectFit: 'cover' }}
              ref={(el) => {
                if (el) {
                  el.play().catch(() => {});
                }
              }}
            />
          ) : (
            <img
              src={src}
              alt={alt}
              loading="eager"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <PortraitPlaceholder />
        )}

        {/* soft top lighting */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, white 8%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklab, black 32%, transparent) 100%)",
          }}
        />
        {/* pointer-tracked refraction */}
        <motion.div
          aria-hidden
          style={{ x: useTransform(sx, [-1, 1], [-30, 30]), y: useTransform(sy, [-1, 1], [-30, 30]) }}
          className="absolute inset-0 pointer-events-none opacity-70 mix-blend-screen"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(220px circle at 50% 40%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
            }}
          />
        </motion.div>

        {/* inner glass border */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[28px] pointer-events-none"
          style={{
            boxShadow:
              "inset 0 1px 0 color-mix(in oklab, white 16%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--accent) 12%, transparent)",
          }}
        />

      </motion.div>
    </div>
  );
}

function PortraitPlaceholder() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.28 0.04 275) 0%, oklch(0.18 0.02 270) 55%, oklch(0.14 0.015 265) 100%)",
      }}
    />
  );
}
