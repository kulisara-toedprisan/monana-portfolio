import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../types'

interface YouTubeApi {
  Player: new (element: HTMLElement, options: {
    videoId: string
    playerVars: Record<string, string | number>
    events: { onReady: (event: { target: { getIframe: () => HTMLIFrameElement; pauseVideo: () => void } }) => void; onError: () => void }
  }) => { destroy: () => void; mute: () => void; playVideo: () => void; pauseVideo: () => void; getIframe: () => HTMLIFrameElement }
}
type YouTubePlayerInstance = { destroy: () => void; mute: () => void; playVideo: () => void; pauseVideo: () => void; getIframe: () => HTMLIFrameElement }
declare global {
  interface Window { YT?: YouTubeApi; onYouTubeIframeAPIReady?: () => void }
}
let apiPromise: Promise<YouTubeApi> | undefined
function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (!apiPromise) apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const script = document.createElement('script')
    const previous = window.onYouTubeIframeAPIReady
    const timeout = window.setTimeout(() => fail(), 12000)
    const fail = () => {
      clearTimeout(timeout)
      script.remove()
      apiPromise = undefined
      window.onYouTubeIframeAPIReady = previous
      reject(new Error('YouTube player unavailable'))
    }
    window.onYouTubeIframeAPIReady = () => {
      clearTimeout(timeout)
      previous?.()
      if (window.YT) resolve(window.YT)
    }
    script.src = 'https://www.youtube.com/iframe_api'
    script.onerror = fail
    document.head.append(script)
  })
  return apiPromise
}

export function YouTubePlayer({ project, isActive, useTouchPlaybackLifecycle }: { project: Project; isActive: boolean; useTouchPlaybackLifecycle: boolean }) {
  const host = useRef<HTMLDivElement>(null)
  const player = useRef<YouTubePlayerInstance | null>(null)
  const active = useRef(isActive)
  const [error, setError] = useState(false)

  useEffect(() => {
    active.current = isActive
    if (useTouchPlaybackLifecycle && !isActive) player.current?.pauseVideo()
  }, [isActive, useTouchPlaybackLifecycle])

  useEffect(() => {
    const container = host.current
    if (!container) return
    let disposed = false
    loadApi().then(api => {
      if (disposed) return
      const mount = document.createElement('div')
      container.append(mount)
      player.current = new api.Player(mount, {
        videoId: project.videoId || project.embedUrl.split('/').pop() || '',
        playerVars: { autoplay: 0, playsinline: 1, controls: 1, rel: 0, origin: window.location.origin },
        events: {
          onReady: event => {
            if (disposed) return
            const iframe = event.target.getIframe()
            iframe.title = project.title + ' — YouTube video'
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen'
            iframe.loading = 'lazy'
            iframe.style.width = '100%'
            iframe.style.height = '100%'
            iframe.style.display = 'block'
            iframe.style.border = '0'
            iframe.style.position = 'absolute'
            iframe.style.inset = '0'
            if (useTouchPlaybackLifecycle && !active.current) event.target.pauseVideo()
          },
          onError: () => { if (!disposed) setError(true) },
        },
      })
    }).catch(() => { if (!disposed) setError(true) })
    return () => {
      disposed = true
      player.current?.destroy()
      player.current = null
      container.replaceChildren()
    }
  }, [project, useTouchPlaybackLifecycle])

  return <>{error && <p className="player-error" role="status">This preview is unavailable. Use “View on YouTube” below.</p>}<div className="youtube-host" ref={host} /></>
}
