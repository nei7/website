import type { AnalyticsDashboard } from "#shared/types/analytics";

/** GET /api/visits/report?days=7|30|90 — traffic breakdown and web vitals for the dashboard (site owner only). */
export default defineEventHandler(async (event): Promise<AnalyticsDashboard> => {
  const { user } = await requireUserSession(event);
  if (!isAdmin(event, user)) throw forbidden("Analytics are only visible to the site owner");

  const days = parsePeriod(getQuery(event).days);

  setResponseHeader(event, "Cache-Control", "private, no-store");
  return buildDashboard(days);
});
