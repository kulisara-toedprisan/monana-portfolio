import { ArrowDown, ArrowRight, Asterisk, CircleDot, Mail } from 'lucide-react'
import { Button } from './components/Button'
import { ProjectCard } from './components/ProjectCard'
import { SectionHeading } from './components/SectionHeading'
import { SiteHeader } from './components/SiteHeader'
import { projects, services, socials } from './data/content'

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="page-shell">
        <SiteHeader />
        <main id="main">
          <section className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero__copy reveal">
              <p className="eyebrow">[01] / 04 · INDEPENDENT CREATIVE DEVELOPER</p>
              <h1 id="hero-title">DIGITAL WORK<br />WITH A <em>PULSE</em></h1>
              <p className="hero__intro">I shape expressive brands and build useful digital products—where sharp ideas, tactile interfaces, and clean code meet.</p>
              <div className="hero__actions"><Button href="#work">Explore work</Button><Button href="#contact" variant="secondary">Start a project</Button></div>
            </div>

            <div className="hero__wordmark" aria-hidden="true"><span>MONA</span><span>LIST</span></div>
            <div className="hero__art reveal reveal--delay">
              <div className="orbit orbit--one" aria-hidden="true" /><div className="orbit orbit--two" aria-hidden="true" />
              <img src="/images/monalist-computer.png" alt="Playful orange retro computer with a smiling cursor character" />
            </div>

            <aside className="hero__stats reveal reveal--delay-2" aria-label="Studio status">
              <div className="status"><span aria-hidden="true" /> Available for select projects</div>
              <div className="metric"><strong>08</strong><span>projects shaped<br />this year</span></div>
              <p>Based in Toronto<br />Working worldwide</p>
            </aside>

            <a className="scroll-cue" href="#work"><ArrowDown aria-hidden="true" size={16} />Scroll to explore</a>
          </section>

          <div className="marquee" aria-label="Creative direction, interface design, creative development">
            <div><span>CREATIVE DIRECTION</span><Asterisk /><span>INTERFACE DESIGN</span><Asterisk /><span>CREATIVE DEVELOPMENT</span><Asterisk /><span>CREATIVE DIRECTION</span><Asterisk /></div>
          </div>

          <section className="section work" id="work" aria-labelledby="work-title">
            <SectionHeading id="work-title" number="02" title="SELECTED WORK" intro="Three recent explorations in identity, interaction, and frontend craft. Each one starts with a useful idea and ends in a system built to last." />
            <div className="projects-grid">{projects.map((project) => <ProjectCard project={project} key={project.id} />)}</div>
          </section>

          <section className="section services" id="services" aria-labelledby="services-title">
            <SectionHeading id="services-title" number="03" title="HOW I CAN HELP" intro="From the first sketch to the last responsive breakpoint, I bring strategy, design, and implementation into one focused process." />
            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon
                return <article className="service-card" key={service.id}><span>{service.id}</span><Icon aria-hidden="true" /><h3>{service.title}</h3><p>{service.description}</p></article>
              })}
            </div>
          </section>

          <section className="section about" id="about" aria-labelledby="about-title">
            <div className="about__marker" aria-hidden="true"><CircleDot /><span>THINK<br />MAKE<br />REFINE</span></div>
            <div className="about__copy">
              <p className="eyebrow">[04] / 04 · ABOUT THE PRACTICE</p>
              <h2 id="about-title">ONE BRAIN.<br />NO HANDOFF GAP.</h2>
              <p className="about__lead">Monalist is a compact practice for ambitious digital work. The person shaping the idea is also sweating the spacing, states, performance, and final line of code.</p>
              <div className="about__details"><p><strong>Good work feels inevitable.</strong><br />Clear thinking first. Character second. Decoration only when it earns its place.</p><p><strong>Built for real life.</strong><br />Responsive, accessible, maintainable, and ready to meet actual people on actual devices.</p></div>
            </div>
          </section>

          <section className="contact" id="contact" aria-labelledby="contact-title">
            <p className="eyebrow">HAVE A GOOD PROBLEM?</p>
            <h2 id="contact-title">LET'S MAKE IT<br /><em>MATTER.</em></h2>
            <a className="contact__mail" href="mailto:hello@monalist.studio"><Mail aria-hidden="true" /> hello@monalist.studio <ArrowRight aria-hidden="true" /></a>
          </section>
        </main>
        <footer className="footer"><p>© {new Date().getFullYear()} Monalist. Built with care.</p><nav aria-label="Social links">{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</nav><a href="#home">Back to top ↑</a></footer>
      </div>
    </>
  )
}

export default App
