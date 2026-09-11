import { useEffect, useRef } from 'react'
import original from '../../images/landing_section/my_landing_image.jpeg'

const cutouts = import.meta.glob('../../images/landing_section/my_landing_image_cutout.{png,webp}', {
  eager: true, query: '?url', import: 'default',
})
const cutout = Object.values(cutouts).find((value): value is string => typeof value === 'string')

export function LandingPortrait() {
  const image = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const img = image.current
    const section = img?.closest('section')
    if (!img || !section) return
    const enabled = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    let target = 0
    let current = 0
    let frame = 0
    let idle = 0
    const tick = () => {
      current += (target - current) * .09
      if (Math.abs(target - current) < .01) current = target
      section.style.setProperty('--portrait-shift', `${current}px`)
      img.style.filter = `grayscale(${1 - Math.abs(current) / 26 * .8})`
      frame = current !== target ? requestAnimationFrame(tick) : 0
    }
    const start = () => { if (!frame) frame = requestAnimationFrame(tick) }
    const reset = () => { target = 0; clearTimeout(idle); start() }
    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType === 'touch') return
      const range = window.innerWidth < 540 ? 40 : window.innerWidth < 768 ? 56 : window.innerWidth < 1024 ? 72 : window.innerWidth < 1440 ? 88 : 110
      target = Math.max(-range, Math.min(range, (event.clientX / window.innerWidth * 2 - 1) * range))
      clearTimeout(idle)
      idle = window.setTimeout(reset, 1200)
      start()
    }
    const change = () => {
      cancelAnimationFrame(frame)
      frame = 0
      current = target = 0
      section.style.setProperty('--portrait-shift', '0px')
      img.style.filter = 'grayscale(1)'
    }
    section.addEventListener('pointermove', move)
    section.addEventListener('pointerleave', reset)
    window.addEventListener('blur', reset)
    enabled.addEventListener('change', change)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(idle)
      section.removeEventListener('pointermove', move)
      section.removeEventListener('pointerleave', reset)
      window.removeEventListener('blur', reset)
      enabled.removeEventListener('change', change)
    }
  }, [])
  return <div className={`portrait${cutout ? '' : ' portrait--original'}`}>
    <img ref={image} src={cutout || original} alt="Mona seated, smiling and holding up two peace signs" fetchPriority="high" decoding="async" />
  </div>
}
