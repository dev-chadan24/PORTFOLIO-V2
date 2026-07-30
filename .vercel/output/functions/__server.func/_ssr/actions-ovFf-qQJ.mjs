import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
import { n as string, t as object } from "../_libs/zod.mjs";
import { t as Resend } from "../_libs/resend+standardwebhooks.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/actions-ovFf-qQJ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var rateLimitCache = /* @__PURE__ */ new Map();
var sendContactEmail_createServerFn_handler = createServerRpc({
	id: "9f6a3e7d862b3bd44a62bd3da8650b9f5c1c8e066f55c724a9b197b7a20914a6",
	name: "sendContactEmail",
	filename: "src/server/actions.ts"
}, (opts) => sendContactEmail.__executeServer(opts));
var sendContactEmail = createServerFn({ method: "POST" }).validator((data) => {
	return object({
		name: string().min(1, "Name is required").max(100),
		email: string().email("Invalid email address"),
		message: string().min(10, "Message must be at least 10 characters").max(5e3),
		honeypot: string().max(0, "Invalid submission").optional()
	}).parse(data);
}).handler(sendContactEmail_createServerFn_handler, async (ctx) => {
	const { name, email, message, honeypot } = ctx.data;
	if (honeypot && honeypot.length > 0) return { success: true };
	const now = Date.now();
	if (now - (rateLimitCache.get(email) || 0) < 6e4) throw new Error("You're sending emails too fast. Please wait a minute.");
	if (!process.env.RESEND_API_KEY) {
		console.error("[Email Error]: RESEND_API_KEY is missing from process.env.");
		console.error("Diagnostic: Ensure RESEND_API_KEY is set in your .env file and restart the development server. Environment variables are not hot-reloaded.");
		throw new Error("Server configuration error: Email service is unavailable.");
	} else console.log(`[Diagnostic] RESEND_API_KEY successfully loaded at runtime (starts with: ${process.env.RESEND_API_KEY.substring(0, 3)}...)`);
	const resend = new Resend(process.env.RESEND_API_KEY);
	try {
		const timestamp = (/* @__PURE__ */ new Date()).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
		const { data, error } = await resend.batch.send([{
			from: "Portfolio Contact <onboarding@resend.dev>",
			to: ["cmahapatra2400@gmail.com"],
			subject: `New contact from ${name}`,
			replyTo: email,
			html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Timestamp:</strong> ${timestamp}</p>
<hr />
<p><strong>Message:</strong></p>
<p style="white-space: pre-wrap;">${message}</p>`
		}, {
			from: "Chandan Mahapatra <onboarding@resend.dev>",
			to: [email],
			subject: "We've received your message",
			html: `<div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto;">
<p>Hi ${name},</p>
<p>Thank you for reaching out through my portfolio.</p>
<p>I've successfully received your message and will review it shortly. I'll get back to you as soon as possible.</p>
<p>I appreciate your time and look forward to connecting with you.</p>
<p>Best regards,<br/><strong>Chandan Mahapatra</strong></p>
</div>`
		}]);
		if (error) throw new Error(error.message);
		rateLimitCache.set(email, now);
		return {
			success: true,
			data
		};
	} catch (err) {
		throw new Error(err.message || "Failed to send email");
	}
});
//#endregion
export { sendContactEmail_createServerFn_handler };
