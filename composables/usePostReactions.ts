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
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",
      body: {
        reaction: "skull",
        type: "increment",
      },
    });

    reactions.skull_count++;

    updateReaction("hated");
  };

  const handleDecrementSkull = async () => {
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",
      body: {
        reaction: "skull",
        type: "decrement",
      },
    });

    reactions.skull_count--;

    updateReaction("hated");
  };

  const handleIncrementThumbup = async () => {
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",

      body: {
        reaction: "thumbup",
        type: "increment",
      },
    });

    reactions.thumbup_count++;

    updateReaction("liked");
  };

  const handleDecrementThumbup = async () => {
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",

      body: {
        reaction: "thumbup",
        type: "decrement",
      },
    });

    reactions.thumbup_count--;

    updateReaction("liked");
  };

  const handleIncrementHeart = async () => {
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",

      body: {
        reaction: "heart",
        type: "increment",
      },
    });

    reactions.heart_count++;

    updateReaction("loved");
  };

  const handleDecrementHeart = async () => {
    await $fetch(`/api/reactions/${slug}`, {
      method: "POST",

      body: {
        reaction: "heart",
        type: "decrement",
      },
    });

    reactions.heart_count--;

    updateReaction("loved");
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
