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
      <h1 class="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
        {{ site.name }}
      </h1>
      <p class="mt-2 font-mono text-xs tracking-wider text-muted-foreground uppercase">
        {{ site.role }}
      </p>

      <div class="prose mt-8">
        <p>
          Hi, I'm Franek, a Computer Science student from Poland driven by a
          passion for problem solving and continuous learning. I love applying
          new concepts to real-world projects. You can see my work
          <NuxtLink to="/projects">here</NuxtLink>.
        </p>
        <p>
          Besides programming, I am passionate about music and play the guitar.
          I also go to the gym regularly.
        </p>
      </div>
    </section>

    <section v-if="posts?.items.length">
      <div class="mb-4 flex items-baseline justify-between">
        <h2 class="font-serif text-2xl">Writing</h2>
        <NuxtLink
          to="/blog"
          class="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
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
          class="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          All projects →
        </NuxtLink>
      </div>
      <ul>
        <ProjectRow v-for="project in projects.items" :key="project.id" :project="project" />
      </ul>
    </section>
  </div>
</template>
