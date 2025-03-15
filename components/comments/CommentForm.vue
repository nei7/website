<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
    FormField,
    FormControl,
    FormItem,
    FormMessage
} from '@/components/ui/form'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'

import { Textarea } from '@/components/ui/textarea'
import useComment from '~/composables/useComments'

const { loggedIn, openInPopup } = useUserSession()

const props = defineProps<{
    repliedCommentId?: number | null
}>()

const { useAddReply, useAddComment } = useComment()
const { mutate } = props.repliedCommentId ? useAddReply(props.repliedCommentId) : useAddComment()

const emit = defineEmits(["close"])

const formSchema = toTypedSchema(z.object({
    content: z.string().min(1, {
        message: 'Comment must have at least 1 character.'
    }).max(600, {
        message: 'Comment must not be longer than 600 characters.',
    }),
}))

const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,


})


const onSubmit = handleSubmit(({ content }) => {
    mutate({ content })


    resetForm()
    emit('close')

})
</script>

<template>
    <form class="mb-10" @submit="onSubmit">
        <div class="relative">
            <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-black/5 backdrop-blur-[0.8px]"
                v-if="!loggedIn && !repliedCommentId">
                <Button @click="openInPopup('/api/auth/github')" size="sm">Log in to comment</Button>
            </div>

            <FormField v-slot="{ componentField }" name="content" :validateOnBlur="false">
                <FormItem>

                    <FormControl>
                        <Textarea :placeholder="repliedCommentId ? 'Type your reply here.' : 'Type your message here.'"
                            v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>

            </FormField>

            <div class="flex items-center gap-x-3 mt-4" v-if="loggedIn || repliedCommentId">
                <Button v-if="loggedIn" size="sm" type="submit">Post</Button>
                <Button size="sm" variant="outline" v-if="repliedCommentId" @click="emit('close')">Cancel</Button>
            </div>
        </div>
    </form>
</template>