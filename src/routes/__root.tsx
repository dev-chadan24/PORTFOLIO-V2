import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ThemeProvider } from "../components/ThemeProvider";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display text-[clamp(4rem,12vw,8rem)] leading-none text-text-muted">404</h1>
        <h2 className="mt-4 text-display text-xl text-text">Page not found</h2>
        <p className="mt-3 text-[15px] text-text-muted leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="cta-primary inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg"
          >
            <span>Go home</span>
            <span className="grid place-items-center w-8 h-8 rounded-full bg-bg/15">←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h1 className="text-display text-xl text-text">
          This page didn't load
        </h1>
        <p className="mt-3 text-[15px] text-text-muted leading-relaxed">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="cta-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm bg-text text-bg"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-text-muted hover:text-text hover:border-border-strong transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { httpEquiv: "Cache-Control", content: "no-cache, no-store, must-revalidate" },
      { httpEquiv: "Pragma", content: "no-cache" },
      { httpEquiv: "Expires", content: "0" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Chandan Mahapatra" },
      { name: "theme-color", content: "#F7F3EB" },
      { title: "Chandan Mahapatra — Product-minded frontend engineer" },
      { property: "og:title", content: "Chandan Mahapatra — Product-minded frontend engineer" },
      { name: "twitter:title", content: "Chandan Mahapatra — Product-minded frontend engineer" },
      {
        name: "description",
        content:
          "Chandan Mahapatra — product-minded frontend engineer from Odisha. Selected work, a build log of experiments, and how to get in touch.",
      },
      {
        property: "og:description",
        content:
          "I build the parts of software people actually touch. Selected work, a build log of experiments, and notes on the craft.",
      },
      {
        name: "twitter:description",
        content:
          "I build the parts of software people actually touch. Selected work, a build log of experiments, and notes on the craft.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://chandanmahapatra.com/" },
      { property: "og:image", content: "https://chandanmahapatra.com/og-image.png" },
      { name: "twitter:image", content: "https://chandanmahapatra.com/og-image.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "canonical", href: "https://chandanmahapatra.com/" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "apple-touch-icon", href: "/icon-192.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
        as: "style",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Chandan Mahapatra",
        url: "https://chandanmahapatra.com",
        jobTitle: "Frontend Engineer & Product Designer",
        description: "Product-minded frontend engineer from Odisha, India. Building the parts of software people actually touch.",
        sameAs: [
          "https://github.com/dev-chadan24",
          "https://www.linkedin.com/in/chandan-mahapatra"
        ]
      },
      {
        "@type": "WebSite",
        name: "Chandan Mahapatra — Portfolio",
        url: "https://chandanmahapatra.com",
        description: "Selected work, research papers, and notes on the craft of frontend engineering."
      }
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const storedTheme = localStorage.getItem('ui-theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark', 'light');
                  if (storedTheme === 'light') document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { ReactLenis } from "lenis/react";
import { CommandPalette } from "../components/ui/CommandPalette";
import { usePlatformDetect } from "../hooks/usePlatformDetect";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  usePlatformDetect();

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <CommandPalette />
          <Outlet />
        </QueryClientProvider>
      </ThemeProvider>
    </ReactLenis>
  );
}
