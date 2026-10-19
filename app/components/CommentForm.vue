<script setup lang="ts">
import type { PostComment } from "#shared/types/comments";

const props = withDefaults(
  defineProps<{
    slug: string;
    /** Root comment to reply to. */
    parentId?: string | null;
    /** Existing comment to edit instead of creating a new one. */
    comment?: PostComment | null;
    autofocus?: boolean;
  }>(),
  { parentId: null, comment: null, autofocus: false }
);

const emit = defineEmits<{
  saved: [comment: PostComment];
  cancel: [];
}>();

const body = ref(props.comment?.body ?? "");
const pending = ref(false);
const error = ref<string | null>(null);
const textarea = useTemplateRef<HTMLTextAreaElement>("textarea");

const isEdit = computed(() => Boolean(props.comment));
const isReply = computed(() => Boolean(props.parentId));
const canSubmit = computed(
  () => !pending.value && body.value.trim().length > 0 && body.value.length <= COMMENT_MAX_LENGTH
);
const label = computed(() => (isEdit.value ? "Save" : isReply.value ? "Reply" : "Post comment"));

onMounted(() => {
  if (props.autofocus) textarea.value?.focus();
});

async function submit() {
  if (!canSubmit.value) return;
  pending.value = true;
  error.value = null;

  try {
    const saved = props.comment
      ? await $fetch<PostComment>(`/api/comments/${props.comment.id}`, {
          method: "PATCH",
          body: { body: body.value },
        })
      : await $fetch<PostComment>("/api/comments", {
          method: "POST",
          body: { post: props.slug, parentId: props.parentId, body: body.value },
        });
    body.value = "";
    emit("saved", saved);
  } catch (e) {
    error.value = fetchErrorMessage(e);
  } finally {
    pending.value = false;
  }
}

const onEnter = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) submit();
};
</script>

<template>
  <form class="space-y-3" @submit.prevent="submit">
    <slot name="header" />

    <textarea
      ref="textarea"
      v-model="body"
      :rows="isReply || isEdit ? 3 : 4"
      :maxlength="COMMENT_MAX_LENGTH"
      :placeholder="isReply ? 'Write a reply…' : 'Write a comment…'"
      :disabled="pending"
      :aria-label="isReply ? 'Reply' : 'Comment'"
      class="w-full resize-y rounded-sm border border-border bg-transparent px-3 py-2 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:opacity-60"
      @keydown.enter="onEnter"
    />

    <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
      <p v-if="error" class="text-accent" role="alert">{{ error }}</p>
      <p v-else class="tabular-nums">{{ body.length }} / {{ COMMENT_MAX_LENGTH }}</p>

      <div class="flex gap-2">
        <button
          v-if="isReply || isEdit"
          type="button"
          class="cursor-pointer rounded-sm border border-border px-3 py-1.5 transition-colors hover:border-foreground hover:text-foreground"
          @click="emit('cancel')"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="!canSubmit"
          class="cursor-pointer rounded-sm border border-foreground bg-foreground px-3 py-1.5 text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {{ pending ? "Sending…" : label }}
        </button>
      </div>
    </div>
  </form>
</template>
