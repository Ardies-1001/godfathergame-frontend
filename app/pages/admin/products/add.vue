<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/products" class="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </NuxtLink>
      <h1 class="text-2xl font-bold text-white">Nouveau produit</h1>
    </div>

    <form @submit.prevent="saveProduct" class="gfg-surface p-6 sm:p-8 rounded-xl space-y-8">
      <!-- Informations de base -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white border-b border-white/10 pb-2">Informations de base</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Nom du produit</label>
            <input 
              v-model="form.name" 
              type="text" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Slug (URL)</label>
            <input 
              v-model="form.slug" 
              type="text" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Marque</label>
            <input 
              v-model="form.brand" 
              type="text" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Prix (FCFA)</label>
            <input 
              v-model.number="form.price" 
              type="number" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Badge (ex: Nouveau, Promo)</label>
            <input 
              v-model="form.badge" 
              type="text" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-slate-300">Stock</label>
            <input 
              v-model.number="form.stock" 
              type="number" 
              class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            />
          </div>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Catégorie</label>
          <select 
            v-model="form.categoryId" 
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none"
            required
          >
            <option value="" disabled>Sélectionner une catégorie</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </section>

      <!-- Description -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white border-b border-white/10 pb-2">Description</h2>
        
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Description courte (Liste)</label>
          <textarea 
            v-model="form.shortDescription" 
            rows="2"
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            required
          ></textarea>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Description complète</label>
          <textarea 
            v-model="form.description" 
            rows="5"
            class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" 
            required
          ></textarea>
        </div>
      </section>

      <!-- Spécifications -->
      <section class="space-y-4">
        <div class="flex items-center justify-between border-b border-white/10 pb-2">
          <h2 class="text-lg font-semibold text-white">Spécifications</h2>
          <button @click.prevent="addFeature" class="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            AJOUTER
          </button>
        </div>
        
        <div class="space-y-3">
          <div v-for="(feature, index) in form.features" :key="index" class="flex gap-3">
            <input 
              v-model="feature.label" 
              placeholder="Caractéristique (ex: Poids)"
              class="flex-1 rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white text-sm focus:border-blue-500/50 focus:outline-none" 
            />
            <input 
              v-model="feature.value" 
              placeholder="Valeur (ex: 1.2 kg)"
              class="flex-1 rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white text-sm focus:border-blue-500/50 focus:outline-none" 
            />
            <button @click.prevent="removeFeature(index)" class="text-slate-500 hover:text-red-400 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          <div v-if="form.features.length === 0" class="text-sm text-slate-500 italic text-center py-4 bg-white/5 rounded-lg border border-dashed border-white/10">
            Aucune spécification ajoutée
          </div>
        </div>
      </section>

      <!-- Images -->
      <section class="space-y-4">
        <h2 class="text-lg font-semibold text-white border-b border-white/10 pb-2">Médias</h2>
        
        <div class="space-y-2">
          <label class="text-sm font-medium text-slate-300">Image principale <span class="text-red-500">*</span></label>
          <AdminImageUpload v-model="form.image" />
          <p v-if="!form.image" class="text-xs text-red-400 mt-1">L'image principale est obligatoire</p>
        </div>

        <div class="space-y-3 pt-4 border-t border-white/5">
          <label class="text-sm font-medium text-slate-300">Galerie</label>
          <AdminImageUpload v-model="form.gallery" multiple />
        </div>
      </section>

      <div class="pt-6 flex justify-end gap-3 border-t border-white/10">
        <NuxtLink 
          to="/admin/products"
          class="px-6 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
        >
          Annuler
        </NuxtLink>
        <button 
          type="submit"
          class="px-8 py-2.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20"
        >
          Créer le produit
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
const router = useRouter()
const toast = useToast()
const { token } = useAuth()

const categories = ref<Category[]>([])

onMounted(async () => {
  try {
    const data = await $fetch<Category[]>(`${config.apiBase}/categories`)
    categories.value = data
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur de chargement des catégories', color: 'red' })
  }
})

const form = reactive({
  name: '',
  slug: '',
  brand: 'GFG',
  badge: '',
  categoryId: '',
  shortDescription: '',
  description: '',
  price: 0,
  stock: 10,
  image: '',
  gallery: [] as string[],
  videos: [] as string[],
  features: [] as { label: string; value: string }[]
})

const addFeature = () => {
  form.features.push({ label: '', value: '' })
}

const removeFeature = (index: number) => {
  form.features.splice(index, 1)
}

const saveProduct = async () => {
  if (!form.image) {
    toast.add({
      title: 'Image manquante',
      description: 'Vous devez ajouter une image principale pour le produit',
      color: 'red'
    })
    return
  }

  try {
      const payload = {
        ...form,
        // Filter out empty gallery images
        gallery: form.gallery.filter(img => img && img.length > 0),
        // Ensure image is string or undefined (though backend accepts empty string)
        image: form.image || undefined
      }

      await $fetch(`${config.apiBase}/products`, {
        method: 'POST',
        body: payload,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
    toast.add({
      title: 'Produit créé avec succès',
      color: 'green'
    })
    router.push('/admin/products')
  } catch (e: any) {
    console.error('Error details:', e)
    console.error('Response data:', e.data)
    toast.add({ 
      title: 'Erreur lors de la création', 
      description: e.data?.message || e.message || 'Une erreur inconnue est survenue',
      color: 'red' 
    })
  }
}
</script>
