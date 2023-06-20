<script setup lang="ts">
import { useEventListener } from "@vueuse/core";
import { onMounted, ref, watch, reactive } from "vue";
import { useRoute } from "vue-router";

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

const route = useRoute();
const selectedIndex = ref(0);

const menuItems = ref<HTMLLIElement[]>([]);

const position = reactive({ x: 0, y: 0 }),
  size = reactive({ width: 0, height: 0 });

const toggleClass = ref(false);

watch(route, () => setBarPosition());

onMounted(() => setBarPosition());

const setBarPosition = () => {
  selectedIndex.value = menu.findIndex((_) => _.path === route.path);
  if (selectedIndex.value === -1) return;

  const item = menuItems.value?.[selectedIndex.value];
  size.width = item.clientWidth;
  size.height = item.clientHeight;

  position.x = item.offsetLeft;
  position.y = item.offsetTop;
};

const onWindowScroll = () => {
  if (window.scrollY > 10) toggleClass.value = true;
  else toggleClass.value = false;
};

useEventListener("resize", setBarPosition);
useEventListener("scroll", onWindowScroll);
</script>

<template>
  <div class="fixed z-50 top-5 left-0 right-0 w-full">
    <div
      class="absolute bg-white opacity-50 rounded-3xl z-10 duration-[200ms] transition-all ease-in-out"
      :style="{
        transform: `translate(${position.x + 'px'}, ${position.y + 'px'})`,
        width: size.width + 'px',
        height: size.height + 'px',
      }"
    ></div>
    <nav class="flex relative z-50 justify-center items-center">
      <ul
        ref="navbar"
        class="gap-x-5 flex m-0 font-medium px-3 py-2 rounded-3xl list-none text-slate-800"
        :class="toggleClass ? ['bg-white/50 backdrop-blur-lg	'] : []"
        hide-cursor
      >
        <li
          v-for="(item, i) in menu"
          :key="i"
          ref="menuItems"
          class="flex relative"
        >
          <router-link
            hide-cursor
            class="p-2 rounded-3xl cursor-pointer px-3 flex"
            :class="item.path === route.path && toggleClass ? ['bg-white'] : []"
            :to="item.path"
          >
            {{ item.name }}
            <slash v-if="item.path === '/'" />
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
