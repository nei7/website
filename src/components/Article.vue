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
    <article>
        <div class="relative flex flex-col">
            <div class="mb-2">
                <p class="text-white font-medium text-md">{{ dayjs(date).format('MMMM D, YYYY') }}</p>
            </div>
            <h1 class="text-4xl font-semibold text-white mb-4">{{ title }}</h1>
            <div class="mb-7">
                <p class="text-gray-300 text-lg font-medium">{{ description }}</p>
            </div>
        </div>
    </article>
</template>