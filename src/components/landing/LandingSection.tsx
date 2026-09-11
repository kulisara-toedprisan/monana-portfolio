import { ArrowDown } from 'lucide-react'
import portfolioMask from '../../images/landing_section/my_landing_image_cutout.png'
import { LogoMark } from '../LogoMark'
import { LandingPortrait } from './LandingPortrait'
import { SideNavigation } from './SideNavigation'

export function LandingSection({ activeSection }: { activeSection: string }) {
  return <section id="home" className="chapter landing" aria-labelledby="landing-title" style={{ ['--portfolio-mask' as string]: `url(${portfolioMask})` }}>
    <div className="chapter-inner landing-inner">
      <header className="landing-header"><LogoMark /><p className="eyebrow">Video editor /<br />Content creator</p></header>
      <div className="hero-title-wrap">
        <h1 className="landing-title landing-title--base" id="landing-title">PORTFOLIO</h1>
        <h1 className="landing-title landing-title--contrast" aria-hidden="true">PORTFOLIO</h1>
      </div>
      <LandingPortrait />
      <SideNavigation activeSection={activeSection} />
      <div className="landing-footer">
        <p>A good story.<br />A better cut.</p>
        <a className="scroll-link" href="#about">Scroll to meet Mona <ArrowDown aria-hidden="true" /></a>
      </div>
    </div>
  </section>
}
