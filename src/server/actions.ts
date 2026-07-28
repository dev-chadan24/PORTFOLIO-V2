import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

// --- Resend Contact Form ---

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");
const rateLimitCache = new Map<string, number>();

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return z.object({
      name: z.string().min(1, "Name is required").max(100),
      email: z.string().email("Invalid email address"),
      message: z.string().min(10, "Message must be at least 10 characters").max(5000),
      honeypot: z.string().max(0, "Invalid submission").optional(),
    }).parse(data);
  })
  .handler(async (ctx) => {
    const { name, email, message, honeypot } = ctx.data;
    
    if (honeypot && honeypot.length > 0) {
      return { success: true };
    }
    
    const now = Date.now();
    const lastSent = rateLimitCache.get(email) || 0;
    if (now - lastSent < 60000) {
      throw new Error("You're sending emails too fast. Please wait a minute.");
    }
    
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Resend API key is not configured.");
    }

    try {
      const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
      const { data, error } = await resend.batch.send([
        {
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: ["cmahapatra2400@gmail.com"], // Must be updated to verified domain in production if not using resend.dev test domain
          subject: `New contact from ${name}`,
          reply_to: email,
          html: `<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Timestamp:</strong> ${timestamp}</p>
<hr />
<p><strong>Message:</strong></p>
<p style="white-space: pre-wrap;">${message}</p>`,
        },
        {
          from: "Chandan Mahapatra <onboarding@resend.dev>",
          to: [email], // Auto-reply to the sender
          subject: "We've received your message",
          html: `<div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto;">
<p>Hi ${name},</p>
<p>Thank you for reaching out through my portfolio.</p>
<p>I've successfully received your message and will review it shortly. I'll get back to you as soon as possible.</p>
<p>I appreciate your time and look forward to connecting with you.</p>
<p>Best regards,<br/><strong>Chandan Mahapatra</strong></p>
</div>`,
        }
      ]);

      if (error) {
        throw new Error(error.message);
      }
      
      rateLimitCache.set(email, now);
      return { success: true, data };
    } catch (err: any) {
      throw new Error(err.message || "Failed to send email");
    }
  });
