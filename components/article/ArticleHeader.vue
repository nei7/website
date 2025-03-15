<script setup lang="ts">
import type { Post } from '~/shared/notion/post';

const props = defineProps<{ post: Post }>()

const createdDate = useFormattedDate(props.post.createdAt)
</script>

<template>
    <div class="mt-12 lg:py-12 py-5">
        <h1 class="text-4xl font-bold">{{ post.title }}</h1>
        <p class="text-muted-foreground mt-4">{{ createdDate }}</p>
    </div>
</template>