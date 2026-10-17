# website

Personal portfolio and blog. Posts and projects live in [Notion](https://notion.so) and are served through the [`@nei7/nuxt-notion`](https://github.com/nei7/nuxt-notion) module.

- Nuxt 4, Tailwind CSS v4 (typography plugin), `@nuxt/fonts` (Newsreader / Inter / JetBrains Mono)
- Two Notion collections: `posts` (the "Articles" database, `status = Published`) and `projects` (`published` checkbox)
- Deployed to Cloudflare Workers via [NuxtHub](https://hub.nuxt.com) (self-hosted) with KV-backed server cache, invalidated by Notion webhooks

## Setup

```bash
cp .env.example .env   # fill in the values
pnpm install
pnpm dev
```

Required environment variables are documented in [.env.example](.env.example). All of them follow the `NUXT_*` runtime-config convention — in production they are set as Cloudflare Worker secrets, not baked into the build.

`@nei7/nuxt-notion` is installed from the GitHub Packages registry (scope mapping lives in [.npmrc](.npmrc)), which requires auth even for public packages — your `~/.npmrc` needs a token with `read:packages`:

```ini
//npm.pkg.github.com/:_authToken=<personal access token>
```

### Working on `@nei7/nuxt-notion` locally

The Notion integration lives in the sibling module repo. To develop against a local checkout instead of the published release:

```bash
cd ../nuxt-notion && pnpm install && pnpm prepack   # build dist/
cd ../website && pnpm link ../nuxt-notion
```

`pnpm link` adds an override to `pnpm-workspace.yaml` — don't commit it.

## Architecture notes

- `nuxt.config.ts` declares the collections and their property mapping. The module queries Notion server-side, caches the results in Nitro's cache storage (KV in production, `.data/` locally) and exposes `/api/_notion/collections/*`; pages use `useNotionCollection` / `useNotionCollectionItem`.
- Notion-hosted images expire after an hour, so they are proxied through `/api/_notion/image/:id`.
- `POST /api/_notion/webhook` receives Notion events and clears exactly the affected cache entries, plus the `notion-derived` group used by `server/routes/rss.xml.ts` and `sitemap.xml.ts`.
- `server/api/spotify.ts` — "now playing" widget for the footer (cached 30 s).
- Site metadata (name, role, GitHub, email) lives in `app/app.config.ts`.

## Notion

Posts come from the "Articles" database. Properties used: `title`, `url` or `slug` (slug), `date` (falls back to `created_time`), `description`, `tags` or `category`, `status` (`Published`).

Projects come from a "Projects" database: `name`, `description`, `tech` (multi-select), `repo`, `demo`, `year`, `featured`, `published` (checkbox gate), `status` (Active / Archived), `order`.

Both databases must be shared with the integration (… → Connections).

## Deployment

Pushes to `master` build and deploy to Cloudflare Workers via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). One-time setup:

1. Create a Cloudflare KV namespace for the cache; put its id in the `NUXT_HUB_CACHE_NAMESPACE_ID` repository **variable** (build-time, not a secret).
2. Add repository **secrets** `CLOUDFLARE_API_TOKEN` (Workers Scripts + KV edit) and `CLOUDFLARE_ACCOUNT_ID`.
3. After the first deploy, set the Worker secrets:

   ```bash
   npx wrangler secret put NUXT_NUXT_NOTION_API_KEY
   npx wrangler secret put NUXT_NUXT_NOTION_COLLECTIONS_POSTS_DATA_SOURCE_ID
   npx wrangler secret put NUXT_NUXT_NOTION_COLLECTIONS_PROJECTS_DATA_SOURCE_ID
   npx wrangler secret put NUXT_PUBLIC_SITE_URL
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_ID
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_SECRET
   npx wrangler secret put NUXT_SPOTIFY_REFRESH_TOKEN
   ```

### Webhook

1. In the Notion integration settings, add a webhook subscription for `https://<site>/api/_notion/webhook` with the `page.*` and `data_source.*` events.
2. Notion posts a `verification_token`; the module logs it (`npx wrangler tail`). Paste it back into Notion.
3. Store the same token: `npx wrangler secret put NUXT_NUXT_NOTION_WEBHOOK_SECRET`.

Manual deploy from a machine with credentials: `pnpm deploy`.
