<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/solid/";
</script>

<template>
  <main class="w-full max-w-2xl mt-10 mx-auto px-4 sm:p-0">
    <section class="text-justify sm:text-left">
      <h1 class="mb-5 sm:mb-2">Hello</h1>

      <p>
        My name is Franek. I'm high school student in Poland. My main interest
        is programming; I'am passionate about gaining knowledge and solving
        problems while working on new projects.
      </p>
      <p>
        I'm currently developing several small open source projects which you
        can find on my
        <AppLink to="https://github.com/nei7">github</AppLink> profile. Apart
        from that I run site that helps students cheat on online learning
        platforms: <AppLink to="https://quizit.online">quizit.online</AppLink>.
      </p>

      <p>
        When I'm not online I enjoy reading books, working out at the gym,
        running and listening to music.
      </p>
    </section>

    <section class="mt-10 mb-20">
      <router-link
        to="/posts"
        class="flex items-center mt-8 text-white leading-7 rounded-lg transition-all h-6 cursor-pointer"
      >
        Read my posts
        <ArrowLongRightIcon class="h-6 w-6 ml-1" />
      </router-link>
    </section>

    <Newsletter />
    <Footer />
  </main>
</template>
