export const siteConfig = {
  name: 'Artem Rozzhyvin',
  description:
    'Full-stack developer with 4 years of experience building production web apps, SaaS products and MVPs with Next.js, Node.js, NestJS and PostgreSQL.',
  url: 'https://artem.dev',
  ogImage: '/og.png',

  author: {
    name: 'Artem Rozzhyvin',
    email: 'artiomrozzhyvin@gmail.com',
    twitter: '',
  },

  keywords: [
    'Artem Rozzhyvin',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'PostgreSQL',
    'TypeScript',
    'SaaS',
    'Portfolio',
  ],

  brand: {
    mark: 'AR',
    word: 'artem.dev',
  },

  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ],

  social: {
    github: 'https://github.com/ArtemRozzhivin',
    linkedin: 'https://www.linkedin.com/in/artem-rozzhyvin-710757259/',
    email: 'artiomrozzhyvin@gmail.com',
  },

  cvUrl: 'https://drive.google.com/file/d/1mFCk8EQHdVk25NeMiPvqRNxTWUgK92DD/view?usp=sharing',

  footer: {
    copyright: `© ${new Date().getFullYear()} Artem Rozzhyvin — All rights reserved.`,
    tech: 'Built with Astro, React, TypeScript & Tailwind CSS.',
  },
} as const

export type SiteConfig = typeof siteConfig
