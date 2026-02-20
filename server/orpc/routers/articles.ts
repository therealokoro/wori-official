import { slugify } from '#shared/utils'
import { ORPCError } from '@orpc/server'
import { eq } from 'drizzle-orm'
import { db } from 'hub:db'
import { typeid } from 'typeid-js'
import { z } from 'zod'

import { article } from '~~/server/db/schema'
import { publicProcedure } from '../index'

const GetArticleSchema = z.union([
  z.object({ id: z.string() }),
  z.object({ slug: z.string() }),
])

type ArticlePreview = Omit<typeof article.$inferSelect, 'createdAt' | 'coverImage'> & {
  image: string
  date: string
}

function toArticlePreview(row: typeof article.$inferSelect): ArticlePreview {
  const { createdAt, coverImage, ...rest } = row
  return {
    ...rest,
    image: `/images/${coverImage}`,
    date: createdAt,
  }
}

async function findOneArticle(id: string) {
  const existing = await db.query.article.findFirst({ where: eq(article.id, id) })

  if (!existing) {
    throw new ORPCError('NOT_FOUND', { message: 'The article you are looking for was not found.' })
  }

  return existing
}

export const articleRouter = {
  getAll: publicProcedure.handler(async () => {
    const rows = await db.query.article.findMany()
    return rows.map(toArticlePreview)
  }),

  add: publicProcedure
    .input(CreateArticleSchema)
    .handler(async ({ input }) => {
      const slug = slugify(input.title)

      const existing = await db.query.article.findFirst({
        where: eq(article.slug, slug),
      })

      if (existing) {
        throw new ORPCError('CONFLICT', {
          message: 'An article with this title already exists.',
        })
      }

      const id = typeid()
      const uploaded = await uploadFile(input.coverImage, `articles/${id.toUUID()}`)

      if (!uploaded) {
        throw new ORPCError('INTERNAL_SERVER_ERROR', {
          message: 'Failed to upload cover image.',
        })
      }

      const [newArticle] = await db
        .insert(article)
        .values({
          slug,
          title: input.title,
          content: input.content,
          coverImage: uploaded.pathname,
          description: input.description,
        })
        .returning()

      return newArticle
    }),

  getOne: publicProcedure
    .input(GetArticleSchema)
    .handler(async ({ input }) => {
      const found = await db.query.article.findFirst({
        where: 'id' in input
          ? eq(article.id, input.id)
          : eq(article.slug, input.slug),
      })

      if (!found) {
        throw new ORPCError('NOT_FOUND', { message: 'Article not found.' })
      }

      return found
    }),

  update: publicProcedure
    .input(CreateArticleSchema.partial().extend({ id: z.string() }))
    .handler(async ({ input }) => {
      const existing = await findOneArticle(input.id)

      let coverImage = existing.coverImage

      if (input.coverImage) {
        const uploaded = await uploadFile(input.coverImage, `articles/${input.id}`)

        if (!uploaded) {
          throw new ORPCError('INTERNAL_SERVER_ERROR', { message: 'Failed to upload cover image.' })
        }

        coverImage = uploaded.pathname
      }

      const [updated] = await db
        .update(article)
        .set({
          ...(input.title && { title: input.title, slug: slugify(input.title) }),
          ...(input.description && { description: input.description }),
          ...(input.content && { content: input.content }),
          coverImage,
        })
        .where(eq(article.id, input.id))
        .returning()

      return updated
    }),

  deleteOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
      const existing = await findOneArticle(input.id)

      // delete article image
      await blob.del(existing.coverImage)

      // delete article from db
      return await db.delete(article).where(eq(article.id, input.id))
    })
}
