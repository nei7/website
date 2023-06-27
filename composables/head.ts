export const useCustomHead = (
  title?: string,
  description?: string,
  image?: string
) => {
  useHead({
    title,
    meta: [
      {
        name: "description",
        content:
          description ??
          "Nei's personal portfolio and blog. Built using nuxt 3 and typescript",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:title",
        content: `Nei's place`,
      },
      { property: "og:url", content: "" },
      {
        property: "og:image",
        content: image ?? "",
      },
      {
        property: "og:image:secure_url",
        content: image ?? "",
      },
      { property: "og:image:type", content: "image/png" },
    ],
  });
};
