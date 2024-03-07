export default function useUser() {
  return useCachedAsyncData<{ userId: string | null }>("user", async (ctx) => {
    try {
      return await $fetch("/api/auth/me", { method: "GET", headers: ctx?.ssrContext?.event.headers });
    } catch (err) {
      return { userId: null };
    }
  });
}

export async function signOut() {
  await $fetch("/api/auth/signout");
  navigateTo("/");
}
