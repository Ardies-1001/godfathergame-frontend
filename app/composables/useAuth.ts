export interface User {
  id: string
  email: string
  name?: string
  role: 'ADMIN' | 'USER'
}

interface LoginResponse {
  access_token: string
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const token = useCookie('auth-token')
  const config = useRuntimeConfig()
  const router = useRouter()

  // Initialisation : récupérer le profil si on a un token
  const fetchUser = async () => {
    if (!token.value) {
      user.value = null
      return
    }

    try {
      const data = await $fetch<User>(`${config.public.apiBase}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      user.value = data
    } catch (e) {
      // Token invalide ou expiré
      token.value = null
      user.value = null
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const data = await $fetch<{ user: User; accessToken: string }>(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        body: { email, password }
      })
      
      token.value = data.accessToken
      user.value = data.user
      // await fetchUser() // No need to fetch user again if login returns it, but let's keep it consistent or optimize
      
      return true
    } catch (e) {
      console.error('Login error:', e)
      return false
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      const data = await $fetch<{ user: User; accessToken: string }>(`${config.public.apiBase}/auth/register`, {
        method: 'POST',
        body: { email, password, name }
      })
      
      token.value = data.accessToken
      user.value = data.user
      
      return true
    } catch (e) {
      console.error('Register error:', e)
      return false
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
    router.push('/admin/login')
  }

  return {
    user,
    isAuthenticated: computed(() => !!user.value),
    fetchUser,
    login,
    register,
    logout,
    token // Export token so it can be used in other components
  }
}
