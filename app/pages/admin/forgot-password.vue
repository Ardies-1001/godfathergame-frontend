<template>
  <div class="min-h-screen grid place-items-center bg-slate-950 p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/10 blur-[120px]"></div>
    </div>

    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold tracking-tight text-white">Récupération</h1>
        <p class="mt-2 text-slate-400">Mot de passe oublié ?</p>
      </div>

      <div class="gfg-surface p-6 sm:p-8 backdrop-blur-xl">
        <div v-if="submitted" class="text-center space-y-4">
          <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-green-500/10 text-green-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-white">Email envoyé</h3>
          <p class="text-sm text-slate-300">
            Si un compte existe avec cette adresse, vous recevrez les instructions de réinitialisation.
          </p>
          <NuxtLink to="/admin/login" class="mt-4 inline-block text-sm font-medium text-blue-400 hover:text-blue-300">
            Retour à la connexion
          </NuxtLink>
        </div>

        <form v-else class="space-y-6" @submit.prevent="handleSubmit">
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

          <button
            type="submit"
            class="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-400 active:scale-[0.98] transition-all"
            :disabled="loading"
            :class="loading ? 'opacity-70 cursor-not-allowed' : ''"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            {{ loading ? 'Envoi...' : 'Envoyer le lien' }}
          </button>
        </form>
        
        <div v-if="!submitted" class="mt-6 text-center">
          <NuxtLink to="/admin/login" class="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Retour
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

const email = ref('')
const loading = ref(false)
const submitted = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  loading.value = false
  submitted.value = true
}
</script>