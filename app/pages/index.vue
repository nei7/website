<script setup lang="ts">
const { site } = useAppConfig();

const [{ data: posts }, { data: projects }] = await Promise.all([
  useNotionCollection("posts", { limit: 5 }),
  useNotionCollection("projects", { featured: true, limit: 4 }),
]);

usePageSeo({ description: site.description, path: "/" });
</script>

<template>
  <div class="space-y-16">
    <section>
      <div class="prose mt-8">
        <p>
          Hi, I'm Franek, a Computer Science student specializing in web development.
          Beyond shipping web apps, I'm always exploring broader software engineering domains to expand my toolkit.
          Outside of tech, I spend my time at the gym, playing guitar, and reading.
        </p>
      </div>

      <div class="mt-8 space-y-3">
        <VisitSummary />
        <VitalsStrip />
      </div>
    </section>

    <section v-if="posts?.items.length">
      <div class="mb-4 flex items-baseline justify-between">
        <h2 class="font-serif text-2xl">Writing</h2>
        <NuxtLink to="/blog" class="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
          All posts →
        </NuxtLink>
      </div>
      <PostList :posts="posts.items" />
    </section>

    <section v-if="projects?.items.length">
      <div class="mb-4 flex items-baseline justify-between">
        <h2 class="font-serif text-2xl">Projects</h2>
        <NuxtLink
to="/projects"
          class="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground">
          All projects →
        </NuxtLink>
      </div>
      <ul>
        <ProjectRow v-for="project in projects.items" :key="project.id" :project="project" />
      </ul>
    </section>
  </div>
</template>
