<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";

const colorMode = useColorMode();

const toggle = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <button
    type="button"
    class="inline-flex cursor-pointer items-center self-center text-muted-foreground transition-colors hover:text-foreground"
    aria-label="Toggle colour theme"
    @click="toggle"
  >
    <!-- The resolved mode is only known on the client; keep the layout stable until then. -->
    <ClientOnly>
      <Sun v-if="colorMode.value === 'dark'" class="size-4" aria-hidden="true" />
      <Moon v-else class="size-4" aria-hidden="true" />
      <template #fallback>
        <span class="inline-block size-4" />
      </template>
    </ClientOnly>
  </button>
</template>
