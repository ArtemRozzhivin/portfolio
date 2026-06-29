import type { ExperienceEntry, Profile, Project, SkillGroup } from './types'

export const projects: Project[] = [
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
  { title: 'Languages', icon: 'languages', skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript'] },
  { title: 'Frameworks', icon: 'frameworks', skills: ['React', 'Next.js', 'Node.js', 'Nest.js'] },
  { title: 'State & Data', icon: 'state', skills: ['Redux Toolkit', 'Zustand', 'React Query'] },
  { title: 'Styling & Motion', icon: 'styling', skills: ['Tailwind CSS', 'Framer Motion'] },
  {
    title: 'Tools & Cloud',
    icon: 'tools',
    skills: ['Git', 'AWS', 'ESLint', 'Prettier'],
    wide: true,
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: 'come-back-agency',
    role: 'Frontend Developer',
    company: 'Come Back Agency',
    meta: 'Full-time · Remote',
    period: 'Sept 2024 — Present',
    note: 'Current role',
    current: true,
    bullets: [
      'Built projects of varying complexity — from corporate sites to advanced SPA applications.',
      'Developed new pages and interactive UI, extending app functionality to customer requirements.',
      'Optimized component performance, debugged for stability, and ensured responsive mobile-first layouts.',
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
      'Developed user-friendly web applications in a cross-functional team of developers and designers.',
      'Built reusable components and integrated REST APIs to ship features on schedule.',
      'Collaborated closely on UI/UX implementation, focusing on clean, responsive interfaces.',
    ],
  },
]

export const profile: Profile = {
  name: 'Artem Rozzhyvin',
  roleLead: 'Frontend Developer',
  roleAccent: 'React & Next.js',
  eyebrow: '<hello world />',
  availability: 'OPEN TO OPPORTUNITIES',
  intro:
    "I'm a frontend developer with 2+ years of experience, focused on React & Next.js. I love crafting fast, accessible websites and web apps that deliver genuinely great user experiences.",
  bio: [
    "Hi, I'm Artem — a passionate front-end developer from Ukraine with a deep interest in everything related to technology and software development. My journey into programming started with a strong curiosity about how digital products work, and over time it evolved into a full-fledged career.",
    "While my core expertise lies in front-end development — particularly React, Next.js and TypeScript — I'm also actively expanding into backend technologies including Node.js, NestJS and various cloud solutions. What excites me most is problem-solving: finding elegant solutions, optimizing products, and continuously improving both my skills and the user experience.",
    "I'm always open to new challenges, exciting projects, and opportunities to collaborate. If you're looking for someone who loves crafting high-quality digital solutions — let's connect.",
  ],
  facts: [
    { label: 'LOCATION', value: 'Ukraine · Remote' },
    { label: 'FOCUS', value: 'React · Next.js · TypeScript' },
    { label: 'EXPLORING', value: 'Node.js · NestJS · Cloud · AI' },
    { label: 'BEYOND CODE', value: 'Family · Travel · Psychology books' },
  ],
  badges: [
    { prefix: '</>', label: 'React' },
    { prefix: 'TS', label: 'TypeScript' },
    { prefix: '▲', label: 'Next.js' },
    { prefix: '2+', label: 'yrs exp' },
    { prefix: '•', label: 'Ukraine · Remote' },
  ],
  avatar: '/assets/avatar.jpeg',
}
