<script setup lang="ts">

import Footer from '../components/Footer.vue'

import Computer from '../components/Computer';

</script>

<template>
  <div class="px-8 mx-auto max-w-7xl md:mt-32 mb-10">
    <div class="flex mx-auto w-full justify-center flex-col md:flex-row md:gap-6">
      <div class="flex justify-center">
        <Computer></Computer>
      </div>
      <div class="text-center md:text-left">
        <h1 class="font-bold leading-tight text-white text-4xl md:text-6xl">Hello</h1>
        <p
          class="pt-2 max-w-xl text-lg md:text-xl tracking-wide leading-relaxed text-gray-300 mx-auto"
        >
          My name is
          <b>Franek</b> I'm a 16 year old software engineer from Poland.
        </p>
        <div class="mt-7">
          <router-link to="/blog">
            <Button>My blog</Button>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>
