<script setup lang="ts">
import CommentList from '~/components/comments/CommentList.vue'
import useComments from '~/composables/useComments'
import { ArrowLeft } from 'lucide-vue-next';

const { fetchComment } = useComments()

const commentId = useRoute().params.commentId as string

const comment = await fetchComment(commentId)

const comments = computed(() => comment.value ? [comment.value] : [])


const route = useRoute()

const postPath = computed(() => route.path.slice(0, route.path.indexOf('/comments')))
</script>


<template>
    <div class="max-w-4xl w-full mx-auto mt-20 px-4">

        <div class="flex items-center justify-between mt-12 my-12">


            <AppLink :to="postPath" class="text-green-500 ">
                <ArrowLeft class="w-4 h-4 mr-2" /> Back to post
            </AppLink>


        </div>

        <CommentList :comments="comments"></CommentList>
    </div>
</template>