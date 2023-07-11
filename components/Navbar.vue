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
  {
    name: "Projects",
    path: "/projects",
  },
];

const route = useRoute();
const menuItems = ref<HTMLLIElement[]>([]);

const currentIndex = ref(0);
const position = reactive({ x: 0, y: 0 }),
  size = reactive({ width: 0, height: 0 });

const toggleClass = ref(false);

const setBarPosition = async () => {
  toggleClass.value = false;

  await nextTick();

  const index = menu.findIndex((_) => _.path === route.path);
  currentIndex.value = index === -1 ? 0 : index;

  const item = menuItems.value?.[currentIndex.value];
  size.width = item.clientWidth;
  size.height = item.clientHeight;

  position.x = item.offsetLeft;
  position.y = item.offsetTop;
};

watch(route, setBarPosition);
onMounted(setBarPosition);
useEventListener("resize", setBarPosition);

useEventListener("scroll", () => {
  if (window.scrollY > 10) toggleClass.value = true;
  else toggleClass.value = false;
});
</script>

<template>
  <div class="fixed z-50 top-5 left-0 right-0 w-full">
    <div
      class="absolute bg-white rounded-3xl z-10 duration-[200ms] transition-all ease-in-out"
      :style="{
        transform: `translate(${position.x + 'px'}, ${position.y + 'px'})`,
        width: size.width + 'px',
        height: size.height + 'px',
      }"
    ></div>
    <nav class="flex relative z-50 justify-center items-center">
      <ul
        class="gap-x-3 sm:gap-x-5 flex m-0 font-medium px-3 py-2 rounded-3xl list-none text-slate-800 text-sm sm:text-base"
        :class="toggleClass ? ['bg-gray-100/50 backdrop-blur-lg border'] : []"
      >
        <li
          v-for="(item, i) in menu"
          :key="i"
          ref="menuItems"
          class="flex relative"
        >
          <router-link
            class="p-2 rounded-3xl cursor-pointer px-4 flex"
            :class="currentIndex === i && toggleClass ? ['bg-white'] : []"
            :to="item.path"
          >
            {{ item.name }}

            <template v-if="item.path === '/'">
              <span
                class="rounded-md px-1.5 border-gray-300 border-2 text-xs sm:text-sm ml-2"
              >
                /
              </span>
            </template>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
