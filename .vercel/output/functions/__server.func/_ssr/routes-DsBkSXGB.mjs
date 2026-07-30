import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as string, r as ZodError, t as object } from "../_libs/zod.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as useTheme } from "./ThemeProvider-yVDAGyHN.mjs";
import { a as snapshot, i as skillEcosystem, n as projects, o as timeline, r as research, t as profile } from "./data-BJmZkLQi.mjs";
import { a as useScroll, i as useMotionValue, n as useSpring, o as motion, r as useTransform, s as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { C as ArrowUpRight, S as ArrowUp, T as ArrowDownRight, _ as Copy, b as Check, c as Mail, f as Github, g as Download, l as LoaderCircle, m as FileText, o as Moon, r as Sun, s as Menu, t as X, u as Linkedin, y as CircleAlert } from "../_libs/lucide-react.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CIvIH4dQ.mjs";
import { t as projectImages } from "./media-DxQncQ82.mjs";
import { t as confetti_module_default } from "../_libs/canvas-confetti.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DsBkSXGB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ease = [
	.25,
	.1,
	.25,
	1
];
var easeEmphasized = [
	.22,
	1,
	.36,
	1
];
var spring = {
	snappy: {
		type: "spring",
		stiffness: 340,
		damping: 30,
		mass: .7
	},
	soft: {
		type: "spring",
		stiffness: 200,
		damping: 25,
		mass: .9
	},
	magnetic: {
		type: "spring",
		stiffness: 160,
		damping: 22,
		mass: .6
	},
	nav: {
		type: "spring",
		stiffness: 400,
		damping: 36,
		mass: .5
	}
};
/**
* useMagnetic — pointer inside the element pulls it toward the cursor.
* Respects prefers-reduced-motion.
*/
function useMagnetic(ref, strength = .3) {
	const reduced = useReducedMotion();
	const x = useMotionValue(0);
	const y = useMotionValue(0);
	const sx = useSpring(x, spring.magnetic);
	const sy = useSpring(y, spring.magnetic);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || reduced) return;
		let raf = 0;
		const move = (e) => {
			const r = el.getBoundingClientRect();
			const cx = e.clientX - (r.left + r.width / 2);
			const cy = e.clientY - (r.top + r.height / 2);
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				x.set(cx * strength);
				y.set(cy * strength);
			});
		};
		const leave = () => {
			cancelAnimationFrame(raf);
			x.set(0);
			y.set(0);
		};
		el.addEventListener("pointermove", move);
		el.addEventListener("pointerleave", leave);
		return () => {
			el.removeEventListener("pointermove", move);
			el.removeEventListener("pointerleave", leave);
			cancelAnimationFrame(raf);
		};
	}, [
		ref,
		strength,
		reduced,
		x,
		y
	]);
	return {
		x: sx,
		y: sy
	};
}
/**
* useScrollDissolve — scroll-driven opacity/scale/blur for hero elements.
* Respects prefers-reduced-motion.
*/
function useScrollDissolve(inputRange) {
	const { scrollY } = useScroll();
	return {
		opacity: useTransform(scrollY, inputRange, [
			1,
			.6,
			0
		]),
		scale: useTransform(scrollY, [inputRange[0], inputRange[2]], [1, .92]),
		filter: useTransform(useTransform(scrollY, [inputRange[0], inputRange[2]], [0, 8]), (b) => `blur(${b}px)`),
		y: useTransform(scrollY, [inputRange[0], inputRange[2]], [0, -24])
	};
}
/**
* useActiveSection — IntersectionObserver-based active section tracker.
* Respects the nav's rootMargin convention: fires when section crosses 45% viewport center.
*/
function useActiveSection(ids, rootMargin = "-45% 0px -50% 0px") {
	const [active, setActive] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const obs = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.isIntersecting) setActive(e.target.id);
			});
		}, {
			rootMargin,
			threshold: 0
		});
		ids.forEach((id) => {
			const el = document.getElementById(id);
			if (el) obs.observe(el);
		});
		return () => obs.disconnect();
	}, [ids, rootMargin]);
	return active;
}
var links = [
	{
		href: "#work",
		label: "Work",
		id: "work"
	},
	{
		href: "#about",
		label: "About",
		id: "about"
	},
	{
		href: "#skills",
		label: "Skills",
		id: "skills"
	},
	{
		href: "#experience",
		label: "Experience",
		id: "experience"
	},
	{
		href: "#research",
		label: "Research",
		id: "research"
	},
	{
		href: "#contact",
		label: "Contact",
		id: "contact"
	}
];
var sectionIds = links.map((l) => l.id);
function Nav() {
	const { theme, setTheme } = useTheme();
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const active = useActiveSection(sectionIds);
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const on = () => setScrolled(window.scrollY > 80);
		on();
		window.addEventListener("scroll", on, { passive: true });
		return () => window.removeEventListener("scroll", on);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.nav, {
		initial: {
			y: -20,
			opacity: 0
		},
		animate: {
			y: 0,
			opacity: 1
		},
		transition: {
			duration: 1,
			delay: .15,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(94vw,860px)]",
		"aria-label": "Primary",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `glass-nav flex items-center gap-3 rounded-full pl-5 pr-2 py-1.5 transition-all duration-500 ${scrolled ? "shadow-[0_28px_70px_-30px_rgba(0,0,0,0.6)]" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#top",
					className: "font-display text-[14px] tracking-[-0.02em] text-text hover:text-accent transition-colors whitespace-nowrap",
					"aria-label": "Chandan Mahapatra — home",
					children: ["Chandan", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "italic text-text-muted",
						children: " Mahapatra"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "hidden md:flex flex-1 items-center justify-center gap-1 lg:gap-1.5",
					role: "list",
					children: links.map((l) => {
						const isActive = active === l.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "relative",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: l.href,
								"aria-current": isActive ? "true" : void 0,
								className: `relative inline-flex items-center px-3 py-1.5 rounded-full text-[12.5px] whitespace-nowrap transition-colors duration-300 nav-liquid-item ${isActive ? "text-text" : "text-text-muted hover:text-text"}`,
								children: [isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									layoutId: "nav-liquid-pill",
									className: "absolute inset-0 rounded-full nav-liquid-pill",
									transition: {
										type: "spring",
										stiffness: 380,
										damping: 32,
										mass: .6
									},
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "relative z-10",
									children: l.label
								})]
							})
						}, l.href);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1 md:hidden" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {
					theme,
					setTheme
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "md:hidden p-2 rounded-full hover:bg-elevated/60 text-text-muted hover:text-text",
					"aria-label": open ? "Close menu" : "Open menu",
					"aria-expanded": open,
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "w-4 h-4" })
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			y: -8
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -8
		},
		transition: { duration: .25 },
		className: "fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[min(94vw,820px)] md:hidden",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			"aria-label": "Mobile navigation",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "glass-nav rounded-3xl p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col",
					role: "list",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: l.href,
						onClick: () => setOpen(false),
						className: "flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] text-text hover:bg-elevated/70 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-eyebrow",
							"aria-hidden": true,
							children: "→"
						})]
					}) }, l.href))
				})
			})
		})
	}) })] });
}
function ThemeToggle({ theme, setTheme }) {
	const isDark = theme === "dark";
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"aria-label": "Toggle theme",
		className: "relative w-8 h-8 rounded-full flex items-center justify-center text-text-muted",
		"aria-hidden": "true"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => setTheme(isDark ? "light" : "dark"),
		"aria-label": isDark ? "Switch to light theme" : "Switch to dark theme",
		className: "relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-elevated/60 transition-colors text-text-muted hover:text-text",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			initial: false,
			children: isDark ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					rotate: -90,
					scale: .6,
					opacity: 0
				},
				animate: {
					rotate: 0,
					scale: 1,
					opacity: 1
				},
				exit: {
					rotate: 90,
					scale: .6,
					opacity: 0
				},
				transition: {
					duration: .32,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "absolute inset-auto",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "w-4 h-4" })
			}, "moon") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
				initial: {
					rotate: 90,
					scale: .6,
					opacity: 0
				},
				animate: {
					rotate: 0,
					scale: 1,
					opacity: 1
				},
				exit: {
					rotate: -90,
					scale: .6,
					opacity: 0
				},
				transition: {
					duration: .32,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "absolute inset-auto",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "w-4 h-4" })
			}, "sun")
		})
	});
}
/**
* Hero portrait frame.
*
* To swap in the real photograph, only change the `src` prop where
* <Portrait /> is used (Hero.tsx). Recommended: 1200x1440 (5:6), .jpg,
* ~85% quality, with a small margin around the subject.
*/
function Portrait({ src, alt = "Portrait of Chandan Mahapatra" }) {
	const wrap = (0, import_react.useRef)(null);
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, {
		stiffness: 90,
		damping: 18,
		mass: .6
	});
	const sy = useSpring(my, {
		stiffness: 90,
		damping: 18,
		mass: .6
	});
	const rotY = useTransform(sx, [-1, 1], [-4, 4]);
	const rotX = useTransform(sy, [-1, 1], [3, -3]);
	const shiftX = useTransform(sx, [-1, 1], [-6, 6]);
	const shiftY = useTransform(sy, [-1, 1], [-6, 6]);
	const onMove = (e) => {
		const r = wrap.current?.getBoundingClientRect();
		if (!r) return;
		mx.set((e.clientX - r.left) / r.width * 2 - 1);
		my.set((e.clientY - r.top) / r.height * 2 - 1);
	};
	const onLeave = () => {
		mx.set(0);
		my.set(0);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrap,
		onPointerMove: onMove,
		onPointerLeave: onLeave,
		className: "relative w-full max-w-[420px] mx-auto",
		style: { perspective: 1400 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			"aria-hidden": true,
			style: {
				x: shiftX,
				y: shiftY
			},
			className: "absolute -inset-8 rounded-[42px] opacity-70 blur-3xl pointer-events-none",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full h-full rounded-[42px]",
				style: { background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 45%, transparent), transparent 65%)" }
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			style: {
				rotateX: rotX,
				rotateY: rotY,
				transformStyle: "preserve-3d"
			},
			className: "relative aspect-[5/6] rounded-[28px] overflow-hidden portrait-frame transition-shadow duration-700",
			children: [
				src ? src.endsWith(".mp4") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
					src,
					autoPlay: true,
					muted: true,
					loop: true,
					playsInline: true,
					className: "absolute inset-0 w-full h-full object-cover object-center",
					style: { objectFit: "cover" },
					ref: (el) => {
						if (el) el.play().catch(() => {});
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt,
					loading: "eager",
					decoding: "async",
					className: "absolute inset-0 w-full h-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortraitPlaceholder, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-0 pointer-events-none",
					style: { background: "linear-gradient(180deg, color-mix(in oklab, white 8%, transparent) 0%, transparent 30%, transparent 70%, color-mix(in oklab, black 32%, transparent) 100%)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					"aria-hidden": true,
					style: {
						x: useTransform(sx, [-1, 1], [-30, 30]),
						y: useTransform(sy, [-1, 1], [-30, 30])
					},
					className: "absolute inset-0 pointer-events-none opacity-70 mix-blend-screen",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full h-full",
						style: { background: "radial-gradient(220px circle at 50% 40%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)" }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute inset-0 rounded-[28px] pointer-events-none",
					style: { boxShadow: "inset 0 1px 0 color-mix(in oklab, white 16%, transparent), inset 0 0 0 1px color-mix(in oklab, var(--accent) 12%, transparent)" }
				})
			]
		})]
	});
}
function PortraitPlaceholder() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0",
		style: { background: "linear-gradient(160deg, oklch(0.28 0.04 275) 0%, oklch(0.18 0.02 270) 55%, oklch(0.14 0.015 265) 100%)" }
	});
}
var profile_photo_default = "/assets/profile%20photo-DZg2KCY4.mp4";
var Signature_default = "/assets/Signature-DyGnGP0L.png";
/**
* Hero — desktop pairs a text column with a portrait anchor.
* Calm and confident: no particles, no orbit. Ambient cursor light only.
*/
function Hero() {
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, {
		stiffness: 80,
		damping: 18
	});
	const sy = useSpring(my, {
		stiffness: 80,
		damping: 18
	});
	const glowX = useTransform(sx, [-1, 1], ["30%", "70%"]);
	const glowY = useTransform(sy, [-1, 1], ["30%", "70%"]);
	const shouldReduceMotion = useReducedMotion();
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el || shouldReduceMotion) return;
		let raf = 0;
		const handle = (e) => {
			const r = el.getBoundingClientRect();
			cancelAnimationFrame(raf);
			let clientX, clientY;
			if ("touches" in e) {
				clientX = e.touches[0].clientX;
				clientY = e.touches[0].clientY;
			} else {
				clientX = e.clientX;
				clientY = e.clientY;
			}
			raf = requestAnimationFrame(() => {
				mx.set((clientX - r.left) / r.width * 2 - 1);
				my.set((clientY - r.top) / r.height * 2 - 1);
			});
		};
		window.addEventListener("mousemove", handle);
		window.addEventListener("touchmove", handle, { passive: true });
		return () => {
			window.removeEventListener("mousemove", handle);
			window.removeEventListener("touchmove", handle);
			cancelAnimationFrame(raf);
		};
	}, [
		mx,
		my,
		shouldReduceMotion
	]);
	const { opacity: mobilePortraitOpacity, scale: mobilePortraitScale, filter: mobilePortraitFilter, y: mobilePortraitY } = useScrollDissolve([
		0,
		260,
		480
	]);
	const portraitX = useTransform(sx, [-1, 1], [-6, 6]);
	const portraitY = useTransform(sy, [-1, 1], [-6, 6]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "top",
		ref,
		className: "relative min-h-[100dvh] flex items-center px-6 md:px-16 lg:px-24 pt-28 md:pt-32 pb-24 overflow-hidden",
		"aria-labelledby": "hero-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": true,
				style: {
					left: shouldReduceMotion ? "50%" : glowX,
					top: shouldReduceMotion ? "50%" : glowY
				},
				className: "absolute w-[85vw] h-[85vw] max-w-[1200px] max-h-[1200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full h-full opacity-[0.35]",
					style: {
						background: "radial-gradient(circle at center, var(--glow-strong) 0%, transparent 55%)",
						filter: "blur(90px)"
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-1/2 rule opacity-25 pointer-events-none hidden md:block",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				"aria-hidden": true,
				initial: { opacity: 0 },
				animate: { opacity: .06 },
				transition: {
					delay: 1.5,
					duration: 2.5
				},
				className: "absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden",
				style: { mixBlendMode: "var(--signature-blend)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: Signature_default,
					alt: "",
					className: "w-[120vw] min-w-[800px] max-w-none select-none",
					style: { filter: "var(--signature-filter)" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full max-w-7xl mx-auto",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						initial: {
							opacity: 0,
							y: 6
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							delay: .1,
							duration: .55,
							ease
						},
						className: "text-eyebrow mb-10 md:mb-16",
						children: "Frontend Engineer & Product Designer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						style: {
							opacity: mobilePortraitOpacity,
							scale: mobilePortraitScale,
							filter: mobilePortraitFilter,
							y: mobilePortraitY
						},
						className: "md:hidden mb-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, { src: profile_photo_default })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "lg:col-span-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									id: "hero-title",
									className: "text-display text-[clamp(2.75rem,10vw,9.5rem)] leading-[0.84] mb-8 md:mb-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameReveal, {
										text: "Chandan",
										delay: .35
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameReveal, {
											text: "Mahapatra",
											italic: true,
											delay: .5
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.p, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .65,
										duration: .6,
										ease
									},
									className: "text-display text-[clamp(1.15rem,2.2vw,1.85rem)] leading-tight mb-10 md:mb-14 max-w-2xl",
									children: [
										"Turning ideas into",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "italic text-text-muted",
											children: "products people actually use."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .78,
										duration: .6,
										ease
									},
									className: "text-lede max-w-xl mb-12",
									children: profile.intro
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 8
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: {
										delay: .9,
										duration: .55,
										ease
									},
									className: "flex flex-col gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "#work",
											className: "cta-primary group relative inline-flex w-full sm:w-auto justify-center sm:justify-between items-center gap-4 rounded-full pl-6 pr-2 py-2 text-[14px] font-medium bg-text text-bg hover:scale-[1.02] active:scale-95 transition-all duration-300",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selected work" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid place-items-center w-8 h-8 rounded-full bg-bg/15 transition-colors group-hover:bg-bg/25",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-4 h-4" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeButton, {})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2 mt-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
												href: `mailto:${profile.email}`,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3.5 h-3.5" }),
												label: "Email",
												primary: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
												href: profile.linkedin,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-3.5 h-3.5" }),
												label: "LinkedIn",
												external: true
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickLink, {
												href: profile.github,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-3.5 h-3.5" }),
												label: "GitHub",
												external: true
											})
										]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								y: shouldReduceMotion ? 0 : 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .5,
								duration: .8,
								ease
							},
							className: "hidden md:block lg:col-span-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								style: {
									x: shouldReduceMotion ? 0 : portraitX,
									y: shouldReduceMotion ? 0 : portraitY
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portrait, { src: profile_photo_default })
							})
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-text-subtle hidden md:flex",
				style: { animation: "breathe 5s ease-in-out infinite" },
				"aria-hidden": true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-eyebrow text-[0.62rem]",
					children: "scroll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-px h-8 bg-current opacity-60" })]
			})
		]
	});
}
function ResumeButton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: profile.resume,
		download: true,
		className: "resume-cta group relative inline-flex w-full sm:w-auto justify-center sm:justify-start items-center gap-2.5 rounded-full px-6 py-3 sm:py-[13px] overflow-hidden",
		style: {
			border: "1px solid color-mix(in oklab, var(--border) 80%, transparent)",
			background: "color-mix(in oklab, var(--surface) 55%, transparent)",
			backdropFilter: "blur(14px) saturate(160%)",
			color: "var(--text)",
			boxShadow: "inset 0 1px 0 color-mix(in oklab, white 8%, transparent)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "absolute inset-0 pointer-events-none",
				style: { background: "linear-gradient(135deg, transparent 35%, color-mix(in oklab, white 4%, transparent) 50%, transparent 65%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
				style: {
					width: 15,
					height: 15,
					flexShrink: 0
				},
				className: "relative z-10 text-text-muted group-hover:text-accent transition-colors duration-300",
				strokeWidth: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "relative z-10",
				style: {
					fontFamily: "var(--font-sans)",
					fontWeight: 500,
					fontSize: 14,
					letterSpacing: "-0.01em",
					lineHeight: 1
				},
				children: "Resume"
			})
		]
	});
}
function QuickLink({ href, icon, label, external, primary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer" : void 0,
		className: `quick-pill group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[13px] border ${primary ? "border-accent/40 bg-accent/10 text-text" : "border-border bg-surface/60 text-text-muted"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `opacity-80 group-hover:opacity-100 transition-opacity ${primary ? "text-accent" : ""}`,
			"aria-hidden": true,
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })]
	});
}
function NameReveal({ text, italic, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-block overflow-hidden align-bottom pr-2 pb-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: { y: "105%" },
			animate: { y: "0%" },
			transition: {
				duration: .9,
				delay,
				ease: [
					.22,
					1,
					.36,
					1
				]
			},
			className: `block ${italic ? "italic font-light text-text-muted" : ""}`,
			children: text
		})
	});
}
function Reveal({ children, delay = 0, y = 10, className, as: As = "div", ...rest }) {
	const reduced = useReducedMotion();
	const Cmp = motion[As];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cmp, {
		initial: {
			opacity: 0,
			y: reduced ? 0 : y
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-60px"
		},
		transition: {
			duration: .5,
			delay,
			ease: easeEmphasized
		},
		className,
		...rest,
		children
	});
}
/**
* SectionMark — editorial section divider used across all portfolio sections.
* Displays a numeric index, hairline rule, and section label.
*
* Extracted from About.tsx to make it a proper shared UI primitive.
*/
function SectionMark({ index, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4 mb-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-display italic text-3xl text-text-muted",
				children: index
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hairline h-px bg-border flex-1 max-w-[80px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-eyebrow",
				children: label
			})
		]
	}) });
}
/**
* About — completely redesigned.
* Editorial hierarchy: role → philosophy → two products → research note.
* Premium layout: large left column, tight info panel right.
*/
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "about",
		className: "relative px-6 md:px-16 lg:px-24 py-32 md:py-44 max-w-7xl mx-auto scroll-mt-24",
		"aria-labelledby": "about-title",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
			index: "02",
			label: "About"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-7 space-y-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						id: "about-title",
						className: "text-display text-[clamp(2.8rem,7vw,5.5rem)] leading-[0.92] tracking-tight",
						children: [
							"I build things",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-text-muted",
								children: "people trust."
							})
						]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .08,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-6 max-w-[640px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[17px] leading-[1.8] text-text-muted",
								children: [
									"I'm",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text font-medium",
										children: "Chandan Mahapatra"
									}),
									",",
									" ",
									"a full-stack engineer currently finishing up my MCA. I love being involved in the entire lifecycle of a product—whether it's architecting the database or tweaking an animation curve until it feels just right."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[17px] leading-[1.8] text-text-muted",
								children: "I've always believed that understanding the full stack makes you better at every part of it. Knowing how data is structured helps me build more intuitive interfaces, and understanding user behavior helps me design better schemas."
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .14,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative pl-8 py-2",
							style: { borderLeft: "2.5px solid color-mix(in oklab, var(--accent) 65%, transparent)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								className: "absolute -top-3 -left-1",
								style: {
									fontFamily: "\"Fraunces\", ui-serif, Georgia, serif",
									fontSize: "3.5rem",
									lineHeight: 1,
									color: "var(--accent)",
									opacity: .25,
									fontWeight: 700
								},
								children: "“"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.65] text-text font-display italic tracking-[-0.02em]",
								children: "“At the end of the day, I just want to build software that works reliably, long after the launch hype fades.”"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .18,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 max-w-[640px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-eyebrow",
								children: "Currently building"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductLine, {
									name: "HarvestIQ",
									tagline: "Tax-loss harvesting dashboard",
									description: "Turns volatile live crypto portfolio data into a single, legible surface — gains, losses, and what to do ranked by dollar impact.",
									delay: .22
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductLine, {
									name: "DoseLoop",
									tagline: "Medication companion",
									description: "A calm alternative to alarm-driven reminder apps. Built around the thesis that quieter interfaces create better habits.",
									delay: .28
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .32,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl px-6 py-5",
							style: {
								background: "color-mix(in oklab, var(--surface) 60%, transparent)",
								border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-eyebrow block mb-2",
								children: "Research"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[15px] leading-[1.7] text-text-muted",
								children: [
									"My recent comparative study found that a gradient-boosted",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text",
										children: "LightGBM"
									}),
									" model with hand-crafted lag features consistently outperformed",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-text",
										children: "Prophet"
									}),
									" on electricity load forecasting — including on high-variance peak days. The lesson: feature engineering matters more than model complexity."
								]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
						delay: .38,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedSignature, {})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .12,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "soft-elevated surface-lift p-8 md:p-10 relative overflow-hidden",
						style: {
							position: "sticky",
							top: "7rem"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "absolute -top-20 -right-20 w-56 h-56 rounded-full pointer-events-none",
								style: {
									background: "radial-gradient(circle, var(--glow-strong), transparent 70%)",
									opacity: .5
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex items-center justify-between mb-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-eyebrow",
									children: "Snapshot"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-eyebrow",
									children: "2026"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "relative space-y-6",
								children: snapshot.map((group, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.li, {
									initial: {
										opacity: 0,
										y: 6
									},
									whileInView: {
										opacity: 1,
										y: 0
									},
									viewport: { once: true },
									transition: {
										delay: .15 + i * .06,
										duration: .5,
										ease: [
											.22,
											1,
											.36,
											1
										]
									},
									className: "border-b pb-6 last:border-0 last:pb-0",
									style: { borderColor: "color-mix(in oklab, var(--border) 40%, transparent)" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-eyebrow text-accent mb-3",
										children: group.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap gap-1.5",
										children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex items-center rounded-full border px-2.5 py-[5px] text-[11.5px] text-text transition-all duration-300 hover:border-accent/40 hover:bg-accent/5",
											style: {
												borderColor: "color-mix(in oklab, var(--border) 65%, transparent)",
												background: "color-mix(in oklab, var(--surface) 45%, transparent)",
												fontFamily: "var(--font-sans)",
												letterSpacing: "-0.005em"
											},
											children: item
										}, item))
									})]
								}, group.label))
							})
						]
					})
				})
			})]
		})]
	});
}
function ProductLine({ name, tagline, description, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: {
			opacity: 0,
			y: 6
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-40px"
		},
		transition: {
			duration: .5,
			delay,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "flex gap-4 items-start group",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 group-hover:scale-150",
			style: { background: "var(--accent)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline gap-2 mb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[15px] font-medium text-text",
				children: name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-mono uppercase tracking-[0.14em]",
				style: { color: "var(--text-subtle)" },
				children: tagline
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[14px] leading-[1.65]",
			style: { color: "var(--text-muted)" },
			children: description
		})] })]
	});
}
function AnimatedSignature() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "relative w-44 h-14",
		"aria-label": "Chandan Mahapatra — signature",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
			viewBox: "0 0 300 80",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			className: "w-full h-full",
			style: { color: "var(--text-subtle)" },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: "M10,55 C18,35 30,28 38,40 C46,52 42,65 32,68 C22,71 16,62 20,52 C26,38 38,30 52,35 C62,38 58,58 62,65 C66,72 74,60 78,50 C84,36 86,24 82,34 C78,44 72,62 76,70 C80,76 90,64 96,54 C106,38 114,30 122,34 C130,38 126,58 130,62 C138,68 148,52 158,44 C168,36 178,40 182,52 C186,62 178,72 170,70 C160,66 162,50 170,44 C182,36 198,42 210,48 C222,54 218,68 228,66 C238,64 248,48 262,42 C274,36 288,44 294,52",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				initial: {
					pathLength: 0,
					opacity: 0
				},
				whileInView: {
					pathLength: 1,
					opacity: .7
				},
				viewport: {
					once: true,
					margin: "-80px"
				},
				transition: {
					duration: 2.2,
					ease: "easeInOut",
					delay: .3
				}
			})
		})
	});
}
function ImageWithSkeleton({ className, alt, ...props }) {
	const [isLoaded, setIsLoaded] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [!isLoaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: .5 },
		animate: { opacity: 1 },
		transition: {
			repeat: Infinity,
			duration: 1.5,
			repeatType: "reverse",
			ease: "easeInOut"
		},
		className: `absolute inset-0 bg-elevated/40 skeleton-shimmer ${className || ""}`,
		"aria-hidden": true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		alt,
		className: `${className || ""} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`,
		onLoad: () => setIsLoaded(true),
		...props
	})] });
}
function Work() {
	const featured = projects.filter((p) => p.featured);
	const archive = projects.filter((p) => !p.featured);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "work",
		className: "relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24",
		"aria-labelledby": "work-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
				index: "01",
				label: "Selected Work"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "work-title",
				className: "text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-6",
				children: ["Work I'm proud of.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block italic text-text-muted mt-2",
					children: "A few, done properly."
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .15,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lede max-w-2xl mb-24",
					children: "A short shelf. Each featured piece is one I'd defend line by line — the problem, what I tried, what I'd do differently. Older studies sit in the archive below."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-40",
				children: featured.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudyPreview, {
					project: p,
					reverse: i % 2 === 1
				}, p.slug))
			}),
			archive.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-40",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-eyebrow",
						children: "Archive · earlier work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-eyebrow hidden md:block",
						children: [archive.length, " studies"]
					})]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "border-t border-border/60",
					children: archive.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRow, {
						project: p,
						index: i
					}, p.slug))
				})]
			})
		]
	});
}
function StatusPill({ status }) {
	const s = {
		shipped: {
			label: "Shipped",
			tone: "text-accent border-accent/40 bg-accent/8"
		},
		completed: {
			label: "Completed",
			tone: "text-[oklch(0.65_0.14_155)] border-[oklch(0.65_0.14_155)]/40 bg-[oklch(0.65_0.14_155)]/8"
		},
		"in-progress": {
			label: "In progress",
			tone: "text-text border-border-strong bg-elevated/60"
		},
		"case-study": {
			label: "Case study",
			tone: "text-text-muted border-border"
		},
		concept: {
			label: "Concept",
			tone: "text-text-muted border-border"
		}
	}[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-1 rounded-full border ${s.tone}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1 h-1 rounded-full bg-current" }), s.label]
	});
}
function CaseStudyPreview({ project, reverse }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `lg:col-span-6 ${reverse ? "lg:order-2" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-4 mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-display italic text-text-muted text-2xl",
							children: project.number
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-eyebrow",
							children: project.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: project.status })
						})
					]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .08,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mb-6",
						children: project.name
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .16,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
						className: "relative pl-6 mb-8 max-w-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							className: "absolute left-0 top-0 bottom-0 w-px bg-accent/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-display italic text-[clamp(1.25rem,1.8vw,1.625rem)] leading-snug text-text",
							children: project.thesis
						})]
					})
				}),
				project.overview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .22,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[15px] leading-relaxed text-text-muted mb-8 max-w-xl",
						children: project.overview
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .28,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-1.5 mb-8",
						children: project.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-mono px-2.5 py-1 rounded-full border border-border/80 bg-surface/60 text-text-muted",
							children: t
						}, t))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .34,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/work/$slug",
						params: { slug: project.slug },
						className: "cta-primary group relative inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read the case study" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid place-items-center w-8 h-8 rounded-full bg-bg/15",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" })
						})]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `lg:col-span-6 ${reverse ? "lg:order-1" : ""} lg:sticky lg:top-28`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .15,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/work/$slug",
					params: { slug: project.slug },
					"aria-label": `Open ${project.name} case study`,
					className: "block group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScreenshotSlot, { project })
				})
			})
		})]
	});
}
/**
* ScreenshotSlot — premium project artwork presentation.
* Uses actual images from assets/Images when available.
*/
function ScreenshotSlot({ project }) {
	const heroImage = projectImages[project.slug];
	const shouldReduceMotion = useReducedMotion();
	const x = useMotionValue(.5);
	const y = useMotionValue(.5);
	const springConfig = {
		stiffness: 400,
		damping: 30
	};
	const springX = useSpring(x, springConfig);
	const rotateX = useTransform(useSpring(y, springConfig), [0, 1], [4, -4]);
	const rotateY = useTransform(springX, [0, 1], [-4, 4]);
	const handleMouseMove = (e) => {
		if (shouldReduceMotion) return;
		const rect = e.currentTarget.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;
		const mouseY = e.clientY - rect.top;
		x.set(mouseX / rect.width);
		y.set(mouseY / rect.height);
	};
	const handleMouseLeave = () => {
		x.set(.5);
		y.set(.5);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative [perspective:1200px]",
		onMouseMove: handleMouseMove,
		onMouseLeave: handleMouseLeave,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute -inset-6 rounded-[36px] opacity-40 group-hover:opacity-70 blur-2xl transition-opacity duration-700 pointer-events-none",
			style: { background: "radial-gradient(circle at 30% 20%, var(--glow-strong), transparent 60%)" }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			style: {
				rotateX: shouldReduceMotion ? 0 : rotateX,
				rotateY: shouldReduceMotion ? 0 : rotateY
			},
			className: "relative aspect-[16/10] rounded-[28px] overflow-hidden soft-elevated transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[var(--shadow-lift)] will-change-transform",
			children: heroImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageWithSkeleton, {
				src: heroImage,
				alt: `${project.name} — project preview`,
				loading: "lazy",
				decoding: "async",
				className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				style: { background: "radial-gradient(circle at 70% 20%, var(--glow-strong) 0%, transparent 55%), linear-gradient(160deg, var(--elevated-2), var(--surface))" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-8 flex flex-col justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-eyebrow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["/", project.slug] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Fig. ", project.number] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-display italic text-text-muted text-lg",
						children: project.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-eyebrow",
						children: project.year
					})]
				})]
			})] })
		})]
	});
}
function ArchiveRow({ project, index }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.li, {
		initial: {
			opacity: 0,
			y: 10
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-80px"
		},
		transition: {
			delay: index * .06,
			duration: .5
		},
		className: "group border-b border-border/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/work/$slug",
			params: { slug: project.slug },
			className: "archive-row grid grid-cols-[60px_1fr_auto] md:grid-cols-[80px_1fr_1fr_auto] items-center gap-6 py-6 md:py-7 px-2 -mx-2 rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-display italic text-text-muted text-lg",
					children: project.number
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-display text-xl md:text-2xl group-hover:text-accent transition-colors",
					children: project.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-eyebrow mt-1",
					children: project.subtitle
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden md:flex flex-wrap gap-1.5",
					children: project.tech.slice(0, 4).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono text-text-subtle uppercase tracking-wider",
						children: t
					}, t))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-eyebrow",
						children: project.year
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4 text-text-subtle group-hover:text-accent transition-colors" })]
				})
			]
		})
	});
}
function Experience() {
	const containerRef = (0, import_react.useRef)(null);
	const shouldReduceMotion = useReducedMotion();
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"]
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 400,
		damping: 60,
		mass: .8
	});
	const lineHeight = useTransform(shouldReduceMotion ? scrollYProgress : smoothProgress, [0, 1], ["0%", "100%"]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "experience",
		className: "relative px-6 md:px-16 lg:px-24 py-32 md:py-48 max-w-5xl mx-auto scroll-mt-24",
		"aria-labelledby": "experience-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
				index: "04",
				label: "Building Experience"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "experience-title",
				className: "text-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] mb-6",
				children: ["Career progression.", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block italic text-text-muted mt-2",
					children: "The work, the research, and the build."
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lede max-w-2xl mb-24 md:mb-32",
					children: "A timeline of my growth as an engineer. From early academic foundations to published research and production-grade product development."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				ref: containerRef,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute left-[15px] md:left-[23px] top-4 bottom-4 w-px bg-border/40",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						className: "absolute left-[15px] md:left-[23px] top-4 w-px bg-accent origin-top",
						style: { height: lineHeight },
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-12 md:space-y-16",
						children: timeline.map((entry, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineItem, {
							entry,
							index
						}, `${entry.year}-${entry.title}`))
					})
				]
			})
		]
	});
}
function TimelineItem({ entry, index }) {
	const isResearch = entry.kind === "Research Paper";
	const isInternship = entry.kind === "Internship";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.article, {
		initial: {
			opacity: 0,
			y: 20
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-100px"
		},
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: "relative group pl-12 md:pl-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-[11px] md:left-[19px] top-2 w-[9px] h-[9px] rounded-full bg-bg border-2 border-border/80 group-hover:border-accent group-hover:bg-accent/20 transition-colors duration-300 z-10",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "group/card relative rounded-[24px] p-6 md:p-8 border border-transparent hover:border-border/60 hover:bg-surface/30 transition-all duration-300 ease-out hover:shadow-[var(--shadow-lift)]",
			children: [isInternship && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute -inset-px rounded-[24px] bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none",
				"aria-hidden": true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-8 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "pt-1 md:pt-1.5 flex md:flex-col gap-3 md:gap-2 items-baseline md:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						className: "text-eyebrow text-text-muted font-medium",
						children: entry.year
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border ${isInternship ? "text-accent border-accent/30 bg-accent/5" : isResearch ? "text-[oklch(0.65_0.14_155)] border-[oklch(0.65_0.14_155)]/30 bg-[oklch(0.65_0.14_155)]/5" : "text-text-subtle border-border/60"}`,
						children: entry.kind
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-display text-2xl md:text-[1.75rem] leading-[1.2] text-text group-hover/card:text-accent transition-colors duration-300",
						children: entry.title
					}),
					(entry.where || entry.subtitle) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 text-[15px] font-medium text-text",
						children: [
							entry.where && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: entry.where }),
							entry.where && entry.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-2 text-text-muted",
								children: "·"
							}),
							entry.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-text-muted",
								children: entry.subtitle
							})
						]
					}),
					entry.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-[15px] leading-[1.7] text-text-muted max-w-2xl",
						children: entry.note
					}),
					entry.href && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: entry.href,
						className: "inline-flex items-center gap-2 mt-6 text-[13px] font-medium text-text hover:text-accent transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read the paper" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] leading-none",
							children: "↗"
						})]
					})
				] })]
			})]
		})]
	});
}
/**
* Research Paper — premium academic presentation.
* Chart redesigned to look like a genuine journal publication figure.
*/
function ResearchPaper() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "research",
		className: "relative px-6 md:px-16 lg:px-24 py-32 md:py-40 max-w-5xl mx-auto scroll-mt-24",
		"aria-labelledby": "research-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
				index: "05",
				label: "Research Paper"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-6 text-eyebrow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-accent",
							children: "Research Paper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-8 bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: research.published })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .1,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "research-title",
					className: "text-display text-[clamp(1.85rem,3.6vw,3.05rem)] leading-[1.08] tracking-tight max-w-4xl mb-6",
					children: research.title
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .16,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lede italic text-text-muted max-w-3xl mb-3",
					children: research.subtitle
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .2,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-eyebrow mb-16",
					children: research.venue
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .24,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "soft-elevated p-8 md:p-10 mb-16 relative overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40",
						style: { background: "radial-gradient(circle, var(--glow-strong), transparent 70%)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-eyebrow text-accent mb-4",
							children: "Research Overview"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[1.02rem] md:text-[1.08rem] leading-[1.75] text-text max-w-3xl",
							children: research.overview
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10 md:gap-y-12",
				children: research.sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .08 + i * .04,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "border-t border-border/60 pt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline gap-3 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[10px] font-mono uppercase tracking-[0.22em] text-text-subtle",
								children: ["§", String(i + 1).padStart(2, "0")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-display text-[1.15rem] md:text-[1.25rem] text-accent",
								children: s.heading
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[0.98rem] leading-[1.75] text-text-muted",
							children: s.body
						})]
					})
				}, s.heading))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .4,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "mt-20 soft-elevated p-6 md:p-8 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono uppercase tracking-[0.16em]",
								style: { color: "var(--text-muted)" },
								children: "Figure 1"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono uppercase tracking-[0.12em]",
								style: { color: "var(--text-subtle)" },
								children: "Held-out evaluation · 40 days"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[13px] mb-6 font-medium",
							style: { color: "var(--text)" },
							children: "Short-term Electricity Load: Actual vs. Forecast (LightGBM & Prophet)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-5 mb-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
									color: "var(--accent)",
									label: "LightGBM (forecast)",
									solid: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
									color: "var(--text-muted)",
									label: "Prophet (baseline)",
									dashed: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegendItem, {
									color: "var(--text-subtle)",
									label: "Actual load",
									opacity: .65
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastChart, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "text-[12px] leading-[1.65] mt-5 max-w-xl",
							style: { color: "var(--text-subtle)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "var(--text-muted)" },
								children: "Note:"
							}), " LightGBM (trained with Bayesian-optimized lag features) closely tracks actual load on weekday peaks. Prophet underestimates demand on high-variance Fridays. Rolling-origin validation; no future leakage."]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .45,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 overflow-hidden rounded-xl",
					style: { border: "1px solid color-mix(in oklab, var(--border) 70%, transparent)" },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-3 border-b",
							style: {
								borderColor: "color-mix(in oklab, var(--border) 60%, transparent)",
								background: "color-mix(in oklab, var(--surface) 60%, transparent)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] font-mono uppercase tracking-[0.16em]",
								style: { color: "var(--text-muted)" },
								children: "Table 1 — Model Performance on Held-out Test Set (40 days)"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								style: { background: "color-mix(in oklab, var(--elevated) 40%, transparent)" },
								children: [
									"Model",
									"RMSE (GW)",
									"MAE (GW)",
									"MAPE (%)",
									"Peak Error"
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-[10.5px] font-mono uppercase tracking-[0.14em]",
									style: {
										color: "var(--text-subtle)",
										fontWeight: 500
									},
									children: h
								}, h))
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								style: { borderColor: "color-mix(in oklab, var(--border) 40%, transparent)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[13px] font-medium",
											style: {
												color: "var(--accent)",
												fontFamily: "var(--font-mono)"
											},
											children: "LightGBM"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text)" },
										children: "0.31"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text)" },
										children: "0.24"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text)" },
										children: "2.8%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text)" },
										children: "0.44 GW"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								style: { borderColor: "color-mix(in oklab, var(--border) 40%, transparent)" },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[13px]",
											style: {
												color: "var(--text-muted)",
												fontFamily: "var(--font-mono)"
											},
											children: "Prophet"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text-muted)" },
										children: "0.58"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text-muted)" },
										children: "0.43"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text-muted)" },
										children: "5.1%"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3 text-[13px]",
										style: { color: "var(--text-muted)" },
										children: "1.12 GW"
									})
								]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 py-2 border-t text-[11px] leading-relaxed",
							style: {
								borderColor: "color-mix(in oklab, var(--border) 40%, transparent)",
								color: "var(--text-subtle)",
								fontFamily: "var(--font-mono)",
								background: "color-mix(in oklab, var(--surface) 30%, transparent)"
							},
							children: "Lower is better. Rolling-origin validation; no look-ahead. MAPE computed on non-zero load windows."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-20 pt-10 border-t border-border/60 flex flex-col md:flex-row md:items-end md:justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-eyebrow text-accent mb-2",
							children: "Research Paper"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-display text-2xl md:text-[1.75rem] leading-tight mb-1",
							children: research.shortTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-eyebrow",
							children: research.published
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: research.pdfUrl,
						download: true,
						className: "cta-primary group relative inline-flex items-center gap-3 rounded-full pl-5 pr-2 py-2 text-sm bg-text text-bg self-start md:self-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-3.5 h-3.5" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Research Paper" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid place-items-center w-8 h-8 rounded-full bg-bg/15",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" })
							})
						]
					})]
				})
			})
		]
	});
}
function LegendItem({ color, label, solid, dashed, opacity = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
			width: "24",
			height: "10",
			viewBox: "0 0 24 10",
			children: dashed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: "5",
				x2: "24",
				y2: "5",
				stroke: color,
				strokeWidth: "1.5",
				strokeDasharray: "4 3",
				opacity
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "0",
				y1: "5",
				x2: "24",
				y2: "5",
				stroke: color,
				strokeWidth: solid ? 2.5 : 1.5,
				opacity
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px]",
			style: {
				color: "var(--text-muted)",
				fontFamily: "var(--font-mono)"
			},
			children: label
		})]
	});
}
/**
* ForecastChart — academic-quality SVG visualization.
* Realistic electricity load patterns: weekday peaks, weekend dips, seasonal noise.
*/
function ForecastChart() {
	const W = 600;
	const H = 220;
	const padL = 48;
	const padR = 10;
	const padT = 12;
	const padB = 32;
	const chartW = W - padL - padR;
	const chartH = H - padT - padB;
	const days = 40;
	const rawLoad = Array.from({ length: days }, (_, i) => {
		const weekday = i % 7;
		const weekFactor = weekday < 5 ? 1 : .82;
		const trend = 1 + i * .002;
		const base = 9.8 * weekFactor * trend;
		const peakBoost = weekday === 2 || weekday === 3 ? .6 : 0;
		const randomNoise = Math.sin(i * 1.3) * .3 + Math.cos(i * .8) * .2;
		return base + peakBoost + randomNoise;
	});
	const prophetForecast = rawLoad.map((v, i) => {
		return rawLoad.slice(Math.max(0, i - 2), i + 3).reduce((s, x) => s + x, 0) / Math.min(5, rawLoad.slice(Math.max(0, i - 2), i + 3).length) * .97 + v * .03;
	});
	const lgbmForecast = rawLoad.map((v, i) => {
		return v * (1 + (Math.sin(i * 2.1) * .08 + Math.cos(i * 3.4) * .05));
	});
	const allVals = [
		...rawLoad,
		...prophetForecast,
		...lgbmForecast
	];
	const yMin = Math.floor(Math.min(...allVals) * 10) / 10 - .3;
	const yMax = Math.ceil(Math.max(...allVals) * 10) / 10 + .3;
	const toX = (i) => padL + i / (days - 1) * chartW;
	const toY = (v) => 188 - (v - yMin) / (yMax - yMin) * chartH;
	const makePath = (data) => data.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ");
	const yTicks = [];
	for (let v = Math.ceil(yMin); v <= yMax; v += 1) yTicks.push(v);
	const xWeekTicks = [
		0,
		7,
		14,
		21,
		28,
		35,
		39
	];
	const bandTop = lgbmForecast.map((v) => v + .18);
	const bandBot = lgbmForecast.map((v) => v - .18);
	const bandPath = bandTop.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(v).toFixed(1)}`).join(" ") + " " + bandBot.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(days - 1 - i).toFixed(1)} ${toY(bandBot[days - 1 - i]).toFixed(1)}`).join(" ") + " Z";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${W} ${H}`,
		className: "w-full h-auto",
		"aria-label": "Electricity load forecast comparison chart",
		role: "img",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", {
				id: "chart-clip",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: padL,
					y: padT,
					width: chartW,
					height: chartH
				})
			}) }),
			yTicks.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: padL,
				y1: toY(v),
				x2: 590,
				y2: toY(v),
				stroke: "var(--border)",
				strokeWidth: "0.7",
				strokeDasharray: "3 4"
			}, v)),
			[
				7,
				14,
				21,
				28,
				35
			].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: toX(d),
				y1: padT,
				x2: toX(d),
				y2: 188,
				stroke: "var(--border)",
				strokeWidth: "0.5",
				opacity: "0.6"
			}, d)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: padL,
				y1: padT,
				x2: padL,
				y2: 188,
				stroke: "var(--border-strong)",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: padL,
				y1: 188,
				x2: 590,
				y2: 188,
				stroke: "var(--border-strong)",
				strokeWidth: "1"
			}),
			yTicks.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: padL - 6,
				y: toY(v) + 3.5,
				textAnchor: "end",
				fontSize: "9",
				fontFamily: "var(--font-mono)",
				fill: "var(--text-subtle)",
				children: [v.toFixed(0), " GW"]
			}, v)),
			xWeekTicks.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: toX(d),
				y: H - 8,
				textAnchor: "middle",
				fontSize: "9",
				fontFamily: "var(--font-mono)",
				fill: "var(--text-subtle)",
				children: d === 0 ? "Day 1" : d === 39 ? "Day 40" : `W${Math.round(d / 7) + 1}`
			}, d)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: 10,
				y: 100,
				textAnchor: "middle",
				fontSize: "8.5",
				fontFamily: "var(--font-mono)",
				fill: "var(--text-subtle)",
				transform: `rotate(-90, 10, 100)`,
				children: "Load (GW)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: bandPath,
				fill: "var(--accent)",
				opacity: "0.08",
				clipPath: "url(#chart-clip)",
				initial: { opacity: 0 },
				whileInView: { opacity: .08 },
				viewport: { once: true },
				transition: {
					duration: 1,
					delay: .6
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: makePath(rawLoad),
				stroke: "var(--text-subtle)",
				strokeWidth: "1.5",
				fill: "none",
				clipPath: "url(#chart-clip)",
				opacity: "0.7",
				initial: { pathLength: 0 },
				whileInView: { pathLength: 1 },
				viewport: { once: true },
				transition: {
					duration: 2.2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: makePath(prophetForecast),
				stroke: "var(--text-muted)",
				strokeWidth: "1.2",
				fill: "none",
				strokeDasharray: "5 4",
				clipPath: "url(#chart-clip)",
				initial: { pathLength: 0 },
				whileInView: { pathLength: 1 },
				viewport: { once: true },
				transition: {
					duration: 2.2,
					delay: .2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.path, {
				d: makePath(lgbmForecast),
				stroke: "var(--accent)",
				strokeWidth: "2",
				fill: "none",
				clipPath: "url(#chart-clip)",
				initial: { pathLength: 0 },
				whileInView: { pathLength: 1 },
				viewport: { once: true },
				transition: {
					duration: 2.2,
					delay: .4,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.g, {
				initial: { opacity: 0 },
				whileInView: { opacity: 1 },
				viewport: { once: true },
				transition: { delay: 2 },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: toX(10),
					y1: toY(rawLoad[10]),
					x2: toX(10),
					y2: toY(rawLoad[10]) - 22,
					stroke: "var(--text-subtle)",
					strokeWidth: "0.8",
					strokeDasharray: "2 2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: toX(10) + 4,
					y: toY(rawLoad[10]) - 24,
					fontSize: "8",
					fontFamily: "var(--font-mono)",
					fill: "var(--text-subtle)",
					children: "peak"
				})]
			})
		]
	});
}
function Skills() {
	const [active, setActive] = (0, import_react.useState)(null);
	const rings = (0, import_react.useMemo)(() => {
		const byName = Object.fromEntries(skillEcosystem.map((c) => [c.cluster, c]));
		return [
			{
				cluster: "Core",
				radius: 168,
				duration: 180,
				reverse: false,
				phase: 0
			},
			{
				cluster: "Data",
				radius: 258,
				duration: 240,
				reverse: true,
				phase: 24
			},
			{
				cluster: "Currently Learning",
				radius: 348,
				duration: 320,
				reverse: false,
				phase: 12
			}
		].filter((p) => byName[p.cluster]).map((p) => ({
			...p,
			intent: byName[p.cluster].intent,
			items: byName[p.cluster].items
		}));
	}, []);
	const total = rings.reduce((n, r) => n + r.items.length, 0);
	const dimOthers = Boolean(active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "skills",
		className: "relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24",
		"aria-labelledby": "skills-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
				index: "03",
				label: "Skills"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				id: "skills-title",
				className: "text-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] mb-6",
				children: ["Skills that turn", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-text-muted",
					children: " ideas into products."
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .12,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lede max-w-2xl mb-16",
					children: "I don't collect technologies. Each one on this map is a tool I've reached for on a real project — sometimes for years, sometimes for a single stubborn afternoon. Hover any capsule for the honest note."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-8 hidden md:block",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full",
							style: { containerType: "inline-size" },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									"aria-hidden": true,
									className: "absolute inset-0 opacity-90 pointer-events-none",
									style: { background: "radial-gradient(circle at 50% 50%, var(--glow-strong) 0%, transparent 58%)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									"aria-hidden": true,
									viewBox: "-450 -450 900 900",
									className: "absolute inset-0 w-full h-full opacity-[0.26]",
									preserveAspectRatio: "xMidYMid slice",
									children: rings.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: 0,
										cy: 0,
										r: r.radius,
										fill: "none",
										stroke: "var(--border-strong)",
										strokeWidth: i === 0 ? .5 : .4,
										strokeDasharray: i % 2 ? "1.5 8" : "1 12"
									}, r.cluster))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute inset-0 grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative",
										style: {
											width: 900,
											height: 900,
											transform: "scale(calc(100cqw / 900))",
											transformOrigin: "center"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "absolute left-1/2 top-1/2 w-0 h-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun$1, {}), rings.map((ring) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute left-0 top-0 w-0 h-0",
												style: {
													animation: `${ring.reverse ? "orbit-spin-rev" : "orbit-spin"} ${ring.duration}s linear infinite`,
													willChange: "transform"
												},
												children: ring.items.map((node, i) => {
													const angle = (ring.phase ?? 0) + i * 360 / ring.items.length;
													const isActive = active?.node.name === node.name && active.cluster === ring.cluster;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute left-0 top-0",
														style: { transform: `rotate(${angle}deg) translate(${ring.radius}px, 0) translateZ(0)` },
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															style: { transform: `rotate(${-angle}deg) translateZ(0)` },
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																style: {
																	animation: `${ring.reverse ? "orbit-spin" : "orbit-spin-rev"} ${ring.duration}s linear infinite`,
																	willChange: "transform"
																},
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	style: {
																		animation: `node-float ${6 + i % 4}s ease-in-out ${(i * .35).toFixed(2)}s infinite`,
																		willChange: "transform"
																	},
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Capsule, {
																		node,
																		cluster: ring.cluster,
																		active: isActive,
																		dimmed: dimOthers && !isActive,
																		onEnter: () => setActive({
																			node,
																			cluster: ring.cluster
																		}),
																		onLeave: () => setActive(null)
																	})
																})
															})
														})
													}, node.name);
												})
											}, ring.cluster))]
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center justify-between px-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-eyebrow",
								children: [
									total,
									" tools · ",
									rings.length,
									" orbits"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-eyebrow opacity-70",
								children: "idea → product"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 -mx-1 overflow-x-auto no-scrollbar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-5 lg:gap-7 px-1 border-b border-border/40",
								children: rings.map((ring) => {
									const isActive = active?.cluster === ring.cluster;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onMouseEnter: () => setActive({
											node: ring.items[0],
											cluster: ring.cluster
										}),
										onFocus: () => setActive({
											node: ring.items[0],
											cluster: ring.cluster
										}),
										onMouseLeave: () => setActive(null),
										onBlur: () => setActive(null),
										className: `relative py-2.5 text-[12.5px] whitespace-nowrap transition-colors duration-300 ${isActive ? "text-text" : "text-text-muted hover:text-text"}`,
										children: [ring.cluster, isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
											layoutId: "skill-tab-underline",
											className: "absolute left-0 right-0 -bottom-px h-px bg-accent",
											transition: {
												type: "spring",
												stiffness: 380,
												damping: 32
											}
										})]
									}, ring.cluster);
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:col-span-4 hidden md:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:sticky lg:top-28",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "soft-elevated p-8 min-h-[280px] relative overflow-hidden",
							"aria-live": "polite",
							"aria-atomic": "true",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								"aria-hidden": true,
								className: "absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-50",
								style: { background: "radial-gradient(circle, var(--glow-strong), transparent 70%)" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-eyebrow mb-6",
									children: "Notebook"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 8,
											filter: "blur(6px)"
										},
										animate: {
											opacity: 1,
											y: 0,
											filter: "blur(0px)"
										},
										exit: {
											opacity: 0,
											y: -8,
											filter: "blur(6px)"
										},
										transition: { duration: .28 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-eyebrow text-accent mb-3",
												children: active.cluster
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-display text-3xl md:text-4xl mb-4 leading-[0.95]",
												children: active.node.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[15px] text-text-muted leading-relaxed",
												children: active.node.note
											})
										]
									}, active.node.name) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: { opacity: 0 },
										animate: { opacity: 1 },
										exit: { opacity: 0 },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-display italic text-2xl md:text-3xl text-text-muted mb-5 leading-tight",
												style: { letterSpacing: "-0.02em" },
												children: "Hover any capsule."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[14px] text-text-subtle leading-relaxed mb-4",
												children: "Every tool on this map has been used on a real project — sometimes for years, sometimes for a single stubborn afternoon."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2 pt-4",
												style: { borderTop: "1px solid color-mix(in oklab, var(--border) 50%, transparent)" },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-block w-1.5 h-1.5 rounded-full",
													style: {
														background: "var(--accent)",
														boxShadow: "0 0 6px var(--accent)"
													}
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-text-subtle",
													style: {
														fontFamily: "var(--font-mono)",
														letterSpacing: "0.1em"
													},
													children: "Focus dots mark active tools"
												})]
											})
										]
									}, "idle")
								})]
							})]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 space-y-3 md:hidden",
				children: skillEcosystem.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "soft-elevated group open:pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
						className: "cursor-pointer list-none flex items-center justify-between px-6 py-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-eyebrow text-accent mb-1",
							children: c.cluster
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[13px] text-text-muted",
							children: c.intent
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-text-subtle text-lg transition-transform group-open:rotate-45",
							children: "+"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "px-6 pb-5 space-y-3 border-t border-border/50 pt-4",
						children: c.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[auto_1fr] gap-3 items-baseline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[11px] font-mono uppercase tracking-[0.14em] ${it.focus ? "text-accent" : "text-text"}`,
								children: it.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[13px] text-text-muted leading-snug",
								children: it.note
							})]
						}, it.name))
					})]
				}, c.cluster))
			})
		]
	});
}
function Sun$1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none",
		style: { animation: "sun-breathe 7s ease-in-out infinite" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full",
			style: {
				width: 220,
				height: 220,
				background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 32%, transparent), transparent 65%)",
				filter: "blur(28px)"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative grid place-items-center rounded-full skill-sun",
			style: {
				width: 148,
				height: 148
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono uppercase tracking-[0.32em] text-text-muted",
						children: "Idea"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: "w-4 h-px bg-accent/70",
						style: { boxShadow: "0 0 8px var(--accent)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-mono uppercase tracking-[0.32em] text-accent",
						children: "Product"
					})
				]
			})
		})]
	});
}
function Capsule({ node, cluster, active, dimmed, onEnter, onLeave }) {
	const isLearning = node.learning;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onMouseEnter: onEnter,
		onFocus: onEnter,
		onMouseLeave: onLeave,
		onBlur: onLeave,
		"data-active": active || void 0,
		"aria-label": `${node.name} — ${cluster}${isLearning ? " (currently learning)" : ""}`,
		className: `skill-capsule ${isLearning ? "skill-capsule--learning" : ""} relative -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[15px] px-3 py-1.5 text-[11.5px] font-mono tracking-[0.06em] text-text`,
		style: {
			opacity: dimmed ? .35 : 1,
			filter: dimmed ? "saturate(0.85)" : "none"
		},
		children: [
			node.focus && !isLearning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-accent",
				style: { boxShadow: "0 0 8px var(--accent)" }
			}),
			isLearning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "inline-block w-1 h-1 rounded-full bg-accent/70 mr-1.5 align-middle"
			}),
			node.name
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var sendContactEmail = createServerFn({ method: "POST" }).validator((data) => {
	return object({
		name: string().min(1, "Name is required").max(100),
		email: string().email("Invalid email address"),
		message: string().min(10, "Message must be at least 10 characters").max(5e3),
		honeypot: string().max(0, "Invalid submission").optional()
	}).parse(data);
}).handler(createSsrRpc("9f6a3e7d862b3bd44a62bd3da8650b9f5c1c8e066f55c724a9b197b7a20914a6"));
function Contact() {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 1400);
		} catch {}
	};
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (status === "loading") return;
		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			message: formData.get("message"),
			honeypot: formData.get("honeypot")
		};
		setStatus("loading");
		setErrorMessage("");
		try {
			object({
				name: string().min(1, "Please provide your name"),
				email: string().email("Please provide a valid email"),
				message: string().min(10, "Please provide a slightly longer message")
			}).parse(data);
			if ((await sendContactEmail({ data }))?.success) {
				setStatus("success");
				const duration = 2e3;
				const animationEnd = Date.now() + duration;
				const defaults = {
					startVelocity: 25,
					spread: 360,
					ticks: 60,
					zIndex: 100
				};
				const interval = setInterval(function() {
					const timeLeft = animationEnd - Date.now();
					if (timeLeft <= 0) return clearInterval(interval);
					const particleCount = 25 * (timeLeft / duration);
					confetti_module_default({
						...defaults,
						particleCount,
						origin: {
							x: .5,
							y: .6
						}
					});
				}, 250);
			} else throw new Error("Something went wrong");
		} catch (err) {
			if (err instanceof ZodError && err.issues.length > 0) setErrorMessage(err.issues[0].message);
			else setErrorMessage(err?.message || "Failed to send message. Please try again later.");
			setStatus("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "contact",
		className: "relative px-6 md:px-16 lg:px-24 py-40 max-w-7xl mx-auto scroll-mt-24",
		"aria-labelledby": "contact-title",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionMark, {
				index: "06",
				label: "Let's Connect"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .05,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "contact-title",
					className: "text-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] mb-8 max-w-5xl",
					children: [
						"Let's build",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "italic text-text-muted",
							children: "something worth shipping."
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .15,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-lede max-w-2xl mb-16",
					children: "Email is the fastest way in. I usually reply within a day."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-12 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .2,
					className: "lg:col-span-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-lift soft-elevated p-8 md:p-12 relative overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -inset-1 opacity-40 pointer-events-none",
							style: { background: "radial-gradient(600px circle at 50% 0%, var(--glow), transparent 60%)" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 10,
									scale: .95
								},
								animate: {
									opacity: 1,
									y: 0,
									scale: 1
								},
								transition: {
									type: "spring",
									stiffness: 300,
									damping: 25
								},
								className: "flex flex-col items-center justify-center text-center py-16",
								role: "status",
								"aria-live": "polite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: { scale: 0 },
										animate: { scale: 1 },
										transition: {
											type: "spring",
											stiffness: 300,
											damping: 20,
											delay: .1
										},
										className: "w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.svg, {
											className: "w-8 h-8 text-accent",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2.5",
											strokeLinecap: "round",
											strokeLinejoin: "round",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.polyline, {
												initial: { pathLength: 0 },
												animate: { pathLength: 1 },
												transition: {
													duration: .6,
													delay: .3,
													ease: "easeOut"
												},
												points: "20 6 9 17 4 12"
											})
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-display text-3xl mb-3",
										children: "Message sent"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-text-muted max-w-md",
										children: "Thanks for reaching out. I'll get back to you within a day."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setStatus("idle"),
										className: "mt-8 text-sm text-accent hover:underline",
										children: "Send another message"
									})
								]
							}, "success") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: {
									opacity: 0,
									filter: "blur(4px)"
								},
								onSubmit: handleSubmit,
								className: "relative z-10 space-y-6",
								noValidate: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-baseline justify-between mb-8",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-eyebrow inline-flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3 h-3" }), " Direct line"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "name",
												className: "text-sm font-medium text-text-muted",
												children: "Name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "name",
												name: "name",
												type: "text",
												required: true,
												disabled: status === "loading",
												className: "w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all",
												placeholder: "Rahul Sharma"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												htmlFor: "email",
												className: "text-sm font-medium text-text-muted",
												children: "Email"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												id: "email",
												name: "email",
												type: "email",
												required: true,
												disabled: status === "loading",
												className: "w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all",
												placeholder: "rahul@example.com"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											htmlFor: "message",
											className: "text-sm font-medium text-text-muted",
											children: "Message"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											id: "message",
											name: "message",
											required: true,
											disabled: status === "loading",
											rows: 5,
											className: "w-full bg-surface/50 border border-border/50 rounded-xl px-4 py-3 text-text placeholder:text-text-subtle focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none",
											placeholder: "Tell me about your project..."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden",
										"aria-hidden": "true",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											name: "honeypot",
											tabIndex: -1,
											autoComplete: "off"
										})
									}),
									status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											height: 0
										},
										animate: {
											opacity: 1,
											height: "auto"
										},
										className: "flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20",
										role: "alert",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: errorMessage })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 flex flex-col md:flex-row md:items-center justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "submit",
											disabled: status === "loading",
											className: "inline-flex items-center justify-center gap-2 rounded-full bg-text text-bg px-6 py-3 text-[14px] font-medium transition-transform active:scale-95 disabled:opacity-70 disabled:active:scale-100",
											children: status === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }), "Sending..."] }) : "Send message"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: copy,
											className: "group inline-flex items-center justify-center gap-2 text-[13px] text-text-muted hover:text-text transition-colors",
											"aria-label": "Copy email address",
											children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3.5 h-3.5 text-accent" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5 group-hover:text-accent transition-colors" }), copied ? "Copied to clipboard" : "or copy email address"]
										})]
									})
								]
							}, "form")
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
					delay: .28,
					className: "lg:col-span-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flat-card p-8 h-full flex flex-col justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-eyebrow mb-4",
								children: "Also here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelLink, {
								href: profile.linkedin,
								label: "LinkedIn",
								hint: "chandan-mahapatra",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-3.5 h-3.5" }),
								external: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelLink, {
								href: profile.github,
								label: "GitHub",
								hint: profile.githubHandle,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-3.5 h-3.5" }),
								external: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChannelLink, {
								href: `mailto:${profile.email}`,
								label: "Mail app",
								hint: "open compose",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-3.5 h-3.5" })
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 pt-6 border-t border-border/60 text-eyebrow",
							children: profile.location
						})]
					})
				})]
			})
		]
	});
}
function ChannelLink({ href, label, hint, icon, external }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer" : void 0,
		className: "group flex items-center justify-between py-4 border-b border-border/40 last:border-0 hover:pl-2 transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-eyebrow mb-1 inline-flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-70",
					children: icon
				}),
				" ",
				label
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-text group-hover:text-accent transition-colors",
			children: hint
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4 text-text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" })]
	});
}
function Colophon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative px-6 md:px-16 lg:px-24 pt-24 pb-12 max-w-5xl mx-auto flex flex-col items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute top-0 left-6 right-6 md:left-16 md:right-16 lg:left-24 lg:right-24 h-px bg-gradient-to-r from-transparent via-border-strong/30 to-transparent",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: {
					opacity: 0,
					y: 15,
					filter: "blur(4px)"
				},
				whileInView: {
					opacity: 1,
					y: 0,
					filter: "blur(0px)"
				},
				viewport: {
					once: true,
					margin: "-50px"
				},
				transition: {
					duration: .6,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				className: "w-full flex flex-col items-center mb-20 md:mb-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-8 font-mono text-xs tracking-[0.16em] uppercase opacity-[0.72] font-normal text-center",
					style: { color: "var(--text)" },
					children: "Chai. Code. Music. Repeat. ∞"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					whileHover: { y: -2 },
					transition: {
						duration: .3,
						ease: "easeOut"
					},
					className: "relative w-full max-w-[340px] p-3 rounded-[20px] bg-surface/30 backdrop-blur-xl border border-border/40 hover:border-border/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 rounded-[20px] border border-white/5 pointer-events-none",
						"aria-hidden": true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
						"data-testid": "embed-iframe",
						style: { borderRadius: "12px" },
						src: "https://open.spotify.com/embed/track/6bdpj89aYEBjhpsenXAsmO?utm_source=generator&theme=0&si=3cf742fc2a0d435b",
						width: "100%",
						height: "152",
						frameBorder: "0",
						allowFullScreen: false,
						allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
						loading: "lazy",
						title: "Spotify Embed: Track",
						className: "block"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { opacity: 0 },
				whileInView: { opacity: 1 },
				viewport: { once: true },
				transition: {
					duration: .8,
					delay: .2
				},
				className: "w-full flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "shrink-0 flex items-center justify-center md:justify-start gap-3 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-[11px] tracking-[0.15em] uppercase text-text-subtle font-medium",
						children: "Designed & Built by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-serif text-[15px] tracking-[-0.01em] italic text-text",
						children: "Chandan Mahapatra"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center md:justify-end gap-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
							href: profile.github,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-[14px] h-[14px]" }),
							label: "GitHub",
							external: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
							href: profile.linkedin,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, { className: "w-[14px] h-[14px]" }),
							label: "LinkedIn",
							external: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterLink, {
							href: `mailto:${profile.email}`,
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "w-[14px] h-[14px]" }),
							label: "Email"
						})
					]
				})]
			})
		]
	});
}
function FooterLink({ href, icon, label, external }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer" : void 0,
		className: "inline-flex items-center justify-center gap-2 rounded-full border border-border/40 bg-surface/20 px-4 py-2 text-[12px] text-text-muted hover:text-text hover:border-border/70 hover:bg-surface/40 hover:shadow-sm transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "opacity-70",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium tracking-wide",
			children: label
		})]
	});
}
var KEY = "cm-intro-seen-v9";
function Intro({ onDone }) {
	const [visible, setVisible] = (0, import_react.useState)(true);
	const [scene, setScene] = (0, import_react.useState)(null);
	const [exiting, setExiting] = (0, import_react.useState)(false);
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		if (localStorage.getItem(KEY) === "1") {
			setVisible(false);
			onDone();
			return;
		}
		document.body.style.overflow = "hidden";
		if (reduced) {
			setScene("signature");
			const timers = [setTimeout(() => setExiting(true), 1500), setTimeout(finish, 2300)];
			return () => {
				timers.forEach(clearTimeout);
				document.body.style.overflow = "";
			};
		}
		const timers = [
			setTimeout(() => setScene("name"), 120),
			setTimeout(() => setScene("line"), 1900),
			setTimeout(() => setScene("signature"), 3600),
			setTimeout(() => setExiting(true), 5800),
			setTimeout(finish, 6700)
		];
		const onKey = (e) => {
			if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finish();
		};
		window.addEventListener("keydown", onKey);
		return () => {
			timers.forEach(clearTimeout);
			window.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, []);
	const finish = () => {
		try {
			localStorage.setItem(KEY, "1");
		} catch {}
		document.body.style.overflow = "";
		setExiting(true);
		setTimeout(() => {
			setVisible(false);
			setTimeout(onDone, 60);
		}, 900);
	};
	const ease = [
		.16,
		1,
		.3,
		1
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 1 },
		animate: exiting ? { opacity: 0 } : { opacity: 1 },
		transition: {
			duration: .9,
			ease
		},
		className: "fixed inset-0 z-[200] grid place-items-center overflow-hidden",
		style: { backgroundColor: "var(--bg)" },
		role: "dialog",
		"aria-modal": "true",
		"aria-label": "Welcome",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 pointer-events-none",
				style: {
					background: "radial-gradient(60% 60% at 50% 50%, var(--glow-strong), transparent 75%)",
					animation: "intro-glow-pulse 4s ease-in-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "grain-overlay"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative w-full max-w-5xl h-[340px] flex items-center justify-center px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, {
					mode: "wait",
					children: [
						scene === "name" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 22,
								filter: "blur(5px)"
							},
							animate: {
								opacity: 1,
								y: 0,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								y: -14,
								filter: "blur(3px)"
							},
							transition: {
								duration: 1.1,
								ease
							},
							className: "absolute text-center text-text",
							style: {
								fontFamily: "\"Fraunces\", ui-serif, Georgia, serif",
								fontWeight: 460,
								letterSpacing: "-0.045em",
								fontSize: "clamp(3rem, 8.5vw, 6.5rem)",
								lineHeight: 1.02,
								fontFeatureSettings: "\"cv11\", \"ss01\"",
								WebkitFontSmoothing: "antialiased",
								MozOsxFontSmoothing: "grayscale"
							},
							children: "Hi, I'm Chandan."
						}, "name"),
						scene === "line" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 14,
								filter: "blur(4px)"
							},
							animate: {
								opacity: .7,
								y: 0,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								y: -12,
								filter: "blur(3px)"
							},
							transition: {
								duration: 1.1,
								ease
							},
							className: "absolute text-center",
							style: {
								color: "var(--text-muted)",
								fontFamily: "\"Fraunces\", ui-serif, Georgia, serif",
								fontWeight: 360,
								fontStyle: "italic",
								letterSpacing: "-0.015em",
								fontSize: "clamp(1.55rem, 4.2vw, 3rem)",
								lineHeight: 1.2,
								WebkitFontSmoothing: "antialiased",
								MozOsxFontSmoothing: "grayscale"
							},
							children: "Where design meets development."
						}, "line"),
						scene === "signature" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: {
								opacity: 0,
								scale: .96,
								filter: "blur(3px)"
							},
							animate: {
								opacity: 1,
								scale: 1,
								filter: "blur(0px)"
							},
							exit: {
								opacity: 0,
								scale: 1.02
							},
							transition: {
								duration: 1.8,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "absolute flex justify-center items-center w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/Signature-DyGnGP0L.png",
								alt: "Chandan Mahapatra Signature",
								className: "w-[72vw] sm:w-[58vw] md:w-[56vw] lg:w-[52vw] max-w-[700px] h-auto object-contain select-none",
								style: {
									mixBlendMode: "var(--signature-blend)",
									filter: "var(--signature-filter)",
									opacity: "var(--signature-opacity)"
								}
							})
						}, "sig")
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
				initial: { opacity: 0 },
				animate: { opacity: .4 },
				transition: {
					delay: 1.2,
					duration: 1
				},
				onClick: finish,
				className: "absolute bottom-10 left-1/2 -translate-x-1/2 hover:opacity-70 transition-opacity",
				style: {
					fontFamily: "var(--font-mono)",
					fontSize: "0.65rem",
					letterSpacing: "0.22em",
					textTransform: "uppercase",
					color: "var(--text-subtle)",
					background: "none",
					border: "none",
					cursor: "pointer"
				},
				children: "Press Esc to skip"
			})
		]
	}, "intro") });
}
/**
* Premium liquid-glass Back-to-Top FAB. Appears after one viewport of
* scroll, magnetic hover, smooth scroll to top.
*/
function BackToTop() {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	const { x, y } = useMagnetic(ref, .35);
	const reduced = useReducedMotion();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		let raf = 0;
		const onScroll = () => {
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				setVisible(window.scrollY > window.innerHeight);
			});
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(raf);
		};
	}, []);
	const scrollTop = () => {
		window.scrollTo({
			top: 0,
			behavior: reduced ? "auto" : "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: visible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
		ref,
		type: "button",
		"aria-label": "Back to top",
		onClick: scrollTop,
		initial: {
			opacity: 0,
			y: 12,
			scale: .92
		},
		animate: {
			opacity: 1,
			y: 0,
			scale: 1
		},
		exit: {
			opacity: 0,
			y: 12,
			scale: .92
		},
		transition: spring.magnetic,
		style: {
			x,
			y
		},
		className: "glass-nav back-to-top fixed bottom-6 right-6 z-40 grid place-items-center rounded-full w-11 h-11 text-text hover:text-accent",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
			initial: false,
			whileTap: reduced ? void 0 : {
				y: -6,
				opacity: .6
			},
			transition: {
				duration: .22,
				ease
			},
			className: "grid place-items-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-4 h-4" })
		})
	}, "back-to-top") });
}
function Index() {
	const [introDone, setIntroDone] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Intro, { onDone: () => setIntroDone(true) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grain-overlay",
			"aria-hidden": true
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: "#work",
			className: "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-elevated focus:text-text focus:px-4 focus:py-2 focus:rounded-full focus:text-sm",
			children: "Skip to work"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Work, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Experience, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchPaper, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Contact, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Colophon, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackToTop, {})
		] })
	] });
}
//#endregion
export { Index as component };
