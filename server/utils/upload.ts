import * as path from 'node:path'
import { blob } from 'hub:blob'
// import { db } from 'hub:db'

export async function uploadFile(file: File, name: string) {
  // Ensure the blob is valid
  ensureBlob(file, { maxSize: '2MB', types: ['image'] })
  // extract file extention
  const fileExt = path.extname(file.name)
  // Upload files with ease
  return await blob.put(`${name}${fileExt}`, file, { access: 'public' })
}