import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod'
import { z } from 'zod'
import { article } from '~~/server/db/schema'

const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export const CreateArticleSchema = createInsertSchema(article, {
  title: z.string('Please enter a title for the article'),
  description: z.string('A short description is required for the article'),
  coverImage: z.file('Please select an image file')
    .max(2_000_000, { message: 'Max image size is 2MB' })
    .mime(ACCEPTED_FILE_TYPES, { message: 'Only .jpg, .png, and .webp formats are accepted' }),
  content: z.string('Please provide some content for the article')
}).omit({ slug: true, id: true, createdAt: true })

export type CreateArticleType = z.output<typeof CreateArticleSchema>

export const UpdateArticleSchema = createUpdateSchema(article).omit({ slug: true })
export type UpdateArticleType = z.output<typeof UpdateArticleSchema>

export const SelectArticleSchema = createSelectSchema(article)
export type SelectArticleType = z.output<typeof SelectArticleSchema>

export const ArticleSchema = SelectArticleSchema.required()
export type ArticleType = z.output<typeof ArticleSchema>
