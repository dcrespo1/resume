import type { Action } from 'svelte/action'

// Svelte action: adds an `in` class once the element scrolls into view.
// Respects prefers-reduced-motion by revealing immediately.
export const reveal: Action<HTMLElement, number | undefined> = (node, delay = 0) => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce) {
    node.classList.add('in')
    return {}
  }

  node.style.transitionDelay = `${delay}ms`

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('in')
          io.unobserve(node)
        }
      }
    },
    { threshold: 0.12 }
  )
  io.observe(node)

  return {
    destroy() {
      io.disconnect()
    },
  }
}
