<script setup lang="ts">
import CommentList from '~/components/comments/CommentList.vue'
import useComments from '~/composables/useComments'
import CommentHeader from '~/components/comments/CommentHeader.vue'
import CommentForm from '~/components/comments/CommentForm.vue'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/vue';


const { fetchComment, useSortedComments, fetchReplies, getReplies } = useComments()

const commentId = useRoute().params.commentId as string

const comment = await fetchComment(commentId)
if (!comment.value) throw createError({
    status: 404,
    message: 'Comment not found'
})

const comments = getReplies(comment.value.id)
const sortedComments = useSortedComments(comments)

await fetchReplies(comment.value.id)

const route = useRoute()

const postPath = computed(() => route.path.slice(0, route.path.indexOf('/comments')))

const createdAt = useFormattedDate(comment.value.createdAt)
const copyLink = async () => await useClipboard(document.location.href)




</script>

<template>
    <div class="max-w-4xl w-full mx-auto mt-28 px-4">




        <div class="flex items-start gap-4  rounded-md">
            <Avatar class="shrink-0 w-7 h-7">
                <AvatarImage :src="comment.userAvatar" alt="user avatar" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>


            <div class="grid gap-3 flex-1">
                <div class="flex items-center gap-2">
                    <div class="font-medium">{{ comment.username }}</div>
                    <div class="text-sm text-muted-foreground">{{ createdAt }}</div>
                </div>
                <div class="text-muted-foreground text-sm">
                    {{ comment.content }}
                </div>

                <div class="flex items-center gap-x-3">

                </div>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" size="icon">
                        <Icon class="!w-5 !h-5" icon="material-symbols:more-vert" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem @click="copyLink">
                        <span>Copy link</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>

        <div class="px-10">
            <CommentForm class="mt-4" :replied-comment-id="comment.id ?? undefined">
            </CommentForm>


            <CommentHeader :replied-comment-id="comment.id"></CommentHeader>

            <CommentList :comments="sortedComments"></CommentList>

        </div>

    </div>
</template>