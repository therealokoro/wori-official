import type { RouterClient } from '@orpc/server'
import { publicProcedure } from '../index'
import { articleRouter } from './articles'
import { albumRouter } from './album'
import { messageRouter } from './messages'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  albums: albumRouter,
  articles: articleRouter,
  messages: messageRouter,
};

export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
