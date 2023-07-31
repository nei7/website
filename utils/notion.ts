import { isFullPage } from "@notionhq/client";

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
