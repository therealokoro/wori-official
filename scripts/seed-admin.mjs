/**
 * @param {string} password
 */
async function hashPassword(password){
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
}


const password = process.env.NUXT_ADMIN_PASS

if (!password) {
  console.error('NUXT_ADMIN_PASS is not set')
  process.exit(1)
}

const hashed = await hashPassword(password)
console.log(hashed)