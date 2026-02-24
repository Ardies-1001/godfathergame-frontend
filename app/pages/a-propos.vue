<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="relative overflow-hidden rounded-3xl bg-slate-900">
      <div class="absolute inset-0">
        <img :src="heroImage" alt="Background" class="h-full w-full object-cover opacity-40" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 to-transparent"></div>
      </div>
      <div class="relative px-8 py-16 sm:px-16 sm:py-24 lg:py-32">
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Notre passion, <span class="text-blue-500">votre jeu</span>.
        </h1>
        <p class="mt-6 max-w-2xl text-lg text-slate-300">
          {{ siteName }} est né d'une idée simple : proposer une expérience d'achat de consoles et d'accessoires aussi
          fluide et passionnante que le jeu lui-même.
        </p>
      </div>
    </div>

    <!-- Mission & Vision -->
    <section class="grid gap-8 lg:grid-cols-2">
      <div class="gfg-surface p-8 sm:p-10">
        <h2 class="text-2xl font-bold text-white">Notre Mission</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">
          Nous sélectionnons rigoureusement chaque console et accessoire pour garantir qualité et fiabilité.
          Que vous soyez un joueur occasionnel ou un compétiteur acharné, notre objectif est de vous fournir
          le matériel adapté à vos besoins, sans compromis.
        </p>
      </div>
      <div class="gfg-surface p-8 sm:p-10">
        <h2 class="text-2xl font-bold text-white">Notre Vision</h2>
        <p class="mt-4 text-slate-300 leading-relaxed">
          Rendre l’achat de matériel gaming simple, transparent et rassurant.
          Nous croyons en une communauté où le conseil et l'entraide priment,
          loin des discours commerciaux complexes.
        </p>
      </div>
    </section>

    <!-- Values Grid -->
    <section>
      <h2 class="mb-8 text-2xl font-bold text-white">Nos Valeurs</h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
          <div class="mb-4 inline-flex items-center justify-center rounded-xl bg-blue-500/10 p-3 text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-white">Transparence</h3>
          <p class="mt-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            Des fiches produits claires, des prix justes et une disponibilité affichée en temps réel. Pas de mauvaises surprises.
          </p>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
          <div class="mb-4 inline-flex items-center justify-center rounded-xl bg-purple-500/10 p-3 text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-white">Qualité</h3>
          <p class="mt-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            Chaque produit est vérifié. Nous ne vendons que ce que nous utiliserions nous-mêmes pour jouer.
          </p>
        </div>

        <div class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10">
          <div class="mb-4 inline-flex items-center justify-center rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h3 class="text-lg font-semibold text-white">Communauté</h3>
          <p class="mt-2 text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
            Nous sommes des joueurs avant d'être des vendeurs. Nous partageons vos passions et comprenons vos attentes.
          </p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="gfg-surface relative overflow-hidden rounded-3xl p-8 sm:p-12 text-center">
      <div class="relative z-10 mx-auto max-w-2xl">
        <h2 class="text-2xl font-bold text-white sm:text-3xl">Prêt à passer au niveau supérieur ?</h2>
        <p class="mt-4 text-slate-300">
          Découvrez notre catalogue ou contactez-nous pour un conseil personnalisé.
        </p>
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink
            to="/catalogue"
            class="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-8 font-semibold text-white transition-colors hover:bg-blue-500"
          >
            Voir le catalogue
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-8 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import heroImage from '~/assets/images/photo_6_2024-11-11_22-45-11.jpg'

const { public: publicConfig } = useRuntimeConfig()
const siteName = computed(() => publicConfig.siteName as string)

useHead({
  title: 'À propos',
  meta: [{ name: 'description', content: `Découvrez l'histoire et les valeurs de ${siteName.value}, votre expert gaming.` }]
})
</script>
