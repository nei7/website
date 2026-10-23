export type VitalName = "ttfb" | "fcp" | "lcp" | "cls" | "inp";
export type VitalRating = "good" | "needs-improvement" | "poor";
export type AnalyticsPeriod = 7 | 30 | 90;

/** `POST /api/visits` body announcing a page view. */
export interface CollectView {
  type: "view";
  /** Client-generated uuid, reused by the vitals beacon of the same hard load. */
  id: string;
  path: string;
  referrer?: string;
}

/** `POST /api/visits` body carrying the web vitals of hard page load `id`. */
export interface CollectVitals {
  type: "vitals";
  id: string;
  path: string;
  ttfb?: number;
  fcp?: number;
  lcp?: number;
  cls?: number;
  inp?: number;
  loadMs?: number;
  navType?: string;
}

export type CollectPayload = CollectView | CollectVitals;

export interface VisitCounts {
  views: number;
  /** Distinct daily visitor hashes, i.e. unique visitors per day summed over the window. */
  visitors: number;
}

/** `GET /api/visits/summary` — the public counters on the home page. */
export interface AnalyticsSummary {
  allTime: VisitCounts;
  last30Days: VisitCounts;
  today: VisitCounts;
  generatedAt: string;
}

export interface DailyPoint {
  /** `YYYY-MM-DD` in UTC. */
  day: string;
  views: number;
  visitors: number;
}

export interface RankedRow {
  key: string;
  views: number;
  visitors: number;
}

export interface VitalStat {
  name: VitalName;
  samples: number;
  p75: number | null;
  rating: VitalRating | null;
  good: number;
  needsImprovement: number;
  poor: number;
}

/** `GET /api/visits/report` — everything the owner's dashboard shows. */
export interface AnalyticsDashboard {
  days: AnalyticsPeriod;
  from: string;
  to: string;
  totals: VisitCounts & { viewsPerVisitor: number };
  /** Distinct visitors in the last five minutes. */
  online: number;
  daily: DailyPoint[];
  pages: RankedRow[];
  referrers: RankedRow[];
  countries: RankedRow[];
  browsers: RankedRow[];
  os: RankedRow[];
  devices: RankedRow[];
  vitals: VitalStat[];
  /** p75 of Navigation Timing `loadEventEnd` in ms; Google defines no rating for it. */
  loadP75: number | null;
  loadSamples: number;
}
