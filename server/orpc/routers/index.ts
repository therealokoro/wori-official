import type { RouterClient } from '@orpc/server'
import { publicProcedure } from '../index'
import { articleRouter } from './articles'
import { messageRouter } from './messages'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  articles: articleRouter,
  messages: messageRouter,
};

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
