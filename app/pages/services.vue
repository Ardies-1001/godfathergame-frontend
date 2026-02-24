<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="relative overflow-hidden rounded-3xl bg-slate-900">
      <div class="absolute inset-0">
        <img :src="heroImage" alt="Services Background" class="h-full w-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>
      <div class="relative px-8 py-16 sm:px-16 sm:py-20 lg:py-24">
        <div class="max-w-3xl">
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">Nos Services</h1>
          <p class="mt-6 text-lg text-slate-300">
            Du choix de la console jusqu’au setup final, GodFatherGame vous accompagne avec une approche claire : une
            config cohérente, une installation propre, et un support réactif pour jouer sans friction.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <NuxtLink
              to="/catalogue"
              class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
            >
              Voir le catalogue
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              Demander un devis
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Services Grid -->
    <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(s, index) in services"
        :key="s.title"
        class="group gfg-surface relative overflow-hidden p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
        :style="{ animationDelay: `${index * 100}ms` }"
        :class="{ 'animate-fade-in-up': true }"
      >
        <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/5 opacity-0 transition-all group-hover:scale-150 group-hover:opacity-100"></div>
        
        <div class="relative">
          <div class="flex items-start justify-between gap-4">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="s.icon"></svg>
            </div>
            <div class="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-200">
              {{ s.tag }}
            </div>
          </div>

          <h3 class="mt-4 text-lg font-bold text-white">{{ s.title }}</h3>
          <p class="mt-2 text-sm text-slate-300 leading-relaxed">{{ s.description }}</p>

          <div class="mt-4 border-t border-white/5 pt-4">
            <div class="flex items-start gap-2 text-xs text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-0.5 shrink-0 text-blue-500"><path d="M20 6 9 17l-5-5"/></svg>
              <span>Idéal pour : <span class="text-slate-200">{{ s.forWho }}</span></span>
            </div>
          </div>
        </div>
      </article>
    </div>

    <!-- Call to Action Footer -->
    <div class="gfg-surface relative overflow-hidden rounded-3xl p-8 sm:p-12">
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-50"></div>
      <div class="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div class="max-w-2xl">
          <h2 class="text-2xl font-bold text-white sm:text-3xl">Besoin d’un pack prêt à jouer ?</h2>
          <p class="mt-4 text-slate-300">
            Dites-nous vos jeux, votre budget et votre écran. On vous propose une sélection cohérente (console +
            accessoires + réglages) et on vous accompagne jusqu’à la mise en route.
          </p>
        </div>
        <NuxtLink
          to="/contact"
          class="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-400 transition-all hover:scale-105"
        >
          Contacter le support
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import heroImage from '~/assets/images/photo_14_2024-11-11_22-45-11.jpg'

type Service = {
  title: string
  tag: string
  description: string
  forWho: string
  icon: string
}

const services: Service[] = [
  {
    title: 'Vente de consoles (neuf & reconditionné)',
    tag: 'Vente',
    description:
      'Sélection de consoles testées et prêtes à jouer, avec recommandations selon vos jeux (AAA, FPS, sports, famille) et votre budget. Nous vous guidons aussi sur la compatibilité accessoires.',
    forWho: 'Joueurs qui veulent une console fiable, sans hésitation au moment du choix.',
    icon: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'
  },
  {
    title: 'Location de consoles pour événements',
    tag: 'Location',
    description:
      'Mise à disposition de consoles et accessoires pour événements, soirées gaming, tournois et animations. Possibilité de packs multi-manettes et conseils d’organisation.',
    forWho: 'Événements, tournois, anniversaires, animations et salles de jeu.',
    icon: '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>'
  },
  {
    title: 'Conception de packs setup sur-mesure',
    tag: 'Setup',
    description:
      'Construction d’un pack complet : console, manettes, casque/micro, stockage, câblage et recommandations d’écran. Le pack est pensé pour votre style de jeu et votre espace.',
    forWho: 'Joueurs qui veulent un setup cohérent et propre dès le premier jour.',
    icon: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>'
  },
  {
    title: 'Installation & configuration',
    tag: 'Installation',
    description:
      'Installation, configuration des comptes, mises à jour, réglages manette/audio, et optimisation de base. Objectif : une expérience fluide dès la première session.',
    forWho: 'Joueurs qui veulent gagner du temps et éviter les mauvaises configurations.',
    icon: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>'
  },
  {
    title: 'Installation de jeux & stockage',
    tag: 'Jeux',
    description:
      'Organisation de la bibliothèque, installation de jeux, gestion des mises à jour, et conseils stockage (SSD, extensions). Nous optimisons l’espace et les temps de chargement.',
    forWho: 'Collections de jeux, consoles partagées en famille, joueurs multi-titres.',
    icon: '<path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>'
  },
  {
    title: 'Optimisation réseau & performance',
    tag: 'Online',
    description:
      'Aide au diagnostic des soucis de ping, Wi‑Fi instable et déconnexions : recommandations de placement, paramètres, et bonnes pratiques pour une expérience en ligne stable.',
    forWho: 'Joueurs compétitifs (FPS/BR), parties en ligne et streaming.',
    icon: '<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>'
  },
  {
    title: 'Maintenance & nettoyage',
    tag: 'Maintenance',
    description:
      'Conseils et accompagnement pour l’entretien : nettoyage, ventilation, bonnes pratiques et optimisation de l’environnement de jeu. Objectif : préserver les performances.',
    forWho: 'Consoles utilisées intensivement, environnements poussiéreux.',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>'
  },
  {
    title: 'Support client & conseil gaming',
    tag: 'Support',
    description:
      'Support avant et après achat : compatibilités, réglages, recommandations accessoires, choix de jeux et options de packs. Réponse claire, orientée solution.',
    forWho: 'Doutes avant achat, questions de compatibilité, besoin d’un conseil rapide.',
    icon: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'
  }
]

useHead({
  title: 'Services',
  meta: [{ name: 'description', content: 'Services gaming : conseils, bundles prêts à jouer, support client.' }]
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0; /* Start hidden */
  animation: fadeInUp 0.6s ease-out forwards;
}
</style>
