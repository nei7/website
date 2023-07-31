<script setup lang="ts">
import { AuthError, Provider } from "@supabase/supabase-js";

useCustomHead(
  "Log in",
  "Log in to get the ability to comment, add reactions and more"
);

const isLoading = ref(false);
const errorMessage = ref<undefined | string>();
const alertType = ref<"danger" | "warning" | "info">("danger");

const supabase = useSupabaseAuthClient();
const user = useSupabaseUser();

const router = useRouter();

const showAlert = (authError: AuthError) => {
  errorMessage.value = authError.message;

  if (authError.message === "Email not confirmed") alertType.value = "info";
  else alertType.value = "danger";
};

const state = reactive({
  password: "",
  email: ""
});

const handleSignIn = async (provider: Provider | "email") => {
  isLoading.value = true;
  try {
    if (provider === "email") {
      const { error } = await supabase.auth.signUp(state);
      if (error) return showAlert(error);

      const data = await supabase.auth.signInWithPassword(state);
      if (data.error) return showAlert(data.error);

      router.push("/");
      return;
    }

    if (!user.value) {
      await supabase.auth.signInWithOAuth({
        provider
      });
    }
  } catch (err) {
    if (err instanceof AuthError) showAlert(err);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mt-32 sm:mt-48">
    <Alert v-if="errorMessage" :type="alertType" class="mb-10">
      <span class="font-medium">{{ errorMessage }}</span>
    </Alert>
    <form novalidate @submit.prevent="handleSignIn('email')">
      <div class="bg-white sn:px-20 sm:p-10 p-6 py-16 rounded-xl pb-14">
        <div class="mb-10 text-center">
          <h1 class="font-bold text-4xl">Welcome</h1>
          <p class="mt-2 text-slate-600">
            Log in to get the ability to comment, add reactions and more!
          </p>
        </div>

        <div class="flex flex-col gap-y-6">
          <Button
            type="button"
            size="sm"
            color="text-white bg-gray-700 hover:bg-gray-800 rounded-lg"
            @click="handleSignIn('github')"
          >
            <img
              src="~/assets/icons/github.svg"
              class="w-5 h-5 mr-4"
              alt="github icon"
            />
            Sign in with Github
          </Button>

          <Button
            type="button"
            size="sm"
            color="bg-transparent hover:bg-gray-50 border rounded-lg shadow-sm text-slate-700"
            @click="handleSignIn('discord')"
          >
            <img
              src="~/assets/icons/discord.svg"
              class="w-5 h-5 mr-4"
              alt="discord icon"
            />
            Sign in with Discord
          </Button>
        </div>

        <div
          class="my-10 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"
        >
          <p class="mx-4">Or</p>
        </div>

        <div class="mt-5">
          <label for="email" class="text-slate-800"> Email </label>
          <Input
            id="email"
            v-model="state.email"
            placeholder="Enter an email..."
            size="lg"
            type="email"
            class="mt-2"
          />
          <span> </span>
        </div>

        <div class="mt-5">
          <label for="password" class="text-slate-800"> Password </label>
          <Input
            id="password"
            v-model="state.password"
            placeholder="Enter a password..."
            size="lg"
            type="password"
            class="mt-2"
          />
        </div>

        <div class="my-10">
          <Button
            size="sm"
            class="w-full rounded-lg"
            type="submit"
            :loading="isLoading"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  </div>
</template>
