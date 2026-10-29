/**
 * Keeps `user.owner` in step with `comments.adminLogins`. The flag is set at
 * sign-in, but sessions live for 30 days and the list can change, so it is
 * recomputed whenever the client fetches the session (SSR and `refreshSession()`).
 * Server routes never trust it: they call `isAdmin` themselves.
 */
export default defineNitroPlugin(() => {
  sessionHooks.hook("fetch", (session, event) => {
    if (session.user) session.user.owner = isAdmin(event, session.user);
  });
});
