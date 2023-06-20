import { AsyncData } from "nuxt/app";
import { Post } from "~/utils/notion";

export default function usePosts(limit?: number): AsyncData<Post[], any> {
  const cacheKey = "posts";
  return useAsyncData(cacheKey, async (nuxt) => {
    if (nuxt && cacheKey in nuxt.payload.data)
      return nuxt.payload.data[cacheKey];

    const posts: any = await $fetch(
      `/api/notion/query-database${limit ? "?size=" + limit : ""}`
    );

    const convertedPosts = convertPosts(posts.results);

    nuxt!.payload.data[cacheKey] = convertedPosts;

    return convertedPosts;
  });
}
