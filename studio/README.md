# Portfolio Studio (Sanity)

Content source for the portfolio. The Astro site reads from Sanity when configured, and falls back to the typed data in `src/services/portfolio/data.ts` when it isn't — so the site works with or without this.

## Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) and note the **project ID**.
2. Install studio dependencies:
   ```bash
   cd studio
   npm install
   ```
3. Set the studio environment (create `studio/.env`):
   ```
   SANITY_STUDIO_PROJECT_ID=your-project-id
   SANITY_STUDIO_DATASET=production
   ```
4. Run the studio:
   ```bash
   npm run dev
   ```
5. Add content: one **Profile**, your **Projects**, **Experience** entries, and **Skill groups**.

## Connect the site

In the project root `.env`:

```
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

Rebuild the site (`npm run build`) — the `getProjects` / `getExperience` / `getSkillGroups` / `getProfile` accessors will read from Sanity instead of the local data.

## Schemas

`schemaTypes/` — `profile`, `project`, `experience`, `skillGroup`. Field names match the GROQ projections in `src/services/portfolio/queries.ts` and the TypeScript types in `src/services/portfolio/types.ts`.
