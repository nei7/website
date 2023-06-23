<script setup lang="ts">
const { postId } = defineProps<{
  postId: string;
}>();

const apiUrl = "/api/reaction/" + postId;

const thumbupCount = ref(0),
  heartCount = ref(0),
  skullCount = ref(0);

onBeforeMount(async () => {
  const { data } = await $fetch<any>(apiUrl);

  const { thumbup_count, heart_count, skull_count } = data;

  thumbupCount.value = thumbup_count;
  heartCount.value = heart_count;
  skullCount.value = skull_count;
});

const onReactionClick = async (reaction: "skull" | "heart" | "thumbup") => {
  const { status } = await $fetch<any>(apiUrl, {
    method: "POST",
    body: {
      reaction,
      postId,
    },
  });

  if (status !== 201 && status !== 204) return;

  switch (reaction) {
    case "heart":
      heartCount.value++;
      break;
    case "skull":
      skullCount.value++;
      break;
    case "thumbup":
      thumbupCount.value++;
      break;
  }
};
</script>

<template>
  <div class="flex gap-4">
    <div
      class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
      @click="onReactionClick('thumbup')"
    >
      👍 {{ thumbupCount }}
    </div>
    <div
      class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
      @click="onReactionClick('heart')"
    >
      ❤️ {{ heartCount }}
    </div>
    <div
      class="sm:py-4 sm:px-6 py-3 px-5 bg-[#f8fafc] border rounded-3xl cursor-pointer"
      @click="onReactionClick('skull')"
    >
      💀 {{ skullCount }}
    </div>
  </div>
</template>
