import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { typeid } from 'typeid-js'

export const article = sqliteTable('article', {
  id: text('id', { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid('article').toString()),
  title: text('title', { length: 500 }).notNull().unique(),
  description: text('description', { length: 500 }).notNull(),
  slug: text('slug', { length: 500 }).notNull().unique(),
  content: text('content').notNull(),
  coverImage: text('cover_image').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`)
})

export const album = sqliteTable("album", {
  id: text().primaryKey().$default(() => typeid('article').toString()),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  images: text('images', { mode: 'json' })
    .notNull()
    .$type<string[]>() // Infer type as array of strings
    .default(sql`(json_array())`),
  date: integer({ mode: "timestamp_ms" }).$default(() => new Date()).notNull()
});

export const message = sqliteTable('message', {
  id: text('id', { length: 36 })
    .primaryKey()
    .notNull()
    .$defaultFn(() => typeid('message').toString()),
  name: text('name', { length: 500 }).notNull(),
  email: text('email', { length: 500 }).notNull(),
  isRead: integer('is_read', { mode: 'boolean' }).notNull().$default(() => false),
  body: text('body').notNull(),
  response: text('response'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(current_timestamp)`),
})

export const AlbumSchema = createSelectSchema(album)

export const CreateAlbumSchema = createInsertSchema(album).omit({ slug: true })