import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nowPlaying } from "./data";

/**
 * NowPlaying — premium static music widget.
 * Inspired by Apple Music / Raycast — minimal, glass, intentional.
 */
export function NowPlaying() {
  const [playing, setPlaying] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
    >
      <div
        className="relative flex items-center gap-3.5 rounded-2xl overflow-hidden cursor-pointer select-none"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid color-mix(in oklab, var(--border) 60%, transparent)",
          boxShadow:
            "inset 0 1px 0 color-mix(in oklab, white 6%, transparent), 0 6px 20px -10px color-mix(in oklab, black 35%, transparent)",
          padding: "10px 14px",
          width: "240px",
          transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={() => setPlaying((p) => !p)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 40%, var(--border))";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 color-mix(in oklab, white 8%, transparent), 0 12px 32px -14px color-mix(in oklab, var(--accent) 30%, transparent)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.borderColor = "color-mix(in oklab, var(--border) 60%, transparent)";
          e.currentTarget.style.boxShadow = "inset 0 1px 0 color-mix(in oklab, white 6%, transparent), 0 6px 20px -10px color-mix(in oklab, black 35%, transparent)";
        }}
        role="button"
        aria-label={playing ? "Pause" : "Play"}
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setPlaying((p) => !p)}
      >
        {/* Album art — vinyl aesthetic */}
        <div
          className="relative shrink-0 w-9 h-9 rounded-[10px] overflow-hidden"
          style={{
            boxShadow: "0 3px 10px -3px color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(145deg, var(--elevated-2) 0%, var(--surface) 100%)",
            }}
          />
          {/* Vinyl grooves */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ border: "1px solid color-mix(in oklab, var(--border-strong) 40%, transparent)" }}
            >
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ border: "1px solid color-mix(in oklab, var(--border-strong) 30%, transparent)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent)", opacity: 0.6 }}
                />
              </div>
            </div>
          </div>
          {/* Spinning record */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, color-mix(in oklab, white 4%, transparent) 20%, transparent 40%)",
            }}
            animate={playing ? { rotate: 360 } : { rotate: 0 }}
            transition={
              playing
                ? { duration: 4, repeat: Infinity, ease: "linear" }
                : { duration: 0 }
            }
          />
        </div>

        {/* Track info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            {/* Spotify icon */}
            <svg
              className="shrink-0 w-2.5 h-2.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: "var(--accent)", opacity: 0.8 }}
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.516.78.78 0 0 1 .516-.973c3.632-1.102 8.147-.568 11.237 1.328a.78.78 0 0 1 .257 1.07zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 0 1-.583-1.782c3.533-1.155 9.404-.932 13.115 1.338a.937.937 0 0 1-1.016 1.6z" />
            </svg>
            <span
              className="text-[8.5px] uppercase tracking-[0.2em]"
              style={{ color: "var(--text-subtle)", fontFamily: "var(--font-mono)" }}
            >
              {playing ? "Now Playing" : "Paused"}
            </span>
          </div>

          <p
            className="text-[12px] font-medium truncate"
            style={{
              color: "var(--text)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
            }}
          >
            {nowPlaying.track}
          </p>
          <p
            className="text-[10.5px] truncate"
            style={{ color: "var(--text-muted)", lineHeight: 1.4 }}
          >
            {nowPlaying.artist}
          </p>
        </div>

        {/* Play/Pause button */}
        <button
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: "color-mix(in oklab, var(--elevated-2) 70%, transparent)",
            border: "1px solid color-mix(in oklab, var(--border-strong) 50%, transparent)",
            color: "var(--text)",
            transition: "background-color 0.3s, transform 0.3s",
          }}
          aria-label={playing ? "Pause music" : "Play music"}
          onClick={(e) => {
            e.stopPropagation();
            setPlaying((p) => !p);
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {playing ? (
              <motion.svg
                key="pause"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-2.5 h-2.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="w-2.5 h-2.5"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ marginLeft: "1px" }}
              >
                <polygon points="5,3 19,12 5,21" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        {/* Hover glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 50%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 70%)",
          }}
        />
      </div>

      {/* Progress bar */}
      <div className="mt-1.5 px-0.5" aria-label="Track progress">
        <div
          className="h-[2px] rounded-full overflow-hidden"
          style={{ background: "color-mix(in oklab, var(--border) 50%, transparent)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 60%, transparent))",
              width: "42%",
            }}
          />
        </div>
        <div className="flex justify-between mt-0.5">
          <span
            className="text-[8px]"
            style={{ color: "var(--text-subtle)", fontFamily: "var(--font-mono)", opacity: 0.7 }}
          >
            1:47
          </span>
          <span
            className="text-[8px]"
            style={{ color: "var(--text-subtle)", fontFamily: "var(--font-mono)", opacity: 0.7 }}
          >
            4:16
          </span>
        </div>
      </div>
    </motion.div>
  );
}
