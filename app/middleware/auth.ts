export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isAuthenticated, token, fetchUser } = useAuth()
  
  // If we have a token but no user, try to fetch the user
  if (token.value && !isAuthenticated.value) {
    await fetchUser()
  }

  if (!isAuthenticated.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
