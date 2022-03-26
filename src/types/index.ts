import type { ViteSSGContext } from "vite-ssg";

export type VueModule = (ctx: ViteSSGContext) => void;

export interface Post {
  description: string;
  name: string;
  date: string;
  path: string;
  thumbnail: string;
}
