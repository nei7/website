import { Post } from "~/utils/notion";
import { useCachedAsyncData } from "./useCachedData";

export default function usePosts(limit?: number) {
  return useCachedAsyncData<Post[]>("posts", () =>
    $fetch(`/api/notion/query-database${limit ? "?size=" + limit : ""}`).then(
      ({ results }) => convertPosts(results)
    )
  );
}
