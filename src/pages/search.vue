<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()
const query = ref('')

const search = () => {
    router.push('/blog?search=' + query.value)
}

</script>

<template>
    <div class="text-center mt-10">
        <h1 class="text-white text-4xl font-bold py-10">Search for content on site</h1>

        <input
            v-model="query"
            type="text"
            class="mx-auto max-w-sm block px-4 py-2 rounded-lg w-full text-md font-medium bg-transparent border-2 border-gray-800 appearance-none text-white focus:outline-none focus:ring-0 peer"
            placeholder="Search"
            @keydown.enter="search"
            required
        />
    </div>
</template>