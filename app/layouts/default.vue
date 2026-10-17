<template>
  <div class="flex min-h-dvh flex-col">
    <AppHeader />
    <main class="mx-auto w-full max-w-[65ch] flex-1 px-5 py-10 sm:px-6 sm:py-14">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
