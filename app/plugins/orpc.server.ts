import { createRouterClient } from '@orpc/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { appRouter } from '~~/server/orpc/routers/index'

export default defineNuxtPlugin(async () => {
  const client = createRouterClient(appRouter)
  const orpc = createTanstackQueryUtils(client)

  return {
    provide: {
      orpc,
    },
  }
})
