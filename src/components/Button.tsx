import { ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface ButtonProps { href: string; children: ReactNode; showIcon?: boolean }
export function Button({ href, children, showIcon = false }: ButtonProps) {
  return <a className="button" href={href}>{children}{showIcon && <ArrowUpRight aria-hidden="true" />}</a>
}
