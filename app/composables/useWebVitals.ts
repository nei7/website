import type { VitalName, VitalRating } from "#shared/types/analytics";

export interface VitalReading {
  value: number;
  rating: VitalRating;
}

/** What this browser measured for the current hard page load; filled in by plugins/analytics.client.ts. */
export interface WebVitalsState {
  /** Shared by the view beacon and the vitals beacons of the same hard load. */
  pageLoadId: string;
  path: string;
  navType: string | null;
  /** Navigation Timing `loadEventEnd`, in ms. */
  loadMs: number | null;
  metrics: Record<VitalName, VitalReading | null>;
}

export const useWebVitals = () =>
  useState<WebVitalsState>("web-vitals", () => ({
    pageLoadId: crypto.randomUUID(),
    path: "",
    navType: null,
    loadMs: null,
    metrics: { ttfb: null, fcp: null, lcp: null, cls: null, inp: null },
  }));
