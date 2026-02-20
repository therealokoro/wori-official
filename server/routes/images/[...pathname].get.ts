import { blob } from '@nuxthub/blob'

export default eventHandler(async (event) => {
  const pathname = getRouterParam(event, 'pathname') as string
  return blob.serve(event, pathname)
})
