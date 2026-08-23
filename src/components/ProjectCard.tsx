import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../types'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <a href={project.url} aria-label={`View ${project.title} project`}>
        <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
          <span className="visual-label">{project.id} / {project.year}</span>
          <i /><i /><i />
        </div>
        <div className="project-card__body">
          <p className="project-meta">{project.category} <span>{project.year}</span></p>
          <h3>{project.title}<ArrowUpRight aria-hidden="true" /></h3>
          <p>{project.description}</p>
          <ul aria-label="Disciplines">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </div>
      </a>
    </article>
  )
}
