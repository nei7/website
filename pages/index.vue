<script setup lang="ts">
import { ArrowRightIcon } from "@heroicons/vue/24/outline";

useCustomHead("Nei's place");

const dob = new Date("2005-06-22").getTime();

const calculateAge = (): number => {
  const diff = Date.now() - dob;

  return diff / 31557600000;
};

const age = calculateAge().toFixed(3);

const { data } = await usePosts();

const posts = computed(() => data.value.posts.slice(0, 3));
</script>

<template>
  <div>
    <Cursor />
    <main class="relative isolate mx-auto sm:pt-20 max-w-6xl px-4 xs:px-0">
      <GradientTop />
      <section class="text-left">
        <div class="mt-32">
          <h1 class="font-bold text-4xl sm:text-6xl">Hi. I'm franek 👋</h1>

          <p
            class="leading-8 sm:leading-10 sm:text-xl text-justify sm:text-left mt-10 text-slate-600"
          >
            I'm high school student in Poland. I'm
            <span class="underline decoration-wavy font-semibold">
              {{ age }}</span
            >
            years old. My main interest is programming; I'am passionate about
            gaining knowledge and solving new problems while working on new
            projects. I mainly use rust, go, typescript and vue js. When I'm not
            online I enjoy reading books, working out at the gym, running and
            listening to music.
          </p>
        </div>
        <div class="mt-14 flex w-max">
          <Button class="flex items-center mx-auto">
            Get in touch
            <ArrowRightIcon class="w-4 h-4 ml-2"></ArrowRightIcon>
          </Button>
          <Button
            class="flex items-center mx-auto"
            href="/posts"
            color="bg-transparent"
          >
            Read my blog
            <ArrowRightIcon class="w-4 h-4 ml-2"></ArrowRightIcon>
          </Button>
        </div>
      </section>

      <section class="mt-44">
        <h1 class="text-4xl font-bold">Blog posts 📝</h1>
        <p class="sm:text-xl text-slate-600 mt-7">
          I love to share my knowledge through writing. Check some of my new
          posts:
        </p>
        <div
          v-if="data"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10"
        >
          <Post v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </section>

      <Footer class="my-32"></Footer>
      <GradientBottom />
    </main>
  </div>
</template>
