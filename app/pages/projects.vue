<script setup lang="ts">
const { data } = await useNotionCollection("projects");

const groups = computed(() => {
  const items = data.value?.items ?? [];
  const active = items.filter((p) => p.properties.status !== "Archived");
  const archived = items.filter((p) => p.properties.status === "Archived");
  return [
    { title: "Active", projects: active },
    { title: "Archived", projects: archived },
  ].filter((group) => group.projects.length > 0);
});

usePageSeo({
  title: "Projects",
  description: "Things I have built or am building.",
  path: "/projects",
});
</script>

<template>
  <div>
    <h1 class="font-serif text-3xl tracking-tight">Projects</h1>

    <div v-if="groups.length" class="mt-10 space-y-12">
      <section v-for="group in groups" :key="group.title">
        <h2 v-if="groups.length > 1" class="mb-3 font-serif text-xl">
          {{ group.title }}
        </h2>
        <ul>
          <ProjectRow v-for="project in group.projects" :key="project.id" :project="project" />
        </ul>
      </section>
    </div>
    <p v-else class="mt-10 font-mono text-xs text-muted-foreground">
      Nothing here yet.
    </p>
  </div>
</template>
