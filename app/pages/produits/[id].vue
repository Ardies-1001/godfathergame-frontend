<template>
  <section class="space-y-8">
    <div v-if="!product" class="gfg-surface p-8 sm:p-10">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Produit introuvable</h1>
      <p class="mt-3 max-w-2xl text-slate-300">
        Le produit demandé n’existe pas ou a été retiré du catalogue.
      </p>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <NuxtLink
          to="/catalogue"
          class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
        >
          Retour au catalogue
        </NuxtLink>
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
        >
          Accueil
        </NuxtLink>
      </div>
    </div>

    <div v-else class="space-y-8">
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-7 space-y-4">
          <div class="gfg-surface overflow-hidden">
            <button
              type="button"
              class="relative block w-full aspect-[16/10] bg-slate-900 cursor-zoom-in group"
              @click="isModalOpen = true"
            >
              <img :src="activeImage" :alt="product.name" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div class="bg-black/50 p-3 rounded-full text-white backdrop-blur-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                </div>
              </div>
            </button>
          </div>

          <div v-if="mediaImages.length > 1" class="grid grid-cols-3 gap-3 sm:grid-cols-6">
            <button
              v-for="img in mediaImages"
              :key="img"
              type="button"
              class="gfg-surface overflow-hidden border border-white/10 transition-colors hover:bg-white/10"
            :class="img === activeImage ? 'ring-2 ring-blue-500/70' : ''"
              @click="activeImage = img"
            >
              <div class="relative aspect-[4/3] bg-slate-900">
                <img :src="img" alt="" class="absolute inset-0 h-full w-full object-cover" />
              </div>
            </button>
          </div>

          <div v-if="product.videos?.length" class="space-y-3">
            <div class="text-sm font-semibold text-white">Vidéos</div>
            <div class="grid gap-4 md:grid-cols-2">
              <div v-for="src in product.videos" :key="src" class="gfg-surface overflow-hidden">
                <div class="relative aspect-video bg-slate-900">
                  <iframe
                    class="absolute inset-0 h-full w-full"
                    :src="src"
                    title="Vidéo produit"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside class="lg:col-span-5 space-y-6">
          <div class="gfg-surface p-6 sm:p-8">
            <div class="flex items-start justify-between gap-4">
              <div>
                <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ product.brand }}</div>
                <h1 class="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">{{ product.name }}</h1>
                <div class="mt-3 text-sm text-slate-300">{{ product.shortDescription }}</div>
              </div>
              <div class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white">
                {{ product.badge }}
              </div>
            </div>

            <div class="mt-6 flex items-end justify-between gap-6">
              <div>
                <div class="text-xs text-slate-400">Prix</div>
                <div class="text-2xl font-bold text-white">{{ formatPrice(product.price) }}</div>
              </div>

              <div class="text-right">
                <div class="text-xs text-slate-400">Total</div>
                <div class="text-lg font-bold text-white">{{ formatPrice(lineTotal) }}</div>
              </div>
            </div>

            <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="text-xs font-semibold text-white">Quantité</div>
              <div class="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  class="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                  :disabled="quantity <= 1"
                  :class="quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
                  @click="quantity = Math.max(1, quantity - 1)"
                >
                  −
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  min="1"
                class="h-10 w-20 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-center text-sm font-semibold text-white outline-none focus:border-blue-500/60"
                />
                <button
                  type="button"
                  class="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                  @click="quantity = quantity + 1"
                >
                  +
                </button>
              </div>

              <div class="mt-4 grid gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  class="inline-flex h-10 w-full items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
                  @click="addToCart(false)"
                >
                  Ajouter au panier
                </button>
                <button
                  type="button"
                  class="inline-flex h-10 w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
                  @click="addToCart(true)"
                >
                  Commander
                </button>
              </div>
            </div>

            <div class="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Paiement et livraison à confirmer lors de la commande. Besoin d’un conseil (écran, audio, réseau) ?
              <NuxtLink to="/contact" class="font-semibold text-white hover:text-slate-200 transition-colors">Contactez-nous</NuxtLink>.
            </div>
          </div>

          <div class="gfg-surface p-6 sm:p-8">
            <div class="text-sm font-semibold text-white">Description</div>
            <p class="mt-3 text-sm text-slate-300 whitespace-pre-line">{{ product.description }}</p>
          </div>
        </aside>
      </div>

      <ClientOnly>
        <div v-if="similarProducts.length" class="space-y-5">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">Produits similaires</h2>
              <p class="mt-2 text-sm text-slate-300">
                Une sélection aléatoire de produits dans la même catégorie.
              </p>
            </div>
            <NuxtLink
              :to="`/categories/${product.category}`"
              class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              Voir la catégorie
            </NuxtLink>
          </div>

          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <article v-for="p in similarProducts" :key="p.id" class="gfg-surface overflow-hidden">
              <NuxtLink :to="`/produits/${p.id}`" class="block">
                <div class="relative aspect-[16/10] bg-gradient-to-br from-white/10 via-slate-950 to-blue-500/10">
                  <img :src="p.image" :alt="p.name" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent"></div>
                  <div class="absolute left-3 top-3 inline-flex items-center rounded-full border border-white/10 bg-slate-950/40 px-3 py-1 text-xs text-white">
                    {{ p.badge }}
                  </div>
                </div>
              </NuxtLink>

              <div class="p-5">
                <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ p.brand }}</div>
                <div class="mt-2 text-sm font-bold text-white">{{ p.name }}</div>
                <div class="mt-3 flex items-center justify-between gap-3">
                  <div class="text-sm font-bold text-white">{{ formatPrice(p.price) }}</div>
                  <NuxtLink
                    :to="`/produits/${p.id}`"
                    class="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
                  >
                    Voir détails
                  </NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </div>

        <template #fallback>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div v-for="i in 8" :key="i" class="gfg-surface overflow-hidden">
              <div class="aspect-[16/10] bg-white/5"></div>
              <div class="p-5 space-y-3">
                <div class="h-3 w-20 rounded bg-white/10"></div>
                <div class="h-4 w-40 rounded bg-white/10"></div>
                <div class="h-3 w-full rounded bg-white/10"></div>
              </div>
            </div>
          </div>
        </template>
      </ClientOnly>
    </div>

    <UModal v-model:open="isModalOpen" :ui="{ width: 'w-full sm:max-w-6xl', overlay: { background: 'bg-slate-950/90 backdrop-blur' } }">
      <div class="relative bg-slate-900 flex items-center justify-center">
        <DialogTitle class="sr-only">Zoom produit</DialogTitle>
        <DialogDescription class="sr-only">Aperçu agrandi de l'image du produit</DialogDescription>
        <button
          type="button"
          class="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          @click="isModalOpen = false"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <img :src="activeImage" :alt="product?.name" class="max-w-full max-h-[90vh] object-contain" />
      </div>
    </UModal>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogue } from '~/composables/useCatalogue'
import { formatPrice } from '~/utils/price'
import type { Product } from '~/types/shop'

const { products, init } = useCatalogue()
const route = useRoute()
const cart = useCart()

onMounted(() => {
  init()
})

const id = computed(() => String(route.params.id || ''))
const product = computed(() => products.value.find((p) => p.id === id.value))

const quantity = ref(1)
watchEffect(() => {
  if (quantity.value < 1 || !Number.isFinite(quantity.value)) quantity.value = 1
})

const mediaImages = computed(() => {
  if (!product.value) return []
  const base = product.value.gallery?.length ? product.value.gallery : [product.value.image]
  return Array.from(new Set(base)).filter(Boolean) as string[]
})

const activeImage = ref('')
const isModalOpen = ref(false)

watchEffect(() => {
  if (!mediaImages.value.length) return
  if (!activeImage.value || !mediaImages.value.includes(activeImage.value)) activeImage.value = mediaImages.value[0] ?? ''
})

const lineTotal = computed(() => (product.value ? Number(product.value.price) * quantity.value : 0))

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

const similarProducts = ref<Product[]>([])
watchEffect(() => {
  if (!process.client) return
  if (!product.value) {
    similarProducts.value = []
    return
  }
  const sameCategory = products.value.filter((p) => p.category?.slug === product.value!.category?.slug && p.id !== product.value!.id)
  similarProducts.value = shuffle(sameCategory).slice(0, 8)
})

const addToCart = async (goToCart: boolean) => {
  if (!product.value) return
  cart.add(product.value.id, quantity.value)
  if (goToCart) await navigateTo('/commande')
}

useHead(() => ({
  title: product.value ? product.value.name : 'Produit',
  meta: [
    {
      name: 'description',
      content: product.value ? product.value.shortDescription : 'Détails produit GodFatherGame.'
    }
  ]
}))
</script>
