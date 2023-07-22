import { Client } from "@notionhq/client";

export default cachedEventHandler((event) => {
  const pageId = event.context.params?.id as string;

  const notion = new Client({
    auth: process.env.NOTION_API_TOKEN,
    timeoutMs: 7000,
  });

  const response = notion.blocks.children.list({ block_id: pageId });

  return response;
});
