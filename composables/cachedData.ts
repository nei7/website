import { AsyncData, AsyncDataOptions, NuxtApp } from "nuxt/app";

export function useCachedAsyncData<Data = any>(
  cacheKey: string,
  handler: (ctx?: NuxtApp) => Promise<Data>,
  options?: AsyncDataOptions<Data>
) {
  return useAsyncData<Data, Error>(
    cacheKey,
    async (ctx) => {
      const { data: cachedData } = useNuxtData(cacheKey);

      if (cachedData.value) {
        return cachedData.value;
      }

      const result = await handler(ctx);

      return result;
    },
    options
  ) as AsyncData<Data, Error>;
}

export function useCachedFetch<Data>(url: string) {
  return useCachedAsyncData<Data>(url, () => $fetch(url));
}
