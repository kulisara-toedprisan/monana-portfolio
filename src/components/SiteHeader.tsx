import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { navigation } from '../data/content'
import { Button } from './Button'
import { LogoMark } from './LogoMark'

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [])

  return (
    <header className="site-header">
      <LogoMark />
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav id="site-nav" className={`site-nav${open ? ' is-open' : ''}`} aria-label="Primary navigation">
        {navigation.map((item) => <a href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
      <div className="header-cta"><Button href="#contact" variant="dark">Let's talk</Button></div>
    </header>
  )
}
