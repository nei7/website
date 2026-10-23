<script setup lang="ts">
import type { NotionLinkResolver } from "@nei7/nuxt-notion/types";

const route = useRoute();
const { site } = useAppConfig();
const slug = computed(() => String(route.params.slug ?? ""));

const [{ data, error }, { data: allPosts }] = await Promise.all([
  useNotionCollectionItem("posts", slug),
  // Used to turn Notion page mentions into site links; shares the cache with /blog.
  useNotionCollection("posts"),
]);

if (!data.value) {
  throw createError({
    statusCode: error.value?.statusCode === 404 ? 404 : (error.value?.statusCode ?? 500),
    statusMessage: error.value?.statusCode === 404 ? "Post not found" : "Could not load this post",
    fatal: true,
  });
}

const post = computed(() => data.value!.item);

const resolveLink: NotionLinkResolver = (id, type) => {
  if (type !== "page") return null;
  const bare = id.replace(/-/g, "");
  const target = allPosts.value?.items.find((item) => item.id.replace(/-/g, "") === bare);
  return target ? { href: `/blog/${target.slug}`, title: target.title } : null;
};

const siteUrl = useSiteUrl();

usePageSeo({
  title: post.value.title,
  description: post.value.description || site.description,
  path: `/blog/${post.value.slug}`,
  image: post.value.cover,
  type: "article",
  publishedTime: post.value.date,
  modifiedTime: post.value.lastEditedTime,
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.value.title,
        description: post.value.description || undefined,
        datePublished: post.value.date ?? undefined,
        dateModified: post.value.lastEditedTime,
        author: { "@type": "Person", name: site.name, url: siteUrl },
        mainEntityOfPage: `${siteUrl}/blog/${post.value.slug}`,
        image: post.value.cover
          ? post.value.cover.startsWith("http")
            ? post.value.cover
            : siteUrl + post.value.cover
          : undefined,
        keywords: post.value.tags.join(", ") || undefined,
      }),
    },
  ],
});
</script>

<template>
  <article v-if="data">
    <header>
      <h1 class="font-serif text-4xl leading-tight tracking-tight sm:text-[2.75rem]">
        {{ post.title }}
      </h1>
      <p class="mt-4 flex flex-wrap gap-x-2 font-mono text-xs text-muted-foreground">
        <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
        <span v-if="data.readingTime.minutes">· {{ data.readingTime.minutes }} min read</span>
        <template v-for="tag in post.tags" :key="tag">
          <span>·</span>
          <NuxtLink
            :to="{ path: '/blog', query: { tag } }"
            class="transition-colors hover:text-foreground"
          >
            {{ tag }}
          </NuxtLink>
        </template>
      </p>
      <p v-if="post.description" class="mt-6 font-serif text-xl text-muted-foreground italic">
        {{ post.description }}
      </p>
    </header>

    <img
      v-if="post.cover"
      :src="post.cover"
      alt=""
      class="mt-10 w-full rounded-sm"
      loading="eager"
      decoding="async"
    >

    <div class="relative mt-10">
      <aside
        v-if="data.headings.length > 1"
        class="absolute top-0 left-full ml-14 hidden h-full w-56 xl:block"
      >
        <TableOfContents class="sticky top-24" :headings="data.headings" />
      </aside>

      <NotionRenderer
        class="prose max-w-none"
        :blocks="data.blocks"
        :heading-offset="1"
        :link-resolver="resolveLink"
      />
    </div>

    <nav
      v-if="data.prev || data.next"
      aria-label="Post navigation"
      class="mt-16 grid gap-6 border-t border-border pt-8 sm:grid-cols-2 sm:gap-10"
    >
      <NuxtLink
        v-if="data.prev"
        :to="`/blog/${data.prev.slug}`"
        class="group min-w-0"
      >
        <span class="font-mono text-xs text-muted-foreground">← Older</span>
        <span class="mt-1 block text-sm leading-snug underline-offset-4 group-hover:underline">
          {{ data.prev.title }}
        </span>
      </NuxtLink>
      <NuxtLink
        v-if="data.next"
        :to="`/blog/${data.next.slug}`"
        class="group min-w-0 sm:col-start-2 sm:text-right"
      >
        <span class="font-mono text-xs text-muted-foreground">Newer →</span>
        <span class="mt-1 block text-sm leading-snug underline-offset-4 group-hover:underline">
          {{ data.next.title }}
        </span>
      </NuxtLink>
    </nav>

    <PostComments :slug="post.slug" />
  </article>
</template>
