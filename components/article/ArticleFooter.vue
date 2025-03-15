<script setup lang="ts">
import { ArrowLeft, Link } from 'lucide-vue-next';

const copyUrl = () => useClipboard(document.location.href)
</script>

<template>
    <div class="flex items-center justify-between mt-12">


        <AppLink to="/blog" class="text-green-500 ">
            <ArrowLeft class="w-4 h-4 mr-2" /> Back to blog
        </AppLink>

        <Button variant="ghost" @click="copyUrl">
            <Link /> Copy url
        </Button>
    </div>

</template>
