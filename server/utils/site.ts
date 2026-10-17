import type { H3Event } from "h3";

/** Public origin for absolute URLs in feeds: configured `siteUrl` or the request's. */
export const getSiteUrl = (event: H3Event) =>
  (useRuntimeConfig(event).public.siteUrl || getRequestURL(event).origin).replace(/\/$/, "");

export const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (char) => {
    switch (char) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      default:
        return "&quot;";
    }
  });
