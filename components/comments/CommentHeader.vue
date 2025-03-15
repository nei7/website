<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useComments from '~/composables/useComments'


const props = defineProps<{
    repliedCommentId?: number | null
}>()

const { commentsCount, order, repliesCount } = useComments()

const commentsNumber = props.repliedCommentId ? repliesCount(props.repliedCommentId) : commentsCount()
</script>

<template>
    <ClientOnly>
        <div class="flex items-center justify-between mb-10">
            <div>{{ commentsNumber }} {{ props.repliedCommentId ? 'replies' : 'comments' }}</div>

            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline" size="sm">
                            <Icon icon="material-symbols:sort-rounded" class="w-5 h-5" /> Sort by
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup v-model="order">
                            <DropdownMenuRadioItem value="desc">
                                Newest
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="asc">
                                Oldest
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </ClientOnly>
</template>