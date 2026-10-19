/**
 * Local stand-in for the GitHub round-trip so comments can be tried without an
 * OAuth app. `import.meta.dev` is compiled to `false` in production builds, so
 * there this route only ever answers 404.
 */
export default defineEventHandler(async (event) => {
  if (!import.meta.dev) throw createError({ statusCode: 404, statusMessage: "Not found" });

  const input = (await readBody(event).catch(() => null)) ?? {};
  const login =
    typeof input.login === "string" && /^[\w-]{1,39}$/.test(input.login) ? input.login : "dev";

  return signIn(event, {
    provider: "dev",
    providerId: login.toLowerCase(),
    login,
    name: `${login} (dev)`,
  });
});
