import { defineConfig } from "drizzle-kit";

// `pnpm db:generate` diffs server/db/schema.ts against the last snapshot and
// writes a SQL migration. NuxtHub applies migrations in dev (local SQLite file);
// in production wrangler applies them to D1 before each deploy.
export default defineConfig({
  dialect: "sqlite",
  schema: "./server/db/schema.ts",
  out: "./server/db/migrations/sqlite",
});
