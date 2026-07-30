/**
 * usePlatformDetect — detects the user's OS/platform and applies
 * a `data-platform` attribute to the document root for CSS targeting.
 *
 * Design principle: Subtle adaptation, not OS parody.
 * The platform signal drives material refinements — glass quality,
 * blur amount, noise texture — not layout or content changes.
 */

import { useEffect } from "react";

export type Platform = "ios" | "macos" | "windows" | "android" | "linux" | "unknown";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent;
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData?.platform?.toLowerCase() ?? "";

  // iOS — check for iPhone/iPad in UA or touch + webkit combination
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return "ios"; // iPad with desktop UA

  // macOS
  if (/macintosh|mac os x/i.test(ua) && navigator.maxTouchPoints <= 1) return "macos";
  if (platform === "macos") return "macos";

  // Windows — Windows 11 is reported as NT 10.0 in UA (same as Win10)
  // We use platform data when available for precision
  if (/win/i.test(platform)) return "windows";
  if (/windows nt/i.test(ua)) return "windows";

  // Android
  if (/android/i.test(ua)) return "android";

  // Linux
  if (/linux/i.test(ua)) return "linux";

  return "unknown";
}

/**
 * Hook: apply data-platform to <html> for CSS-level adaptation.
 * Should be called once at the root layout level.
 */
export function usePlatformDetect(): Platform {
  const platform = detectPlatform();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-platform", platform);
    return () => {
      // Keep the attribute — don't remove on unmount (root is permanent)
    };
  }, [platform]);

  return platform;
}
