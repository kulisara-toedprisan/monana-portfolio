import { useEffect, useState } from 'react'

export function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })
    document.querySelectorAll('main > section').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return active
}
