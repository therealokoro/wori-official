import { slugify } from '#shared/utils'
import { ORPCError } from '@orpc/server'
import { eq } from 'drizzle-orm'
import { db } from 'hub:db'

import { typeid } from 'typeid-js'
import { article } from '~~/server/db/schema'
import { publicProcedure } from '../index'

const posts = [
  {
    title: 'Nuxt Icon v1',
    description: 'Discover Nuxt Icon v1!',
    image: 'https://nuxt.com/assets/blog/nuxt-icon/cover.png',
    date: '2024-11-25',
  },
  {
    title: 'Nuxt 3.14',
    description: 'Nuxt 3.14 is out!',
    image: 'https://nuxt.com/assets/blog/v3.14.png',
    date: '2024-11-04',
  },
  {
    title: 'Nuxt 3.13',
    description: 'Nuxt 3.13 is out!',
    image: 'https://nuxt.com/assets/blog/v3.13.png',
    date: '2024-08-22',
  }
]

export const todoRouter = {
  getAll: publicProcedure.handler(async () => {
    return posts
  }),

  add: publicProcedure
    .input(CreateArticleSchema)
    .handler(async ({ input }) => {
      const slug = slugify(input.title)
      const isExisting = await db.query.article.findFirst({ where: eq(article.slug, slug) })

      if (isExisting) {
        throw new ORPCError('CONFLICT', { message: 'An article exists with same title' })
      }

      const id = typeid()
      const uploadedFile = await uploadFile(input.coverImage, `articles/${id.toUUID()}`)

      if (!uploadedFile) {
        throw new ORPCError('NOT_ACCEPTABLE', { message: 'An error occured while submitting article' })
      }

      const newArticle = await db.insert(article).values({
        slug,
        title: input.title,
        content: input.content,
        coverImage: uploadedFile.pathname,
        description: input.description,
      }).returning()

      return newArticle
    }),
}
