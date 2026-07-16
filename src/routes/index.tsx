import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ThemeProvider } from "../lib/theme";
import { Nav } from "../components/portfolio/Nav";
import { Hero } from "../components/portfolio/Hero";
import { About } from "../components/portfolio/About";
import { Work } from "../components/portfolio/Work";
import { Experience } from "../components/portfolio/Experience";
import { BuildLog } from "../components/portfolio/BuildLog";
import { Skills } from "../components/portfolio/Skills";
import { Contact } from "../components/portfolio/Contact";
import { Colophon } from "../components/portfolio/Colophon";
import { Intro } from "../components/portfolio/Intro";
import { BackToTop } from "../components/portfolio/BackToTop";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Chandan Mahapatra — Product-minded frontend engineer" },
      {
        name: "description",
        content:
          "Chandan Mahapatra — product-minded frontend engineer from Odisha. Selected work, research papers, and how to get in touch.",
      },
      {
        property: "og:title",
        content: "Chandan Mahapatra — Product-minded frontend engineer",
      },
      {
        property: "og:description",
        content:
          "I build the parts of software people actually touch. Selected work, research papers, and notes on the craft.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <ThemeProvider>
      <Intro onDone={() => setIntroDone(true)} />
      <div className="grain-overlay" aria-hidden />
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-elevated focus:text-text focus:px-4 focus:py-2 focus:rounded-full focus:text-sm"
      >
        Skip to work
      </a>
      <div
        style={{
          opacity: introDone ? 1 : 0,
          transition: "opacity 900ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <Nav />
        <main>
          <Hero />
          <Work />
          <About />
          <Skills />
          <Experience />
          <BuildLog />
          <Contact />
        </main>
        <Colophon />
        <BackToTop />
      </div>
    </ThemeProvider>
  );
}
