<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">{{ category?.name }}</h1>
          <p class="mt-3 max-w-3xl text-slate-300">{{ category?.description }}</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <span class="font-semibold text-white">{{ total }}</span> produits
        </div>
      </div>
    </div>

    <div v-if="!category" class="gfg-surface p-8">
      <div class="text-sm text-slate-200">Catégorie introuvable.</div>
      <NuxtLink to="/" class="mt-4 inline-flex text-sm font-semibold text-white hover:text-slate-200 transition-colors">
        Retour à l’accueil
      </NuxtLink>
    </div>

    <div v-else-if="filtered.length === 0" class="text-center py-12 gfg-surface rounded-2xl">
      <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      <h3 class="text-lg font-medium text-white">Aucun produit dans cette catégorie</h3>
      <p class="mt-2 text-slate-400">Revenez bientôt pour découvrir nos produits.</p>
    </div>

    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="product in paged" :key="product.id" class="gfg-surface overflow-hidden">
        <div class="relative aspect-[16/10] bg-gradient-to-br from-white/10 via-slate-950 to-blue-500/10">
          <img :src="product.image" :alt="product.name" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent"></div>
          <div class="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-white">
            {{ product.badge }}
          </div>
        </div>
        <div class="p-6">
          <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ product.brand }}</div>
          <div class="mt-2 text-lg font-bold text-white">{{ product.name }}</div>
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

    <div v-if="category && pageCount > 1" class="flex items-center justify-center gap-2">
      <NuxtLink
        :to="pageLink(page - 1)"
        class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
        :class="page <= 1 ? 'pointer-events-none opacity-50' : ''"
      >
        Précédent
      </NuxtLink>

      <NuxtLink
        v-for="p in pages"
        :key="p"
        :to="pageLink(p)"
        class="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold transition-colors"
        :class="p === page ? 'bg-white text-slate-950' : 'bg-white/5 text-white hover:bg-white/10'"
      >
        {{ p }}
      </NuxtLink>

      <NuxtLink
        :to="pageLink(page + 1)"
        class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
        :class="page >= pageCount ? 'pointer-events-none opacity-50' : ''"
      >
        Suivant
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogue } from '~/composables/useCatalogue'
import { formatPrice } from '~/utils/price'

const { categories, products, init } = useCatalogue()
const route = useRoute()
const cart = useCart()

onMounted(() => {
  init()
})

const slug = computed(() => String(route.params.slug || ''))

const perPage = 12

const page = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const n = raw ? Number(raw) : 1
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1
})

const category = computed(() => categories.value.find((c) => c.slug === slug.value))

const filtered = computed(() => products.value.filter((p) => p.category?.slug === slug.value))
const total = computed(() => filtered.value.length)

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / perPage)))

const paged = computed(() => {
  const start = (page.value - 1) * perPage
  return filtered.value.slice(start, start + perPage)
})

const pages = computed(() => {
  const count = pageCount.value
  const current = Math.min(page.value, count)
  const window = 2
  const start = Math.max(1, current - window)
  const end = Math.min(count, current + window)
  const result: number[] = []
  for (let i = start; i <= end; i++) result.push(i)
  return result
})

const pageLink = (p: number) => ({
  path: `/categories/${slug.value}`,
  query: p <= 1 ? {} : { page: String(p) }
})

useHead(() => ({
  title: category.value?.name || 'Catégorie',
  meta: [
    {
      name: 'description',
      content: category.value ? `Produits de la catégorie ${category.value.name} sur GodFatherGame.` : 'Catégorie produits.'
    }
  ]
}))
</script>
