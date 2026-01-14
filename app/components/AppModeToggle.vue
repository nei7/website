<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const colorMode = useColorMode();

const options = [
  {
    name: "Light",
    icon: "lucide:sun",
    preference: "light",
  },
  {
    name: "Dark",
    icon: "lucide:moon",
    preference: "dark",
  },
  {
    name: "System",
    icon: "lucide:monitor",
    preference: "system",
  },
];
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="outline" class="cursor-pointer">
        <Icon
          icon="lucide:moon"
          class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <Icon
          icon="lucide:sun"
          class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem
        v-for="option in options"
        :key="option.name"
        class="cursor-pointer"
        :class="{ 'bg-accent': colorMode.preference == option.preference }"
        @click="colorMode.preference = option.preference"
      >
        <Icon :icon="option.icon" class="h-[1.2rem] w-[1.2rem]" />
        {{ option.name }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
