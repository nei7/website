<script setup lang="ts">
const router = useRouter();

const supabase = useSupabaseClient();

const signOut = () => {
  supabase.auth.signOut();

  router.push("/");
};
</script>

<template>
  <div class="pt-96 w-full flex items-center justify-center flex-col">
    <h1 class="text-3xl font-bold mb-6">Are you sure you want to sign out?</h1>

    <Button class="mx-auto w-max" @click="signOut">Yes, sign out</Button>
  </div>
</template>
