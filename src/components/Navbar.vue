<script setup lang="ts">
const menu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Posts",
    path: "/posts",
  },
  {
    name: "Stats",
    path: "/stats",
  },
];
</script>

<template>
  <div class="relative py-8 px-8 mx-auto max-w-7xl">
    <nav class="flex justify-center items-center">
      <ul
        class="items-center tracking-widest text-gray-400 gap-x-5 flex leading-relaxed text-sm"
      >
        <li v-for="item in menu" :key="item.name">
          <router-link
            class="hover:bg-gray-800 p-2 rounded-xl cursor-pointer px-3 transition"
            :to="item.path"
            :class="{ 'text-white': item.path === $route.path }"
          >
            {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
