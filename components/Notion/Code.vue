<script setup lang="ts">
import { type CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import * as prism from "prismjs";
import "prism-themes/themes/prism-coldark-dark.css";

const { code } = defineProps<{ code: CodeBlockObjectResponse }>();

function highlightCode() {
  const grammar = prism.languages[code.code.language];
  if (grammar) return prism.highlight(code.code.rich_text[0].plain_text, grammar, code.code.language);
  else return prism.util.encode(code.code.rich_text[0].plain_text);
}

const html = highlightCode();
</script>

<template>
  <div>
    <pre :class="'language-' + code.code.language" class="text-lg"><code v-html="html" ></code></pre>
  </div>
</template>
