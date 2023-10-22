<script setup lang="ts">
const { slug } = defineProps<{
  slug: string;
}>();

const {
  reactions,
  storage,
  handleIncrementHeart,
  handleDecrementHeart,
  handleIncrementThumbup,
  handleDecrementThumbup,
  handleDecrementSkull,
  handleIncrementSkull
} = usePostReactions(slug);
</script>

<template>
  <div class="flex gap-4">
    <PostReaction :increment-fn="handleIncrementThumbup" :decrement-fn="handleDecrementThumbup" :is-active="storage.liked">
      👍 {{ reactions.thumbup_count }}
    </PostReaction>
    <PostReaction :increment-fn="handleIncrementHeart" :decrement-fn="handleDecrementHeart" :is-active="storage.loved">
      ❤️ {{ reactions.heart_count }}
    </PostReaction>
    <PostReaction :increment-fn="handleIncrementSkull" :decrement-fn="handleDecrementSkull" :is-active="storage.hated">
      💀 {{ reactions.skull_count }}
    </PostReaction>
  </div>
</template>
