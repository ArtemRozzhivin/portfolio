export const siteConfig = {
  name: 'Artem Rozzhyvin',
  description:
    'Frontend developer with 2+ years of experience building fast, accessible web apps with React, Next.js and TypeScript.',
  url: 'https://artem.dev',
  ogImage: '/og.png',

  author: {
    name: 'Artem Rozzhyvin',
    email: 'artiomrozzhyvin@gmail.com',
    twitter: '',
  },

  keywords: [
    'Artem Rozzhyvin',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
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

  cvUrl: 'https://drive.google.com/file/d/14F_FG34a9RStijTHu4KGtQ91jDoTdUr0/view',

  footer: {
    copyright: `© ${new Date().getFullYear()} Artem Rozzhyvin — All rights reserved.`,
    tech: 'Built with Astro, React, TypeScript & Tailwind CSS.',
  },
} as const

export type SiteConfig = typeof siteConfig
