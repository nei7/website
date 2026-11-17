<script setup lang="ts">

const linkClass =
  "transition-colors hover:text-foreground aria-[current=page]:text-foreground";
</script>

<template>
  <!-- Four links and the toggle only just fit a 360px phone, hence the tighter gaps there; anything narrower wraps the nav. -->
  <header
    class="mx-auto flex w-full max-w-[65ch] flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 pt-8 pb-2 sm:gap-x-6 sm:px-6 print:hidden"
  >
    <NuxtLink
      to="/"
      class="font-serif text-lg tracking-tight hover:underline underline-offset-4"
    >
      Home
    </NuxtLink>

    <nav
      aria-label="Main"
      class="flex items-baseline gap-3.5 font-mono text-xs tracking-wider text-muted-foreground uppercase sm:gap-5"
    >
      <NuxtLink to="/blog" :class="linkClass" active-class="text-foreground">
        Blog
      </NuxtLink>
      <!-- <NuxtLink to="/notes" :class="linkClass" active-class="text-foreground">
        Notes
      </NuxtLink> -->
      <NuxtLink to="/projects" :class="linkClass" active-class="text-foreground">
        Projects
      </NuxtLink>
      <NuxtLink to="/resume" :class="linkClass" active-class="text-foreground">
        Resume
      </NuxtLink>
      <ThemeToggle />
    </nav>
  </header>
</template>
