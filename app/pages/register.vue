<template>
  <div class="min-h-screen grid place-items-center bg-slate-950 p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
      <div class="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[100px]"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Inscription</h1>
        <p class="mt-2 text-slate-400">Rejoignez GodFatherGame</p>
      </div>

      <div class="gfg-surface p-6 sm:p-8 backdrop-blur-xl">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <div class="space-y-2">
            <label for="name" class="text-sm font-medium text-slate-300">Nom complet</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="text-sm font-medium text-slate-300">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="vous@exemple.com"
              required
            />
          </div>

          <div class="space-y-2">
            <label for="password" class="text-sm font-medium text-slate-300">Mot de passe</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              placeholder="••••••••"
              required
              minlength="8"
            />
            <p class="text-xs text-slate-500">Au moins 8 caractères</p>
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
            {{ loading ? 'Inscription...' : 'S\'inscrire' }}
          </button>
        </form>
        
        <div class="mt-6 text-center space-y-2">
          <p class="text-sm text-slate-500">
            Déjà un compte ? 
            <NuxtLink to="/admin/login" class="text-blue-400 hover:text-blue-300 transition-colors font-medium">
              Se connecter
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

const { register } = useAuth()
const router = useRouter()
const toast = useToast()

const name = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleRegister = async () => {
  if (password.value.length < 8) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères'
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const success = await register(email.value, password.value, name.value)
    if (success) {
      toast.add({
        title: 'Compte créé avec succès',
        description: 'Bienvenue sur GodFatherGame !',
        color: 'green'
      })
      router.push('/client')
    } else {
      error.value = 'Erreur lors de l\'inscription. Cet email est peut-être déjà utilisé.'
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Inscription',
  meta: [{ name: 'description', content: 'Créer un compte GodFatherGame.' }]
})
</script>
