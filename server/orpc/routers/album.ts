import { implement, ORPCError } from "@orpc/server"
import { eq } from "drizzle-orm"
import { albumContract, MAX_IMAGE_LENGTH } from "../contracts/album.contract"
import { album } from '~~/server/db/schema'
import { typeid } from "typeid-js"
import { kebabCase } from "string-ts"

const os = implement(albumContract)

async function uploadImages(files: File[], slug: string): Promise<string[]> {
  if (!files.length) return []

  const uploads = await Promise.all(
    files.map(async (file) => {
      ensureBlob(file as Blob, { maxSize: '1MB', types: ['image'] })
      const blobObj = await blob.put(typeid(), file as Blob, {
        addRandomSuffix: true,
        prefix: `albums/${slug}`,
      })
      return blobObj.pathname
    })
  )

  return uploads
}

async function deleteImages(images: string[]): Promise<void> {
  await Promise.all(images.map((img) => blob.del(img)))
}

const create = os.create.handler(async ({ input, errors }) => {
  const albumExist = await db.query.album.findFirst({ where: eq(album.title, input.title) })
  
  if (albumExist) throw errors.CONFLICT()
    
  if (input.images.length > MAX_IMAGE_LENGTH) throw errors.MAX_IMAGE_LENGTH()

  const slug = kebabCase(input.title)
  const images = await uploadImages(input.images, slug)
  if (!images.length) throw errors.NO_IMAGE()

  const [newAlbumn] = await db.insert(album).values({ slug, images, title: input.title }).returning()
  return newAlbumn!
})

const list = os.list.handler(async () => await db.select().from(album))

const findById = os.findById.handler(async ({ input, errors }) => {
  const foundAlbum = await db.query.album.findFirst({ where: eq(album.id, input.id) })
  if (!foundAlbum) throw errors.NOT_FOUND()
  return foundAlbum
})

const findBySlug = os.findBySlug.handler(async ({ input, errors }) => {
  const foundAlbum = await db.query.album.findFirst({ where: eq(album.slug, input.slug) })
  if (!foundAlbum) throw errors.NOT_FOUND()
  return foundAlbum
})

const deleteSingle = os.deleteSingle.handler(async ({ input, errors }) => {
  const foundAlbum = await db.query.album.findFirst({ where: eq(album.id, input.id) })
  if (!foundAlbum) throw errors.NOT_FOUND()

  await deleteImages(foundAlbum.images as string[]).catch((error) => {
    throw new ORPCError('INTERNAL_SERVER_ERROR', { message: error.message })
  })

  const [deleted] = await db.delete(album).where(eq(album.id, input.id)).returning()
  return deleted!
})

const update = os.update.handler(async ({ input, errors }) => {
  const [albumExist, currentAlbum] = await Promise.all([
    db.query.album.findFirst({ where: eq(album.title, input.title) }),
    db.query.album.findFirst({ where: eq(album.id, input.id) }),
  ])

  if (!currentAlbum) throw errors.NOT_FOUND()
  if (albumExist && input.id !== albumExist.id) throw errors.CONFLICT()
  if (currentAlbum.images.length + input.images.length > MAX_IMAGE_LENGTH) throw errors.MAX_IMAGE_LENGTH()

  const slug = kebabCase(input.title)
  const newImages = await uploadImages(input.images, slug)
  const prevImages = (currentAlbum.images as string[]) ?? []

  const retained = input.removed?.length
    ? prevImages.filter((img) => !input.removed!.includes(img))
    : prevImages

  if (input.removed?.length) {
    await deleteImages(input.removed)
  }

  const finalImages = [...newImages, ...retained]
  if (!finalImages.length) throw errors.NO_IMAGE()

  const [deletedAlbum] = await db
    .update(album)
    .set({ title: input.title, slug, images: finalImages })
    .where(eq(album.id, input.id))
    .returning()

  return deletedAlbum!
})

export const albumRouter = {
  create,
  list,
  findBySlug,
  findById,
  deleteSingle,
  update
}