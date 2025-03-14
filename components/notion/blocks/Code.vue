<script setup lang="ts">
import type { CodeBlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';

const props = defineProps<{ code: CodeBlockObjectResponse }>();

const text = props.code.code.rich_text.reduce((acc, curr) => acc + curr.plain_text, "");

const isAllowedLanguage = (language: string) => !["arduino", "agda"].includes(language)

const language: string | undefined = isAllowedLanguage(props.code.code.language) ? props.code.code.language : undefined

const html = ref("")

onMounted(async () => {
    const highlighter = await getShikiHighlighter()
    const { bundledLanguages } = await import('shiki/langs')


    if (language && !highlighter.getLoadedLanguages().includes(language)) {
        const importFn = (bundledLanguages as any)[language]
        if (!importFn) return

        await highlighter.loadLanguage(importFn)
    }

    if (language)
        html.value = highlighter.highlight(text, {
            lang: language, themes: {
                light: 'vitesse-light',
                dark: 'vitesse-dark',
            },
        })
})
</script>

<template>
    <div v-html="html" class="rounded-md overflow-x-auto"></div>
</template>
