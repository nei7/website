import { index, integer, real, sqliteTable, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";

const timestamp = (name: string) => integer(name, { mode: "timestamp_ms" });

/** One row per OAuth identity; `id` is `${provider}:${providerId}`, e.g. `github:123`. */
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  provider: text("provider").notNull(),
  login: text("login").notNull(),
  name: text("name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").notNull(),
  lastLoginAt: timestamp("last_login_at").notNull(),
});

/** Threads are one level deep: a reply's `parentId` always points at a root comment. */
export const comments = sqliteTable(
  "comments",
  {
    id: text("id").primaryKey(),
    postSlug: text("post_slug").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    parentId: text("parent_id").references((): AnySQLiteColumn => comments.id),
    body: text("body").notNull(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at"),
    /** Soft delete: the row stays for moderation and so replies keep their parent. */
    deletedAt: timestamp("deleted_at"),
  },
  (table) => [
    index("comments_post_created_idx").on(table.postSlug, table.createdAt),
    index("comments_user_created_idx").on(table.userId, table.createdAt),
  ]
);

export type UserRow = typeof users.$inferSelect;
export type CommentRow = typeof comments.$inferSelect;

/**
 * One row per page view. Cookieless: `visitorHash` is sha256(salt | UTC date | ip | ua)
 * truncated, so it rotates daily and never identifies a person. Views by signed-in
 * owners and by bots are never written (see server/utils/analytics.ts).
 */
export const pageViews = sqliteTable(
  "page_views",
  {
    /** Client-generated uuid; `webVitals.viewId` points at it. */
    id: text("id").primaryKey(),
    /** Pathname only: no query, no hash, no trailing slash. */
    path: text("path").notNull(),
    postSlug: text("post_slug"),
    /** External referrer host without `www.`; null for direct and internal navigation. */
    referrerHost: text("referrer_host"),
    visitorHash: text("visitor_hash").notNull(),
    /** ISO 3166-1 alpha-2 from Cloudflare; null when unknown. */
    country: text("country"),
    browser: text("browser"),
    os: text("os"),
    /** desktop | mobile | tablet */
    device: text("device"),
    createdAt: timestamp("created_at").notNull(),
  },
  (table) => [
    index("page_views_created_idx").on(table.createdAt),
    index("page_views_path_created_idx").on(table.path, table.createdAt),
  ]
);

/**
 * One row per hard page load, keyed by the view id; later beacons upsert the
 * values that have changed. No foreign key on purpose: the view may have been
 * dropped as a bot or owner visit, and D1 enforces foreign keys.
 */
export const webVitals = sqliteTable(
  "web_vitals",
  {
    viewId: text("view_id").primaryKey(),
    path: text("path").notNull(),
    /** Milliseconds, rounded. */
    ttfb: integer("ttfb"),
    fcp: integer("fcp"),
    lcp: integer("lcp"),
    inp: integer("inp"),
    /** Unitless layout-shift score. */
    cls: real("cls"),
    /** Navigation Timing `loadEventEnd`, in milliseconds. */
    loadMs: integer("load_ms"),
    /** navigate | reload | back-forward | back-forward-cache | prerender | restore */
    navType: text("nav_type"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
  },
  (table) => [index("web_vitals_created_idx").on(table.createdAt)]
);

export type PageViewRow = typeof pageViews.$inferSelect;
export type WebVitalsRow = typeof webVitals.$inferSelect;
