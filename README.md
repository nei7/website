# website

Personal website and blog. Posts are written in [Notion](https://notion.so) and rendered with the [`@nei7/nuxt-notion`](https://github.com/nei7/nuxt-notion) module.

- Nuxt 4, Tailwind CSS v4, shadcn-vue
- Blog content fetched from a Notion database (only entries with `status = Published`)
- Deployed to Cloudflare Workers via [NuxtHub](https://hub.nuxt.com) (self-hosted) with KV-backed server cache

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

The blog rendering lives in the sibling module repo. To develop against a local checkout instead of the published release:

```bash
cd ../nuxt-notion && pnpm install && pnpm prepack   # build dist/
cd ../website && pnpm link ../nuxt-notion
```

`pnpm link` adds an override to `pnpm-workspace.yaml` — don't commit it.

## Architecture notes

- `server/api/posts.get.ts` — list of published posts (cached 15 min)
- `server/api/posts/[slug].get.ts` — single post + all its blocks, with Notion pagination (cached 30 min, below the ~1 h lifetime of Notion's signed asset URLs)
- The Notion proxy routes registered by the module (`/api/_notion/*`) are locked to the configured data source via `NUXT_NUXT_NOTION_DATA_SOURCE_ID`
- `server/api/spotify.ts` — "now playing" widget for the home page

## Deployment

Pushes to `master` build and deploy to Cloudflare Workers via [.github/workflows/deploy.yml](.github/workflows/deploy.yml). One-time setup:

1. Create a Cloudflare KV namespace for the cache; put its id in the `NUXT_HUB_CACHE_NAMESPACE_ID` repository **variable** (build-time, not a secret).
2. Add repository **secrets** `CLOUDFLARE_API_TOKEN` (Workers Scripts + KV edit) and `CLOUDFLARE_ACCOUNT_ID`.
3. After the first deploy, set the Worker secrets:

   ```bash
   npx wrangler secret put NUXT_NUXT_NOTION_API_KEY
   npx wrangler secret put NUXT_NUXT_NOTION_DATA_SOURCE_ID
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_ID
   npx wrangler secret put NUXT_SPOTIFY_CLIENT_SECRET
   npx wrangler secret put NUXT_SPOTIFY_REFRESH_TOKEN
   ```

Manual deploy from a machine with credentials: `pnpm deploy`.
