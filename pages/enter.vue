<script setup lang="ts">
import { Provider } from "@supabase/supabase-js";

useCustomHead(
  "Log in",
  "Log in to get the ability to comment, add reactions and more"
);

const errorMessage = ref("");
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const email = ref("");
const password = ref("");

const buttonDisabled = ref(true);

const router = useRouter();

watchEffect(() => {
  if (email.value.trim().length > 0 && password.value.trim().length > 0) {
    buttonDisabled.value = false;
  }
});

const handleSignIn = async (provider: Provider | "email") => {
  try {
    if (provider === "email") {
      const { error } = await supabase.auth.signUp({
        email: email.value,
        password: password.value,
      });

      if (error) {
        errorMessage.value = error.message;
        return;
      }

      const data = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
      });

      if (data.error) {
        errorMessage.value = data.error.message;

        return;
      }

      router.push("/");
      return;
    }

    if (!user.value) {
      await supabase.auth.signInWithOAuth({
        provider,
      });
    }
  } catch (err) {
    console.log({ err });
  }
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mt-32 sm:mt-48">
    <Alert type="danger" v-if="errorMessage">
      <span class="font-medium">Error</span> {{ errorMessage }}
    </Alert>

    <div class="bg-white sn:px-20 sm:p-10 p-6 py-16 rounded-xl pb-14">
      <div class="mb-10 text-center">
        <h1 class="font-bold text-4xl">Welcome</h1>
        <p class="mt-2 text-slate-600">
          Log in to get the ability to comment, add reactions and more!
        </p>
      </div>

      <div class="flex flex-col gap-y-6">
        <Button
          size="sm"
          @click="handleSignIn('github')"
          color="text-white bg-gray-700 hover:bg-gray-800 rounded-lg"
        >
          <img
            src="~/assets/icons/github.svg"
            class="w-5 h-5 mr-4"
            alt="github icon"
          />
          Sign in with Github
        </Button>

        <Button
          size="sm"
          @click="handleSignIn('discord')"
          color="bg-transparent hover:bg-gray-50 border rounded-lg shadow-sm text-slate-700"
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

      <div>
        <div>
          <label for="" class="text-slate-800"> Email </label>
          <Input
            placeholder=""
            size="lg"
            type="email"
            class="mt-2"
            v-model="email"
          />
        </div>

        <div class="mt-5">
          <label for="" class="text-slate-800"> Password </label>
          <Input
            placeholder=""
            size="lg"
            type="password"
            class="mt-2"
            v-model="password"
          />
        </div>

        <div class="my-10">
          <Button
            :disabled="buttonDisabled"
            size="sm"
            class="w-full rounded-lg"
            @click="handleSignIn('email')"
            >Log in</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>
