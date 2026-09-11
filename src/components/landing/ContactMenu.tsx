import { ArrowUpRight, Copy, Mail } from 'lucide-react'
import { useState } from 'react'
import { contacts } from '../../data/content'

export function ContactLinks() {
  const [status, setStatus] = useState('')
  async function copyLine() {
    try {
      await navigator.clipboard.writeText(contacts.line)
      setStatus('Copied LINE ID')
    } catch {
      setStatus('Copy unavailable. Select the LINE ID above to copy it.')
    }
  }
  return <>
    <div className="contact-links">
      <a href={contacts.instagram} target="_blank" rel="noopener noreferrer"><ArrowUpRight aria-hidden="true" />Instagram</a>
      <button type="button" onClick={copyLine} aria-label={`Copy LINE ID ${contacts.line}`}><Copy aria-hidden="true" /><span>LINE <small>{contacts.line}</small></span></button>
      <a href={`mailto:${contacts.email}`}><Mail aria-hidden="true" />Gmail</a>
    </div>
    <p className="copy-status" role="status">{status}</p>
  </>
}

export function ContactMenu({ activeSection, onNavigate }: { activeSection: string, onNavigate?: () => void }) {
  const goToContact = () => {
    const section = document.getElementById('contact')
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', '#contact')
    onNavigate?.()
  }

  return <button
    type="button"
    className="contact-trigger"
    aria-current={activeSection === 'contact' ? 'location' : undefined}
    onClick={goToContact}
  >
    CONTACT
  </button>
}
