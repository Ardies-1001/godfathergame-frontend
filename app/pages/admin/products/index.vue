<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Produits</h1>
      <NuxtLink 
        to="/admin/products/add"
        class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        Nouveau produit
      </NuxtLink>
    </div>

    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium w-20">Image</th>
              <th class="px-6 py-4 font-medium">Nom</th>
              <th class="px-6 py-4 font-medium">Catégorie</th>
              <th class="px-6 py-4 font-medium">Prix</th>
              <th class="px-6 py-4 font-medium">Stock</th>
              <th class="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-if="products.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-400">
                <div class="flex flex-col items-center gap-3">
                  <div class="p-3 rounded-full bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <p>Aucun produit pour le moment</p>
                </div>
              </td>
            </tr>
            <tr v-for="product in products" :key="product.id" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4">
                <div class="size-10 rounded-lg bg-slate-800 overflow-hidden">
                  <img :src="product.image" :alt="product.name" class="h-full w-full object-cover" />
                </div>
              </td>
              <td class="px-6 py-4 text-white font-medium">{{ product.name }}</td>
              <td class="px-6 py-4 text-slate-400">{{ product.category?.name || '-' }}</td>
              <td class="px-6 py-4 text-white font-bold">{{ formatPrice(product.price) }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                  En stock
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink 
                    :to="`/admin/products/${product.id}`"
                    class="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    Modifier
                  </NuxtLink>
                  <button 
                    @click="deleteProduct(product.id)"
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
import { formatPrice } from '~/utils/price'
import type { Product } from '~/types/shop'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { public: config } = useRuntimeConfig()
const toast = useToast()

const products = ref<Product[]>([])
const loading = ref(false)

const { token } = useAuth()

const fetchProducts = async () => {
  loading.value = true
  try {
    const data = await $fetch<Product[]>(`${config.apiBase}/products`)
    products.value = data
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur de chargement', color: 'red' })
  } finally {
    loading.value = false
  }
}

const deleteProduct = async (id: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.')) return

  try {
    await $fetch(`${config.apiBase}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    
    products.value = products.value.filter(p => p.id !== id)
    toast.add({ title: 'Produit supprimé', color: 'green' })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur lors de la suppression', color: 'red' })
  }
}

onMounted(() => {
  fetchProducts()
})
</script>
