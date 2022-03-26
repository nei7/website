import type { Post } from "../types";
import { useRouter } from "vue-router";

const getDataRoutes = () => {
  const router = useRouter();
  const routes = router.getRoutes();
  return routes;
};

export const getPosts = (limit?: number) => {
  const isPosts = getDataRoutes()
    .filter((route) => route.path.startsWith("/posts"))
    .map((post) => {
      return {
        ...(post.meta as any).frontmatter,
        path: post.path,
      };
    });

  return isPosts as Post[];
};
