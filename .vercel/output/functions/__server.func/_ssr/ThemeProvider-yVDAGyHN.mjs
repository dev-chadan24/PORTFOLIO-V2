import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeProvider-yVDAGyHN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ThemeProviderContext = (0, import_react.createContext)({
	theme: "system",
	setTheme: () => null
});
/**
* ThemeProvider — central theme management.
* Uses a "theme-switching" class during transitions to enable smooth
* color interpolation without polluting every element with transitions.
*/
function ThemeProvider({ children, defaultTheme = "system", storageKey = "ui-theme" }) {
	const [theme, setThemeState] = (0, import_react.useState)(defaultTheme);
	(0, import_react.useEffect)(() => {
		const resolved = localStorage.getItem(storageKey) || defaultTheme;
		setThemeState(resolved);
	}, [storageKey, defaultTheme]);
	(0, import_react.useEffect)(() => {
		const root = window.document.documentElement;
		root.classList.remove("light", "dark");
		if (theme === "system") {
			const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
			root.classList.add(systemTheme);
			return;
		}
		root.classList.add(theme);
	}, [theme]);
	const setTheme = (newTheme) => {
		const root = document.documentElement;
		root.classList.add("theme-switching");
		localStorage.setItem(storageKey, newTheme);
		setThemeState(newTheme);
		const timer = setTimeout(() => {
			root.classList.remove("theme-switching");
		}, 500);
		return () => clearTimeout(timer);
	};
	const value = {
		theme,
		setTheme
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProviderContext.Provider, {
		value,
		children
	});
}
var useTheme = () => {
	const context = (0, import_react.useContext)(ThemeProviderContext);
	if (context === void 0) throw new Error("useTheme must be used within a ThemeProvider");
	return context;
};
//#endregion
export { useTheme as n, ThemeProvider as t };
