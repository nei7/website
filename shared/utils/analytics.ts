import type { AnalyticsPeriod, VitalName, VitalRating } from "../types/analytics";

export const ANALYTICS_PERIODS: readonly AnalyticsPeriod[] = [7, 30, 90];

export const VITAL_NAMES: readonly VitalName[] = ["ttfb", "fcp", "lcp", "cls", "inp"];

export const VITAL_LABELS: Record<VitalName, string> = {
  ttfb: "TTFB",
  fcp: "FCP",
  lcp: "LCP",
  cls: "CLS",
  inp: "INP",
};

export const VITAL_DESCRIPTIONS: Record<VitalName, string> = {
  ttfb: "Time to first byte",
  fcp: "First contentful paint",
  lcp: "Largest contentful paint",
  cls: "Cumulative layout shift",
  inp: "Interaction to next paint",
};

/** Google's thresholds as `[good ≤, needs-improvement ≤]`; anything above is poor. */
export const VITAL_THRESHOLDS: Record<VitalName, readonly [number, number]> = {
  ttfb: [800, 1800],
  fcp: [1800, 3000],
  lcp: [2500, 4000],
  cls: [0.1, 0.25],
  inp: [200, 500],
};

export const rateVital = (name: VitalName, value: number): VitalRating => {
  const [good, needsImprovement] = VITAL_THRESHOLDS[name];
  if (value <= good) return "good";
  return value <= needsImprovement ? "needs-improvement" : "poor";
};

export const RATING_LABELS: Record<VitalRating, string> = {
  good: "good",
  "needs-improvement": "needs improvement",
  poor: "poor",
};

/** Sub-second values stay in milliseconds, longer ones switch to seconds. */
export const formatMs = (ms: number): string => {
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(ms < 10_000 ? 2 : 1)} s`;
};

export const formatVital = (name: VitalName, value: number): string =>
  name === "cls" ? value.toFixed(2) : formatMs(value);
