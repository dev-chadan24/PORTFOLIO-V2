//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DF-BhOKZ.js
var manifest = { "9f6a3e7d862b3bd44a62bd3da8650b9f5c1c8e066f55c724a9b197b7a20914a6": {
	functionName: "sendContactEmail_createServerFn_handler",
	importer: () => import("./_ssr/actions-B4LFsidM.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
