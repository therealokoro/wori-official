export type NavLink = {
  label: string
  to: string
  icon?: string
  subLinks?: Omit<NavLink, "subLinks">[] // Made subLinks mandatory with a default empty array
  active?: boolean // Added to reflect the return type
}

export const useActivePageLink = (links: NavLink[], homeRoute = "/") => {
  const route = useRoute()

  const normalizePath = (path: string) =>
    path.replace(/\/+$|^\/+/, "").toLowerCase()

  const markActiveLinks = (
    links: NavLink[]
  ): (NavLink & { active: boolean })[] => {
    return links.map((currLink) => {
      const active
        = normalizePath(currLink.to) === normalizePath(homeRoute)
          ? normalizePath(route.path) === normalizePath(homeRoute)
          : normalizePath(route.path).startsWith(normalizePath(currLink.to))

      return {
        ...currLink,
        active,
        ...(currLink.subLinks && {
          subLinks: Array.isArray(currLink.subLinks)
            ? markActiveLinks(currLink.subLinks)
            : []
        })
      }
    })
  }

  const cachedResult = computed(() => markActiveLinks(links))

  return cachedResult
}
