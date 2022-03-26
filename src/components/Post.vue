<script setup lang="ts">
import type { Post } from '../types';

defineProps<{
    frontmatter: Post
}>()

</script>

<template>
    <div class="w-full max-w-5xl mx-auto px-6">
        <h1 class="text-white text-6xl font-bold text-center mb-4">{{ frontmatter.name }}</h1>
        <p class="text-white text-xl font-medium">{{ frontmatter.description }}</p>
        <div class="content mt-6">
            <slot></slot>
        </div>
    </div>
</template>

<style >
.content h1 {
    font-size: 3rem;
    font-weight: 600;
}
.content h2 {
    font-size: 2.1rem;
    font-weight: 600;
}
.content h3 {
    font-size: 1.8rem;
    font-weight: 600;
}
.content p {
    font-size: 1.4rem;
    font-weight: 500;
}

.content {
    color: white;
}
</style>