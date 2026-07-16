import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeProvider } from "../lib/theme";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes — Chandan Mahapatra" },
      {
        name: "description",
        content:
          "Short essays, patterns, and things I've learned while building on the frontend.",
      },
      { property: "og:title", content: "Notes — Chandan Mahapatra" },
      {
        property: "og:description",
        content:
          "Short essays, patterns, and things I've learned while building on the frontend.",
      },
    ],
  }),
  component: Notes,
});

function Notes() {
  return (
    <ThemeProvider>
      <div className="grain-overlay" aria-hidden />
      <main className="min-h-screen px-6 md:px-16 lg:px-24 py-32 max-w-3xl mx-auto">
        <Link
          to="/"
          className="text-eyebrow inline-flex items-center gap-2 mb-12 hover:text-text transition-colors"
        >
          ← Back home
        </Link>
        <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] mb-8">
          Notes
        </h1>
        <p className="text-lede mb-12">
          Short essays, patterns, and things I've learned while building on the
          frontend. First entries coming soon.
        </p>
      </main>
    </ThemeProvider>
  );
}
