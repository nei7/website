<script setup lang="ts">
import { AuthError, Provider } from "@supabase/supabase-js";

useCustomHead(
  "Log in",
  "Log in to get the ability to comment, add reactions and more"
);

const error = ref<null | string>(null);
const alertType = ref<"danger" | "warning" | "info">("danger");

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const router = useRouter();

const onError = (authError: AuthError) => {
  console.log(authError);

  error.value = authError.message;
};

const handleSignIn = async (
  provider: Provider | "email",
  credentials: { email: string; password: string }
) => {
  try {
    if (provider === "email") {
      const { error } = await supabase.auth.signUp(credentials);
      if (error) return onError(error);

      const data = await supabase.auth.signInWithPassword(credentials);
      if (data.error) return onError(data.error);

      router.push("/");
      return;
    }

    if (!user.value) {
      await supabase.auth.signInWithOAuth({
        provider,
      });
    }
  } catch (err) {
    if (err instanceof AuthError) onError(err);
  }
};

const onUpdate = () => {
  console.log("kd");
};
</script>

<template>
  <div class="w-full max-w-2xl mx-auto mt-32 sm:mt-48">
    <Form
      v-slot:default="props"
      class="bg-white sn:px-20 sm:p-10 p-6 py-16 rounded-xl pb-14"
    >
      <div class="mb-10 text-center">
        <h1 class="font-bold text-4xl">Welcome</h1>
        <p class="mt-2 text-slate-600">
          Log in to get the ability to comment, add reactions and more!
        </p>
      </div>

      <div class="flex flex-col gap-y-6">
        <Button
          size="sm"
          @click="handleSignIn('github', props.data)"
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
          @click="handleSignIn('discord', props.data)"
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

      <div class="mt-5">
        <label for="email" class="text-slate-800"> Email </label>
        <Input
          id="email"
          placeholder="Enter an email..."
          size="lg"
          type="email"
          class="mt-2"
          v-model="props.data.email"
        />
      </div>

      <div class="mt-5">
        <label for="password" class="text-slate-800"> Password </label>
        <Input
          id="password"
          placeholder="Enter a password..."
          size="lg"
          type="password"
          class="mt-2"
          v-model="props.data.password"
        />
      </div>
    </Form>
  </div>
</template>
