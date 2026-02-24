<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/categories" class="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-white">Modifier la catégorie</h1>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>

    <form v-else @submit.prevent="saveCategory" class="gfg-surface p-6 sm:p-8 rounded-xl space-y-8">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Nom</label>
          <input 
            v-model="form.name" 
            type="text" 
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            required
          />
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Slug</label>
          <input 
            v-model="form.slug" 
            type="text" 
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            required
            disabled
          />
          <p class="text-xs text-slate-500">Le slug ne peut pas être modifié.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Description</label>
          <textarea 
            v-model="form.description" 
            rows="3"
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            required
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Image</label>
          <AdminImageUpload v-model="form.image" />
        </div>
      </div>

      <div class="pt-6 flex justify-end gap-3 border-t border-white/10">
        <NuxtLink 
          to="/admin/categories"
          class="px-6 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
        >
          Annuler
        </NuxtLink>
        <button 
          type="submit"
          class="px-8 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
        >
          Mettre à jour
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/shop'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { public: config } = useRuntimeConfig()
const route = useRoute()
const router = useRouter()
const toast = useToast()

const slug = route.params.slug as string
const loading = ref(true)

const form = reactive({
  slug: '',
  name: '',
  description: '',
  image: ''
})

const fetchCategory = async () => {
  try {
    // In a real app, you might fetch by slug
    // For now, let's fetch all and find (or fetch specific if API supports it)
    // Assuming API supports fetching by slug/id or we filter
    // If the API endpoint is /categories/:slug
    const data = await $fetch<Category>(`${config.apiBase}/categories/${slug}`)
    if (data) {
      Object.assign(form, data)
    } else {
      throw new Error('Category not found')
    }
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Catégorie introuvable', color: 'red' })
    router.push('/admin/categories')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (slug) {
    fetchCategory()
  }
})

const saveCategory = async () => {
  try {
    await $fetch(`${config.apiBase}/categories/${form.slug}`, {
      method: 'PATCH',
      body: form
    })
    toast.add({
      title: 'Catégorie mise à jour',
      color: 'green'
    })
    router.push('/admin/categories')
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur lors de la mise à jour', color: 'red' })
  }
}
</script>