import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../types'

declare global {
  interface Window { instgrm?: { Embeds: { process: () => void } } }
}
let instagramScript: Promise<void> | undefined
function loadInstagram() {
  if (window.instgrm) return Promise.resolve()
  if (!instagramScript) {
    instagramScript = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => { script.remove(); instagramScript = undefined; reject(new Error('Instagram unavailable')) }
      document.body.append(script)
    })
  }
  return instagramScript
}

function InstagramEmbed({ project }: { project: Project }) {
  const host = useRef<HTMLDivElement>(null)
  const [unavailable, setUnavailable] = useState(false)
  useEffect(() => {
    const container = host.current
    if (!container) return
    let disposed = false
    const blockquote = document.createElement('blockquote')
    blockquote.className = 'instagram-media'
    blockquote.dataset.instgrmPermalink = project.videoUrl
    blockquote.dataset.instgrmVersion = '14'
    const link = document.createElement('a')
    link.href = project.videoUrl
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.textContent = 'View on Instagram'
    blockquote.append(link)
    container.append(blockquote)
    const observer = new MutationObserver(() => {
      container.querySelectorAll('iframe').forEach(frame => {
        frame.title = project.title + ' — Instagram video'
        frame.loading = 'lazy'
      })
    })
    observer.observe(container, { childList: true, subtree: true })
    const timeout = window.setTimeout(() => {
      if (!container.querySelector('iframe')) setUnavailable(true)
    }, 10000)
    loadInstagram().then(() => {
      if (!disposed) window.instgrm?.Embeds.process()
    }).catch(() => { if (!disposed) setUnavailable(true) })
    return () => {
      disposed = true
      clearTimeout(timeout)
      observer.disconnect()
      container.replaceChildren()
    }
  }, [project])
  return <>{unavailable && <p className="embed-notice" role="status">The preview isn't available here. You can still watch this video on Instagram using the link below.</p>}<div className="instagram-host" ref={host} /></>
}

export function EmbeddedVideo({ project }: { project: Project }) {
  if (project.platform === 'instagram') return <InstagramEmbed project={project} />
  return <iframe
    src={project.embedUrl + '?autoplay=0&playsinline=1&rel=0'}
    title={project.title + ' — YouTube video'}
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
    allowFullScreen
    referrerPolicy="strict-origin-when-cross-origin"
  />
}
