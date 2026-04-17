// import { useRequestURL } from "nuxt/app"

export const slugify = (s: string) => {
  return s.toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036F]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const getSiteUrl = () => {
  const runtimeUrl = useRuntimeConfig().public.siteUrl as string | undefined
  return runtimeUrl || ""
  // if (runtimeUrl) return runtimeUrl
  // const { protocol, host } = useRequestURL()
  // return `${protocol}//${host}`
}