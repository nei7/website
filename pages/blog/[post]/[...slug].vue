<script setup lang="ts">
import ArticleComments from '~/components/article/ArticleComments.vue';
import { Icon } from '@iconify/vue';

import { useInfiniteQuery } from '@tanstack/vue-query';
import { usePost } from '~/composables/post';
import { fetchBlocks } from '~/composables/block'

definePageMeta({
    alias: [
        '/blog/:post()/:slug(.*)*',
        '/page/:post()/:slug(.*)*'
    ]
})

const postId = usePostId()

const post = await usePost(postId)

if (!post.value) throw createError({
    message: "Post not found",
    fatal: true,
    statusCode: 404
})



const { fetchComments } = useComments()

await fetchComments()

const {
    data,
    fetchNextPage,
    hasNextPage,
    suspense,
    isLoading
} = useInfiniteQuery({
    queryKey: ['blocks', postId],
    queryFn: ({ pageParam }) => fetchBlocks({ blockId: postId, nextCursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.next_cursor,
    initialPageParam: '',
})

await suspense()

const blocks = computed(() => data.value?.pages.flatMap(chunk => chunk.results) ?? [])

const { loadMoreTrigger } = useScrollLoader(fetchNextPage, hasNextPage)


defineOgImageComponent('Image', {
    title: post.value.title,
    description: post.value.description,
    headline: post.value.tags[0]?.name ?? "nei's blog"
})

useSeoMeta({
    title: post.value.title,
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,
    twitterCard: 'summary_large_image'
})

useSchemaOrg([
    defineArticle({
        headline: post.value.title,
        description: post.value.description,
        image: post.value.image,
        datePublished: post.value.createdAt,
    })
])
</script>

<template>
    <div class="mx-auto w-full max-w-4xl px-4">
        <article class="mb-24 text-justify sm:text-start">

            <ArticleHeader :post="post"></ArticleHeader>

            <ArticleContent :blocks="blocks"></ArticleContent>

            <ClientOnly>
                <div class="mt-10 flex items-center justify-center  gap-2 text-muted-foreground w-full"
                    v-if="hasNextPage && isLoading" ref="loadMoreTrigger">
                    <Icon icon="svg-spinners:180-ring-with-bg" class="text-gray-300 w-5 h-5" />
                    Loading the rest of the content...

                </div>
            </ClientOnly>

            <ArticleFooter>
            </ArticleFooter>

        </article>
        <ArticleComments></ArticleComments>
    </div>
</template>