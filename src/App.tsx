import { ArrowUpRight } from 'lucide-react'
import { LandingSection } from './components/landing/LandingSection'
import { ContactLinks } from './components/landing/ContactMenu'
import { AboutSection } from './components/about/AboutSection'
import { ProjectsSection } from './components/projects/ProjectsSection'
import { contacts } from './data/content'
import { useActiveSection } from './hooks/useActiveSection'

function App() {
  const activeSection = useActiveSection()
  return <>
    <a className="skip-link" href="#about">Skip to content</a>
    <main id="main">
      <LandingSection activeSection={activeSection} />
      <AboutSection active={activeSection === 'about'} />
      <ProjectsSection activeSection={activeSection} />
      <section id="contact" className="chapter dark contact" aria-labelledby="contact-title">
        <div className="chapter-inner">
          <p className="eyebrow">06 / Let's make something worth watching</p>
          <h2 id="contact-title">Your story.<br />My next cut.</h2>
          <a className="contact-email" href={'mailto:' + contacts.email}>{contacts.email}<ArrowUpRight aria-hidden="true" /></a>
          <ContactLinks />
          <footer className="site-footer"><p>© {new Date().getFullYear()} MONANA</p><p>Video editing & content creation</p><a href="#home">Back to the beginning ↑</a></footer>
        </div>
      </section>
    </main>
  </>
}
export default App
