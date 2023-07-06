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
          class="text-xl leading-9 text-justify sm:text-left mt-10 text-slate-600"
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
      <p class="text-xl text-slate-600 mt-7">
        I love to share my knowledge through writing. Check some of my new
        posts:
      </p>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10"
        v-if="data"
      >
        <Post v-for="post in posts" :post="post" />
      </div>
    </section>
    <!-- <section class="mt-32 mb-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
       
        <Card>
          <h3 class="font-bold text-2xl flex items-center gap-x-3">
            <img src="../assets/icons/vscode.svg" class="w-5 h-5" />
            Visual studio code
          </h3>
          <p class="mt-4">Offline</p>
        </Card>
      </div>
    </section> -->
    <Footer class="my-32"></Footer>
    <GradientBottom />
  </main>
</template>
