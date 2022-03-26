import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import Pages from "vite-plugin-pages";
import { resolve } from "path";
import ViteComponents from "vite-plugin-components";
import AutoImport from "unplugin-auto-import/vite";
import Prism from "markdown-it-prism";
import LinkAttributes from "markdown-it-link-attributes";
import { readFileSync } from "fs";
import matter from "gray-matter";

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Pages({
      pagesDir: [
        {
          dir: "src/pages",
          baseRoute: "",
        },
        {
          dir: "posts",
          baseRoute: "posts",
        },
      ],
      extensions: ["vue", "md"],
      extendRoute(route) {
        // Get inspired from anthony fu"s personal website
        // https://github.com/antfu/antfu.me
        const path = resolve(__dirname, route.component.slice(1));
        const md = readFileSync(path, "utf-8");
        const { data } = matter(md);
        if (path.split(".").pop() == "md") {
          route.meta = Object.assign(route.meta || {}, { frontmatter: data });
        }
      },
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: true,
    }),
    Markdown({
      headEnabled: true,
      wrapperClasses: "content",
      wrapperComponent: "post",
      markdownItSetup(md) {
        // https://prismjs.com/
        md.use(Prism);
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: "_blank",
            rel: "noopener",
          },
        });
      },
    }),
    ViteComponents({
      extensions: ["vue", "md"],
      globalComponentsDeclaration: true,
      customLoaderMatcher: (path) => path.endsWith(".md"),
    }),
  ],
  optimizeDeps: {
    include: ["vue", "vue-router"],
  },
});
