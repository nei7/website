import type { H3Event } from "h3";
import type { User } from "#auth-utils";
import { users } from "../db/schema";

export interface SignInProfile {
  provider: "github" | "dev";
  providerId: string;
  login: string;
  name?: string | null;
  avatarUrl?: string | null;
}

const adminLogins = (event: H3Event) =>
  useRuntimeConfig(event)
    .comments.adminLogins.split(",")
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean);

/**
 * Site owner(s): the GitHub logins listed in `comments.adminLogins`. Checked
 * against the config on every request so a change applies without re-login.
 * Dev sign-ins only count locally, where the dev route exists at all.
 */
export const isAdmin = (event: H3Event, user: Pick<User, "id" | "login">) =>
  (user.id.startsWith("github:") || (import.meta.dev && user.id.startsWith("dev:"))) &&
  adminLogins(event).includes(user.login.toLowerCase());

/** Creates or refreshes the identity in `users` and starts a session. */
export async function signIn(event: H3Event, profile: SignInProfile): Promise<User> {
  const now = new Date();
  const id = `${profile.provider}:${profile.providerId}`;
  const identity = {
    login: profile.login,
    name: profile.name || null,
    avatarUrl: profile.avatarUrl || null,
    lastLoginAt: now,
  };

  await db
    .insert(users)
    .values({ id, provider: profile.provider, createdAt: now, ...identity })
    .onConflictDoUpdate({ target: users.id, set: identity });

  const user: User = {
    id,
    login: identity.login,
    name: identity.name,
    avatar: identity.avatarUrl,
    owner: isAdmin(event, { id, login: identity.login }),
  };
  await replaceUserSession(event, { user, loggedInAt: now.toISOString() });
  return user;
}

/** The signed-in site owner, or 401 (signed out) / 403 (anyone else). */
export async function requireOwner(event: H3Event): Promise<User> {
  const { user } = await requireUserSession(event);
  if (!isAdmin(event, user)) throw forbidden("Only the site owner can do that");
  return user;
}

const REDIRECT_COOKIE = "auth-redirect";
const redirectCookie = {
  path: "/auth",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: !import.meta.dev,
  maxAge: 10 * 60,
};

/** Only same-origin paths may be used as post-login destinations (no `//host`). */
export const safeRedirectPath = (value: unknown): string =>
  typeof value === "string" && /^\/(?![/\\])/.test(value) ? value : "/";

/** Remembers where to send the user once the OAuth round-trip completes. */
export const rememberRedirect = (event: H3Event, path: unknown) =>
  setCookie(event, REDIRECT_COOKIE, safeRedirectPath(path), redirectCookie);

/** Reads and clears the destination stored by `rememberRedirect`. */
export function consumeRedirect(event: H3Event): string {
  const path = safeRedirectPath(getCookie(event, REDIRECT_COOKIE));
  deleteCookie(event, REDIRECT_COOKIE, { path: redirectCookie.path });
  return path;
}

/** Appends `login=failed` so the destination page can say why the user is still signed out. */
export function withLoginError(path: string): string {
  const url = new URL(path, "http://localhost");
  url.searchParams.set("login", "failed");
  return url.pathname + url.search + url.hash;
}
