import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../data/content'
import { ContactMenu } from './ContactMenu'

const workItems = [
  { label: 'STORYTELLING', href: '#storytelling' },
  { label: 'LONG FORM', href: '#longform' },
  { label: 'PRODUCT', href: '#product' },
]

export function SideNavigation({ activeSection }: { activeSection: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('monalist-theme') === 'dark' ? 'dark' : 'light'
  })
  const [workOpen, setWorkOpen] = useState(false)
  const workCloseTimer = useRef<number | null>(null)

  const cancelWorkClose = () => {
    if (workCloseTimer.current !== null) {
      window.clearTimeout(workCloseTimer.current)
      workCloseTimer.current = null
    }
  }

  const openWork = () => {
    cancelWorkClose()
    setWorkOpen(true)
  }

  const closeWorkSoon = () => {
    cancelWorkClose()
    workCloseTimer.current = window.setTimeout(() => {
      setWorkOpen(false)
      workCloseTimer.current = null
    }, 350)
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('monalist-theme', theme)
  }, [theme])

  useEffect(() => () => cancelWorkClose(), [])

  const sectionTone = (() => {
    const darkSections = new Set(['about', 'contact'])
    const isDarkSection = darkSections.has(activeSection)
    if (theme === 'light') return isDarkSection ? 'dark' : 'light'
    return isDarkSection ? 'light' : 'dark'
  })()
  const navColor = sectionTone === 'dark' ? '#ffffff' : '#000000'

  return <nav className="side-nav" aria-label="Main navigation" style={{ ['--nav-color' as string]: navColor }}>
    {navigation.filter((item) => item.href !== '#storytelling').map((item) => (
      <a key={item.href} href={item.href} aria-current={item.href === '#' + activeSection ? 'location' : undefined}>{item.label}</a>
    ))}

    <div className="work-nav" onMouseEnter={openWork} onMouseLeave={closeWorkSoon} onFocus={openWork} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setWorkOpen(false)
    }}>
      <button
        type="button"
        className="work-trigger"
        aria-expanded={workOpen}
        aria-controls="work-submenu"
        aria-current={['storytelling', 'product', 'longform'].includes(activeSection) ? 'location' : undefined}
        onClick={() => setWorkOpen((open) => !open)}
        onKeyDown={(event) => { if (event.key === 'Escape') setWorkOpen(false) }}
      >
        WORK
      </button>
      <div id="work-submenu" className={`work-submenu${workOpen ? ' is-open' : ''}`} role="menu" aria-label="Work categories" onMouseEnter={cancelWorkClose}>
        {workItems.map((item) => (
          <a key={item.href} href={item.href} role="menuitem" aria-current={item.href === '#' + activeSection ? 'location' : undefined} onClick={() => setWorkOpen(false)}>{item.label}</a>
        ))}
      </div>
    </div>

    <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      {theme === 'light' ? 'DARK' : 'LIGHT'}
      {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </button>
    <ContactMenu activeSection={activeSection} />
  </nav>
}
