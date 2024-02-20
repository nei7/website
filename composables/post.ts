import { useLocalStorage } from "@vueuse/core";
import type { Post } from "../utils/notion";
import type { Reactions } from "../types/post";
import { useCachedAsyncData } from "./cachedData";

export function usePosts(limit?: number) {
  return useCachedAsyncData<{ posts: Post[]; tags: string[] }>("posts", () =>
    $fetch(`/api/notion/query-database${limit ? "?size=" + limit : ""}`).then(({ results }) => convertPosts(results))
  );
}

const initialReactionState = {
  liked: false,
  loved: false,
  hated: false
};

export function usePostReactions(slug: string) {
  const reactions = reactive<Reactions>({
    thumbup_count: 0,
    skull_count: 0,
    heart_count: 0
  });

  const storage = useLocalStorage(slug, initialReactionState);

  onMounted(async () => {
    const data = await $fetch<{ data: Reactions }>(`/api/post/reactions/${slug}`);
    Object.assign(reactions, data);
  });

  const handleIncrementSkull = async () => {
    await apiRequest("skull", "increment");

    reactions.skull_count++;

    updateReaction("hated");
  };

  const handleDecrementSkull = async () => {
    await apiRequest("skull", "decrement");

    reactions.skull_count--;

    updateReaction("hated");
  };

  const handleIncrementThumbup = async () => {
    await apiRequest("thumbup", "increment");

    reactions.thumbup_count++;

    updateReaction("liked");
  };

  const handleDecrementThumbup = async () => {
    await apiRequest("thumbup", "decrement");

    reactions.thumbup_count--;

    updateReaction("liked");
  };

  const handleIncrementHeart = async () => {
    await apiRequest("heart", "increment");

    reactions.heart_count++;

    updateReaction("loved");
  };

  const handleDecrementHeart = async () => {
    await apiRequest("heart", "decrement");

    reactions.heart_count--;

    updateReaction("loved");
  };

  const apiRequest = (reaction: string, type: "decrement" | "increment") => {
    try {
      return $fetch(`/api/post/reactions/${slug}`, {
        method: "POST",

        body: {
          reaction,
          type
        }
      });
    } catch (err) {
      useToast({
        text: (err as Error).message
      });
    }
  };

  const updateReaction = (reaction: "loved" | "liked" | "hated") => {
    storage.value[reaction] = !storage.value[reaction];
  };

  return {
    reactions,
    handleIncrementHeart,
    handleIncrementSkull,
    handleIncrementThumbup,
    handleDecrementHeart,
    handleDecrementSkull,
    handleDecrementThumbup,
    storage
  };
}
