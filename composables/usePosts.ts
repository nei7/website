import { Post } from "~/utils/notion";
import { useCachedAsyncData } from "./cachedData";

export default function usePosts(limit?: number) {
  return useCachedAsyncData<{ posts: Post[]; tags: string[] }>("posts", () =>
    $fetch(`/api/notion/query-database${limit ? "?size=" + limit : ""}`).then(
      ({ results }) => convertPosts(results)
    )
  );
}
