<template>
  <div class="min-h-screen grid place-items-center bg-slate-950 p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
      <div class="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Administration</h1>
        <p class="mt-2 text-slate-400">Connectez-vous pour gérer la boutique</p>
      </div>

      <div class="gfg-surface p-6 sm:p-8 backdrop-blur-xl">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="admin@godfathergame.com"
              required
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label for="password" class="text-sm font-medium text-slate-300">Mot de passe</label>
              <NuxtLink to="/admin/forgot-password" class="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Oublié ?
              </NuxtLink>
            </div>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div v-if="error" class="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 text-center">
            {{ error }}
          </div>

          <button
            type="submit"
            class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-400 active:scale-[0.98] transition-all"
            :disabled="loading"
            :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
        
        <div class="mt-6 text-center space-y-2">
          <p class="text-sm text-slate-500">
            Pas encore de compte ? 
            <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              S'inscrire
            </NuxtLink>
          </p>
          <NuxtLink to="/" class="block text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Retour au site
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const success = await login(email.value, password.value)
    if (success) {
      router.push('/admin')
    } else {
      error.value = 'Identifiants invalides'
    }
  } catch (e) {
    error.value = 'Une erreur est survenue'
  } finally {
    loading.value = false
  }
}
</script>