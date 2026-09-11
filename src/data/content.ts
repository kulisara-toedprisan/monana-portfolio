import type { Category, NavigationItem } from '../types'

export const navigation: NavigationItem[] = [
  { label: 'HOME', href: '#home' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORK', href: '#storytelling' },
]
export const categories: Category[] = [
  { id: 'storytelling', number: '03', label: 'Storytelling', lines: ['STORYTELLING /', 'DAY IN THE LIFE'] },
  { id: 'product', number: '04', label: 'Product', lines: ['PRODUCT /', 'TESTIMONIAL'] },
  { id: 'longform', number: '05', label: 'Long form', lines: ['LONG FORM'] },
]
export const contacts = {
  instagram: 'https://www.instagram.com/monalist._/',
  line: '@991npdhg',
  email: 'monana.edits@gmail.com',
}
