<template>
  <div class="relative min-h-screen overflow-hidden">
    <div
      class="absolute pointer-events-none -z-10 blur-[60px] bg-linear-to-tr from-secondary to-primary rounded-full w-[20rem] h-40 transition-all duration-1000 inset-x-0 mx-auto -top-30 hidden sm:block"
    />
    <AppHeader class="px-4" />
    <main class="container-wrapper mt-20 px-8 py-6">
      <slot />
    </main>

    <div
      class="absolute pointer-events-none -z-10 blur-[60px] bg-linear-to-tr from-secondary to-primary rounded-full w-[20rem] h-40 transition-all duration-1000 inset-x-0 mx-auto -bottom-30 hidden sm:block"
    />
  </div>
</template>
