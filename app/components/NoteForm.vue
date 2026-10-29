<script setup lang="ts">
import type { CreateNoteInput, CreatedNote } from "#shared/types/notes";

const props = withDefaults(
  defineProps<{
    /** Existing tag names, offered as one-click additions. */
    suggestions?: string[];
  }>(),
  { suggestions: () => [] }
);

const emit = defineEmits<{
  created: [note: CreatedNote];
}>();

const title = ref("");
const body = ref("");
const tags = ref("");
const pending = ref(false);
const error = ref<string | null>(null);

const canSubmit = computed(
  () =>
    !pending.value &&
    title.value.trim().length > 0 &&
    title.value.length <= NOTE_TITLE_MAX_LENGTH &&
    body.value.trim().length > 0 &&
    body.value.length <= NOTE_MAX_LENGTH
);

const chosenTags = computed(() => parseTagList(tags.value).map((tag) => tag.toLowerCase()));
const unusedSuggestions = computed(() =>
  props.suggestions.filter((tag) => !chosenTags.value.includes(tag.toLowerCase()))
);

function addTag(tag: string) {
  const current = parseTagList(tags.value);
  tags.value = [...current, tag].join(", ");
}

async function submit() {
  if (!canSubmit.value) return;
  pending.value = true;
  error.value = null;

  try {
    const note = await $fetch<CreatedNote>("/api/notes", {
      method: "POST",
      body: { title: title.value, body: body.value, tags: tags.value } satisfies CreateNoteInput,
    });
    title.value = "";
    body.value = "";
    tags.value = "";
    emit("created", note);
  } catch (e) {
    error.value = fetchErrorMessage(e, "Could not save the note, please try again.");
  } finally {
    pending.value = false;
  }
}

const onEnter = (event: KeyboardEvent) => {
  if (event.ctrlKey || event.metaKey) submit();
};

const fieldClass =
  "w-full rounded-sm border border-border bg-transparent px-3 py-2 text-sm leading-relaxed transition-colors placeholder:text-muted-foreground focus:border-foreground focus:outline-none disabled:opacity-60";
</script>

<template>
  <form class="space-y-3" @submit.prevent="submit">
    <slot name="header" />

    <input
      v-model="title"
      type="text"
      :maxlength="NOTE_TITLE_MAX_LENGTH"
      placeholder="Title"
      aria-label="Title"
      :disabled="pending"
      :class="fieldClass"
      @keydown.enter.prevent="onEnter"
    >

    <textarea
      v-model="body"
      rows="5"
      :maxlength="NOTE_MAX_LENGTH"
      placeholder="Write a note… a blank line starts a new paragraph"
      aria-label="Note"
      :disabled="pending"
      :class="[fieldClass, 'resize-y']"
      @keydown.enter="onEnter"
    />

    <input
      v-model="tags"
      type="text"
      placeholder="Tags, comma-separated"
      aria-label="Tags"
      :disabled="pending"
      :class="fieldClass"
      @keydown.enter.prevent="onEnter"
    >

    <p
      v-if="unusedSuggestions.length"
      class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground"
    >
      <button
        v-for="tag in unusedSuggestions"
        :key="tag"
        type="button"
        class="cursor-pointer transition-colors hover:text-foreground"
        :disabled="pending"
        @click="addTag(tag)"
      >
        + {{ tag }}
      </button>
    </p>

    <div class="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-muted-foreground">
      <p v-if="error" class="text-accent" role="alert">{{ error }}</p>
      <p v-else class="tabular-nums">{{ body.length }} / {{ NOTE_MAX_LENGTH }}</p>

      <button
        type="submit"
        :disabled="!canSubmit"
        class="cursor-pointer rounded-sm border border-foreground bg-foreground px-3 py-1.5 text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {{ pending ? "Saving…" : "Add note" }}
      </button>
    </div>
  </form>
</template>
