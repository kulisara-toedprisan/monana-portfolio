import { Button } from '../Button'

export function AboutSection({ active }: { active: boolean }) {
  return <section className={`chapter dark about${active ? ' is-active' : ''}`} id="about" aria-labelledby="about-title">
    <div className="chapter-inner">
      <div className="chapter-top"><p className="eyebrow">02 / Behind the edits</p><a href="#home">MONANA ↗</a></div>
      <div className="about-content">
        <h2 id="about-title">Hi, I'm Mona <span className="wave" role="img" aria-label="waving hello">👋</span></h2>
        <p className="about-copy">Video editor focused on short-form content for TikTok, Reels, and Shorts. I edit raw footage into hook-driven, story-first videos with strong pacing, captions, and sound design.</p>
      </div>
      <div className="about-footer"><p className="eyebrow">Story first. Every frame counts.</p><Button href="#storytelling" showIcon>Explore my work</Button></div>
    </div>
  </section>
}
