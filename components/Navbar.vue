<script setup lang="ts">
const menu = [
  {
    name: "Home",
    path: "/"
  },
  {
    name: "Posts",
    path: "/posts"
  },
  {
    name: "Stats",
    path: "/stats"
  },
  {
    name: "Projects",
    path: "/projects"
  }
];
</script>

<template>
  <div class="w-full flex relative justify-center sm:justify-between items-center py-10 pb-20 sm:py-14 sm:px-20">
    <div class="hidden sm:block"></div>

    <nav>
      <ul class="gap-x-3 sm:gap-x-5 flex m-0 font-medium px-4 py-2 rounded-full list-none text-xs sm:text-base">
        <li
          v-for="(item, i) in menu"
          :key="i"
          ref="menuItems"
          class="relative after:bg-indigo-600"
          :class="$route.path === item.path ? `nav-active` : ''"
        >
          <router-link class="p-2 cursor-pointer px-4 flex text-slate-600" :to="item.path">
            <b class="text-slate-800 hidden sm:block">0{{ i + 1 }}</b> &nbsp; {{ item.name }}
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
nav li::after {
  content: "";
  display: block;
  height: 4px;

  position: absolute;
  left: 1rem;
  right: 1rem;
  bottom: -2px;
  transform: scaleX(0);
  transform-origin: 0 50%;
  transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
}

nav li.nav-active::after {
  transform: none;
}
</style>
