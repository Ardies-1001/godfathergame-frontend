<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Catalogue</h1>
          <p class="mt-3 max-w-2xl text-slate-300">
            Consoles, accessoires et packs prêts à jouer. Découvrez les nouveautés, comparez les options et ajoutez vos
            articles au panier en quelques clics.
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <span class="font-semibold text-white">{{ resultCount }}</span> produits
        </div>
      </div>
    </div>

    <div class="gfg-surface p-6">
      <div class="grid gap-4 lg:grid-cols-12 lg:items-end">
        <label class="space-y-2 lg:col-span-5">
          <span class="text-xs font-semibold text-slate-300">Recherche</span>
          <input
            v-model.trim="q"
            type="search"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            placeholder="Console, manette, casque…"
          />
        </label>

        <label class="space-y-2 lg:col-span-4">
          <span class="text-xs font-semibold text-slate-300">Catégorie</span>
          <select
            v-model="category"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="all">Toutes</option>
            <option v-for="c in categoryOptions" :key="c.slug" :value="c.slug">{{ c.name }}</option>
          </select>
        </label>

        <label class="space-y-2 lg:col-span-3">
          <span class="text-xs font-semibold text-slate-300">Marque</span>
          <select
            v-model="brand"
            class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="all">Toutes</option>
            <option v-for="b in brandOptions" :key="b" :value="b">{{ b }}</option>
          </select>
        </label>
      </div>

      <div class="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-slate-300">
          <span class="font-semibold text-white">{{ filteredCount }}</span> résultat(s)
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          @click="resetFilters"
        >
          Réinitialiser
        </button>
      </div>
    </div>

    <ClientOnly>
      <div v-if="pageItems.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="product in pageItems" :key="product.id" class="gfg-surface overflow-hidden">
          <NuxtLink :to="`/produits/${product.id}`" class="block">
            <div class="relative aspect-[16/10] bg-gradient-to-br from-white/10 via-slate-950 to-blue-500/10">
              <img :src="product.image" :alt="product.name" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent"></div>
              <div class="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-white">
                {{ product.badge }}
              </div>
            </div>
          </NuxtLink>

          <div class="p-6">
            <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ product.brand }}</div>
            <NuxtLink
              :to="`/produits/${product.id}`"
              class="mt-2 inline-flex text-lg font-bold text-white hover:text-slate-200 transition-colors"
            >
              {{ product.name }}
            </NuxtLink>
            <p class="mt-2 text-sm text-slate-300">{{ product.shortDescription }}</p>

            <div class="mt-5 flex items-center justify-between gap-4">
              <div class="text-lg font-bold text-white">{{ formatPrice(product.price) }}</div>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                  @click="cart.add(product.id, 1)"
                >
                  Ajouter
                </button>
                <NuxtLink
                  :to="`/produits/${product.id}`"
                  class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
                >
                  Voir détails
                </NuxtLink>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div v-else-if="products.length === 0" class="text-center py-12 gfg-surface rounded-2xl">
          <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h3 class="text-lg font-medium text-white">Le catalogue est vide</h3>
          <p class="mt-2 text-slate-400">Revenez bientôt pour découvrir nos produits.</p>
      </div>

      <div v-else class="gfg-surface p-8 sm:p-10">
        <div class="text-sm font-semibold text-white">Aucun résultat</div>
        <div class="mt-2 text-sm text-slate-300">
          Essayez une autre catégorie, une autre marque, ou retirez certains mots-clés.
        </div>
      </div>

      <div v-if="totalPages > 1" class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="text-sm text-slate-300">
          Page <span class="font-semibold text-white">{{ page }}</span> / <span class="font-semibold text-white">{{ totalPages }}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            :disabled="page <= 1"
            :class="page <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
            @click="page = Math.max(1, page - 1)"
          >
            Précédent
          </button>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            :disabled="page >= totalPages"
            :class="page >= totalPages ? 'opacity-50 cursor-not-allowed' : ''"
            @click="page = Math.min(totalPages, page + 1)"
          >
            Suivant
          </button>
        </div>
      </div>

      <template #fallback>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="i in 6" :key="i" class="gfg-surface overflow-hidden">
            <div class="aspect-[16/10] bg-white/5"></div>
            <div class="p-6 space-y-3">
              <div class="h-3 w-24 rounded bg-white/10"></div>
              <div class="h-4 w-48 rounded bg-white/10"></div>
              <div class="h-3 w-full rounded bg-white/10"></div>
              <div class="h-3 w-2/3 rounded bg-white/10"></div>
            </div>
          </div>
        </div>
      </template>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCatalogue } from '~/composables/useCatalogue'
import { formatPrice } from '~/utils/price'
import type { Product } from '~/types/shop'

const { products, categories, init } = useCatalogue()
const cart = useCart()

const shuffle = <T,>(list: T[]) => {
  const result = [...list]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = result[i]!
    result[i] = result[j]!
    result[j] = tmp
  }
  return result
}

const q = ref('')
const category = ref('all')
const brand = ref('all')

const perPage = 30
const page = ref(1)

const randomized = ref<Product[]>([])

onMounted(() => {
  init()
})

watch(products, (newProducts) => {
  if (newProducts.length) {
    randomized.value = shuffle(newProducts)
  }
}, { immediate: true })

const categoryOptions = categories

const brandOptions = computed(() => {
  const set = new Set(products.value.map(p => p.brand).filter(Boolean) as string[])
  return Array.from(set).sort((a, b) => a.localeCompare(b))
})

const normalized = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()

const filtered = computed(() => {
  const base = randomized.value.length ? randomized.value : products.value
  const qn = normalized(q.value)
  return base.filter((p) => {
    if (category.value !== 'all' && p.category?.slug !== category.value) return false
    if (brand.value !== 'all' && p.brand !== brand.value) return false
    if (!qn) return true
    const hay = normalized(`${p.name} ${p.brand || ''} ${p.badge || ''} ${p.shortDescription || ''}`)
    return hay.includes(qn)
  })
})

const filteredCount = computed(() => filtered.value.length)
const resultCount = computed(() => (randomized.value.length ? filteredCount.value : products.value.length))

watch([q, category, brand], () => {
  page.value = 1
})

watch(
  () => filteredCount.value,
  () => {
    const max = Math.max(1, Math.ceil(filteredCount.value / perPage))
    if (page.value > max) page.value = max
  }
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredCount.value / perPage)))
const pageItems = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

const resetFilters = () => {
  q.value = ''
  category.value = 'all'
  brand.value = 'all'
  page.value = 1
}

useHead({
  title: 'Catalogue',
  meta: [{ name: 'description', content: 'Catalogue de consoles et accessoires gaming.' }]
})
</script>
