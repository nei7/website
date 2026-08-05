import type { BlockObjectResponse, PartialBlockObjectResponse } from "@notionhq/client";
import type { BlogPost } from "#shared/types/blog";

export const getPosts = () => useFetch<BlogPost[]>("/api/posts");

export const getPost = (slug: string) =>
  useFetch<{
    post: BlogPost;
    blocks: (BlockObjectResponse | PartialBlockObjectResponse)[];
  }>(`/api/posts/${slug}`);
