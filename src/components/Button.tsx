import { ArrowUpRight } from 'lucide-react'

interface ButtonProps {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'dark'
  showIcon?: boolean
}

export function Button({ href, children, variant = 'primary', showIcon = false }: ButtonProps) {
  return (
    <a className={`button button--${variant}`} href={href}>
      <span>{children}</span>{showIcon && <ArrowUpRight aria-hidden="true" size={18} />}
    </a>
  )
}
