import { onCLS, onFCP, onINP, onLCP, onTTFB } from "web-vitals";
import type { Metric } from "web-vitals";
import type { CollectPayload, VitalName } from "#shared/types/analytics";

const ENDPOINT = "/api/visits";
/** Set this key in localStorage to browse without being counted. */
const IGNORE_KEY = "analytics:ignore";

const ignored = () => {
  try {
    return Boolean(localStorage.getItem(IGNORE_KEY));
  } catch {
    return false;
  }
};

/**
 * Cookieless page-view and web-vitals beacons. One view per hard load and per
 * client-side navigation; the vitals of the hard load are sent after `load`
 * and again whenever the page is hidden, and the server merges them.
 */
export default defineNuxtPlugin(() => {
  if (ignored()) return;

  const router = useRouter();
  const state = useWebVitals();
  state.value.path = location.pathname;
  let dirty = false;

  const send = (payload: CollectPayload) => {
    const body = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (navigator.sendBeacon?.(ENDPOINT, body)) return;
    fetch(ENDPOINT, { method: "POST", body, keepalive: true }).catch(() => {});
  };

  const sendView = (id: string, path: string, referrer?: string) => send({ type: "view", id, path, referrer });

  const sendVitals = () => {
    if (!dirty) return;
    dirty = false;
    const { pageLoadId, path, navType, loadMs, metrics } = state.value;
    send({
      type: "vitals",
      id: pageLoadId,
      path,
      ttfb: metrics.ttfb?.value,
      fcp: metrics.fcp?.value,
      lcp: metrics.lcp?.value,
      cls: metrics.cls?.value,
      inp: metrics.inp?.value,
      loadMs: loadMs ?? undefined,
      navType: navType ?? undefined,
    });
  };

  // The hard load: the external referrer travels with the view, the vitals share its id.
  const referrer = document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : undefined;
  sendView(state.value.pageLoadId, location.pathname, referrer);

  const record = (metric: Metric) => {
    state.value.metrics[metric.name.toLowerCase() as VitalName] = { value: metric.value, rating: metric.rating };
    state.value.navType = metric.navigationType;
    dirty = true;
  };

  const readLoadTime = () => {
    const [navigation] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (!navigation?.loadEventEnd) return;
    state.value.loadMs = Math.round(navigation.loadEventEnd - navigation.startTime);
    dirty = true;
  };

  // `loadEventEnd` is still 0 while load handlers run, hence the extra tick.
  const afterLoad = () =>
    setTimeout(() => {
      readLoadTime();
      setTimeout(sendVitals, 1500);
    }, 0);

  // Live updates for the home-page strip and the latest LCP candidate for the beacon.
  const options = { reportAllChanges: true };
  onTTFB(record, options);
  onFCP(record, options);
  onLCP(record, options);
  onCLS(record, options);
  onINP(record, options);

  if (document.readyState === "complete") afterLoad();
  else addEventListener("load", afterLoad, { once: true });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendVitals();
  });
  addEventListener("pagehide", sendVitals);

  // Client-side navigations: a fresh view, no referrer, no vitals. Nuxt replays
  // the initial route during hydration, so same-path navigations are skipped.
  router.afterEach((to, from, failure) => {
    if (failure || to.path === from.path) return;
    sendView(crypto.randomUUID(), to.path);
  });
});
