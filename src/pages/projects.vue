<script setup lang="ts">
import { onMounted } from 'vue';
import Card from '../components/Card.vue';

const projects = ref([])

onMounted(async () => {
    projects.value = await fetch("https://api.github.com/users/nei7/repos").then(res => res.json())
})
</script>

<template>
    <div class="grid grid-cols-2 gap-4 items-start py-16 w-full md:grid-cols-2 md:gap-x-8 xl:px-72">
        <Card v-for="project in projects" :key="project.node_id">
            <h1 class="text-2xl font-semibold text-white">{{ project.name }}</h1>
            <p class="text-white text-gray-300">{{ project.description || 'No description' }}</p>
        </Card>
    </div>
</template>