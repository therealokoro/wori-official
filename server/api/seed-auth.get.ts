export default defineEventHandler(async (event) => {
  const rc = useRuntimeConfig()
  const auth = getServerAuth()

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
    if (err?.body?.code === 'USER_ALREADY_EXISTS') {
      throw createError({ statusCode: 409, statusMessage: 'Admin already exists' })
    }
    throw createError({
      statusCode: 500,
      statusMessage: err?.message || 'Unknown error',
      data: err?.body || err,
    })
  }
})