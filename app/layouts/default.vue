<template>
  <div class="flex min-h-dvh flex-col print:min-h-0">
    <AppHeader />
    <main class="mx-auto w-full max-w-[65ch] flex-1 px-5 py-10 sm:px-6 sm:py-14 print:max-w-none print:p-0">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
