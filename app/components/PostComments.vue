<script setup lang="ts">
import type { CommentsResponse, CommentThread } from "#shared/types/comments";

const props = defineProps<{
  slug: string;
}>();

const route = useRoute();
const { loggedIn, fetch: refreshSession } = useUserSession();

const { data, refresh } = await useFetch<CommentsResponse>("/api/comments", {
  key: `comments:${props.slug}`,
  query: { post: props.slug },
});

const threads = computed<CommentThread[]>(() => {
  const all = data.value?.comments ?? [];
  const roots = new Map<string, CommentThread>();
  for (const comment of all) {
    if (!comment.parentId) roots.set(comment.id, { root: comment, replies: [] });
  }
  for (const comment of all) {
    if (comment.parentId) roots.get(comment.parentId)?.replies.push(comment);
  }
  return [...roots.values()];
});

const total = computed(() => data.value?.total ?? 0);
const replyingTo = ref<string | null>(null);

const loginFailed = computed(() => route.query.login === "failed");
const loginHref = computed(
  () => `/auth/github?redirect=${encodeURIComponent(`/blog/${props.slug}#comments`)}`
);

async function onSaved() {
  replyingTo.value = null;
  await refresh();
}

// Permissions in the payload depend on the viewer, so reload after a session change.
async function signOut(clear: () => Promise<void>) {
  await clear();
  await refresh();
}

const isDev = import.meta.dev;

async function devSignIn() {
  const login = window.prompt("Sign in locally as (GitHub login)", "dev");
  if (!login) return;
  await $fetch("/api/_dev/login", { method: "POST", body: { login } });
  await refreshSession();
  await refresh();
}

</script>

<template>
  <!-- Spaced like the homepage sections: the serif heading does the separating, not another rule. -->
  <section id="comments" class="mt-20 scroll-mt-24" aria-labelledby="comments-heading">
    <h2 id="comments-heading" class="font-serif text-2xl tracking-tight">
      Comments
      <span class="ml-1 font-mono text-xs text-muted-foreground tabular-nums">{{ total }}</span>
    </h2>

    <ol v-if="threads.length" class="mt-8 space-y-8">
      <li v-for="thread in threads" :key="thread.root.id">
        <CommentItem
          :comment="thread.root"
          :slug="slug"
          :can-reply="loggedIn"
          @reply="replyingTo = $event"
          @changed="refresh"
        />

        <ol v-if="thread.replies.length" class="mt-4 ml-11 space-y-4 border-l border-border pl-4">
          <li v-for="reply in thread.replies" :key="reply.id">
            <CommentItem
              :comment="reply"
              :slug="slug"
              :can-reply="loggedIn"
              @reply="replyingTo = thread.root.id"
              @changed="refresh"
            />
          </li>
        </ol>

        <CommentForm
          v-if="replyingTo === thread.root.id"
          class="mt-4 ml-11"
          :slug="slug"
          :parent-id="thread.root.id"
          autofocus
          @saved="onSaved"
          @cancel="replyingTo = null"
        />
      </li>
    </ol>
    <p v-else class="mt-6 text-sm text-muted-foreground">No comments yet.</p>

    <div class="mt-8">
      <AuthState>
        <template #default="{ loggedIn: signedIn, user, clear }">
          <CommentForm v-if="signedIn && user" :slug="slug" @saved="onSaved">
            <template #header>
              <p class="flex flex-wrap items-center gap-x-2 font-mono text-xs text-muted-foreground">
                <span>
                  Commenting as <span class="text-foreground">{{ user.name || user.login }}</span>
                </span>
                <span>·</span>
                <button
                  type="button"
                  class="cursor-pointer transition-colors hover:text-foreground"
                  @click="signOut(clear)"
                >
                  Sign out
                </button>
              </p>
            </template>
          </CommentForm>

          <div v-else class="text-sm text-muted-foreground">
            <p>
              <a
                :href="loginHref"
                class="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-current"
              >
                Sign in with GitHub
              </a>
              to join the discussion.
            </p>
            <p class="mt-1.5 flex flex-wrap gap-x-2 font-mono text-xs">
              <span>Only your public profile is used.</span>
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
            <p v-if="loginFailed" class="mt-2 font-mono text-xs text-accent" role="alert">
              Sign-in failed, please try again.
            </p>
          </div>
        </template>

        <template #placeholder>
          <p class="font-mono text-xs text-muted-foreground">…</p>
        </template>
      </AuthState>
    </div>
  </section>
</template>
