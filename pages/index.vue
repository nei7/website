<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import usePosts from "../composables/usePosts";

const dob = new Date("2005-06-22").getTime();

const calculateAge = (): number => {
  const diff = Date.now() - dob;

  return diff / 31557600000;
};

const age = calculateAge().toFixed(3);

const { data: posts, pending, error } = await usePosts();
</script>

<template>
  <Cursor />
  <main
    class="relative isolate mx-auto pt-20 max-w-6xl px-4 xs:px-0"
    ref="scrollRef"
  >
    <GradientTop />
    <section class="text-left">
      <div class="mt-32">
        <h1 class="font-bold text-4xl sm:text-6xl">Hi. I'm franek 👋</h1>

        <p
          class="text-xl leading-9 text-justify sm:text-left mt-10 text-slate-700"
        >
          I'm high school student in Poland. I'm
          <span class="underline decoration-wavy font-semibold">
            {{ age }}</span
          >
          years old. My main interest is programming; I'am passionate about
          gaining knowledge and solving new problems while working on new
          projects. I know rust, go, typescript and vue. When I'm not online I
          enjoy reading books, working out at the gym, running and listening to
          music.
        </p>
      </div>
      <div class="mt-14 flex w-max">
        <Button class="flex items-center mx-auto">
          Get in touch
          <ArrowRightIcon class="w-4 h-4 ml-2"></ArrowRightIcon>
        </Button>
        <Button class="flex items-center mx-auto" transparent>
          Read my blog
          <ArrowRightIcon class="w-4 h-4 ml-2"></ArrowRightIcon>
        </Button>
      </div>
    </section>

    <section class="mt-44">
      <h1 class="text-4xl font-bold">Blog posts 📝</h1>
      <p class="text-xl text-slate-700 mt-7">
        I love to share my knowledge through writing. Check some of my new
        posts:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10">
        <Post v-for="post in posts.slice(0, 3)" :post="post" />
      </div>
    </section>
    <section class="mt-32 mb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Card>
          <h3 class="font-bold text-2xl flex items-center gap-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 168 168"
            >
              <path
                fill="#1ED760"
                d="m83.996 0.277c-46.249 0-83.743 37.493-83.743 83.742 0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l0.001-0.004zm38.404 120.78c-1.5 2.46-4.72 3.24-7.18 1.73-19.662-12.01-44.414-14.73-73.564-8.07-2.809 0.64-5.609-1.12-6.249-3.93-0.643-2.81 1.11-5.61 3.926-6.25 31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-0.903-8.148-4.35-1.04-3.453 0.907-7.093 4.354-8.143 30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-0.001zm0.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219-1.254-4.14 1.08-8.513 5.221-9.771 29.581-8.98 78.756-7.245 109.83 11.202 3.73 2.209 4.95 7.016 2.74 10.733-2.2 3.722-7.02 4.949-10.73 2.739z"
              ></path>
            </svg>
            Spotify
          </h3>
          <p class="mt-4">Not playing</p>
        </Card>
        <Card>
          <h3 class="font-bold text-2xl flex items-center gap-x-3">
            <img src="../assets/icons/vscode.svg" class="w-5 h-5" />
            Visual studio code
          </h3>
          <p class="mt-4">Offline</p>
        </Card>
      </div>
    </section>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>
  </main>
</template>
