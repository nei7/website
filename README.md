# website

Personal portfolio and blog. Posts, projects and notes live in [Notion](https://notion.so) and are served through the [`@nei7/nuxt-notion`](https://github.com/nei7/nuxt-notion) module.

- Nuxt 4, Tailwind CSS v4 (typography plugin), `@nuxt/fonts` (Newsreader / Inter / JetBrains Mono)
- Three Notion collections: `posts` (the "Articles" database, `status = Published`), `projects` (`published` checkbox) and `notes` (`published` checkbox; the owner adds notes from `/notes`, which creates the Notion page)
- Comments under posts: readers sign in with GitHub (`nuxt-auth-utils`, sealed-cookie sessions), comments live in Cloudflare D1 through NuxtHub's Drizzle `db`
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
- `server/db/schema.ts` (Drizzle) defines `users` and `comments`; `server/api/comments/*` is the comments API and `server/routes/auth/github.get.ts` the sign-in route. `app/components/PostComments.vue` renders the thread under each post.
- `server/api/visits/*` is the analytics API: the beacon endpoint, the public summary and the owner-only report. `app/plugins/analytics.client.ts` sends the beacons, `app/components/VisitSummary.vue` and `VitalsStrip.vue` sit under the bio on the home page, `app/pages/analytics.vue` is the dashboard. Tables `page_views` and `web_vitals` live in the same D1 database.

## Comments and sign-in

Readers sign in with GitHub to comment; only the public profile (id, login, name, avatar) is stored. Sessions are sealed cookies (`nuxt-auth-utils`), so nothing is stored server-side for them. Comments are threaded one level deep, can be edited by their author, and are soft-deleted (by the author or by the logins in `comments.adminLogins`, who also get an "author" badge). The API rate-limits to 5 comments per user per minute and caps a comment at 2000 characters.

Locally the database is a SQLite file under `.data/db/` (migrations are applied on `pnpm dev`), and the "Dev sign-in" button under a post creates a session without a GitHub app. That button and its `/api/_dev/login` route only exist in development builds.

Schema changes: edit `server/db/schema.ts`, run `pnpm db:generate` and commit the new file in `server/db/migrations/sqlite/`. Migrations are bundled into the build; in production they are applied with `pnpm db:migrate` (what the deploy workflow does before `wrangler deploy`).

## Analytics

Traffic is measured first-party, in the same D1 database, without cookies or third-party scripts. The client plugin posts one beacon per page view (path, external referrer) and, for each hard page load, the web vitals measured by the [`web-vitals`](https://github.com/GoogleChrome/web-vitals) library plus the Navigation Timing load time. The server adds the country from Cloudflare, a coarse browser / OS / device class parsed from the user agent, and a visitor hash = sha256(salt, UTC date, IP, user agent) truncated to 16 hex characters, so "visitors" means unique visitors per day and nobody can be tracked across days. The IP itself is never stored. Bots (by user agent) and visits made while signed in as an owner are not recorded; setting `localStorage.analytics:ignore` in a browser excludes it too.

The home page shows views and visitors for all time, the last 30 days and today (cached 5 minutes) and, under them, the current visitor's own load time and web vitals rated with Google's thresholds. `/analytics` (owner logins only, `noindex`) has the daily chart, top pages, referrers, countries, browsers, systems, devices and the p75 of each vital with its good / needs-improvement / poor split for the last 7, 30 or 90 days.

## Notion

Posts come from the "Articles" database. Properties used: `title`, `url` or `slug` (slug), `date` (falls back to `created_time`), `description`, `tags` or `category`, `status` (`Published`).

Projects come from a "Projects" database: `name`, `description`, `tech` (multi-select), `repo`, `demo`, `year`, `featured`, `published` (checkbox gate), `status` (Active / Archived), `order`.

Notes come from a "Notes" database: `title`, `slug` (text, generated by the site from the title; falls back to the page id), `tags` (multi-select), `published` (checkbox gate), `date` (optional, falls back to the created time). The note text is the page body. Owners (`NUXT_COMMENTS_ADMIN_LOGINS`) get a form on `/notes`; `POST /api/notes` creates the page through the integration, waits until Notion can query it and clears the cached collection. Besides being shared with the database, the integration therefore needs the **Insert content** capability.

All three databases must be shared with the integration (… → Connections); sharing the parent page once covers them.

## Deployment

Pushes to `master` build and deploy to Cloudflare Workers via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). One-time setup:

1. Create a Cloudflare KV namespace for the cache; put its id in the `NUXT_HUB_CACHE_NAMESPACE_ID` repository **variable** (build-time, not a secret).
2. Create the D1 database (`npx wrangler d1 create nei7-website`) and put its id in the `NUXT_HUB_DATABASE_ID` repository **variable**. The workflow applies pending migrations to it before every deploy.
3. Add repository **secrets** `CLOUDFLARE_API_TOKEN` (Workers Scripts, KV and D1 edit) and `CLOUDFLARE_ACCOUNT_ID`.
4. Create a [GitHub OAuth app](https://github.com/settings/developers) with the authorization callback URL `https://<site>/auth/github`.
5. After the first deploy, set the Worker secrets:

   ```bash
   npx wrangler secret put NUXT_NUXT_NOTION_API_KEY
   npx wrangler secret put NUXT_NUXT_NOTION_COLLECTIONS_POSTS_DATA_SOURCE_ID
   npx wrangler secret put NUXT_NUXT_NOTION_COLLECTIONS_PROJECTS_DATA_SOURCE_ID
   npx wrangler secret put NUXT_NUXT_NOTION_COLLECTIONS_NOTES_DATA_SOURCE_ID
   npx wrangler secret put NUXT_PUBLIC_SITE_URL
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_ID
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_SECRET
   npx wrangler secret put NUXT_SPOTIFY_REFRESH_TOKEN
   npx wrangler secret put NUXT_SESSION_PASSWORD          # 32+ random characters
   npx wrangler secret put NUXT_OAUTH_GITHUB_CLIENT_ID
   npx wrangler secret put NUXT_OAUTH_GITHUB_CLIENT_SECRET
   npx wrangler secret put NUXT_ANALYTICS_SALT              # optional, see .env.example
   ```

   If GitHub reports a redirect-URI mismatch, the Worker could not work out its public origin: set `NUXT_OAUTH_GITHUB_REDIRECT_URL` to the callback URL as well.

### Webhook

1. In the Notion integration settings, add a webhook subscription for `https://<site>/api/_notion/webhook` with the `page.*` and `data_source.*` events.
2. Notion posts a `verification_token`; the module logs it (`npx wrangler tail`). Paste it back into Notion.
3. Store the same token: `npx wrangler secret put NUXT_NUXT_NOTION_WEBHOOK_SECRET`.

Manual deploy from a machine with credentials: `pnpm deploy`.
