<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Catégories</h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Explorez nos univers gaming : consoles, rétro, accessoires, audio, bundles et plus. Chaque catégorie regroupe
        une sélection claire pour trouver rapidement ce qu’il vous faut.
      </p>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" v-if="categories.length">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/categories/${cat.slug}`"
        class="group gfg-surface overflow-hidden transition-colors hover:bg-white/10"
      >
        <div class="relative aspect-[16/10]">
          <img :src="cat.image" :alt="cat.name" class="absolute inset-0 h-full w-full object-cover opacity-90" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/92 via-slate-950/35 to-transparent"></div>
          <div class="absolute bottom-4 left-4 right-4">
            <div class="text-lg font-bold text-white">{{ cat.name }}</div>
            <div class="mt-2 text-sm text-slate-200 line-clamp-2">{{ cat.description }}</div>
            <div class="mt-4 inline-flex items-center text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
              Voir les produits →
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-12 gfg-surface rounded-2xl">
      <div class="inline-flex items-center justify-center p-4 rounded-full bg-white/5 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2c.6.5 1.2 1 1.7 1.7"/><path d="M22 10c-.5-.6-1-1.2-1.7-1.7"/><rect width="8" height="8" x="14" y="14" rx="2"/><rect width="8" height="8" x="2" y="14" rx="2"/><path d="M10 22c-.6-.5-1.2-1-1.7-1.7"/><path d="M2 14c.5.6 1 1.2 1.7 1.7"/><path d="M22 14c-.5.6-1 1.2-1.7 1.7"/><path d="M10 2c-.6.5-1.2 1-1.7 1.7"/></svg>
      </div>
      <h3 class="text-lg font-medium text-white">Aucune catégorie pour le moment</h3>
      <p class="mt-2 text-slate-400">Revenez bientôt pour découvrir nos univers.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogue } from '~/composables/useCatalogue'

const { categories, init } = useCatalogue()

onMounted(() => {
  init()
})

useHead({
  title: 'Catégories',
  meta: [{ name: 'description', content: 'Liste complète des catégories GodFatherGame.' }]
})
</script>
