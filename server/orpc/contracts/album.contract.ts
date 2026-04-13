import { oc } from '@orpc/contract'
import { z } from 'zod'
import { AlbumSchema, CreateAlbumSchema } from '~~/server/db/schema'

export const MAX_IMAGE_LENGTH = 10

export const albumContract = {
  create: oc
    .input(CreateAlbumSchema.pick({ title: true }).extend({ images: z.array(z.instanceof(File)) }))
    .output(AlbumSchema)
    .errors({
      MAX_IMAGE_LENGTH: { message: `You can have only ${MAX_IMAGE_LENGTH} images for each album` },
      CONFLICT: { message: "An album already exists with this name" },
      NO_IMAGE: { message: "Album must contain atleast one image" },
    }),

  deleteSingle: oc
    .input(AlbumSchema.pick({ id: true }))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),

  update: oc
    .input(CreateAlbumSchema.pick({ title: true }).extend({
      id: z.string(),
      images: z.array(z.instanceof(File)),
      removed: z.array(z.string()),
    }))
    .output(AlbumSchema)
    .errors({
      MAX_IMAGE_LENGTH: { message: `You can have only ${MAX_IMAGE_LENGTH} images for each album` },
      NOT_FOUND: { message: "The album you're looking for was not found" },
      CONFLICT: { message: "An album already exists with this name" },
      NO_IMAGE: { message: "Album must contain atleast one image" },
    }),

  list: oc.output(z.array(AlbumSchema)),

  findById: oc
    .input(AlbumSchema.pick({ id: true }))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),

  findBySlug: oc
    .input(AlbumSchema.pick({ slug: true }))
    .output(AlbumSchema)
    .errors({
      NOT_FOUND: { message: "The album you're looking for was not found" },
    }),
}