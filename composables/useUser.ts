export default function useUser() {
  return useCachedAsyncData<{ userId: string | null }>("user", async () => {
    try {
      return await $fetch("/api/auth/me", { method: "GET" });
    } catch (err) {
      return { userId: null };
    }
  });
}
