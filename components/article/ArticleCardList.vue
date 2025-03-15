<script setup lang="ts">
import type { Post } from '~/shared/notion/post';
import ArticleCard from './ArticleCard.vue';

defineProps<{
    posts?: Post[]
}>()
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-7 px-4">
        <template v-for="post in posts">
            <ArticleCard v-if="post" v-bind="post" />
        </template>
    </div>

</template>