import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'
import { onError } from '@orpc/server'
import { RPCHandler } from '@orpc/server/fetch'
import { BatchHandlerPlugin } from '@orpc/server/plugins'
import { ZodToJsonSchemaConverter } from '@orpc/zod'
import { consola } from 'consola'
import { createContext } from '~~/server/orpc/context'
import { appRouter } from '~~/server/orpc/routers/index'

const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    })
  ],
  plugins: [new BatchHandlerPlugin()],
});

const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error)
    })
  ]
})

export default defineEventHandler(async (event) => {
  const request = toWebRequest(event)
  const context = await createContext({ headers: request.headers })

  const rpcResult = await rpcHandler.handle(request, {
    prefix: '/rpc',
    context,
  });

  if (rpcResult.response)
    return rpcResult.response

  const apiResult = await apiHandler.handle(request, {
    prefix: '/rpc/api-reference',
    context,
  });

  if (apiResult.response) {
    const host = getRequestURL(event)
    consola.success(`[ORPC] - OpenAPI Docs Live at ${host}/rpc/api-reference`)
    return apiResult.response
  }
  setResponseStatus(event, 404, 'Not Found')
  return 'Not found'
})
