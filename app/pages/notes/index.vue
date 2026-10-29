<script setup lang="ts">
import type { NotesFeed } from "#shared/types/notes";

const route = useRoute();
const { fetch: refreshSession } = useUserSession();

const activeTag = computed(() =>
  typeof route.query.tag === "string" && route.query.tag ? route.query.tag : undefined
);

const { data, refresh } = await useFetch<NotesFeed>("/api/notes", { key: "notes-feed" });

const notes = computed(() => {
  const items = data.value?.notes ?? [];
  return activeTag.value ? items.filter((note) => note.tags.includes(activeTag.value!)) : items;
});

const tagNames = computed(() => data.value?.tags.map((tag) => tag.name) ?? []);

const loginFailed = computed(() => route.query.login === "failed");
const loginHref = `/auth/github?redirect=${encodeURIComponent("/notes")}`;
const isDev = import.meta.dev;

async function devSignIn() {
  const login = window.prompt("Sign in locally as (GitHub login)", "nei7");
  if (!login) return;
  await $fetch("/api/_dev/login", { method: "POST", body: { login } });
  await refreshSession();
}

usePageSeo({
  title: "Notes",
  description: "Short notes, newest first.",
  path: "/notes",
});
</script>

<template>
  <div>
    <h1 class="font-serif text-3xl tracking-tight">Notes</h1>

    <!-- The form is for the owner only; the API checks again, this just hides it from everyone else. -->
    <AuthState>
      <template #default="{ user, clear }">
        <NoteForm v-if="user?.owner" class="mt-8" :suggestions="tagNames" @created="() => refresh()">
          <template #header>
            <p class="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
              <span>
                Adding as <span class="text-foreground">{{ user.name || user.login }}</span>
              </span>
              <span>·</span>
              <button
                type="button"
                class="cursor-pointer transition-colors hover:text-foreground"
                @click="clear()"
              >
                Sign out
              </button>
            </p>
          </template>
        </NoteForm>
      </template>
    </AuthState>

    <TagFilter
      v-if="data?.tags.length"
      class="mt-8"
      :tags="data.tags"
      :active="activeTag"
      :total="data.total"
      path="/notes"
    />

    <div v-if="notes.length" class="mt-10 space-y-14">
      <NoteCard v-for="note in notes" :key="note.id" :note="note" />
    </div>
    <p v-else class="mt-10 font-mono text-xs text-muted-foreground">
      Nothing here yet.
    </p>

    <AuthState>
      <template #default="{ loggedIn }">
        <div v-if="!loggedIn" class="mt-16 font-mono text-xs text-muted-foreground">
          <p class="flex flex-wrap gap-x-2">
            <span>Notes are added by the site owner.</span>
            <span>·</span>
            <a :href="loginHref" class="transition-colors hover:text-foreground">Sign in</a>
            <template v-if="isDev">
              <span>·</span>
              <button
                type="button"
                class="cursor-pointer transition-colors hover:text-foreground"
                @click="devSignIn"
              >
                Dev sign-in
              </button>
            </template>
          </p>
          <p v-if="loginFailed" class="mt-2 text-accent" role="alert">
            Sign-in failed, please try again.
          </p>
        </div>
      </template>
    </AuthState>
  </div>
</template>
