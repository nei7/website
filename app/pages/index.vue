<script setup lang="ts">
import Button from "~/components/ui/button/Button.vue";
import { ArrowRight } from "lucide-vue-next";

// definePageMeta({
//   layout: "home",
// });
</script>

<template>
  <div class="prose dark:prose-invert w-full">
    <h1>Franciszek Szarek</h1>
    <p>
      Hi, I'm Franek, a Computer Science student from Poland driven by a passion
      for problem solving and continuous learning. I love applying new concepts
      to real-world projects. You can see my work
      <a href="">here</a>.
    </p>

    <p>
      Besides programming, I am passionate about music and play the guitar. I
      also go to the gym regularly.
    </p>

    <br />

    <NuxtLink to="/blog">
      <Button class="cursor-pointer">Read my blog<ArrowRight /></Button>
    </NuxtLink>
    <SpotifyStatus class="mt-14 not-prose" />
  </div>
</template>
