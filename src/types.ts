import type { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  label: string
  href: string
}

export interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  tags: string[]
  url: string
  visual: 'orbital' | 'blocks' | 'signal'
}

export interface Service {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface SocialLink {
  label: string
  href: string
}
