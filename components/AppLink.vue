<script lang="ts" setup>
import { Icon } from '@iconify/vue';

const props = defineProps<{
    to: string,
    icon?: string,

}>()

const isExternal = computed(() => props.to.startsWith('http'))

</script>

<template>
    <NuxtLink class="flex items-center hover:text-foreground transition-colors" :to="to" :external="isExternal"
        :target="isExternal ? '_blank' : undefined">

        <Icon v-if="icon" :icon="icon" class="w-[1rem] h-[1rem] mr-1" />
        <slot></slot>
    </NuxtLink>
</template>