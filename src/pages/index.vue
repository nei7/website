<template>
  <div class="py-10 px-8 mx-auto max-w-7xl">
    <div class>
      <h1
        class="mb-10 pt-10 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl text-center"
      >Hello</h1>
      <p class="pt-2 max-w-4xl text-xl tracking-wide leading-relaxed text-gray-300 mx-auto">
        My name is
        <b>Franek</b>. I'm a 16 year old software engineer from poland.
        I have experience building and maintaining fullstack applications in go, vue, typescript, javascript
      </p>
      <p class="pt-4 max-w-4xl text-xl tracking-wide leading-relaxed text-gray-300 mx-auto">
        I really hate polish education system therefore I created
        <a
          href="https://quizit.online"
          class="font-bold"
        >quizit.online</a> - which is my biggest and most succeed project for now
      </p>

      <p
        class="pt-4 max-w-4xl text-xl tracking-wide leading-relaxed text-gray-300 mx-auto"
      >Besides programming, I like listen music, working out, playing video games and chess</p>
    </div>
    <div class="relative py-16 px-8 mx-auto max-w-5xl mt-20">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center md:gap-x-10">
        <span
          class="font-semibold tracking-wider text-white uppercase whitespace-nowrap"
        >My social media</span>
        <div
          class="flex flex-wrap gap-y-4 gap-x-14 items-center pt-6 -mx-2 lg:flex-nowrap md:pt-0 md:mx-0"
        >
          <a href="https://discord.com/channels/@me/624981292865552435" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'discord']"
              class="w-auto h-7 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
          <a href="https://github.com/nei7" target="_blank">
            <font-awesome-icon
              :icon="['fab', 'github']"
              class="w-auto h-7 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
          <a href="mailto:franciszek.szarek2@gmail.com" target="_blank">
            <font-awesome-icon
              :icon="['fas', 'at']"
              class="w-auto h-7 text-gray-400 transition cursor-pointer fill-current hover:text-white"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
