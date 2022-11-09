<template>
  <main class="w-full max-w-2xl mt-10 mx-auto px-4 sm:p-0">
    <section class="text-justify sm:text-left">
      <h1 class="mb-5 sm:mb-2">Projects</h1>
      <p>a list of my projects that I find quite useful or interesting</p>
    </section>

    <section class="pb-10">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-5 grid-flow-row auto-rows-max"
      >
        <ProjectCard
          title="pv"
          description="Password manager that works in terminal"
          language="Rust"
          link="https://github.com/nei7/pv"
        />

        <ProjectCard
          title="gterm"
          description="Simple terminal emulator"
          language="Go"
          link="https://github.com/nei7/gterm"
        />

        <ProjectCard
          title="httyped"
          description="A cli tool and vscode extension that can generate typescript types from http request "
          language="Typescript"
          link="https://github.com/nei7/httyped"
        />

        <ProjectCard
          title="odrabiamy"
          description="A tool that download solutions from odrabiamy.pl so you don't have to pay in the future"
          language="Go"
          link="https://github.com/nei7/odrabiamy"
        />
      </div>
    </section>
  </main>
</template>
