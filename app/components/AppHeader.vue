<script setup lang="ts">
const { site } = useAppConfig();

const linkClass =
  "transition-colors hover:text-foreground aria-[current=page]:text-foreground";
</script>

<template>
  <header
    class="mx-auto flex w-full max-w-[65ch] items-baseline justify-between gap-6 px-5 pt-8 pb-2 sm:px-6"
  >
    <NuxtLink
      to="/"
      class="font-serif text-lg tracking-tight hover:underline underline-offset-4"
    >
      {{ site.name }}
    </NuxtLink>

    <nav
      aria-label="Main"
      class="flex items-baseline gap-5 font-mono text-xs tracking-wider text-muted-foreground uppercase"
    >
      <NuxtLink to="/blog" :class="linkClass" active-class="text-foreground">
        Blog
      </NuxtLink>
      <NuxtLink to="/projects" :class="linkClass" active-class="text-foreground">
        Projects
      </NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
