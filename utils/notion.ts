import { isFullPage } from "@notionhq/client";
import type { BlockObjectResponse, Heading1BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

export interface Post {
  id: string;
  title: string;
  published: string;
  tags: { name: string; color: string }[];
  description: string;
  coverImage: string;
  href: string;
  slug: string;
}

export const hasRichText = (block: BlockObjectResponse): block is Heading1BlockObjectResponse => {
  return (
    block.type in block &&
    // @ts-ignore
    (block[block.type]?.rich_text as RichTextItemResponse[])?.length > 0
  );
};
export function useReadingTime(blocks: BlockObjectResponse[]) {
  const wordsPerMinute = 200;

  const content = blocks.reduce((acc, block) => {
    if (hasRichText(block)) {
      acc += block[block.type].rich_text[0].plain_text;
      acc += "\n";
    }
    return acc;
  }, "");

  const words = content.split(/\s+/).length;

  return Math.ceil(words / wordsPerMinute);
}

export const convertPosts = (posts: any[]) => {
  const tags: string[] = [];

  const convertedPosts = posts
    .filter(isFullPage)
    .map((post) => {
      const { Title, Published, Tags, Description, URL } = post.properties;
      const CoverImage = post.properties["Cover image"];

      if (
        Title.type === "title" &&
        Published.type === "created_time" &&
        Tags.type === "multi_select" &&
        Description.type === "rich_text" &&
        CoverImage.type === "rich_text" &&
        URL.type === "url"
      ) {
        return {
          id: post.id,
          slug: URL.url || "/",
          href: post.id,
          title: Title.title[0].plain_text,
          published: new Date(Published.created_time).toDateString(),
          tags: Tags.multi_select.map((tag) => {
            tags.push(tag.name);

            return {
              name: tag.name,
              color: tag.color.toString()
            };
          }),
          description: Description.rich_text[0].plain_text,
          coverImage: CoverImage.rich_text[0].plain_text
        };
      }

      return undefined;
    })
    .filter((_): _ is Post => _ !== undefined);

  return { tags, posts: convertedPosts };
};
