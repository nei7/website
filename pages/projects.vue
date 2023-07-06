<script setup lang="ts">
useCustomHead("Projects", "A selection list of my favorite projects");
</script>

<template>
  <main class="mx-auto pt-20 max-w-6xl px-4 xs:px-0">
    <div class="mt-32">
      <h1 class="font-bold text-4xl sm:text-6xl">
        List of my favorite projects
      </h1>
    </div>

    <div class="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-6">
      <ProjectCard
        title="Pv"
        description="Password vault for the terminal"
        githubLink="https://github.com/nei7/pv"
      >
        <template #icon>🔒</template>
      </ProjectCard>

      <ProjectCard
        title="Httyped"
        description="A cli tool that can generate typescript types from http request"
        githubLink="https://github.com/nei7/httyped"
      >
        <template #icon>📝</template>
      </ProjectCard>

      <ProjectCard
        title="Quizit"
        description="Website that allows students easily pass online exams"
        link="https://quizit.online/"
      >
        <template #icon>
          <img src="../assets/images/quizit.png" class="w-7 h-7 rounded-full" />
        </template>
      </ProjectCard>
      <ProjectCard
        title="fszarek.me"
        description="My porfolio and blog"
        githubLink="https://github.com/nei7/website"
        link="https://fszarek.me"
      >
        <template #icon> 💻 </template>
      </ProjectCard>
    </div>
  </main>
</template>
