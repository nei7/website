const oauth = defineOAuthGitHubEventHandler({
  async onSuccess(event, { user }) {
    await signIn(event, {
      provider: "github",
      providerId: String(user.id),
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
    });
    return sendRedirect(event, consumeRedirect(event));
  },
  onError(event, error) {
    console.error("GitHub sign-in failed:", error.message);
    return sendRedirect(event, withLoginError(consumeRedirect(event)));
  },
});

/**
 * GET /auth/github?redirect=/blog/<slug>#comments
 *
 * The first hit stores the destination in a cookie and bounces to GitHub;
 * GitHub calls the same URL back with `?code=` and the session is created.
 * Credentials come from NUXT_OAUTH_GITHUB_CLIENT_ID / _CLIENT_SECRET.
 */
export default defineEventHandler((event) => {
  const { redirect } = getQuery(event);
  if (redirect !== undefined) rememberRedirect(event, redirect);
  return oauth(event);
});
