<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Catégories</h1>
      <NuxtLink 
        to="/admin/categories/add"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Nouvelle catégorie
      </NuxtLink>
    </div>

    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium w-20">Image</th>
              <th class="px-6 py-4 font-medium">Nom</th>
              <th class="px-6 py-4 font-medium">Slug</th>
              <th class="px-6 py-4 font-medium">Description</th>
              <th class="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="categoriesList.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                <div class="flex flex-col items-center gap-3">
                  <div class="p-3 rounded-full bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c.6.5 1.2 1 1.7 1.7"/><path d="M22 10c-.5-.6-1-1.2-1.7-1.7"/><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="14" rx="2"/><path d="M10 22c-.6-.5-1.2-1-1.7-1.7"/><path d="M2 14c.5.6 1 1.2 1.7 1.7"/><path d="M22 14c-.5.6-1 1.2-1.7 1.7"/><path d="M10 2c-.6.5-1.2 1-1.7 1.7"/></svg>
                  </div>
                  <p>Aucune catégorie pour le moment</p>
                </div>
              </td>
            </tr>
            <tr v-for="category in categoriesList" :key="category.slug" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4">
                <div class="size-10 rounded-lg bg-slate-800 overflow-hidden">
                  <img :src="category.image" :alt="category.name" class="h-full w-full object-cover" />
                </div>
              </td>
              <td class="px-6 py-4 text-white font-medium">{{ category.name }}</td>
              <td class="px-6 py-4 text-slate-400 font-mono text-xs">{{ category.slug }}</td>
              <td class="px-6 py-4 text-slate-300 line-clamp-1 max-w-xs">{{ category.description }}</td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink 
                    :to="`/admin/categories/${category.slug}`"
                    class="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    Modifier
                  </NuxtLink>
                  <button 
                    @click="deleteCategory(category.slug)"
                    class="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/shop'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { public: config } = useRuntimeConfig()
const toast = useToast()

const categoriesList = ref<Category[]>([])
const loading = ref(false)

const { token } = useAuth()

const fetchCategories = async () => {
  loading.value = true
  try {
    const data = await $fetch<Category[]>(`${config.apiBase}/categories`)
    categoriesList.value = data
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur de chargement', color: 'red' })
  } finally {
    loading.value = false
  }
}

const deleteCategory = async (slug: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.')) return

  try {
    await $fetch(`${config.apiBase}/categories/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    categoriesList.value = categoriesList.value.filter(c => c.slug !== slug)
    toast.add({ title: 'Catégorie supprimée', color: 'green' })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur lors de la suppression', color: 'red' })
  }
}

onMounted(() => {
  fetchCategories()
})
</script>
