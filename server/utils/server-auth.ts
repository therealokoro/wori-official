import { db, schema } from '@nuxthub/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";

export const getServerAuth = () =>  {
  const baseURL = getSiteUrl()
  return betterAuth({
    baseURL,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    trustedOrigins: ['http://localhost:3000', "https://womenrightsinitiative.org", baseURL],
    emailAndPassword: {
      enabled: true,
      password: {
        hash: async (password) => {
          // Generate a random salt
          const salt = crypto.getRandomValues(new Uint8Array(16))
          const saltHex = Buffer.from(salt).toString("hex")

          // Combine salt + password and hash with SHA-256
          const encoder = new TextEncoder()
          const data = encoder.encode(saltHex + password)
          const hash = await crypto.subtle.digest("SHA-256", data)
          const hashHex = Buffer.from(hash).toString("hex")

          // Store as salt:hash so we can verify later
          return `${saltHex}:${hashHex}`
        },
        verify: async ({ password, hash }) => {
          // Split out the salt and re-hash to compare
          const [saltHex, hashHex] = hash.split(":")
          const encoder = new TextEncoder()
          const data = encoder.encode(saltHex + password)
          const newHash = await crypto.subtle.digest("SHA-256", data)
          const newHashHex = Buffer.from(newHash).toString("hex")

          return newHashHex === hashHex
        }
      }
    },
  })
}
