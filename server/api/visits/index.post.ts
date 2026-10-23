/** POST /api/visits — page-view and web-vitals beacons from the client plugin; 204 whether or not the hit is kept. */
export default defineEventHandler(async (event) => {
  const payload = parseCollectPayload(await readBody(event).catch(() => null));

  const ua = getRequestHeader(event, "user-agent") ?? "";
  const agent = parseUserAgent(ua, getClientHints(event));
  if (agent.bot) return sendNoContent(event);

  // The owner's own browsing is noise, not traffic.
  const { user } = await getUserSession(event);
  if (user && isAdmin(event, user)) return sendNoContent(event);

  if (payload.type === "view") await recordView(event, payload, ua, agent);
  else await recordVitals(payload);

  return sendNoContent(event);
});
