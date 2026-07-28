import { useState } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, nowPlaying } from "./data";

export function Colophon() {
  const [playing, setPlaying] = useState(true);

  return (
    <footer className="relative px-6 md:px-16 lg:px-24 py-8 max-w-7xl mx-auto">
      {/* Very faint top border like the screenshot */}
      <div className="absolute top-0 left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 h-px bg-gradient-to-r from-transparent via-border-strong/30 to-transparent" aria-hidden />

      {/* Single-row footer — all on one line on desktop */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-4 py-4">
        {/* Left: Branding */}
        <p
          className="shrink-0 flex items-center gap-3 flex-wrap"
        >
          <span
            style={{ 
              fontFamily: "var(--font-mono)", 
              fontSize: "10px", 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "var(--text-subtle)",
              fontWeight: 500
            }}
          >
            Designed &amp; Built by
          </span>
          <span
            style={{
              fontFamily: '"Fraunces", ui-serif, Georgia, serif',
              fontWeight: 400,
              fontSize: "15px",
              letterSpacing: "-0.01em",
              fontStyle: "italic",
              color: "var(--text)",
            }}
          >
            Chandan Mahapatra
          </span>
        </p>

        {/* Center: Social pills */}
        <div className="flex items-center gap-2">
          <FooterLink href={profile.github} icon={<Github className="w-[14px] h-[14px]" />} label="GitHub" external />
          <FooterLink href={profile.linkedin} icon={<Linkedin className="w-[14px] h-[14px]" />} label="LinkedIn" external />
          <FooterLink href={`mailto:${profile.email}`} icon={<Mail className="w-[14px] h-[14px]" />} label="Email" />
        </div>

        {/* Right: Inline music player (pill style) */}
        <div
          className="flex items-center gap-3 shrink-0 cursor-pointer select-none rounded-full border border-border/40 bg-surface/20 px-3 py-1.5 hover:border-border/60 transition-colors"
          onClick={() => setPlaying((p) => !p)}
          role="button"
          aria-label={playing ? "Pause" : "Play"}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setPlaying((p) => !p)}
        >
          <div className="flex items-center gap-2">
            {/* Spotify icon */}
            <svg
              className="shrink-0 w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ color: "#1DB954" }}
            >
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 0 1-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 0 1 .207.857zm1.223-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.973-.516.78.78 0 0 1 .516-.973c3.632-1.102 8.147-.568 11.237 1.328a.78.78 0 0 1 .257 1.07zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 0 1-.583-1.782c3.533-1.155 9.404-.932 13.115 1.338a.937.937 0 0 1-1.016 1.6z" />
            </svg>

            {/* Equalizer bars */}
            <div className="flex items-end gap-[1.5px] h-2.5">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="w-[1.5px] rounded-full"
                  style={{ background: "#1DB954", originY: 1 }}
                  animate={
                    playing
                      ? {
                          height: [3, 8 + (i % 2) * 2, 4, 9 - i, 3],
                        }
                      : { height: 3 }
                  }
                  transition={
                    playing
                      ? {
                          duration: 0.8 + i * 0.15,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }
                      : { duration: 0.3 }
                  }
                />
              ))}
            </div>
          </div>

          {/* Track info */}
          <div className="flex items-center gap-1.5 ml-1">
            <span
              className="text-[12px] font-medium"
              style={{ color: "var(--text)", letterSpacing: "-0.01em" }}
            >
              {nowPlaying.track}
            </span>
            <span
              className="text-[10px]"
              style={{ color: "var(--text-subtle)" }}
            >
              ·
            </span>
            <span
              className="text-[10px] tracking-[0.1em]"
              style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {nowPlaying.artist}
            </span>
          </div>

          {/* Vertical Separator */}
          <div className="w-px h-3.5 mx-1 bg-border/60" />

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            {/* Prev */}
            <button
              className="w-4 h-4 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--text-muted)" }}
              aria-label="Previous"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="19,21 5,12 19,3" />
              </svg>
            </button>

            {/* Play/Pause (White circle) */}
            <button
              className="w-5 h-5 flex items-center justify-center rounded-full hover:scale-105"
              style={{
                background: "var(--text)",
                color: "var(--bg)",
                transition: "transform 0.2s",
              }}
              aria-label={playing ? "Pause" : "Play"}
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
                    transition={{ duration: 0.12 }}
                    className="w-[10px] h-[10px]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="7" y="5" width="3" height="14" rx="0.5" />
                    <rect x="14" y="5" width="3" height="14" rx="0.5" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="play"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.12 }}
                    className="w-[10px] h-[10px]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ marginLeft: "1px" }}
                  >
                    <polygon points="6,4 20,12 6,20" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            {/* Next */}
            <button
              className="w-4 h-4 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
              style={{ color: "var(--text-muted)" }}
              aria-label="Next"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-2 h-2" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-surface/20 px-3.5 py-1.5 text-[11px] text-text-muted hover:text-text hover:border-border/60 hover:bg-surface/40 transition-all duration-300"
    >
      <span className="opacity-70">{icon}</span>
      <span style={{ fontWeight: 500 }}>{label}</span>
    </a>
  );
}
