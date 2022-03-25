import { ViteSSG } from "vite-ssg";
// @ts-ignore
import routes from "virtual:generated-pages";
import App from "./App.vue";
import "~/assets/tailwind.css";

export const createApp = ViteSSG(App, { routes }, (ctx) => {
  Object.values(import.meta.globEager("./module/*.ts")).map((i) =>
    i.install?.(ctx)
  );
});
