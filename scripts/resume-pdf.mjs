// Prints /resume to public/resume.pdf with headless Chromium, so the download
// is the page itself (same data, same fonts) laid out by its print styles.
//
//   pnpm resume:pdf            from the dev server on :3000
//   pnpm resume:pdf <url>      from another origin, e.g. a dev server on a spare port
//
// A different browser binary can be named in CHROME_BIN.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const url = process.argv[2] ?? "http://localhost:3000/resume";
const out = fileURLToPath(new URL("../public/resume.pdf", import.meta.url));

const fail = (message) => {
  console.error(`resume:pdf: ${message}`);
  process.exit(1);
};

const browser = [process.env.CHROME_BIN, "chromium", "chromium-browser", "google-chrome-stable", "google-chrome"]
  .filter(Boolean)
  .find((bin) => spawnSync(bin, ["--version"]).status === 0);
if (!browser) fail("no Chromium or Chrome on PATH; set CHROME_BIN to a browser binary.");

// Chromium happily prints its own "site can't be reached" page, so check first.
const response = await fetch(url).catch(() => null);
if (!response?.ok) {
  fail(`${url} answered ${response?.status ?? "nothing"}; start \`pnpm dev\` or pass the page URL.`);
}

execFileSync(
  browser,
  [
    "--headless=new",
    "--no-pdf-header-footer",
    // Lets the web fonts load before the page is captured.
    "--virtual-time-budget=5000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: "ignore" }
);

const pdf = readFileSync(out);
const pages = pdf.toString("latin1").match(/\/Type\s*\/Page\b/g)?.length ?? 0;
console.log(`public/resume.pdf: ${pages} page${pages === 1 ? "" : "s"}, ${Math.round(pdf.length / 1024)} kB`);
if (pages > 1) console.warn("resume:pdf: the resume no longer fits on one page.");
