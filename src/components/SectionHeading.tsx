import type { ReactNode } from 'react'

interface SectionHeadingProps { id: string; number: string; title: ReactNode; intro: string }
export function SectionHeading({ id, number, title, intro }: SectionHeadingProps) {
  return <><div className="chapter-top"><p className="eyebrow">{number} / {intro}</p><a href="#home">MONANA ↗</a></div><h2 id={id} tabIndex={-1}>{title}</h2></>
}
