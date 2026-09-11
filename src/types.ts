export type CategoryId = 'storytelling' | 'product' | 'longform'

export interface NavigationItem { label: string; href: string }
export interface Category { id: CategoryId; number: string; label: string; lines: string[] }
export interface Project {
  id: string
  title: string
  category: CategoryId
  platform: 'instagram' | 'youtube'
  mediaType: 'instagram' | 'youtube' | 'video'
  videoUrl: string
  videoSrc: string
  aspectRatio: '9:16' | '16:9'
  externalUrl: string
  embedUrl: string
  videoId?: string
  shortcode?: string
  description: string
  software: string[]
  tools: string[]
  year?: string
  duration?: string
}
export interface SocialLink { label: string; href: string }
