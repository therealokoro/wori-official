import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { typeid } from 'typeid-js'

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: integer("email_verified").notNull(),
	image: text("image"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	token: text("token").notNull().unique(),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const account = sqliteTable("account", {
	id: text("id").primaryKey(),
	userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp_ms" }),
	refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp_ms" }),
	scope: text("scope"),
	idToken: text("id_token"),
	password: text("password"),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

export const verification = sqliteTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
	createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
	updatedAt: integer("updated_at", { mode: "timestamp_ms" }).notNull(),
});

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