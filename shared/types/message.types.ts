import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'
import { message } from '~~/server/db/schema'

export const CreateMessageSchema = createInsertSchema(message, {
  name: z.string('Name is required'),
  email: z.string('Email is required'),
  body: z.string('Message body is required'),
}).omit({
  id: true,
  isRead: true,
  createdAt: true,
  response: true,
})

export type CreateMessageType = z.output<typeof CreateMessageSchema>

export const UpdateMessageSchema = createUpdateSchema(message)
export type UpdateMessageType = z.output<typeof UpdateMessageSchema>

export const MessageSchema = createSelectSchema(message)
export type MessageType = z.output<typeof MessageSchema>