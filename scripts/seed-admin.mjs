import { hashPassword } from 'better-auth/crypto'

const password = process.env.NUXT_ADMIN_PASS
if (!password) {
  console.error('NUXT_ADMIN_PASS is not set')
  process.exit(1)
}

const hashed = await hashPassword(password)
console.log(hashed)