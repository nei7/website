export const useCustomHead = (title?: string, description?: string, image?: string) => {
  useSeoMeta({
    title,
    description: description ?? "Nei's personal portfolio and blog. Built using nuxt 3 and typescript",
    ogTitle: `Nei's place`,
    ogImage: image,
    ogImageSecureUrl: image,
    ogImageType: "image/png"
  });
};
