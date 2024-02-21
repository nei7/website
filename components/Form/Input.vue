<script setup lang="ts">
import Input from "../Input.vue";

const uid = inject("uid");
</script>

<template>
  <Input :id="uid" />
</template>
