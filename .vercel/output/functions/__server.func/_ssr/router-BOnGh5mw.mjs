import { o as __toESM } from "../_runtime.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { n as useTheme, t as ThemeProvider } from "./ThemeProvider-yVDAGyHN.mjs";
import { t as profile } from "./data-BJmZkLQi.mjs";
import { t as Route } from "./work._slug-BEhfsRFq.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as ReactLenis } from "../_libs/lenis.mjs";
import { o as motion, s as AnimatePresence } from "../_libs/framer-motion.mjs";
import { a as Search, c as Mail, d as House, f as Github, m as FileText, n as User, o as Moon, r as Sun, u as Linkedin, w as ArrowRight, x as Briefcase } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BOnGh5mw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BtL-jn4Q.css";
function CommandPalette() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);
	const filteredCommands = [
		{
			id: "home",
			name: "Home",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "w-4 h-4" }),
			section: "Navigation",
			action: () => {
				navigate({ to: "/" });
				window.scrollTo(0, 0);
				setOpen(false);
			}
		},
		{
			id: "work",
			name: "Work",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-4 h-4" }),
			section: "Navigation",
			action: () => {
				navigate({ to: "/" });
				setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 100);
				setOpen(false);
			}
		},
		{
			id: "about",
			name: "About",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "w-4 h-4" }),
			section: "Navigation",
			action: () => {
				navigate({ to: "/" });
				setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 100);
				setOpen(false);
			}
		},
		{
			id: "contact",
			name: "Contact",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-4 h-4" }),
			section: "Navigation",
			action: () => {
				navigate({ to: "/" });
				setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100);
				setOpen(false);
			}
		},
		{
			id: "github",
			name: "GitHub",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-4 h-4" }),
			section: "Links",
			action: () => {
				window.open(profile.github, "_blank");
				setOpen(false);
			}
		},
		{
			id: "linkedin",
			name: "LinkedIn",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-4 h-4" }),
			section: "Links",
			action: () => {
				window.open(profile.linkedin, "_blank");
				setOpen(false);
			}
		},
		{
			id: "resume",
			name: "Resume",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4" }),
			section: "Links",
			action: () => {
				window.open(profile.resume, "_blank");
				setOpen(false);
			}
		},
		{
			id: "theme",
			name: `Toggle Theme (${theme})`,
			icon: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" }),
			section: "Preferences",
			action: () => {
				setTheme(theme === "dark" ? "light" : "dark");
				setOpen(false);
			}
		}
	].filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-4 pt-[20vh]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: { duration: .15 },
			className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
			onClick: () => setOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: -20
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: -20
			},
			transition: {
				type: "spring",
				stiffness: 300,
				damping: 25
			},
			className: "relative w-full max-w-xl overflow-hidden rounded-2xl border border-border/60 bg-surface shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center border-b border-border/40 px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-5 h-5 text-text-muted mr-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						autoFocus: true,
						className: "w-full bg-transparent py-5 outline-none placeholder:text-text-muted text-text text-lg",
						placeholder: "Type a command or search...",
						value: query,
						onChange: (e) => setQuery(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] text-text-muted font-mono uppercase tracking-wider border border-border/60 rounded px-1.5 py-0.5 ml-3",
						children: "ESC"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[60vh] overflow-y-auto p-2 scrollbar-hide",
				children: filteredCommands.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-14 text-center text-text-muted",
					children: "No results found."
				}) : [
					"Navigation",
					"Links",
					"Preferences"
				].map((section) => {
					const items = filteredCommands.filter((c) => c.section === section);
					if (items.length === 0) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 last:mb-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-3 py-2 text-xs font-medium text-text-subtle uppercase tracking-wider",
							children: section
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-1",
							children: items.map((command) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: command.action,
								className: "group flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm text-text hover:bg-elevated/70 transition-colors text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text-muted group-hover:text-accent transition-colors",
										children: command.icon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: command.name })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-3.5 h-3.5 text-text-subtle opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" })]
							}, command.id))
						})]
					}, section);
				})
			})]
		})]
	}) });
}
/**
* usePlatformDetect — detects the user's OS/platform and applies
* a `data-platform` attribute to the document root for CSS targeting.
*
* Design principle: Subtle adaptation, not OS parody.
* The platform signal drives material refinements — glass quality,
* blur amount, noise texture — not layout or content changes.
*/
function detectPlatform() {
	if (typeof navigator === "undefined") return "unknown";
	const ua = navigator.userAgent;
	const platform = navigator.userAgentData?.platform?.toLowerCase() ?? "";
	if (/iphone|ipad|ipod/i.test(ua)) return "ios";
	if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios";
	if (/macintosh|mac os x/i.test(ua) && navigator.maxTouchPoints <= 1) return "macos";
	if (platform === "macos") return "macos";
	if (/win/i.test(platform)) return "windows";
	if (/windows nt/i.test(ua)) return "windows";
	if (/android/i.test(ua)) return "android";
	if (/linux/i.test(ua)) return "linux";
	return "unknown";
}
/**
* Hook: apply data-platform to <html> for CSS-level adaptation.
* Should be called once at the root layout level.
*/
function usePlatformDetect() {
	const platform = detectPlatform();
	(0, import_react.useEffect)(() => {
		document.documentElement.setAttribute("data-platform", platform);
		return () => {};
	}, [platform]);
	return platform;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display text-[clamp(4rem,12vw,8rem)] leading-none text-text-muted",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-display text-xl text-text",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] text-text-muted leading-relaxed",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "cta-primary inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Go home" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid place-items-center w-8 h-8 rounded-full bg-bg/15",
							children: "←"
						})]
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-display text-xl text-text",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[15px] text-text-muted leading-relaxed",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap justify-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "cta-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm bg-text text-bg",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-text-muted hover:text-text hover:border-border-strong transition-colors",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$1 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				httpEquiv: "Cache-Control",
				content: "no-cache, no-store, must-revalidate"
			},
			{
				httpEquiv: "Pragma",
				content: "no-cache"
			},
			{
				httpEquiv: "Expires",
				content: "0"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "Chandan Mahapatra"
			},
			{
				name: "theme-color",
				content: "#F7F3EB"
			},
			{ title: "Chandan Mahapatra — Product-minded frontend engineer" },
			{
				property: "og:title",
				content: "Chandan Mahapatra — Product-minded frontend engineer"
			},
			{
				name: "twitter:title",
				content: "Chandan Mahapatra — Product-minded frontend engineer"
			},
			{
				name: "description",
				content: "Chandan Mahapatra — product-minded frontend engineer from Odisha. Selected work, a build log of experiments, and how to get in touch."
			},
			{
				property: "og:description",
				content: "I build the parts of software people actually touch. Selected work, a build log of experiments, and notes on the craft."
			},
			{
				name: "twitter:description",
				content: "I build the parts of software people actually touch. Selected work, a build log of experiments, and notes on the craft."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:url",
				content: "https://chandanmahapatra.com/"
			},
			{
				property: "og:image",
				content: "https://chandanmahapatra.com/og-image.png"
			},
			{
				name: "twitter:image",
				content: "https://chandanmahapatra.com/og-image.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "canonical",
				href: "https://chandanmahapatra.com/"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				sizes: "any"
			},
			{
				rel: "apple-touch-icon",
				href: "/icon-192.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "preload",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
				as: "style"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: `
              try {
                const storedTheme = localStorage.getItem('ui-theme');
                if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark', 'light');
                  if (storedTheme === 'light') document.documentElement.classList.add('light');
                }
              } catch (e) {}
            ` } }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify({
					"@context": "https://schema.org",
					"@graph": [{
						"@type": "Person",
						name: "Chandan Mahapatra",
						url: "https://chandanmahapatra.com",
						jobTitle: "Frontend Engineer & Product Designer",
						description: "Product-minded frontend engineer from Odisha, India. Building the parts of software people actually touch.",
						sameAs: ["https://github.com/dev-chadan24", "https://www.linkedin.com/in/chandan-mahapatra"]
					}, {
						"@type": "WebSite",
						name: "Chandan Mahapatra — Portfolio",
						url: "https://chandanmahapatra.com",
						description: "Selected work, research papers, and notes on the craft of frontend engineering."
					}]
				}) }
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$1.useRouteContext();
	usePlatformDetect();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactLenis, {
		root: true,
		options: {
			lerp: .08,
			smoothWheel: true
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
			client: queryClient,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})]
		}) })
	});
}
var $$splitComponentImporter = () => import("./routes-kjaii8ok.mjs");
var rootRouteChildren = {
	IndexRoute: createFileRoute("/")({
		head: () => ({ meta: [
			{ title: "Chandan Mahapatra — Product-minded frontend engineer" },
			{
				name: "description",
				content: "Chandan Mahapatra — product-minded frontend engineer from Odisha. Selected work, research papers, and how to get in touch."
			},
			{
				property: "og:title",
				content: "Chandan Mahapatra — Product-minded frontend engineer"
			},
			{
				property: "og:description",
				content: "I build the parts of software people actually touch. Selected work, research papers, and notes on the craft."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] }),
		component: lazyRouteComponent($$splitComponentImporter, "component")
	}).update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$1
	}),
	WorkSlugRoute: Route.update({
		id: "/work/$slug",
		path: "/work/$slug",
		getParentRoute: () => Route$1
	})
};
var routeTree = Route$1._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
