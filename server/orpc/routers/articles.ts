import { eq } from 'drizzle-orm'
import { db } from 'hub:db'
import z from 'zod'
import { article } from '~~/server/db/schema'

import { publicProcedure } from '../index'

export const todoRouter = {
  getAll: publicProcedure.handler(async () => {
    return await db.select().from(article)
  })
}
