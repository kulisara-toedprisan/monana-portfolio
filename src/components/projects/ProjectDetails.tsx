import type { Project } from '../../types'

export function ProjectDetails({ project }: { project: Project }) {
  return <dl className="project-details">
    <dt>DESCRIPTION</dt><dd>{project.description}</dd>
    <dt>SOFTWARE</dt><dd><ul>{project.software.map(item => <li key={item}>{item}</li>)}</ul></dd>
    <dt>TOOLS / EDITING SKILLS</dt><dd><ul>{project.tools.map(item => <li key={item}>{item}</li>)}</ul></dd>
  </dl>
}
