<script setup lang="ts">
const { site } = useAppConfig();

const linkClass = "transition-colors hover:text-foreground";
</script>

<template>
  <!--
    Width + padding live on the outer element (no font classes) so `65ch` is
    measured against the body font, exactly like <main> and <AppHeader>.
  -->
  <footer class="mx-auto mt-6 w-full max-w-[65ch] px-5 sm:px-6">
    <div
      class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3 border-t border-border py-8 font-mono text-xs text-muted-foreground"
    >
      <SpotifyStatus />

      <nav aria-label="Elsewhere" class="flex gap-4">
        <a :href="site.github" target="_blank" rel="noopener noreferrer" :class="linkClass">
          GitHub
        </a>
        <a v-if="site.email" :href="`mailto:${site.email}`" :class="linkClass">Email</a>
        <a href="/rss.xml" :class="linkClass">RSS</a>
      </nav>
    </div>
  </footer>
</template>
