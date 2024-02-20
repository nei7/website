<script setup lang="ts">
import { type CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import * as prism from "prismjs";
import "prism-themes/themes/prism-coldark-dark.css";

const { code } = defineProps<{ code: CodeBlockObjectResponse }>();

const richText = code.code.rich_text.reduce((acc, curr) => acc + curr.plain_text, "");

function highlightCode() {
  const grammar = prism.languages[code.code.language];
  if (grammar) return prism.highlight(richText, grammar, code.code.language);
  else return prism.util.encode(richText);
}

const html = highlightCode();
</script>

<template>
  <div>
    <pre :class="'language-' + code.code.language" class="text-sm lg:text-base rounded-lg"><code v-html="html" ></code></pre>
  </div>
</template>
