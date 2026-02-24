<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Témoignages</h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Des retours authentiques sur la qualité de nos produits, la clarté des conseils et la préparation des bundles.
        Chez GodFatherGame, l’objectif est simple : une expérience d’achat rapide et rassurante, du panier à la réception.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="gfg-surface p-6"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-sm font-semibold text-white">{{ review.name }}</div>
            <div class="mt-1 text-xs text-slate-400">{{ review.meta }}</div>
          </div>
          <div class="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <div class="flex items-center gap-0.5 text-blue-300" aria-hidden="true">
              <svg v-for="i in review.rating" :key="i" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 17.3l-6.18 3.7 1.64-7.03L2 9.24l7.19-.61L12 2l2.81 6.63 7.19.61-5.46 4.73 1.64 7.03z"
                />
              </svg>
            </div>
            <div class="text-xs font-semibold text-slate-200">{{ review.rating }}/5</div>
          </div>
        </div>
        <p class="mt-4 text-sm text-slate-300">{{ review.text }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
type Review = {
  id: string
  name: string
  meta: string
  rating: number
  text: string
}

const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Koffi A.',
    meta: 'Pack console + manette',
    rating: 5,
    text: 'Service propre et rapide. Ils m’ont proposé un pack cohérent avec mon écran et mon budget, je recommande.'
  },
  {
    id: 'r2',
    name: 'Aminata S.',
    meta: 'Casque + réglages audio',
    rating: 5,
    text: 'Excellent accompagnement. Le casque est nickel et les réglages conseillés changent vraiment l’immersion.'
  },
  {
    id: 'r3',
    name: 'Moussa D.',
    meta: 'Console rétro + accessoires',
    rating: 5,
    text: 'Très bonne sélection rétro. Tout était prêt à jouer, avec des conseils simples pour bien installer.'
  },
  {
    id: 'r4',
    name: 'Fatou N.',
    meta: 'Conseil avant achat',
    rating: 5,
    text: 'Réponse rapide et claire. On sent l’expérience gaming : recommandations précises et efficaces.'
  },
  {
    id: 'r5',
    name: 'Cheikh B.',
    meta: 'Manette pro',
    rating: 5,
    text: 'Manette top et prise en main immédiate. Les options de configuration sont bien expliquées.'
  },
  {
    id: 'r6',
    name: 'Ndeye P.',
    meta: 'Bundle prêt à jouer',
    rating: 5,
    text: 'Tout est arrivé propre, bien emballé et le bundle était vraiment logique. Très satisfait.'
  },
  {
    id: 'r7',
    name: 'Ibrahim K.',
    meta: 'Stockage SSD',
    rating: 5,
    text: 'Installation simple et gain de place énorme. Merci pour les conseils sur la compatibilité.'
  },
  {
    id: 'r8',
    name: 'Yasmine O.',
    meta: 'Accessoires setup',
    rating: 5,
    text: 'Mon setup est plus propre et plus confortable. Livraison rapide et communication pro.'
  },
  {
    id: 'r9',
    name: 'Sadio G.',
    meta: 'Console next-gen',
    rating: 5,
    text: 'Produit conforme, expérience fluide. J’ai apprécié la clarté des fiches et le suivi.'
  },
  {
    id: 'r10',
    name: 'Hawa T.',
    meta: 'Casque compétitif',
    rating: 5,
    text: 'Très bon pour les FPS, on entend bien les pas. Service client réactif.'
  },
  {
    id: 'r11',
    name: 'Malick S.',
    meta: 'Pack streaming',
    rating: 5,
    text: 'On m’a guidé pour les réglages et l’installation. Résultat propre dès le premier live.'
  },
  {
    id: 'r12',
    name: 'Awa D.',
    meta: 'Cadeau gaming',
    rating: 5,
    text: 'Idée cadeau parfaite, et livraison dans les délais. Très sérieux.'
  },
  {
    id: 'r13',
    name: 'Binta K.',
    meta: 'Manette + accessoires',
    rating: 5,
    text: 'Tout est nickel. J’aime le côté “gaming” du site, c’est clair et pro.'
  },
  {
    id: 'r14',
    name: 'Ousmane F.',
    meta: 'Bundle console + casque',
    rating: 5,
    text: 'Bundle bien pensé. Rien à ajouter, tu branches et tu joues.'
  },
  {
    id: 'r15',
    name: 'Khadija M.',
    meta: 'Conseils compatibilité',
    rating: 5,
    text: 'Ils ont vérifié la compatibilité avec mon écran et mes jeux. Très bon accompagnement.'
  },
  {
    id: 'r16',
    name: 'Abdoulaye C.',
    meta: 'Stockage + optimisation',
    rating: 5,
    text: 'Je ne galère plus avec l’espace. Conseils clairs et efficaces.'
  },
  {
    id: 'r17',
    name: 'Mariama L.',
    meta: 'Accessoires audio',
    rating: 5,
    text: 'Audio incroyable. Je joue longtemps sans fatigue, super confort.'
  },
  {
    id: 'r18',
    name: 'Issa N.',
    meta: 'Console reconditionnée',
    rating: 5,
    text: 'Produit propre et comme neuf. Très bon rapport qualité/prix.'
  },
  {
    id: 'r19',
    name: 'Salimata D.',
    meta: 'Commande rapide',
    rating: 5,
    text: 'Process simple, réponses rapides. Je recommande sans hésiter.'
  },
  {
    id: 'r20',
    name: 'Adama S.',
    meta: 'Setup & installation',
    rating: 5,
    text: 'Setup propre, installation maîtrisée. Résultat pro et stable.'
  }
]

useHead({
  title: 'Témoignages',
  meta: [{ name: 'description', content: 'Avis clients et retours sur GodFatherGame.' }]
})
</script>
