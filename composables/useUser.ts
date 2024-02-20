export function useUser() {
  return useCachedFetch<{ id: string }>("/api/auth/me");
}
