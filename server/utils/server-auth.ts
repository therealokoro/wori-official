import { db, schema } from '@nuxthub/db'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from "@better-auth/drizzle-adapter";

export const getServerAuth = () =>  {
  const baseURL = getSiteUrl()
  return betterAuth({
    baseURL,
    database: drizzleAdapter(db, { provider: "sqlite", schema }),
    emailAndPassword: { enabled: true },
    trustedOrigins: ['http://localhost:3000', "https://womenrightsinitiative.org", baseURL]
  })
}
