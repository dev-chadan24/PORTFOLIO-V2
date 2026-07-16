import { createFileRoute, Link } from "@tanstack/react-router";
import { ThemeProvider } from "../lib/theme";

export const Route = createFileRoute("/uses")({
  head: () => ({
    meta: [
      { title: "Uses — Chandan Mahapatra" },
      {
        name: "description",
        content:
          "The everyday workshop — editor, tools, and small things I lean on to build software.",
      },
      { property: "og:title", content: "Uses — Chandan Mahapatra" },
      {
        property: "og:description",
        content:
          "The everyday workshop — editor, tools, and small things I lean on to build software.",
      },
    ],
  }),
  component: Uses,
});

function Uses() {
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
          Uses
        </h1>
        <p className="text-lede mb-12">
          A living page about the workshop — editor, hardware, and small tools I
          reach for every day. Coming soon.
        </p>
      </main>
    </ThemeProvider>
  );
}
