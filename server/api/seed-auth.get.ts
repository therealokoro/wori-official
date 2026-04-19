export default defineEventHandler(async (event) => {
  const auth = getServerAuth()
  const rc = useRuntimeConfig()

  try {
    const res = await auth.api.signUpEmail({
      body: {
        email: rc.adminEmail,
        password: rc.adminPass,
        name: 'Administrator',
      },
    })

    if (!res) {
      throw createError({ statusCode: 500, statusMessage: 'Seed failed' })
    }

    return { status: 'success', user: res.user }
  }
  catch (err: any) {
    // Better Auth throws when email already exists
    if (err?.body?.code === 'USER_ALREADY_EXISTS') {
      throw createError({ statusCode: 409, statusMessage: 'Admin already exists' })
    }
    throw err
  }
})