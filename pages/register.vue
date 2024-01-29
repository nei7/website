<script setup lang="ts">
import type { AlertType } from "~/components/Alert.vue";

useCustomHead("Log in", "Log in to get the ability to comment, add reactions and more");

const isLoading = ref(false);

const alert = reactive<{ type: AlertType; message: string }>({
  type: "danger",
  message: ""
});

const router = useRouter();

const state = reactive({
  password: "",
  email: "",
  username: ""
});

const handleSignUp = async () => {
  isLoading.value = true;
  try {
    await $fetch("/api/auth/signup", { body: state, method: "POST" });

    router.push("/");
  } catch (err) {
    alert.message = (err as any).data.message;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto pt-48 2xl:pt-32">
    <Alert v-if="alert.message" :type="alert.type">
      <span class="font-medium">{{ alert.message }}</span>
    </Alert>
    <div class="bg-white sn:px-20 sm:p-10 p-6 rounded-xl pb-14 border">
      <div class="my-10 text-center">
        <h1 class="font-bold text-5xl">Register</h1>
      </div>

      <div class="flex flex-col gap-y-6">
        <Button
          href="https://github.com/login/oauth/authorize?client_id=683946d47c799d190f58&redirect_uri=https://fszarek.me/api/auth/github&scope=read:user,user:email"
          type="button"
          size="sm"
          color="text-white bg-gray-700 hover:bg-gray-800 rounded-lg"
        >
          <img src="~/assets/icons/github.svg" class="w-5 h-5 mr-4" alt="github icon" />
          Sign up with Github
        </Button>
        <Button type="button" size="sm" color="bg-transparent hover:bg-gray-50 border rounded-lg shadow-sm text-slate-700">
          <img src="~/assets/icons/discord.svg" class="w-5 h-5 mr-4" alt="discord icon" />
          Sign up with Discord
        </Button>
      </div>

      <div
        class="my-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
      >
        <p class="mx-4">Or</p>
      </div>
      <form @submit.prevent="handleSignUp()">
        <FormField required label="Username">
          <FormInput v-model="state.username" placeholder="Enter an username..." size="lg" type="text" class="mt-2" />
        </FormField>

        <FormField required label="Email">
          <FormInput v-model="state.email" placeholder="Enter an email..." size="lg" type="email" class="mt-2" />
        </FormField>

        <FormField required label="Password">
          <FormInput v-model="state.password" placeholder="Enter a password..." size="lg" type="password" class="mt-2" />
        </FormField>

        <div class="my-10">
          <Button size="sm" class="w-full rounded-lg" type="submit" :loading="isLoading"> Sign up </Button>
        </div>
      </form>
    </div>
  </div>
</template>
