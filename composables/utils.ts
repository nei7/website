import {
  BlockObjectResponse,
  Heading1BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

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

export const hasRichText = (
  block: BlockObjectResponse
): block is Heading1BlockObjectResponse => {
  return (
    block.type in block &&
    // @ts-ignore
    (block[block.type]?.rich_text as RichTextItemResponse[])?.length > 0
  );
};

export function classNames(...classes: any[string]) {
  return classes.filter(Boolean).join(" ");
}
