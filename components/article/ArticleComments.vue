<script setup lang="ts">
import CommentForm from '~/components/comments/CommentForm.vue'
import CommentList from '~/components/comments/CommentList.vue'
import CommentHeader from '~/components/comments/CommentHeader.vue';

const { useSortedComments, comments } = await useComments()

const commments = useSortedComments(comments)
</script>

<template>
    <div class="my-10">
        <CommentForm />

        <CommentHeader></CommentHeader>

        <CommentList :comments="commments"></CommentList>
    </div>
</template>
