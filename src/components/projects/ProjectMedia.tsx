import { useEffect, useRef } from 'react'
import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'
import { EmbeddedVideo } from './EmbeddedVideo'
import { YouTubePlayer } from './YouTubePlayer'

export function ProjectMedia({ project, isActive, useTouchPlaybackLifecycle }: { project: Project; isActive: boolean; useTouchPlaybackLifecycle: boolean }) {
  const isLocal = Boolean(project.videoSrc)
  const isYoutube = !isLocal && project.platform === 'youtube'
  const media = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const wasActive = useRef(isActive)

  useEffect(() => {
    const becameInactive = wasActive.current && !isActive
    wasActive.current = isActive

    if (useTouchPlaybackLifecycle && becameInactive) {
      video.current?.pause()
      if (!isLocal && !isYoutube) {
        const iframe = media.current?.querySelector<HTMLIFrameElement>('.instagram-host iframe')
        if (iframe) iframe.setAttribute('src', iframe.src)
      }
    }
  }, [isActive, isLocal, isYoutube, useTouchPlaybackLifecycle])

  return <div className="project-media" ref={media}>
    <div className="media-stage" style={{ '--media-ratio': project.aspectRatio.replace(':', ' / ') } as CSSProperties}>
      {isLocal ? <video ref={video} src={project.videoSrc} muted playsInline preload="metadata" controls aria-label={project.title} /> : isYoutube ? <YouTubePlayer project={project} isActive={isActive} useTouchPlaybackLifecycle={useTouchPlaybackLifecycle} /> : <EmbeddedVideo project={project} />}
    </div>
    <a className="project-external" href={project.externalUrl || project.videoUrl} target="_blank" rel="noopener noreferrer">View on {project.platform === 'youtube' ? 'YouTube' : 'Instagram'}<ArrowUpRight aria-hidden="true" /></a>
  </div>
}
