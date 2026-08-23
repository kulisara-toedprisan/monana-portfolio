import { Braces, Component, Sparkles } from 'lucide-react'
import type { NavigationItem, Project, Service, SocialLink } from '../types'

export const navigation: NavigationItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]

export const projects: Project[] = [
  {
    id: '01', title: 'Orbit Archive', category: 'Digital product', year: '2026',
    description: 'A tactile research library that turns a dense collection into an inviting visual map.',
    tags: ['Art direction', 'React', 'Interaction'], url: '#contact', visual: 'orbital',
  },
  {
    id: '02', title: 'Common Ground', category: 'Brand platform', year: '2025',
    description: 'A modular identity and publishing system built to let a community speak in many voices.',
    tags: ['Identity', 'Design system', 'Frontend'], url: '#contact', visual: 'blocks',
  },
  {
    id: '03', title: 'Signal / Noise', category: 'Editorial experience', year: '2025',
    description: 'A fast, focused reading experience that makes live cultural data feel unmistakably human.',
    tags: ['Creative code', 'UX', 'Motion'], url: '#contact', visual: 'signal',
  },
]

export const services: Service[] = [
  { id: '01', title: 'Digital direction', description: 'Finding the useful idea, visual language, and product shape before pixels multiply.', icon: Sparkles },
  { id: '02', title: 'Interface systems', description: 'Distinct, accessible interfaces designed as reusable systems—not disposable screens.', icon: Component },
  { id: '03', title: 'Creative development', description: 'Responsive React builds with expressive motion, strong semantics, and production discipline.', icon: Braces },
]

export const socials: SocialLink[] = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'GitHub', href: 'https://github.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
]
