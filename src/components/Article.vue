<script setup lang="ts">
import dayjs from 'dayjs'

defineProps<{
    title: string
    description: string
    date: string
    path: string
    thumbnail: string
}>()

</script>

<template>
    <article class="flex justify-between h-60 rounded-xl p-6 hover:bg-gray-800 cursor-pointer">
        <div class="relative flex flex-col">
            <div class="mb-2">
                <p class="text-white font-medium text-md">{{ dayjs(date).format('MMMM D, YYYY') }}</p>
            </div>
            <h1 class="text-4xl font-semibold text-white mb-4">{{ title }}</h1>
            <div class="mb-7">
                <p class="text-gray-300 text-lg font-medium">{{ description }}</p>
            </div>
            <div class="mt-auto flex flex-row-reverse items-center justify-end">
                <button
                    @click="$router.push(path)"
                    class="py-2 px-6 font-medium tracking-wide bg-teal-200 rounded-lg shadow-md transition hover:bg-teal-300"
                >Read more</button>
            </div>
        </div>
        <img :src="thumbnail" class="h-full rounded-lg" />
    </article>
</template>