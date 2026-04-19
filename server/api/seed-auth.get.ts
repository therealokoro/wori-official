export default defineEventHandler(async (event) => {
  const auth = getServerAuth()
  const rc = useRuntimeConfig()

  const res = await auth.api.signUpEmail({
    body: {
      email: rc.adminEmail,
      password: rc.adminPass,
      name: 'Administrator',
    },
  })

  if (!res) {
    return { status: 'failure' }
  }

  return { status: 'sucess', user: res.user }
})
