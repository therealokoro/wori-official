export const getSiteUrl = (): ComputedRef<string> => {
  const runtimeUrl = useRuntimeConfig().public.siteUrl as string | undefined

  return computed(() => {
    if (runtimeUrl) return runtimeUrl

    const { protocol, host } = useRequestURL()
    return `${protocol}//${host}`
  })
}