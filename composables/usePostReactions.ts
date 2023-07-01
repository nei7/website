import { useLocalStorage } from "@vueuse/core";
import { Reactions } from "~/types/post";

const initialReactionState = {
  liked: false,
  loved: false,
  hated: false,
};

export default function usePostReactions(slug: string) {
  const reactions = reactive<Reactions>({
    thumbup_count: 0,
    skull_count: 0,
    heart_count: 0,
  });

  const storage = useLocalStorage(slug, initialReactionState);

  onMounted(async () => {
    const { data } = await $fetch<{ data: Reactions }>(
      `/api/reactions/${slug}`
    );
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
    return $fetch(`/api/reactions/${slug}`, {
      method: "POST",

      body: {
        reaction,
        type,
      },
    });
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
    storage,
  };
}
