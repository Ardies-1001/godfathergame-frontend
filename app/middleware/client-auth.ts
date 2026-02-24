export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, token, fetchUser, user } = useAuth()
  
  // If we have a token but no user, try to fetch the user
  if (token.value && !isAuthenticated.value) {
    await fetchUser()
  }

  if (!isAuthenticated.value) {
    return navigateTo('/admin/login')
  }

  if (user.value?.role !== 'USER') {
    return navigateTo('/admin')
  }
})
