import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  className?: string
  delay?: number
  children: ReactNode
}

/**
 * Fades content in once it scrolls into view.
 * Visibility lives in React state (not an imperatively added class), so re-renders can never wipe it,
 * and anything already on screen at mount is revealed immediately.
 */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return
    if (!('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }

    const rect = element.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Tiny threshold: tall cards reveal as soon as their edge appears.
      { threshold: 0.01, rootMargin: '0px 0px -40px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag ref={ref} className={`reveal${visible ? ' is-visible' : ''} ${className}`} style={{ '--delay': `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  )
}
