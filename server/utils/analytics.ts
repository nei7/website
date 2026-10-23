import type { H3Event } from "h3";
import { and, desc, gt, gte, isNotNull, sql, type SQL } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";
import type {
  AnalyticsDashboard,
  AnalyticsPeriod,
  AnalyticsSummary,
  CollectPayload,
  CollectView,
  CollectVitals,
  DailyPoint,
  RankedRow,
  VisitCounts,
  VitalName,
  VitalStat,
} from "#shared/types/analytics";
import { ANALYTICS_PERIODS, VITAL_NAMES, VITAL_THRESHOLDS, rateVital } from "#shared/utils/analytics";
import { pageViews, webVitals } from "../db/schema";
import type { ClientHints, UserAgentInfo } from "./ua";

const DAY_MS = 86_400_000;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const NAV_TYPES = new Set(["navigate", "reload", "back-forward", "back-forward-cache", "prerender", "restore"]);
/** Anything slower than two minutes is a suspended tab, not a measurement. */
const MAX_MS = 120_000;
const MAX_CLS = 10;

// ---------------------------------------------------------------------------
// Beacon parsing

function parseId(raw: unknown): string {
  if (typeof raw !== "string" || !UUID.test(raw)) throw badRequest("Invalid view id");
  return raw.toLowerCase();
}

/** Pathname only: query and hash dropped, trailing slash removed, internal routes rejected. */
export function parsePath(raw: unknown): string {
  if (typeof raw !== "string" || !raw.startsWith("/") || raw.startsWith("//") || raw.length > 512) {
    throw badRequest("Invalid path");
  }
  let path = raw.split(/[?#]/, 1)[0] || "/";
  if (path.length > 1) path = path.replace(/\/+$/, "") || "/";
  if (/^\/(?:api|_[^/]*)(?:\/|$)/.test(path)) throw badRequest("Invalid path");
  return path;
}

export const postSlugOf = (path: string): string | null => /^\/blog\/([^/]+)$/.exec(path)?.[1] ?? null;

/** Wrong types are a broken client (400); out-of-range values are dropped silently, keeping the rest. */
function parseMetric(raw: unknown, max: number, decimals = 0): number | undefined {
  if (raw == null) return undefined;
  if (typeof raw !== "number") throw badRequest("Invalid metric");
  if (!Number.isFinite(raw) || raw < 0 || raw > max) return undefined;
  const factor = 10 ** decimals;
  return Math.round(raw * factor) / factor;
}

export function parseCollectPayload(raw: unknown): CollectPayload {
  if (!raw || typeof raw !== "object") throw badRequest("Invalid payload");
  const input = raw as Record<string, unknown>;
  const id = parseId(input.id);
  const path = parsePath(input.path);

  if (input.type === "view") {
    const referrer =
      typeof input.referrer === "string" && input.referrer.length <= 2048 ? input.referrer : undefined;
    return { type: "view", id, path, referrer };
  }

  if (input.type === "vitals") {
    return {
      type: "vitals",
      id,
      path,
      ttfb: parseMetric(input.ttfb, MAX_MS),
      fcp: parseMetric(input.fcp, MAX_MS),
      lcp: parseMetric(input.lcp, MAX_MS),
      inp: parseMetric(input.inp, MAX_MS),
      cls: parseMetric(input.cls, MAX_CLS, 4),
      loadMs: parseMetric(input.loadMs, MAX_MS),
      navType: typeof input.navType === "string" && NAV_TYPES.has(input.navType) ? input.navType : undefined,
    };
  }

  throw badRequest("Invalid payload type");
}

export function parsePeriod(raw: unknown): AnalyticsPeriod {
  if (raw === undefined || raw === "") return 30;
  const days = Number(raw);
  if (!ANALYTICS_PERIODS.includes(days as AnalyticsPeriod)) throw badRequest("Period must be 7, 30 or 90 days");
  return days as AnalyticsPeriod;
}

// ---------------------------------------------------------------------------
// Request context

/** Cloudflare passes the visitor's address in its own header; h3 only knows X-Forwarded-For. */
export const getClientIp = (event: H3Event): string =>
  getRequestHeader(event, "cf-connecting-ip") ?? getRequestIP(event, { xForwardedFor: true }) ?? "";

export function getCountry(event: H3Event): string | null {
  const cf = event.context.cf as { country?: unknown } | undefined;
  const raw = typeof cf?.country === "string" ? cf.country : getRequestHeader(event, "cf-ipcountry");
  const country = raw?.toUpperCase();
  if (!country || !/^[A-Z0-9]{2}$/.test(country) || country === "XX" || country === "T1") return null;
  return country;
}

export const getClientHints = (event: H3Event): ClientHints => ({
  platform: getRequestHeader(event, "sec-ch-ua-platform"),
  mobile: getRequestHeader(event, "sec-ch-ua-mobile"),
});

/** sha256(salt | UTC date | ip | ua) truncated: rotates daily and cannot be turned back into an address. */
export async function visitorHash(event: H3Event, ua: string): Promise<string> {
  const config = useRuntimeConfig(event);
  const salt = config.analytics.salt || config.session.password;
  const day = new Date().toISOString().slice(0, 10);
  const bytes = new TextEncoder().encode([salt, day, getClientIp(event), ua].join("|"));
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  return Array.from(digest.slice(0, 8), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

const stripWww = (host: string) => host.toLowerCase().replace(/^www\./, "");

/** External referrer host; null for direct hits, internal navigation and garbage. */
export function referrerHost(raw: string | undefined, event: H3Event): string | null {
  if (!raw) return null;
  try {
    const host = stripWww(new URL(raw).hostname);
    if (!host) return null;
    const own = new Set([stripWww(getRequestHost(event, { xForwardedHost: true }).replace(/:\d+$/, ""))]);
    const siteUrl = useRuntimeConfig(event).public.siteUrl;
    if (siteUrl) own.add(stripWww(new URL(siteUrl).hostname));
    return own.has(host) ? null : host.slice(0, 255);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Writes

export async function recordView(event: H3Event, payload: CollectView, ua: string, agent: UserAgentInfo) {
  await db
    .insert(pageViews)
    .values({
      id: payload.id,
      path: payload.path,
      postSlug: postSlugOf(payload.path),
      referrerHost: referrerHost(payload.referrer, event),
      visitorHash: await visitorHash(event, ua),
      country: getCountry(event),
      browser: agent.browser,
      os: agent.os,
      device: agent.device,
      createdAt: new Date(),
    })
    .onConflictDoNothing();
}

/**
 * Vitals arrive in two or three beacons per page load (after load, on hide);
 * the newest non-null value of each metric wins. Beacons without a recorded
 * view (bots, replayed ids) are dropped.
 */
export async function recordVitals(payload: CollectVitals) {
  const view = await db
    .select({ id: pageViews.id })
    .from(pageViews)
    .where(sql`${pageViews.id} = ${payload.id}`)
    .get();
  if (!view) return;

  const now = new Date();
  await db
    .insert(webVitals)
    .values({
      viewId: payload.id,
      path: payload.path,
      ttfb: payload.ttfb ?? null,
      fcp: payload.fcp ?? null,
      lcp: payload.lcp ?? null,
      inp: payload.inp ?? null,
      cls: payload.cls ?? null,
      loadMs: payload.loadMs ?? null,
      navType: payload.navType ?? null,
      createdAt: now,
      updatedAt: now,
    })
    .onConflictDoUpdate({
      target: webVitals.viewId,
      set: {
        ttfb: sql`coalesce(excluded.ttfb, ${webVitals.ttfb})`,
        fcp: sql`coalesce(excluded.fcp, ${webVitals.fcp})`,
        lcp: sql`coalesce(excluded.lcp, ${webVitals.lcp})`,
        inp: sql`coalesce(excluded.inp, ${webVitals.inp})`,
        cls: sql`coalesce(excluded.cls, ${webVitals.cls})`,
        loadMs: sql`coalesce(excluded.load_ms, ${webVitals.loadMs})`,
        navType: sql`coalesce(excluded.nav_type, ${webVitals.navType})`,
        updatedAt: now,
      },
    });
}

// ---------------------------------------------------------------------------
// Aggregations

const views = sql<number>`count(*)`;
/** The UTC date is part of the hash, so distinct hashes are "unique visitors per day" over any window. */
const visitors = sql<number>`count(distinct ${pageViews.visitorHash})`;

export const startOfUtcDay = (now = new Date()) =>
  new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

const isoDay = (date: Date) => date.toISOString().slice(0, 10);

export async function countVisits(where?: SQL): Promise<VisitCounts> {
  const row = await db.select({ views, visitors }).from(pageViews).where(where).get();
  return { views: row?.views ?? 0, visitors: row?.visitors ?? 0 };
}

export async function onlineVisitors(): Promise<number> {
  const row = await db
    .select({ visitors })
    .from(pageViews)
    .where(gt(pageViews.createdAt, new Date(Date.now() - 5 * 60_000)))
    .get();
  return row?.visitors ?? 0;
}

/** One point per UTC day from `start` to today, zero-filled. */
export async function dailyVisits(start: Date, days: number): Promise<DailyPoint[]> {
  const day = sql<string>`strftime('%Y-%m-%d', ${pageViews.createdAt} / 1000, 'unixepoch')`;
  const rows = await db
    .select({ day, views, visitors })
    .from(pageViews)
    .where(gte(pageViews.createdAt, start))
    .groupBy(day)
    .orderBy(day)
    .all();
  const byDay = new Map(rows.map((row) => [row.day, row]));

  return Array.from({ length: days }, (_, i) => {
    const key = isoDay(new Date(start.getTime() + i * DAY_MS));
    const row = byDay.get(key);
    return { day: key, views: row?.views ?? 0, visitors: row?.visitors ?? 0 };
  });
}

export async function topBy(column: SQLiteColumn, start: Date, limit = 10): Promise<RankedRow[]> {
  const rows = await db
    .select({ key: column, views, visitors })
    .from(pageViews)
    .where(and(gte(pageViews.createdAt, start), isNotNull(column)))
    .groupBy(column)
    .orderBy(desc(views), column)
    .limit(limit)
    .all();
  return rows.map((row) => ({ key: String(row.key), views: row.views, visitors: row.visitors }));
}

/** SQLite has no percentile function; a window function picks the 75th-percentile row directly. */
async function percentile75(column: SQLiteColumn, start: Date): Promise<{ p75: number | null; samples: number }> {
  const row = await db.get<{ v: number; n: number } | undefined>(sql`
    select v, n from (
      select ${column} as v, row_number() over (order by ${column}) as rn, count(*) over () as n
      from ${webVitals}
      where ${webVitals.createdAt} >= ${start.getTime()} and ${column} is not null
    ) where rn = ((n - 1) * 3) / 4 + 1`);
  return { p75: row?.v ?? null, samples: row?.n ?? 0 };
}

async function ratingBuckets(start: Date): Promise<Record<string, number> | undefined> {
  const fields: Record<string, SQL<number>> = {};
  for (const name of VITAL_NAMES) {
    const column = webVitals[name];
    const [good, needsImprovement] = VITAL_THRESHOLDS[name];
    fields[`${name}_good`] = sql<number>`coalesce(sum(${column} <= ${good}), 0)`;
    fields[`${name}_ni`] = sql<number>`coalesce(sum(${column} > ${good} and ${column} <= ${needsImprovement}), 0)`;
    fields[`${name}_poor`] = sql<number>`coalesce(sum(${column} > ${needsImprovement}), 0)`;
  }
  return db.select(fields).from(webVitals).where(gte(webVitals.createdAt, start)).get();
}

async function vitalStats(start: Date): Promise<Pick<AnalyticsDashboard, "vitals" | "loadP75" | "loadSamples">> {
  const [buckets, load, ...percentiles] = await Promise.all([
    ratingBuckets(start),
    percentile75(webVitals.loadMs, start),
    ...VITAL_NAMES.map((name) => percentile75(webVitals[name], start)),
  ]);

  const vitals: VitalStat[] = VITAL_NAMES.map((name: VitalName, i) => {
    const { p75, samples } = percentiles[i]!;
    return {
      name,
      samples,
      p75,
      rating: p75 == null ? null : rateVital(name, p75),
      good: buckets?.[`${name}_good`] ?? 0,
      needsImprovement: buckets?.[`${name}_ni`] ?? 0,
      poor: buckets?.[`${name}_poor`] ?? 0,
    };
  });

  return { vitals, loadP75: load.p75, loadSamples: load.samples };
}

export async function buildSummary(): Promise<AnalyticsSummary> {
  const [allTime, last30Days, today] = await Promise.all([
    countVisits(),
    countVisits(gte(pageViews.createdAt, new Date(Date.now() - 30 * DAY_MS))),
    countVisits(gte(pageViews.createdAt, startOfUtcDay())),
  ]);
  return { allTime, last30Days, today, generatedAt: new Date().toISOString() };
}

/** `days` whole UTC days ending today; ~15 small indexed queries run concurrently. */
export async function buildDashboard(days: AnalyticsPeriod): Promise<AnalyticsDashboard> {
  const today = startOfUtcDay();
  const start = new Date(today.getTime() - (days - 1) * DAY_MS);
  const inPeriod = gte(pageViews.createdAt, start);

  const [totals, online, daily, pages, referrers, countries, browsers, os, devices, vitals] = await Promise.all([
    countVisits(inPeriod),
    onlineVisitors(),
    dailyVisits(start, days),
    topBy(pageViews.path, start),
    topBy(pageViews.referrerHost, start),
    topBy(pageViews.country, start),
    topBy(pageViews.browser, start, 8),
    topBy(pageViews.os, start, 8),
    topBy(pageViews.device, start, 3),
    vitalStats(start),
  ]);

  return {
    days,
    from: isoDay(start),
    to: isoDay(today),
    totals: {
      ...totals,
      viewsPerVisitor: totals.visitors ? Math.round((totals.views / totals.visitors) * 10) / 10 : 0,
    },
    online,
    daily,
    pages,
    referrers,
    countries,
    browsers,
    os,
    devices,
    ...vitals,
  };
}
