import { useState } from "react";
import { motion } from "framer-motion";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";
import { nowPlaying } from "./data";

/**
 * Currently Listening — a Spotify-inspired mini widget for the footer.
 * Buttons are decorative (no audio, no iframe). Just a small honest signal.
 */
export function NowPlaying() {
  const [playing, setPlaying] = useState(true);

  return (
    <div
      className="group inline-flex items-center gap-3 rounded-full border border-border/70 bg-surface/60 backdrop-blur-sm pl-3 pr-2 py-1.5 text-[12px] text-text-muted transition-colors hover:border-border-strong"
      aria-label={`Currently listening: ${nowPlaying.track} by ${nowPlaying.artist}`}
    >
      <a
        href={nowPlaying.href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2.5 min-w-0"
        aria-label="Open in Spotify"
      >
        <SpotifyMark />
        <Equalizer playing={playing} />
        <span className="min-w-0 flex items-baseline gap-1.5 leading-none">
          <span className="font-display text-[13px] text-text truncate max-w-[10rem]">
            {nowPlaying.track}
          </span>
          <span className="text-text-subtle">·</span>
          <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-subtle truncate max-w-[7rem]">
            {nowPlaying.artist}
          </span>
        </span>
      </a>

      <span className="hairline h-4 w-px bg-border" aria-hidden />

      <div className="flex items-center gap-0.5" role="group" aria-label="Playback (decorative)">
        <TransportButton label="Previous track">
          <SkipBack className="w-3 h-3" fill="currentColor" strokeWidth={0} />
        </TransportButton>
        <TransportButton
          label={playing ? "Pause" : "Play"}
          onClick={() => setPlaying((v) => !v)}
          primary
        >
          {playing ? (
            <Pause className="w-3 h-3" fill="currentColor" strokeWidth={0} />
          ) : (
            <Play className="w-3 h-3" fill="currentColor" strokeWidth={0} />
          )}
        </TransportButton>
        <TransportButton label="Next track">
          <SkipForward className="w-3 h-3" fill="currentColor" strokeWidth={0} />
        </TransportButton>
      </div>
    </div>
  );
}

function TransportButton({
  children,
  label,
  onClick,
  primary,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`grid place-items-center w-6 h-6 rounded-full transition-colors ${
        primary
          ? "bg-text/90 text-bg hover:bg-text"
          : "text-text-muted hover:text-text hover:bg-elevated/60"
      }`}
    >
      {children}
    </button>
  );
}

function SpotifyMark() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="w-3.5 h-3.5 shrink-0 text-[#1DB954]"
      fill="currentColor"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.52 17.34c-.24.36-.66.48-1.02.24-2.82-1.74-6.36-2.1-10.56-1.14-.42.12-.78-.18-.9-.54-.12-.42.18-.78.54-.9 4.56-1.02 8.52-.6 11.64 1.32.42.18.48.66.3 1.02zm1.44-3.3c-.3.42-.84.6-1.26.3-3.24-1.98-8.16-2.58-11.94-1.38-.48.12-1.02-.12-1.14-.6-.12-.48.12-1.02.6-1.14 4.38-1.32 9.78-.66 13.5 1.62.36.18.54.78.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.3c-.6.18-1.2-.18-1.38-.72-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.72 1.62.54.3.72 1.02.42 1.56-.3.42-1.02.6-1.56.3z" />
    </svg>
  );
}

function Equalizer({ playing }: { playing: boolean }) {
  return (
    <span aria-hidden className="inline-flex items-end gap-[2px] h-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[2px] rounded-sm bg-[#1DB954]/85"
          initial={{ height: 4 }}
          animate={playing ? { height: [4, 10, 5, 12, 4] } : { height: 4 }}
          transition={{
            duration: 1.2 + i * 0.2,
            repeat: playing ? Infinity : 0,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </span>
  );
}
