import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react'
import { categories } from '../../data/content'
import monalistProjects from '../../data/MonalistProject.js'
import type { Category, Project } from '../../types'
import { SectionHeading } from '../SectionHeading'
import { ProjectDetails } from './ProjectDetails'
import { ProjectMedia } from './ProjectMedia'

export function ProjectsSection() {
  return <>{categories.map(category => <CategoryProjectsSection key={category.id} category={category} />)}</>
}

function CategoryProjectsSection({ category }: { category: Category }) {
  const projects = monalistProjects.filter(project => project.category === category.id)
  const strip = useRef<HTMLDivElement>(null)
  const drag = useRef({ pointerId: 0, startX: 0, scrollLeft: 0, moved: false })
  const [scroll, setScroll] = useState({ canScroll: false, atStart: true, atEnd: true })
  const updateScrollState = useCallback(() => {
    const node = strip.current
    if (!node) return
    const canScroll = node.scrollWidth > node.clientWidth + 2
    setScroll({
      canScroll,
      atStart: node.scrollLeft <= 2,
      atEnd: !canScroll || node.scrollLeft + node.clientWidth >= node.scrollWidth - 2,
    })
  }, [])
  useEffect(() => {
    const node = strip.current
    if (!node) return
    const resize = new ResizeObserver(updateScrollState)
    resize.observe(node)
    node.addEventListener('scroll', updateScrollState, { passive: true })
    requestAnimationFrame(updateScrollState)
    return () => {
      resize.disconnect()
      node.removeEventListener('scroll', updateScrollState)
    }
  }, [projects.length, updateScrollState])
  function move(direction: -1 | 1) {
    const node = strip.current
    if (!node) return
    node.scrollBy({ left: direction * Math.max(280, node.clientWidth * .82), behavior: 'smooth' })
  }
  function keyScroll(event: ReactKeyboardEvent<HTMLDivElement>) {
    const node = strip.current
    if (!node) return
    if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
    if (event.key === 'Home') { event.preventDefault(); node.scrollTo({ left: 0, behavior: 'smooth' }) }
    if (event.key === 'End') { event.preventDefault(); node.scrollTo({ left: node.scrollWidth, behavior: 'smooth' }) }
  }
  function pointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (!scroll.canScroll || event.pointerType === 'touch' || event.button !== 0) return
    if (event.target instanceof HTMLElement && event.target.closest('a, button, video, iframe, dialog')) return
    drag.current = { pointerId: event.pointerId, startX: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
  }
  function pointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag.current.pointerId !== event.pointerId) return
    const delta = event.clientX - drag.current.startX
    if (Math.abs(delta) > 4) drag.current.moved = true
    if (drag.current.moved) {
      event.preventDefault()
      event.currentTarget.scrollLeft = drag.current.scrollLeft - delta
    }
  }
  function pointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (drag.current.pointerId !== event.pointerId) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    drag.current.pointerId = 0
  }
  return <section id={category.id} className="chapter projects category-projects" aria-labelledby={category.id + '-title'}>
    <div className="chapter-inner">
      <SectionHeading id={category.id + '-title'} number={category.number} title={category.lines.map((line, index) => <span key={line}>{line}{index < category.lines.length - 1 && <br />}</span>)} intro={category.label} />
      <div className="project-strip-header">
        <p className="project-count">{String(projects.length).padStart(2, '0')} projects</p>
        {scroll.canScroll && !scroll.atEnd && <p className="drag-indicator" aria-hidden="true"><span className="drag-label">DRAG</span> →</p>}
      </div>
      <div className="project-carousel" aria-label={`${category.label} projects`}>
        <button className="project-arrow" type="button" aria-label={`Previous ${category.label} project`} disabled={!scroll.canScroll || scroll.atStart} onClick={() => move(-1)}><ArrowLeft aria-hidden="true" /></button>
        <div ref={strip} className="project-strip" tabIndex={0} role="list" aria-label={`${category.label} horizontal project strip`} onKeyDown={keyScroll} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onClickCapture={event => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false } }}>
          {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
        </div>
        <button className="project-arrow" type="button" aria-label={`Next ${category.label} project`} disabled={!scroll.canScroll || scroll.atEnd} onClick={() => move(1)}><ArrowRight aria-hidden="true" /></button>
      </div>
    </div>
  </section>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="project-card" role="listitem" aria-labelledby={'title-' + project.id}>
    <p className="project-index">PROJECT {String(index + 1).padStart(2, '0')}</p>
    <ProjectMedia project={project} />
    <h3 id={'title-' + project.id}>{project.title}</h3>
    <ProjectDetails project={project} />
  </article>
}
