<script setup lang="ts">
import { getPosts } from '../posts';
import { computed } from 'vue';
import type { Post } from '../types';
import dayjs from 'dayjs'

const posts = getPosts()

type SortedPosts = Record<string, Post[]>
const sortedPosts = computed(() => {
    const obj: SortedPosts = {}

    for (const post of posts) {
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
    <div class="w-full mt-20 max-w-3xl mx-auto">
        <div v-for="(posts,date) in sortedPosts" :key="date">
            <h1
                class="text-4xl font-semibold text-white mb-4"
            >{{ dayjs(date).format('MMMM D, YYYY') }}</h1>
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