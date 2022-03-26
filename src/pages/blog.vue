<script setup lang="ts">
import { getPosts } from '../posts';
import Article from '../components/Article.vue';

const posts = getPosts()
</script>
<template>
    <div class="w-full mt-20 max-w-4xl mx-auto">
        <Article
            v-for="(post,i) in posts"
            :title="post.name"
            :description="post.description"
            :date="post.date"
            :path="post.path"
            :thumbnail="post.thumbnail"
            :key="i"
        ></Article>
    </div>
</template>