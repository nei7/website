<template>
  <div class="grid grid-cols-2 sm:justify-center justify-between lg:grid-cols-4 gap-y-10">
    <SpotifyStatus class="block w-full lg:w-96 mb-10 col-span-2"></SpotifyStatus>

    <ul class="pl-5 lg:p-0">
      <li class="font-medium sm:text-xl text-slate-900 mb-4">Links</li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <nuxt-link to="/posts">Blog</nuxt-link>
      </li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <nuxt-link to="/stats">Statistics</nuxt-link>
      </li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <nuxt-link to="/projects">Projects</nuxt-link>
      </li>
      <li v-if="user?.userId" class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <a class="cursor-pointer" @click.prevent="signOut">Log out</a>
      </li>
      <li v-else class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <nuxt-link to="/login">Log in</nuxt-link>
      </li>
    </ul>
    <ul class="pr-8 sm:p-0 text-right sm:text-left">
      <li class="font-medium sm:text-lg text-slate-900 mb-4">Contact</li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <a href="https://github.com/nei7" target="_blank" rel="noopener noreferrer">Github</a>
      </li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800">
        <a href="https://discord.com/users/624981292865552435" target="_blank" rel="noopener noreferrer"> Discord </a>
      </li>
      <li class="text-slate-600 sm:text-lg py-3 hover:text-slate-800" target="_blank" rel="noopener noreferrer">
        <a href="https://www.youtube.com/channel/UCKaAxw9LPGSgmOWOsI2fe4w"> Youtube </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useUser, { signOut } from "~/composables/useUser";

const { data: user } = useUser();
</script>
