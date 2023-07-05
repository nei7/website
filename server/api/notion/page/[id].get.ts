import { Client } from "@notionhq/client";

export default cachedEventHandler((event) => {
  const id = event.context.params?.id as string;

  const notion = new Client({ auth: process.env.NOTION_API_TOKEN });

  const response = notion.pages.retrieve({
    page_id: id,
  });

  return response;
});
