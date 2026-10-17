const longDate = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const monthYear = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
});

const parse = (iso: string) => new Date(iso);

/** "18 June 2023" */
export const formatDate = (iso: string) => longDate.format(parse(iso));

/** "Jun 2023" */
export const formatMonthYear = (iso: string) => monthYear.format(parse(iso));

export const yearOf = (iso: string | null) =>
  iso ? String(parse(iso).getUTCFullYear()) : "Undated";
