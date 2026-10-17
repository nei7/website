<script setup lang="ts">
const { site } = useAppConfig();

const linkClass = "transition-colors hover:text-foreground";
</script>

<template>
  <footer
    class="mx-auto mt-16 flex w-full max-w-[65ch] flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-border px-5 py-8 font-mono text-xs text-muted-foreground sm:px-6"
  >
    <SpotifyStatus />

    <nav aria-label="Elsewhere" class="flex gap-4">
      <a :href="site.github" target="_blank" rel="noopener noreferrer" :class="linkClass">
        GitHub
      </a>
      <a v-if="site.email" :href="`mailto:${site.email}`" :class="linkClass">Email</a>
      <a href="/rss.xml" :class="linkClass">RSS</a>
    </nav>
  </footer>
</template>
