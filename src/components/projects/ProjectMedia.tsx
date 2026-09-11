import type { CSSProperties } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../types'
import { EmbeddedVideo } from './EmbeddedVideo'
import { YouTubePlayer } from './YouTubePlayer'

export function ProjectMedia({ project }: { project: Project }) {
  const isLocal = Boolean(project.videoSrc)
  const isYoutube = !isLocal && project.platform === 'youtube'

  return <div className="project-media">
    <div className="media-stage" style={{ '--media-ratio': project.aspectRatio.replace(':', ' / ') } as CSSProperties}>
      {isLocal ? <video src={project.videoSrc} muted playsInline preload="metadata" controls aria-label={project.title} /> : isYoutube ? <YouTubePlayer project={project} /> : <EmbeddedVideo project={project} />}
    </div>
    <a className="project-external" href={project.externalUrl || project.videoUrl} target="_blank" rel="noopener noreferrer">View on {project.platform === 'youtube' ? 'YouTube' : 'Instagram'}<ArrowUpRight aria-hidden="true" /></a>
  </div>
}
