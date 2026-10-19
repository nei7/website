<script setup lang="ts">
import type { PostComment } from "#shared/types/comments";

const props = defineProps<{
  comment: PostComment;
  slug: string;
  canReply?: boolean;
}>();

const emit = defineEmits<{
  reply: [id: string];
  changed: [];
}>();

const editing = ref(false);
const deleting = ref(false);
const error = ref<string | null>(null);

const displayName = computed(() => props.comment.author?.name || props.comment.author?.login || "");
const avatar = computed(() => avatarUrl(props.comment.author?.avatar, 64));

const actionClass = "cursor-pointer transition-colors hover:text-foreground disabled:opacity-50";

async function remove() {
  if (!window.confirm("Delete this comment?")) return;
  deleting.value = true;
  error.value = null;
  try {
    await $fetch(`/api/comments/${props.comment.id}`, { method: "DELETE" });
    emit("changed");
  } catch (e) {
    error.value = fetchErrorMessage(e);
  } finally {
    deleting.value = false;
  }
}

function onEdited() {
  editing.value = false;
  emit("changed");
}
</script>

<template>
  <article :id="`comment-${comment.id}`" class="flex gap-3">
    <div class="mt-0.5 size-8 shrink-0 overflow-hidden rounded-full bg-muted">
      <img
        v-if="avatar"
        :src="avatar"
        alt=""
        width="32"
        height="32"
        loading="lazy"
        decoding="async"
        referrerpolicy="no-referrer"
        class="size-full object-cover"
      >
    </div>

    <div class="min-w-0 flex-1">
      <p v-if="comment.deleted" class="py-1 text-sm text-muted-foreground italic">
        This comment was deleted.
      </p>

      <template v-else>
        <header class="flex flex-wrap items-baseline gap-x-2 font-mono text-xs text-muted-foreground">
          <span class="font-sans text-sm font-medium text-foreground">{{ displayName }}</span>
          <span
            v-if="comment.author?.owner"
            class="rounded-sm border border-border px-1 py-px text-[0.625rem] tracking-wider uppercase"
          >
            author
          </span>
          <time :datetime="comment.createdAt">{{ formatShortDate(comment.createdAt) }}</time>
          <span v-if="comment.updatedAt">· edited</span>
        </header>

        <CommentForm
          v-if="editing"
          class="mt-2"
          :slug="slug"
          :comment="comment"
          autofocus
          @saved="onEdited"
          @cancel="editing = false"
        />
        <p v-else class="mt-1 text-sm leading-relaxed break-words whitespace-pre-wrap">
          {{ comment.body }}
        </p>

        <p v-if="!editing" class="mt-2 flex flex-wrap gap-x-3 font-mono text-xs text-muted-foreground">
          <button v-if="canReply" type="button" :class="actionClass" @click="emit('reply', comment.id)">
            Reply
          </button>
          <button v-if="comment.canEdit" type="button" :class="actionClass" @click="editing = true">
            Edit
          </button>
          <button
            v-if="comment.canDelete"
            type="button"
            :class="actionClass"
            :disabled="deleting"
            @click="remove"
          >
            Delete
          </button>
          <span v-if="error" class="text-accent" role="alert">{{ error }}</span>
        </p>
      </template>
    </div>
  </article>
</template>
