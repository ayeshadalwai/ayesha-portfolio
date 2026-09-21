# Ayesha's portfolio

React + TypeScript + Vite one-page portfolio.

## Run locally

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build.

## Update content

- Identity, hero copy, email, and social links: `src/data/profile.ts`
- Projects and featured status: `src/data/projects.ts`
- Experience: `src/data/experience.ts`

Project cards automatically use any entry marked `featured: true`; the archive filter uses the same source of truth.

## Replace media

- Branding placeholders: `public/branding/`
- Hero video/poster/fallback (when ready): `public/media/`
- Project covers and galleries: `public/projects/<project-id>/`

Missing project images receive an intentional visual fallback, so adding a project does not break the layout.
