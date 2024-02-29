<script setup lang="ts">
import { ExclamationCircleIcon } from "@heroicons/vue/24/outline";
import { CheckIcon } from "@heroicons/vue/24/solid";

useCustomHead("Sign up", "Sign up to get the ability to comment, add reactions and more");

const toast = useToast();

const isLoading = ref(false);

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

    toast.add({ icon: CheckIcon, iconClass: "w-6 h-6 text-green-600", text: "Account created successfully!", timeout: 6000 });

    router.push("/login");
  } catch (err) {
    toast.add({
      icon: ExclamationCircleIcon,
      iconClass: "w-6 h-6 text-red-600",
      text: (err as any)?.response._data?.message,
      timeout: 6000
    });
  } finally {
    isLoading.value = false;
    Object.assign(state, { password: "", email: "", username: "" });
  }
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto py-32 sm:pt-[13rem] px-3">
    <div>
      <div class="my-10 text-center">
        <h3 class="font-bold text-4xl">Create an account</h3>
      </div>

      <div class="flex flex-col gap-y-6">
        <Button
          href="https://github.com/login/oauth/authorize?client_id=683946d47c799d190f58&redirect_uri=https://fszarek.me/api/auth/github&scope=read:user,user:email"
          type="button"
          size="sm"
          color="bg-transparent hover:bg-gray-50 border border-gray-200"
        >
          <img src="~/assets/icons/github.svg" class="w-5 h-5 mr-4" alt="github icon" />
          Sign in with Github
        </Button>
        <Button type="button" size="sm" color="bg-transparent hover:bg-gray-50 border border-gray-200">
          <img src="~/assets/icons/discord.svg" class="w-5 h-5 mr-4" alt="discord icon" />
          Sign in with Discord
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
          <Button size="sm" class="w-full" type="submit" :loading="isLoading"> Sign up </Button>
        </div>
      </form>
    </div>
  </div>
</template>
