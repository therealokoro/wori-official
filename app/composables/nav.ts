/* eslint-disable ts/no-empty-object-type */
import { useRoute } from '#imports'
import { computed } from 'vue'

export type NavLink<T extends Record<string, unknown> = {}> = {
  label: string
  to: string
  children?: NavLink<T>[]
} & T

export type NavLinkWithActive<T extends Record<string, unknown> = {}>
  = NavLink<T> & {
    active: boolean
    children?: NavLinkWithActive<T>[]
  }

export function useActivePageLink<T extends Record<string, unknown> = {}>(
  links: NavLink<T>[]
) {
  const route = useRoute()

  const mark = (items: NavLink<T>[]): NavLinkWithActive<T>[] =>
    items.map((link) => {
      const children = link.children ? mark(link.children) : undefined

      const active
        = route.matched.some(r => r.path === link.to)
          || (children?.some(c => c.active) ?? false)

      return { ...link, active, children }
    })

  return computed(() => mark(links))
}
