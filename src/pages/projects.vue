<template>
  <main class="w-full max-w-2xl mt-10 mx-auto px-4 sm:p-0">
    <section class="text-justify sm:text-left">
      <h1 class="mb-5 sm:mb-2">Projects</h1>
      <p>a list of my projects that I find quite useful or interesting</p>
    </section>

    <section>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card>
          <header>
            <h5 class="m-0">pv</h5>
            <p class="m-0 text-sm">eee</p>
          </header>
          <footer class="mt-5">
            <div class="flex items-center text-white text-xs gap-x-2">
              <span class="w-3 h-3 rounded-full bg-[#dea584]"></span>
              Rust
            </div>
          </footer>
        </Card>
        <Card>
          <header>
            <h5 class="m-0">gterm</h5>
            <p class="m-0 text-sm">eewdwdw</p>
          </header>
          <footer class="mt-5">
            <div class="flex items-center text-white text-xs gap-x-2">
              <span class="w-3 h-3 rounded-full bg-[#00ADD8]"></span>
              Go
            </div>
          </footer>
        </Card>
      </div>
    </section>
  </main>
</template>
