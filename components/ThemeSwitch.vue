<script setup lang="ts">
import { MoonIcon } from "@heroicons/vue/24/solid";
import { SunIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { useToggle, useDark } from "@vueuse/core";
import Menu, { MenuItem, MenuButton, MenuItems } from "./Menu";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
<template>
  <Menu>
    <MenuButton>
      <div
        class="dark:text-white text-gray-700 cursor-pointer flex items-center bg-gray-200 hover:bg-gray-300 opacity-80 p-2 rounded-xl"
      >
        <SunIcon v-if="isDark" class="w-5 h-5"> </SunIcon>
        <MoonIcon v-else class="w-5 h-5"> </MoonIcon>
      </div>
    </MenuButton>

    <MenuItems @click="toggleDark()">
      <MenuItem>
        <button
          class="inline-flex items-center text-gray-600 px-4 py-2 space-x-2.5 hover:bg-gray-100 hover:text-black w-full transition-colors"
        >
          <MoonIcon class="w-4 h-4"></MoonIcon>
          <p class="ml-2 mr-1 text-sm font-medium">Dark</p>
          <CheckIcon v-if="isDark" class="w-3 h-3"></CheckIcon>
        </button>
      </MenuItem>
      <MenuItem>
        <button
          class="inline-flex items-center text-gray-600 px-4 py-2 space-x-2.5 hover:bg-gray-100 hover:text-black w-full transition-colors"
        >
          <SunIcon class="w-4 h-4"></SunIcon>
          <p class="ml-2 mr-1 text-sm font-medium">Light</p>
          <CheckIcon v-if="!isDark" class="w-3 h-3"></CheckIcon>
        </button>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
