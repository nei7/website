import { index, integer, sqliteTable, text, type AnySQLiteColumn } from "drizzle-orm/sqlite-core";

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
