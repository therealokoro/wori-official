export default defineEventHandler((event) => {
  const auth = getServerAuth()
	return auth.handler(toWebRequest(event));
});