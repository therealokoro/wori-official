import { ORPCError } from '@orpc/server'
import { db } from 'hub:db'
import { message } from '~~/server/db/schema'
import { publicProcedure } from '../index'

export const messageRouter = {
  send: publicProcedure
    .input(CreateMessageSchema)
    .output(MessageSchema)
    .handler(async ({ input }) => {
      const [newMessage] = await db.insert(message).values(input).returning()

      if (!newMessage) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', {
          message: 'Failed to send your message, please try again',
        })
      }

      return newMessage
    }),
}