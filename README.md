# Dylan Crespo — Resume

Single-page resume site built with Svelte + Vite, compiled to one self-contained
`index.html` via `vite-plugin-singlefile`. The Projects panel pulls live public
repos from the GitHub API client-side.

## Develop

    npm install
    npm run dev

## Build

    npm run build

Output is a single file at `dist/index.html` — no other assets needed.

## Deploy to GitHub Pages

Push to `main`. `.github/workflows/deploy.yml` builds the project and deploys
`dist/` automatically via GitHub Actions.

One-time setup: repo → Settings → Pages → Source → **GitHub Actions**.

## Edit content

All resume content (experience, skills, languages, credentials, contact) lives
in `src/lib/data.js`.
