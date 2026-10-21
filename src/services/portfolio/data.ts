import type { ExperienceEntry, Profile, Project, ProjectImage, SkillGroup } from './types'

const shots = (id: string, count: number): ProjectImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: `/assets/projects/${id}/${String(i + 1).padStart(2, '0')}.jpg`,
  }))

export const projects: Project[] = [
  {
    id: 'estate-x',
    name: 'estate.x',
    description:
      "A two-sided marketplace for estate sales. A seller photographs a whole room and AI turns the photos into separate, priced listings — with split, merge and re-crop tools to fix whatever the AI got wrong. Buyers browse sales on a clustered map, search in plain language and check out with Stripe. As frontend lead I owned the backlog and flow analysis, built the AI review, create-sale wizard and marketplace UI, and reviewed the team's PRs.",
    image: '/assets/projects/estate-x/01.jpg',
    gallery: shots('estate-x', 13),
    stack: ['Next.js', 'React', 'TypeScript', 'RTK Query', 'Stripe', 'AI'],
    links: {},
  },
  {
    id: 'reserva',
    name: 'Reserva API',
    description:
      'An event ticket booking API that never oversells: when many users rush the last seat, exactly one booking wins — enforced by a database lock and proven by a test firing simultaneous bookings. Email and Google login with refresh-token rotation, timed seat holds that auto-release, Redis caching, rate limiting and OpenAPI docs. Sole developer — API design, data modeling, auth and deployment.',
    image: '/assets/projects/reserva/01.jpg',
    gallery: shots('reserva', 5),
    stack: ['Node.js', 'TypeScript', 'Bun', 'Express', 'PostgreSQL', 'Prisma', 'Redis', 'Docker'],
    links: {
      github: 'https://github.com/ArtemRozzhivin/reserva-api',
    },
  },
  {
    id: 'idesn',
    name: 'iDesn',
    description:
      'An MVP of a no-code SaaS platform that lets dental clinics build and launch their own website through a guided questionnaire with a live preview — then edit content, subscribe, register a domain and deploy from one dashboard. I built the frontend: a multi-step form engine, a live editor with device preview, AI-assisted text, Google/JWT auth and Stripe payments.',
    image: '/assets/projects/idesn/01.jpg',
    gallery: shots('idesn', 13),
    stack: ['Next.js', 'React', 'TypeScript', 'Chakra UI', 'Stripe', 'OAuth', 'AI'],
    links: {},
  },
  {
    id: 'handyman-landing',
    name: 'Handyman Landing',
    description:
      'A professional, conversion-optimized landing page for a handyman services business — built to attract leads with clear service sections, customer reviews, and an integrated contact form.',
    image: '/assets/handyman.png',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    links: {
      github: 'https://github.com/ArtemRozzhivin/handyman-landing.git',
      preview: 'https://handyman-landing.vercel.app/',
    },
  },
  {
    id: 'react-sneakers',
    name: 'React Sneakers',
    description:
      'An online sneaker store with product pages, cart, favorites and order history. Fully responsive with smooth animations, powered by a mock REST API.',
    image: '/assets/reactSneakers.png',
    stack: ['React', 'TypeScript', 'Redux', 'Tailwind'],
    links: {
      github: 'https://github.com/ArtemRozzhivin/ReactSneakers.git',
      preview: 'https://react-sneakers-six.vercel.app/',
    },
  },
  {
    id: 'react-pizza',
    name: 'React Pizza',
    description:
      'A pizza ordering store with category filtering, sorting, search and pagination. Cart with live totals, a clean responsive layout and tidy state management.',
    image: '/assets/reactPizza.png',
    stack: ['React', 'TypeScript', 'Redux', 'Tailwind'],
    links: {
      github: 'https://github.com/ArtemRozzhivin/ReactPizzaRemastered.git',
      preview: 'https://react-pizza-remastered.vercel.app/',
    },
  },
]

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', icon: 'languages', skills: ['TypeScript', 'JavaScript', 'HTML', 'CSS'] },
  {
    title: 'Frontend',
    icon: 'frameworks',
    skills: ['React', 'Next.js', 'Astro', 'Redux Toolkit', 'TanStack Query', 'Zustand'],
  },
  {
    title: 'Styling & Motion',
    icon: 'styling',
    skills: ['Tailwind CSS', 'SCSS/SASS', 'Chakra UI', 'Emotion', 'Framer Motion'],
  },
  {
    title: 'Backend & Data',
    icon: 'state',
    skills: [
      'Node.js',
      'NestJS',
      'Express',
      'Bun',
      'PostgreSQL',
      'Prisma',
      'Redis',
      'Supabase',
      'REST APIs',
    ],
    wide: true,
  },
  {
    title: 'CMS & Integrations',
    icon: 'integrations',
    skills: ['Sanity', 'Prismic', 'Stripe', 'OAuth & JWT', 'Google Maps', 'Leaflet', 'i18n'],
  },
  {
    title: 'SEO & Performance',
    icon: 'performance',
    skills: ['Core Web Vitals', 'Technical SEO', 'Page Speed'],
  },
  {
    title: 'DevOps & Tools',
    icon: 'tools',
    skills: [
      'Docker',
      'GitHub Actions',
      'nginx',
      'Vercel',
      'Netlify',
      'AWS',
      'IONOS',
      'Git',
      'Claude Code',
    ],
    wide: true,
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: 'upwork-freelance',
    role: 'Full-Stack Developer',
    company: 'Upwork',
    meta: 'Freelance · Remote',
    period: 'Oct 2026 — Present',
    note: 'Current role',
    current: true,
    bullets: [
      'Build SaaS products, MVPs and web apps end to end — auth and roles, dashboards, marketplaces, admin panels, Stripe payments and third-party API integrations.',
      'Design REST APIs with Node.js (NestJS, Express), PostgreSQL data models and Redis caching.',
      'Take over existing projects — fixing bugs, cleaning up messy or AI-generated code and getting apps ready for real users.',
      'Migrate websites to Astro or Next.js with a headless CMS (Sanity, Prismic), tuned for Core Web Vitals and technical SEO.',
    ],
  },
  {
    id: 'softdoes-team-lead',
    role: 'Frontend Team Lead',
    company: 'SoftDoes',
    meta: 'Full-time · Remote',
    period: 'Jul 2025 — Sept 2026',
    note: '1 yr 3 mos',
    current: false,
    bullets: [
      'Promoted from Frontend Developer to lead the frontend team while staying hands-on — building and shipping client projects in React, Next.js and Astro.',
      'Led a team of up to 4 React developers across CMS-driven corporate sites, custom business web apps, marketplaces and admin tools with analytics dashboards.',
      'Introduced an AI-assisted development workflow with Claude Code, including automated PR reviews — cutting review time by ~10–20%.',
      'Built standardized React and Astro project templates, reducing project setup from a day to an hour.',
      'Owned estimation, backlog management, code review and coding standards, plus hiring interviews and developer growth plans.',
    ],
  },
  {
    id: 'softdoes',
    role: 'Frontend Developer',
    company: 'SoftDoes',
    meta: 'Full-time · Remote',
    period: 'Sept 2024 — Jul 2025',
    note: '11 months',
    current: false,
    bullets: [
      'Built custom React and Next.js applications for clients across diverse industries at a web development agency.',
      'Integrated Stripe payments, maps and AI-powered backend services into production React and Next.js apps.',
      'Connected front ends to REST APIs and third-party services, delivering fully working, production-ready features.',
      'Set up CI/CD pipelines with GitHub Actions and Docker, deploying to VPS with nginx, domain and SSL configuration.',
    ],
  },
  {
    id: 'verv-digital',
    role: 'Frontend Developer',
    company: 'VERV Digital',
    meta: 'Full-time · Remote',
    period: 'Dec 2023 — Jun 2024',
    note: '7 months',
    current: false,
    bullets: [
      'Built responsive, pixel-accurate UI from Figma designs in React and TypeScript for a proptech web application ahead of launch.',
      'Turned mockups into working, API-connected interfaces, collaborating closely with designers and backend developers.',
      "Reviewed teammates' pull requests and fixed bugs, helping maintain code quality across the team.",
      'Styled with Emotion CSS and managed application state with Redux.',
    ],
  },
  {
    id: 'swetrix',
    role: 'Frontend Developer',
    company: 'Swetrix',
    meta: 'Remote',
    period: 'Sept 2022 — Oct 2023',
    note: '1 yr 2 mos',
    current: false,
    bullets: [
      'Built the analytics dashboard UI for an open-source, privacy-focused Google Analytics alternative — real-time stats, interactive filters and data tables that stay fast on large datasets.',
      'Developed charts and data visualizations that turn raw analytics into clear, readable insights.',
      'Shipped new features into an existing production codebase and fixed bugs across the app, improving stability and UX.',
    ],
  },
]

export const profile: Profile = {
  name: 'Artem Rozzhyvin',
  roleLead: 'Full-Stack Developer',
  roleAccent: 'Next.js & Node.js',
  eyebrow: '<hello world />',
  availability: 'AVAILABLE FOR NEW PROJECTS',
  cvUrl: 'https://drive.google.com/file/d/1mFCk8EQHdVk25NeMiPvqRNxTWUgK92DD/view?usp=sharing',
  intro:
    "I'm a full-stack developer with 4 years of building production web apps, SaaS products and MVPs — React, Next.js, Node.js, NestJS and PostgreSQL, from database and API to a fast, responsive UI.",
  bio: [
    "Hi, I'm Artem — a full-stack developer from Ukraine. For two years I worked at SoftDoes, a web development agency, where I grew from Frontend Developer to Team Lead: leading a team of up to four React developers while still building and shipping client projects myself.",
    'Today I work across the whole stack — React, Next.js and Astro on the frontend; Node.js, NestJS, PostgreSQL and Redis on the backend. I build SaaS products and MVPs, design REST APIs, take over existing codebases and migrate websites to fast, CMS-driven stacks.',
    "As a team lead, every bug and every deadline was mine to answer for — and I work the same way for clients: a clear plan before I start, regular updates, problems raised early with a solution, and clean, documented code that's fully yours. Tell me what you're building, and I'll tell you how I'd approach it.",
  ],
  facts: [
    { label: 'LOCATION', value: 'Cluj-Napoca, Romania · Remote' },
    { label: 'FOCUS', value: 'Next.js · Node.js · NestJS · PostgreSQL' },
    { label: 'EDUCATION', value: 'BSc Computer Science · NAU Kyiv' },
    { label: 'EXPLORING', value: 'AI tooling · New frameworks' },
  ],
  badges: [
    { prefix: '▲', label: 'Next.js' },
    { prefix: '◆', label: 'NestJS' },
    { prefix: 'TS', label: 'TypeScript' },
    { prefix: '4+', label: 'yrs exp' },
    { prefix: '•', label: 'Romania · Remote' },
  ],
  avatar: '/assets/avatar.jpeg',
}
