import type { VitalRating } from "#shared/types/analytics";

/**
 * Status marks follow PageSpeed: a green circle, an amber square and a red
 * triangle, so the rating never rests on colour alone. Apply to an empty
 * `size-2` span.
 */
export const ratingMarkClass = (rating: VitalRating | null | undefined): string => {
  switch (rating) {
    case "good":
      return "rounded-full bg-good";
    case "needs-improvement":
      return "rounded-[1px] bg-warn";
    case "poor":
      return "bg-poor [clip-path:polygon(50%_0,100%_100%,0_100%)]";
    default:
      return "rounded-full bg-border";
  }
};
