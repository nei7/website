import { useRouter } from "vue-router";
import dayjs from "dayjs";

export interface Post {
  description: string;
  title: string;
  date: string;
  path: string;
  thumbnail: string;
}

declare module "vue-router" {
  interface RouteMeta {
    frontmatter?: {
      description: string;
      title: string;
      date: string;
      thumbnail: string;
    };
  }
}

const getDataRoutes = () => {
  const router = useRouter();
  const routes = router.getRoutes();
  return routes;
};

export const getPosts = (limit?: number) => {
  const posts: Post[] = getDataRoutes()
    .filter((route) => route.meta?.frontmatter)
    .map(({ path, meta }) => {
      const { date, description, thumbnail, title } = meta.frontmatter!;

      return {
        title,
        description,
        thumbnail,
        path,
        date: dayjs(date).format("MMMM DD, YYYY"),
      };
    })
    .slice(limit);

  return posts;
};
