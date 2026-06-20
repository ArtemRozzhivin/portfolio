# Astro Template

A modern, content-driven starter built with Astro — static-first, React islands only where needed.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Git Flow](#git-flow)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Docker](#docker)

---

## Getting Started

### Prerequisites

- **Node.js**: v20 or newer
- **npm**
- **Git**

### Installation

```bash
# Clone repository
git clone <repo-url>
cd your-project

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
# → http://localhost:4321
```

---

## Development Workflow

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Changes

- Follow [Coding Standards](#coding-standards)
- Comment complex logic
- Keep components small and focused

### 3. Check Before Committing

```bash
npm run tsc          # TypeScript check
npm run lint         # ESLint
npm run format:check # Prettier
```

### 4. Commit Changes

Use Conventional Commits — see [Git Flow](#git-flow).

**Pre-commit hooks automatically:**

- Format code (Prettier)
- Run ESLint
- Only on staged files (lint-staged)

**Pre-push hooks:**

- Check TypeScript types

---

## Project Structure

```
src/
├── actions/          # Astro server actions — form handlers, mutations (optional)
├── assets/           # Static files — images, icons
├── components/
│   ├── ui/           # Primitive UI components — Button, Input, Sheet, cards...
│   ├── layout/       # Structural chrome — Navbar, Footer, mobile menu
│   └── islands/      # Interactive React islands — forms, dynamic UI
├── content/          # Astro content collections — Markdown/MDX data (optional)
├── layouts/          # Page-level HTML templates
├── lib/
│   ├── config/       # External library setup — API clients, provider config
│   ├── constants/    # App-wide constants — nav links, route paths, enums
│   ├── hooks/        # Reusable React hooks
│   └── utils/        # Pure helper functions — formatters, cn(), etc.
├── pages/            # File-based routes — one file per URL
│   └── [page]/       # Page folder — route + co-located private segments
│       ├── _ui/      # Page-specific components
│       ├── _utils/   # Page-specific helpers
│       ├── _hooks/   # Page-specific hooks
│       └── index.astro
├── services/         # External data layer — queries, fetchers, response types
└── styles/           # Global CSS
```

### Layers

| Layer                 | Purpose                                                                 |
| --------------------- | ----------------------------------------------------------------------- |
| `pages/`              | Routes only — thin files, no business logic                             |
| `layouts/`            | Page-level HTML shell, shared across routes                             |
| `components/layout/`  | Structural chrome rendered on every page                                |
| `components/islands/` | Interactive React islands — client state, event handlers                |
| `components/ui/`      | Primitive, stateless UI components                                      |
| `services/`           | All external data fetching — queries, fetcher functions, response types |
| `lib/`                | Shared infrastructure — client config, constants, hooks, utilities      |
| `actions/`            | Server-side mutations triggered from the client _(optional)_            |
| `content/`            | Local Markdown/MDX collections _(optional)_                             |

### `lib/` in detail

`lib/` is the shared infrastructure layer. It configures external tools and provides utilities used across the rest of the app. Nothing in `lib/` is domain-specific.

| Segment      | Contains                                                                         |
| ------------ | -------------------------------------------------------------------------------- |
| `config/`    | Setup files for external libraries — API clients, third-party SDK initialization |
| `constants/` | Static, app-wide values — navigation links, route paths, enums                   |
| `hooks/`     | Reusable React hooks with no domain dependency                                   |
| `utils/`     | Pure helper functions — `cn()`, formatters, transformers                         |

### Where to put new code

**New page section** (static, content-driven) → `pages/<page>/_ui/` as an `.astro` file

Pages can have any `_`-prefixed segments for page-specific code (`_ui/`, `_utils/`, `_hooks/`, etc.). The `_` prefix tells Astro these are not routes. If the same code is needed by more than one page, move it up to `components/`, `lib/`, or `services/`.

**New interactive island** (React, client state) → `components/islands/<name>/`

```
components/islands/my-feature/
├── ui/          # React components
├── hooks/       # Feature-scoped hooks
├── schema/      # Schemas and types
└── index.ts     # Public API — export only what pages need
```

**New data source** (CMS, external API) → `services/<domain>/`

```
services/blog/
├── queries.ts   # Query strings or fetch logic
├── types.ts     # Response types
└── index.ts     # Exported fetcher functions
```

**New primitive component** → `components/ui/`

**New external client or SDK setup** → `lib/config/`

**New hook** → `lib/hooks/`

**New utility function** → `lib/utils/`

---

## Coding Standards

### TypeScript

- Always type function parameters and return values
- Avoid `any` — use `unknown` or proper types
- Use `interface` for object shapes

```typescript
// Good
interface TeamMember {
  name: string
  title: string
  photo: string
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(TEAM_MEMBERS_QUERY)
}
```

### Components

- Prefer `.astro` for static/content components — zero JS by default
- Use `.tsx` only when interactivity is required (forms, menus, dynamic state)
- Keep components small and focused — extract logic into hooks

```tsx
// Good — logic in hook, component only renders
export function ContactForm() {
  const { mutate, isPending } = useSubmitForm()
  return <form onSubmit={...}>...</form>
}
```

### Styling

- Use Tailwind CSS utility classes
- Use `cn()` from `@lib/utils` for conditional classes

```tsx
import { cn } from '@lib/utils'

;<button className={cn('rounded-lg px-4 py-2', isPrimary && 'bg-black text-white')}>
  Click me
</button>
```

---

## Git Flow

### Branch Naming

- `feature/feature-name` — new features
- `fix/bug-description` — bug fixes
- `refactor/description` — refactoring
- `docs/description` — documentation
- `chore/description` — dependencies, config

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new page, section, island, or feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `style:` — formatting only, no logic change
- `refactor:` — restructuring without behavior change
- `chore:` — dependencies, tooling, config

**Examples:**

```bash
feat: add team section to home page
feat: add contact island
fix: resolve mobile menu scroll lock
refactor: extract hero button into shared ui
chore: update dependencies
docs: update project structure in README
```

---

## Scripts

```bash
# Development
npm run dev              # Start dev server → http://localhost:4321
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix ESLint errors
npm run format           # Format with Prettier
npm run format:check     # Check formatting (CI)
npm run tsc              # TypeScript check
```

---

## Deployment

### Vercel

Uses `astro.config.mjs` with `@astrojs/vercel/serverless`. Push to your connected Vercel project — no extra config needed.

### Other Platforms

Replace the adapter in `astro.config.mjs` with the one matching your platform. See the [Astro deployment guides](https://docs.astro.build/en/guides/deploy/) for Netlify, Cloudflare, and others.

---

## Docker

Run the project in a fully isolated environment — no local Node.js required.

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) 24+
- [Docker Compose](https://docs.docker.com/compose/) v2 (bundled with Docker Desktop)

### Development (hot reload)

```bash
# Copy environment file and fill in your values
cp .env.example .env

# Start dev server with hot reload at http://localhost:4321
docker compose up dev
```

Source files are bind-mounted into the container, so edits are reflected instantly without rebuilding.

### Production

```bash
# Build and start the production server at http://localhost:4321
docker compose up app
```

The production image uses `@astrojs/node` in standalone mode (multi-stage build). Environment variables are read from `.env` at runtime.

For CI/CD pipelines, pass variables as build args:

```bash
docker build \
  --build-arg MY_ENV_VAR=value \
  -t my-app .
```

### Environment Variables

Add your environment variables to `.env` (copied from `.env.example`). Variables prefixed with `PUBLIC_` are exposed to the client.

| Variable        | Required | Description                  |
| --------------- | -------- | ---------------------------- |
| `PUBLIC_*`      | —        | Client-exposed variables     |
| `SECRET_*`      | —        | Server-only variables        |

### Docker Scripts

```bash
npm run docker:dev    # Start dev container (hot reload)
npm run docker:build  # Build production image
npm run docker:start  # Start production container
```
