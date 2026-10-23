export interface UserAgentInfo {
  browser: string;
  os: string;
  device: "desktop" | "mobile" | "tablet";
  /** Crawlers, monitors, CLI clients and headless browsers: never counted. */
  bot: boolean;
}

const BOT_PATTERN =
  /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|fetch|curl|wget|python|java\/|go-http|okhttp|axios|monitor|uptime|scan/i;

/** Low-entropy Client Hints, sent by Chromium alongside the UA string. */
export interface ClientHints {
  platform?: string;
  mobile?: string;
}

/**
 * Coarse, dependency-free classification: enough for a blog's breakdowns and
 * nothing that could single a visitor out. Order matters: Edge and Opera also
 * say "Chrome", Chrome also says "Safari", Android also says "Linux".
 */
export function parseUserAgent(ua: string, hints: ClientHints = {}): UserAgentInfo {
  const bot = !ua || BOT_PATTERN.test(ua);

  let browser = "Other";
  if (/Edg(?:e|A|iOS)?\//.test(ua)) browser = "Edge";
  else if (/OPR\/|Opera/.test(ua)) browser = "Opera";
  else if (/SamsungBrowser\//.test(ua)) browser = "Samsung Internet";
  else if (/Firefox\/|FxiOS\//.test(ua)) browser = "Firefox";
  else if (/Chrome\/|CriOS\//.test(ua)) browser = "Chrome";
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = "Safari";

  const platform = hints.platform?.replace(/"/g, "");
  let os = "Other";
  if (platform && platform !== "Unknown") os = platform;
  else if (/Windows/.test(ua)) os = "Windows";
  else if (/iPhone|iPad|iPod/.test(ua)) os = "iOS";
  else if (/Macintosh|Mac OS X/.test(ua)) os = "macOS";
  else if (/Android/.test(ua)) os = "Android";
  else if (/CrOS/.test(ua)) os = "ChromeOS";
  else if (/Linux|X11/.test(ua)) os = "Linux";
  if (os === "Chrome OS") os = "ChromeOS";

  let device: UserAgentInfo["device"] = "desktop";
  if (/iPad|Tablet|Android(?!.*Mobile)/.test(ua)) device = "tablet";
  else if (hints.mobile === "?1" || /Mobi|iPhone|iPod/.test(ua)) device = "mobile";

  return { browser, os, device, bot };
}
