<script setup lang="ts">
import { CodeBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import prism from "prismjs";
import "prismjs/themes/prism.css";

const { code } = defineProps<{ code: CodeBlockObjectResponse }>();

const html = prism.highlight(
  code.code.rich_text[0].plain_text,
  prism.languages[code.code.language],
  code.code.language
);
</script>

<template>
  <div>
    <pre
      :class="'language-' + code.code.language"
    ><code v-html="html" ></code></pre>
  </div>
</template>
