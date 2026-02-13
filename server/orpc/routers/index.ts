import type { RouterClient } from '@orpc/server'
import { publicProcedure } from '../index'
import { todoRouter as articlesRouter } from './articles'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  articles: articlesRouter,
};

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
