interface SectionHeadingProps {
  id: string
  number: string
  title: string
  intro: string
}

export function SectionHeading({ id, number, title, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow">[{number}] / 04</p>
      <h2 id={id}>{title}</h2>
      <p>{intro}</p>
    </div>
  )
}
