<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/outline";
import SpotifyStatus from "~/components/SpotifyStatus.vue";
import usePosts from "../composables/usePosts";

const dob = new Date("2005-06-22").getTime();

const calculateAge = (): number => {
  const diff = Date.now() - dob;

  return diff / 31557600000;
};

const age = calculateAge().toFixed(3);

const { data: posts } = await usePosts();
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
        <Button class="flex items-center mx-auto" transparent href="/posts">
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
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10"
        v-if="posts"
      >
        <Post v-for="post in posts.slice(0, 3)" :post="post" />
      </div>
    </section>
    <section class="mt-32 mb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <SpotifyStatus></SpotifyStatus>
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
