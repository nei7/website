declare module "#auth-utils" {
  /** Public part of the session, available on client and server. Matches `users.id`. */
  interface User {
    /** `${provider}:${providerId}`, e.g. `github:123`. */
    id: string;
    login: string;
    name: string | null;
    avatar: string | null;
  }

  interface UserSession {
    loggedInAt?: string;
  }
}

export {};
