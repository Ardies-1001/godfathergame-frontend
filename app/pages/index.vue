<template>
  <section class="space-y-24">
    <div class="gfg-surface overflow-hidden">
      <div class="relative grid gap-10 p-8 md:grid-cols-12 md:items-center md:p-12">
        <div class="absolute inset-0 opacity-60">
          <img :src="heroBgUrl" alt="" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-slate-950/80"></div>
        </div>

        <div class="relative space-y-6 md:col-span-7">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-slate-200">
            <span class="inline-block size-2 rounded-full bg-blue-400"></span>
            Vente & location • Packs setup • Support gaming
          </div>

          <h1 class="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Consoles et accessoires premium, sélectionnés pour jouer sans compromis.
          </h1>

          <p class="max-w-2xl text-pretty text-base text-slate-200 sm:text-lg">
            {{ siteName }} propose une sélection claire et soignée : nouveautés, best-sellers et équipements de
            performance. Une expérience d’achat rapide, lisible et mobile-first.
          </p>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <NuxtLink
              to="/catalogue"
              class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Voir le catalogue
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              Conseils & devis
            </NuxtLink>
          </div>

          <div class="grid gap-3 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <div class="text-xs font-semibold text-white">Stocks & restocks</div>
              <div class="mt-1 text-xs text-slate-200">Sélection mise à jour</div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <div class="text-xs font-semibold text-white">Bundles</div>
              <div class="mt-1 text-xs text-slate-200">Prêts à jouer</div>
            </div>
            <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
              <div class="text-xs font-semibold text-white">Support</div>
              <div class="mt-1 text-xs text-slate-200">Réactif & pro</div>
            </div>
          </div>
        </div>

        <div class="relative md:col-span-5">
          <div class="grid gap-4 sm:grid-cols-2">
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img :src="heroShot1Url" :alt="`${siteName} - Gaming setup`" class="h-44 w-full object-cover sm:h-64" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="text-xs font-semibold text-white">Sélection consoles</div>
                <div class="mt-1 text-xs text-slate-200">Nouveautés & best-sellers</div>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <img :src="heroShot2Url" :alt="`${siteName} - Accessoires`" class="h-44 w-full object-cover sm:h-64" />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
              <div class="absolute bottom-4 left-4 right-4">
                <div class="text-xs font-semibold text-white">Accessoires pro</div>
                <div class="mt-1 text-xs text-slate-200">Manettes, audio, upgrades</div>
              </div>
            </div>
          </div>

          <div class="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur">
            <div class="flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                  <img :src="logoUrl" :alt="siteName" class="h-6 w-auto" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-white">{{ siteName }}</div>
                  <div class="text-xs text-slate-300">Gaming store</div>
                </div>
              </div>
              <div class="text-right">
                <div class="text-xs text-slate-300">À partir de</div>
                <div class="text-lg font-bold text-white">{{ formatPrice(129.99) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid gap-10 md:grid-cols-3">
      <div class="relative overflow-hidden rounded-2xl border border-white/10 p-6 group">
        <img :src="bgBlock1Url" class="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        <div class="relative z-10">
          <div class="text-sm font-semibold text-white">Sélection premium</div>
          <div class="mt-2 text-sm text-slate-200">Consoles et accessoires choisis pour la performance et la fiabilité.</div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-2xl border border-white/10 p-6 group">
        <img :src="bgBlock2Url" class="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        <div class="relative z-10">
          <div class="text-sm font-semibold text-white">Expérience mobile</div>
          <div class="mt-2 text-sm text-slate-200">UI lisible, rapide et optimisée pour la conversion.</div>
        </div>
      </div>
      <div class="relative overflow-hidden rounded-2xl border border-white/10 p-6 group">
        <img :src="bgBlock3Url" class="absolute inset-0 h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
        <div class="relative z-10">
          <div class="text-sm font-semibold text-white">Support réactif</div>
          <div class="mt-2 text-sm text-slate-200">Conseils et accompagnement pour choisir la bonne console.</div>
        </div>
      </div>
    </div>

    <div class="space-y-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">Catégories</h2>
          <p class="mt-2 max-w-2xl text-sm text-slate-300">
            Parcourez nos univers gaming : consoles, accessoires, audio, bundles et plus.
          </p>
        </div>
        <NuxtLink to="/categories" class="text-sm font-semibold text-slate-200 hover:text-white transition-colors">
          Voir plus →
        </NuxtLink>
      </div>

      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4" v-if="homeCategories.length">
        <NuxtLink
          v-for="cat in homeCategories"
          :key="cat.slug"
          :to="`/categories/${cat.slug}`"
          class="group gfg-surface overflow-hidden transition-colors hover:bg-white/10"
        >
          <div class="relative aspect-[16/10]">
            <img :src="cat.image" :alt="cat.name" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4">
              <div class="text-sm font-semibold text-white">{{ cat.name }}</div>
              <div class="mt-1 text-xs text-slate-200 line-clamp-2">{{ cat.description }}</div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="text-center py-12 gfg-surface rounded-2xl">
          <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c.6.5 1.2 1 1.7 1.7"/><path d="M22 10c-.5-.6-1-1.2-1.7-1.7"/><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="14" rx="2"/><path d="M10 22c-.6-.5-1.2-1-1.7-1.7"/><path d="M2 14c.5.6 1 1.2 1.7 1.7"/><path d="M22 14c-.5.6-1 1.2-1.7 1.7"/><path d="M10 2c-.6.5-1.2 1-1.7 1.7"/></svg>
          </div>
          <h3 class="text-lg font-medium text-white">Aucune catégorie pour le moment</h3>
          <p class="mt-2 text-slate-400">Les catégories seront bientôt disponibles.</p>
        </div>
    </div>

    <div class="space-y-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">Sélection du moment</h2>
          <p class="mt-2 max-w-2xl text-sm text-slate-300">Quelques produits mis en avant pour démarrer.</p>
        </div>
        <NuxtLink to="/catalogue" class="text-sm font-semibold text-slate-200 hover:text-white transition-colors">
          Tout voir →
        </NuxtLink>
      </div>

      <ClientOnly>
        <div v-if="featuredProducts.length" class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="product in featuredProducts" :key="product.id" class="gfg-surface overflow-hidden">
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

        <div v-else class="text-center py-12 gfg-surface rounded-2xl">
          <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <h3 class="text-lg font-medium text-white">Aucun produit pour le moment</h3>
          <p class="mt-2 text-slate-400">Revenez bientôt pour découvrir notre sélection.</p>
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
    </div>

    <div id="faq" class="space-y-5 scroll-mt-24">
      <div>
        <h2 class="text-xl font-bold tracking-tight text-white sm:text-2xl">FAQ</h2>
        <p class="mt-2 max-w-2xl text-sm text-slate-300">
          Les réponses aux questions les plus fréquentes avant d’acheter une console ou un accessoire.
        </p>
      </div>

      <div class="grid gap-4">
        <details v-for="item in faq" :key="item.q" class="gfg-surface p-6">
          <summary class="cursor-pointer select-none text-sm font-semibold text-white">
            {{ item.q }}
          </summary>
          <div class="mt-3 text-sm text-slate-300">
            {{ item.a }}
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useCatalogue } from '~/composables/useCatalogue'
import { formatPrice } from '~/utils/price'
import type { Product } from '~/types/shop'

const { public: publicConfig } = useRuntimeConfig()
const siteName = computed(() => publicConfig.siteName as string)

import logoUrl from '~/assets/images/uploads/logo_9d5c28a705.svg'
import heroBgUrl from '~/assets/images/photo_17_2024-11-11_22-45-11.jpg'
import heroShot1Url from '~/assets/images/photo_12_2024-11-11_22-45-11.jpg'
import heroShot2Url from '~/assets/images/photo_14_2024-11-11_22-45-11.jpg'
import bgBlock1Url from '~/assets/images/photo_3_2024-11-11_22-45-11.jpg'
import bgBlock2Url from '~/assets/images/photo_4_2024-11-11_22-45-11.jpg'
import bgBlock3Url from '~/assets/images/photo_8_2024-11-11_22-45-11.jpg'

const cart = useCart()
const { categories, products, init } = useCatalogue()

onMounted(() => {
  init()
})

const homeCategories = computed(() => categories.value.slice(0, 8))

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

const featuredProducts = ref<Product[]>([])

watch(products, (newProducts) => {
  if (newProducts.length) {
    featuredProducts.value = shuffle(newProducts).slice(0, 9)
  }
}, { immediate: true })

const faq = [
  {
    q: 'Quelle console choisir pour un usage famille, solo ou compétitif ?',
    a: 'Pour la famille, privilégiez une console polyvalente et simple à prendre en main. Pour le solo, visez la meilleure performance graphique. Pour le compétitif, cherchez fluidité (120 Hz), stabilité réseau et une manette adaptée.'
  },
  {
    q: 'Vendez-vous des bundles prêts à jouer ?',
    a: 'Oui. Les bundles regroupent console + accessoires essentiels (manette, casque, stockage) afin de démarrer immédiatement avec un setup cohérent.'
  },
  {
    q: 'Les accessoires sont-ils compatibles entre générations ?',
    a: 'Certaines manettes et casques sont compatibles, d’autres non. Vérifiez la plateforme et le modèle ; en cas de doute, contactez-nous avec votre console et vos jeux.'
  },
  {
    q: 'Comment optimiser la qualité audio en jeu (FPS, battle royale) ?',
    a: 'Un casque avec bonne spatialisation, un micro clair et des réglages audio adaptés font une vraie différence. Nous proposons des recommandations selon votre type de jeux.'
  },
  {
    q: 'Proposez-vous des conseils avant achat ?',
    a: 'Oui. Dites-nous vos jeux principaux, votre budget et votre écran (TV/moniteur), et nous vous orientons vers la meilleure option.'
  },
  {
    q: 'Quels moyens de contact pour une commande rapide ?',
    a: 'Passez par la page Contact : email ou téléphone. Pour une commande urgente, indiquez le produit, la quantité et la ville de livraison.'
  }
]

useHead({
  title: 'Accueil',
  meta: [{ name: 'description', content: 'Boutique de consoles et accessoires gaming : nouveautés, rétro, bundles.' }]
})
</script>
