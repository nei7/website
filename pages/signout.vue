<script setup lang="ts">
const supabase = useSupabaseClient();

supabase.auth.signOut();
</script>

<template></template>
