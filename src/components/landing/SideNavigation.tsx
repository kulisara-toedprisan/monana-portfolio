import { Moon, Sun } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navigation } from '../../data/content'
import { useMediaQuery } from '../../hooks/useMediaQuery'
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const isMobile = useMediaQuery('(max-width: 767px)')
  const workCloseTimer = useRef<number | null>(null)
  const scrollEndTimer = useRef<number | null>(null)
  const lastScrollY = useRef(0)

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

  useEffect(() => {
    const handleScroll = () => {
      if (!window.matchMedia('(max-width: 767px)').matches) return
      if (Math.abs(window.scrollY - lastScrollY.current) < 1) return
      lastScrollY.current = window.scrollY
      setIsScrolling(true)
      setMobileMenuOpen(false)
      setWorkOpen(false)

      if (scrollEndTimer.current !== null) window.clearTimeout(scrollEndTimer.current)
      scrollEndTimer.current = window.setTimeout(() => {
        setIsScrolling(false)
        scrollEndTimer.current = null
      }, 300)
    }

  lastScrollY.current = window.scrollY
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollEndTimer.current !== null) window.clearTimeout(scrollEndTimer.current)
    }
  }, [])

  const sectionTone = (() => {
    const darkSections = new Set(['about', 'contact'])
    const isDarkSection = darkSections.has(activeSection)
    if (theme === 'light') return isDarkSection ? 'dark' : 'light'
    return isDarkSection ? 'light' : 'dark'
  })()
  const navColor = sectionTone === 'dark' ? '#ffffff' : '#000000'
  const navBackground = sectionTone === 'dark' ? 'var(--color-black)' : 'var(--color-grey-100)'
  const closeMobileNavigation = () => {
    setMobileMenuOpen(false)
    setWorkOpen(false)
  }

  return <nav
    className={`side-nav${mobileMenuOpen ? ' mobile-is-open' : ''}${isScrolling ? ' is-scrolling' : ''}`}
    aria-label="Main navigation"
    style={{ ['--nav-color' as string]: navColor, ['--nav-background' as string]: navBackground }}
  >
    <button
      type="button"
      className="mobile-nav-toggle"
      aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={mobileMenuOpen}
      aria-controls="navigation-items"
      onClick={() => {
        setMobileMenuOpen((open) => !open)
        setWorkOpen(false)
      }}
    >
      <span />
      <span />
      <span />
    </button>

    <div id="navigation-items" className="navigation-items" aria-hidden={isMobile && !mobileMenuOpen} inert={isMobile && !mobileMenuOpen ? true : undefined}>
      {navigation.filter((item) => item.href !== '#storytelling').map((item) => (
        <a key={item.href} href={item.href} aria-current={item.href === '#' + activeSection ? 'location' : undefined} onClick={closeMobileNavigation}>{item.label}</a>
      ))}

      <div className="work-nav" onMouseEnter={() => { if (!isMobile) openWork() }} onMouseLeave={() => { if (!isMobile) closeWorkSoon() }} onFocus={() => { if (!isMobile) openWork() }} onBlur={(event) => {
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
            <a key={item.href} href={item.href} role="menuitem" aria-current={item.href === '#' + activeSection ? 'location' : undefined} onClick={closeMobileNavigation}>{item.label}</a>
          ))}
        </div>
      </div>

      <button className="theme-toggle" type="button" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'DARK' : 'LIGHT'}
        {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
      </button>
      <ContactMenu activeSection={activeSection} onNavigate={closeMobileNavigation} />
    </div>
  </nav>
}
