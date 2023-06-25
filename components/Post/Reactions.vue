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
  handleIncrementSkull,
} = usePostReactions(slug);
</script>

<template>
  <div class="flex gap-4">
    <PostReaction
      :incrementFn="handleIncrementThumbup"
      :decrementFn="handleDecrementThumbup"
      :isActive="storage.liked"
    >
      👍 {{ reactions.thumbup_count }}</PostReaction
    >
    <PostReaction
      :incrementFn="handleIncrementHeart"
      :decrementFn="handleDecrementHeart"
      :isActive="storage.loved"
    >
      ❤️ {{ reactions.heart_count }}
    </PostReaction>
    <PostReaction
      :incrementFn="handleIncrementSkull"
      :decrementFn="handleDecrementSkull"
      :isActive="storage.hated"
    >
      💀 {{ reactions.skull_count }}
    </PostReaction>
  </div>
</template>
