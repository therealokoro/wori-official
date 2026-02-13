export interface CreateContextOptions {
  headers: Headers
}

function getServerAuth() {
  return serverAuth()
}

export async function createContext({ headers }: CreateContextOptions) {
  const auth = getServerAuth()
  const session = await auth.api.getSession({ headers })
  return { session }
}

export type Context = Awaited<ReturnType<typeof createContext>>
