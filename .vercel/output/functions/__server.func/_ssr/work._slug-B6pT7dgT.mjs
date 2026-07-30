import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as projects } from "./data-BJmZkLQi.mjs";
import { t as Route } from "./work._slug-BEhfsRFq.mjs";
import { o as motion } from "../_libs/framer-motion.mjs";
import { C as ArrowUpRight, f as Github, h as ExternalLink, i as Star, p as GitFork, v as Clock } from "../_libs/lucide-react.mjs";
import { t as projectImages } from "./media-DxQncQ82.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work._slug-B6pT7dgT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GitHubWidget({ repoPath }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		fetch(`https://api.github.com/repos/${repoPath}`).then((res) => {
			if (!res.ok) throw new Error("Repo not found");
			return res.json();
		}).then((json) => setData(json)).catch(() => setError(true));
	}, [repoPath]);
	if (error || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: `https://github.com/${repoPath}`,
		target: "_blank",
		rel: "noreferrer",
		className: "quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted hover:text-text hover:border-accent/50 transition-colors",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-3.5 h-3.5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View on GitHub" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5 ml-1 opacity-50" })
		]
	});
	const updatedDate = new Date(data.updated_at).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: data.html_url,
		target: "_blank",
		rel: "noreferrer",
		className: "group block w-full max-w-sm rounded-2xl border border-border/60 bg-surface/40 p-4 hover:bg-surface/80 hover:border-accent/40 transition-all duration-300",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-full bg-elevated text-text",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "w-4 h-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm font-medium text-text group-hover:text-accent transition-colors flex items-center gap-1.5",
					children: [data.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-text-muted font-mono",
					children: repoPath
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-text-muted mb-4 line-clamp-2 leading-relaxed",
				children: data.description || "No description provided."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-4 text-xs text-text-subtle font-medium",
				children: [
					data.language && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.language })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.stargazers_count })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitFork, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data.forks_count })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 ml-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3 h-3 opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-70",
							children: updatedDate
						})]
					})
				]
			})
		]
	});
}
function CaseStudy() {
	const { project } = Route.useLoaderData();
	const heroImage = projectImages[project.slug];
	const currentIndex = projects.findIndex((p) => p.slug === project.slug);
	const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
	const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grain-overlay",
		"aria-hidden": true
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.main, {
		initial: {
			opacity: 0,
			y: 20
		},
		animate: {
			opacity: 1,
			y: 0
		},
		exit: {
			opacity: 0,
			y: -20
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
		className: "min-h-screen px-6 md:px-16 lg:px-24 py-24 md:py-32 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "group inline-flex items-center gap-2 mb-16 text-eyebrow text-text-muted hover:text-text transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "group-hover:-translate-x-1 transition-transform duration-300",
					children: "←"
				}), "Selected work"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline gap-4 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-display italic text-2xl text-text-muted",
					children: project.number
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-eyebrow",
					children: project.subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] mb-10",
				children: project.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "relative pl-6 mb-14 max-w-2xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "absolute left-0 top-0 bottom-0 w-px bg-accent/60"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-display italic text-[clamp(1.35rem,2.2vw,1.85rem)] leading-snug text-text",
					children: project.thesis
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "mb-16 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "absolute -inset-4 rounded-[36px] opacity-30 blur-2xl pointer-events-none",
					style: { background: "radial-gradient(circle at 40% 30%, var(--glow-strong), transparent 60%)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative rounded-[24px] overflow-hidden soft-elevated group",
					children: heroImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
						initial: { scale: 1.05 },
						animate: { scale: 1 },
						transition: {
							duration: 1.2,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						src: heroImage,
						alt: `${project.name} — project showcase`,
						loading: "eager",
						decoding: "async",
						className: "w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "aspect-[16/9] relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute inset-0",
							style: { background: "radial-gradient(circle at 30% 30%, var(--glow-strong), transparent 60%), linear-gradient(160deg, var(--elevated-2), var(--surface))" }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-8 flex flex-col justify-between text-eyebrow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["/", project.slug] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Fig. ", project.number] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-display italic text-text-muted text-lg",
									children: project.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: project.year })]
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-14 md:space-y-20 mb-20 max-w-2xl",
				children: [
					project.overview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Overview",
						body: project.overview
					}),
					project.keyLearning && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 my-8 border-y border-border/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-eyebrow text-accent mb-8 text-center",
							children: "Key Learning"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "max-w-xl mx-auto text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-display italic text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.15] text-text mb-8",
								children: [
									"\"",
									project.keyLearning.quote,
									"\""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[15px] leading-[1.8] text-text-muted max-w-lg mx-auto",
								children: project.keyLearning.description
							})]
						})]
					}),
					project.problem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Problem",
						body: project.problem
					}),
					project.whyBuilt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Why I built it",
						body: project.whyBuilt
					}),
					project.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "My role",
						body: project.role
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-eyebrow text-accent mb-4",
						children: "Technology used"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: project.tech.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-mono px-3 py-1.5 rounded-full border border-border/80 bg-surface/60 text-text-muted hover:border-accent/30 hover:text-text transition-colors cursor-default",
							children: t
						}, t))
					})] }),
					project.challenges && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Challenges",
						body: project.challenges
					}),
					project.solutions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Solutions",
						body: project.solutions
					}),
					project.deployment && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Deployment",
						body: project.deployment
					}),
					project.learnings && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Key learnings",
						body: project.learnings
					}),
					project.future && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalField, {
						label: "Future improvements",
						body: project.future
					})
				]
			}),
			project.highlights && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-eyebrow mb-6",
					children: "Highlights"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-3 max-w-2xl",
					children: project.highlights.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[24px_1fr] gap-3 text-text-muted leading-relaxed",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-eyebrow text-accent pt-1",
							children: ["0", i + 1]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: h })]
					}, h))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: project.liveDemo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: project.liveDemo,
					target: "_blank",
					rel: "noreferrer",
					className: "quick-pill inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-[13px] text-text mb-4",
					children: ["Live demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-8",
				children: project.githubRepo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitHubWidget, { repoPath: project.githubRepo }) : project.github ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: project.github,
					target: "_blank",
					rel: "noreferrer",
					className: "quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted mb-4",
					children: ["GitHub ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" })]
				}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-3",
				children: project.links?.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: l.href,
					target: "_blank",
					rel: "noreferrer",
					className: "quick-pill inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-[13px] text-text-muted",
					children: [
						l.label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3.5 h-3.5" })
					]
				}, l.href))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-40 pt-12 border-t border-border/40 grid grid-cols-2 gap-8",
				children: [prevProject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: prevProject.slug },
					className: "group block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-eyebrow text-text-muted mb-3 group-hover:text-accent transition-colors flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "group-hover:-translate-x-1 transition-transform duration-300",
							children: "←"
						}), "Previous"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl md:text-3xl text-text font-display group-hover:opacity-80 transition-opacity",
						children: prevProject.name
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), nextProject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/work/$slug",
					params: { slug: nextProject.slug },
					className: "group block text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-eyebrow text-text-muted mb-3 group-hover:text-accent transition-colors flex items-center justify-end gap-2",
						children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "group-hover:translate-x-1 transition-transform duration-300",
							children: "→"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl md:text-3xl text-text font-display group-hover:opacity-80 transition-opacity",
						children: nextProject.name
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})]
			})
		]
	}, project.slug)] });
}
function JournalField({ label, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-t border-border/50 pt-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-eyebrow text-accent mb-3",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[15.5px] leading-[1.75] text-text-muted",
			children: body
		})]
	});
}
//#endregion
export { CaseStudy as component };
