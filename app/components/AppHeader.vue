<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import AppModeToggle from "./AppModeToggle.vue";
</script>

<template>
  <header class="container-wrapper py-3 flex justify-between items-center">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NuxtLink :class="navigationMenuTriggerStyle()" to="/">Home</NuxtLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NuxtLink :class="navigationMenuTriggerStyle()" to="/blog">
            Blog
          </NuxtLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="flex items-center">
      <AppModeToggle />
    </div>
  </header>
</template>
