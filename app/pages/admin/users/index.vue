<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-white">Utilisateurs</h1>
      <button
        type="button"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
        @click="isCreateOpen = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Nouvel utilisateur
      </button>
    </div>

    <div v-if="isCreateOpen" class="gfg-surface p-6 sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <div class="text-lg font-bold text-white">Créer un utilisateur</div>
          <div class="mt-1 text-sm text-slate-400">Choisissez le rôle et les identifiants.</div>
        </div>
        <button type="button" class="text-slate-400 hover:text-white" @click="closeCreate">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>

      <form class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="createUser">
        <label class="space-y-2">
          <span class="text-xs font-semibold text-slate-300">Nom</span>
          <input
            v-model="createForm.name"
            type="text"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Nom"
          />
        </label>

        <label class="space-y-2">
          <span class="text-xs font-semibold text-slate-300">Email</span>
          <input
            v-model="createForm.email"
            type="email"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="email@exemple.com"
            required
          />
        </label>

        <label class="space-y-2">
          <span class="text-xs font-semibold text-slate-300">Mot de passe</span>
          <input
            v-model="createForm.password"
            type="password"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Minimum 8 caractères"
            required
          />
        </label>

        <label class="space-y-2">
          <span class="text-xs font-semibold text-slate-300">Rôle</span>
          <select
            v-model="createForm.role"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="USER">Client</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </label>

        <div class="md:col-span-2 flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            @click="closeCreate"
          >
            Annuler
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors"
            :disabled="creating"
            :class="creating ? 'opacity-70 cursor-not-allowed' : ''"
          >
            {{ creating ? 'Création...' : 'Créer' }}
          </button>
        </div>
      </form>
    </div>

    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium">Email</th>
              <th class="px-6 py-4 font-medium">Nom</th>
              <th class="px-6 py-4 font-medium">Rôle</th>
              <th class="px-6 py-4 font-medium">Créé le</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="u in users" :key="u.id" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 text-white font-medium">{{ u.email }}</td>
              <td class="px-6 py-4 text-slate-300">{{ u.name || '-' }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="u.role === 'ADMIN' ? 'bg-blue-500/10 text-blue-400' : 'bg-white/5 text-slate-300'">
                  {{ u.role === 'ADMIN' ? 'Admin' : 'Client' }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-400">{{ formatDate(new Date(u.createdAt)) }}</td>
            </tr>
            <tr v-if="!loading && users.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-slate-500">
                Aucun utilisateur
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

type UserRole = 'ADMIN' | 'USER'

type ApiUser = {
  id: string
  email: string
  name?: string | null
  role: UserRole
  createdAt: string
  updatedAt: string
}

const { public: config } = useRuntimeConfig()
const { token } = useAuth()
const toast = useToast()

const users = ref<ApiUser[]>([])
const loading = ref(false)

const isCreateOpen = ref(false)
const creating = ref(false)
const createForm = reactive({
  email: '',
  password: '',
  name: '',
  role: 'USER' as UserRole
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(date)
}

const loadUsers = async () => {
  if (!token.value) return
  loading.value = true
  try {
    users.value = await $fetch<ApiUser[]>(`${config.apiBase}/users`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les utilisateurs.', color: 'red' })
  } finally {
    loading.value = false
  }
}

const closeCreate = () => {
  isCreateOpen.value = false
  createForm.email = ''
  createForm.password = ''
  createForm.name = ''
  createForm.role = 'USER'
}

const createUser = async () => {
  if (!token.value) return
  creating.value = true
  try {
    const created = await $fetch<ApiUser>(`${config.apiBase}/users`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` },
      body: {
        email: createForm.email,
        password: createForm.password,
        name: createForm.name || undefined,
        role: createForm.role
      }
    })

    users.value = [created, ...users.value]
    toast.add({ title: 'Utilisateur créé', color: 'green' })
    closeCreate()
  } catch (e: any) {
    console.error(e)
    toast.add({
      title: 'Erreur',
      description: e?.data?.message || e?.statusMessage || "Impossible de créer l'utilisateur.",
      color: 'red'
    })
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>
