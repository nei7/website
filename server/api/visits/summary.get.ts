/**
 * GET /api/visits/summary — views and unique visitors for all time, the last 30
 * days and today (UTC). Identical for every viewer, so it is cached for 5 minutes;
 * it must never read the session or set cookies.
 */
export default defineCachedEventHandler(() => buildSummary(), {
  group: "site",
  name: "visits-summary",
  maxAge: 300,
  swr: true,
});
