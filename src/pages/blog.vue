<script setup lang="ts">
import { getPosts } from '../posts';
import { computed } from 'vue';
import type { Post } from '../types';
import dayjs from 'dayjs'
import { useRoute } from 'vue-router';

const posts = getPosts()

const route = useRoute()

type SortedPosts = Record<string, Post[]>

const sortedPosts = computed(() => {
    const obj: SortedPosts = {}

    for (const post of posts) {

        if (!post.name.toLowerCase().includes((route.query.search as string)?.toLowerCase() || '')) {
            return
        }

        const period = obj[post.date]
        if (period) {
            period.push(post)
            return
        }
        obj[post.date] = [post]
    }

    return obj
})


</script>
<template>
    <div class="w-full max-w-5xl mx-auto px-10">
        <div class="mt-10 mb-16">
            <h1 class="text-white font-bold text-5xl mb-5">My blog</h1>
            <p
                class="text-xl cursor-pointer text-gray-300"
            >Welcome to my blog. I write here mostly about programming and my life</p>
        </div>

        <div v-for="(posts,date) in sortedPosts" :key="date">
            <h2
                class="text-3xl font-semibold text-white mb-4"
            >{{ dayjs(date).format('MMMM D, YYYY') }}</h2>
            <ul class="list-disc list-inside">
                <li v-for="post in posts" :key="post.name" class="text-gray-300">
                    <a
                        @click="$router.push(post.path)"
                        class="text-xl font-medium cursor-pointer italic"
                    >{{ post.name }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>