<template>
  <footer class="w-full mt-20 mb-10">
    <hr class="w-full border-1 border-gray-800 mb-8" />
    <spotify-status></spotify-status>

    <div
      class="w-full max-w-2xl sm:px-0 px-4 grid grid-cols-1 gap-10 sm:gap-4 pb-16 sm:grid-cols-3"
    >
      <div class="flex flex-col space-y-4">
        <a class="text-gray-400 hover:text-gray-500 transition" href="/">
          Home
        </a>
        <a class="text-gray-400 hover:text-gray-500 transition" href="/posts">
          Posts
        </a>
        <a
          class="text-gray-400 hover:text-gray-500 transition"
          href="/newsletter"
        >
          Newsletter
        </a>
      </div>
      <div class="flex flex-col space-y-4">
        <a
          class="text-gray-400 hover:text-gray-500 transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/channel/UCKaAxw9LPGSgmOWOsI2fe4w"
          >Youtube</a
        ><a
          class="text-gray-400 hover:text-gray-500 transition"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nei7"
          >GitHub</a
        ><a
          class="text-gray-400 hover:text-gray-500 transition"
          target="_blank"
          rel="noopener noreferrer"
          href=""
          >Discord</a
        >
      </div>
      <div class="flex flex-col space-y-4">
        <router-link
          class="text-gray-400 hover:text-gray-500 transition"
          to="/uses"
        >
          Uses
        </router-link>
        <a
          class="text-gray-400 hover:text-gray-500 transition"
          target="_blank"
          href="https://github.com/nei7/dotfiles"
          >Configs</a
        >
      </div>
    </div>
  </footer>
</template>
