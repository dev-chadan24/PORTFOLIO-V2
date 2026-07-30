import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as projects } from "./data-BJmZkLQi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/work._slug-BEhfsRFq.js
var $$splitComponentImporter = () => import("./work._slug-B6pT7dgT.mjs");
var $$splitNotFoundComponentImporter = () => import("./work._slug-BKKOCc3v.mjs");
var Route = createFileRoute("/work/$slug")({
	loader: ({ params }) => {
		const project = projects.find((p) => p.slug === params.slug);
		if (!project) throw notFound();
		return { project };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Case study not found — Chandan Mahapatra" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { project } = loaderData;
		const title = `${project.name} — Chandan Mahapatra`;
		const desc = project.thesis;
		return { meta: [
			{ title },
			{
				name: "description",
				content: desc
			},
			{
				property: "og:title",
				content: title
			},
			{
				property: "og:description",
				content: desc
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
