# dismatch.dev

Simple Next.js site for `dismatch`, with a marketing page and a browser-based
playground.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Cloudflare Pages

This repo is configured for static export, so Cloudflare Pages can deploy it
directly from Git.

Use these project settings in Cloudflare Pages:

- Production branch: `main`
- Build command: `npm run build`
- Build output directory: `out`

After the Pages project is created:

1. Connect the GitHub repo that contains this project.
2. Add the custom domain `dismatch.dev` to the Pages project.
3. In your DNS for `dismatch.dev`, let Cloudflare manage the required records.
4. Every push to `main` will trigger a new production deployment.

## Routes

- `/` marketing page
- `/playground` interactive playground
