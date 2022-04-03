<script setup lang="ts">
const menu = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Blog",
        path: "/blog"
    },
    {
        name: "About",
        path: "/about"
    }
];
</script>

<template>
    <div class="relative py-10 px-8 mx-auto max-w-7xl">
        <nav class="flex justify-between items-center">
            <a href="#" class="text-2xl font-semibold text-white">fszarek.me</a>
            <ul
                class="hidden md:items-center md:tracking-widest md:text-gray-300 md:gap-8 lg:gap-x-16 md:flex"
            >
                <li v-for="item in menu" :key="item.name">
                    <router-link
                        :to="item.path"
                        class="transition hover:text-white"
                        :class="$route.path === item.path && 'text-white'"
                    >{{ item.name }}</router-link>
                </li>
            </ul>
            <button
                @click="$router.push('/search')"
                class="hidden py-3 px-6 font-medium tracking-wider leading-5 text-white rounded-md border-2 border-gray-800 transition md:inline-block hover:bg-teal-200 hover:text-gray-900 hover:shadow-lg"
            >Search</button>
        </nav>
    </div>
</template>