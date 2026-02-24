<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Conditions Générales de Vente (CGV)</h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Texte modèle à personnaliser. Pour un site e-commerce réel, faites valider les CGV par un professionnel.
      </p>

      <div class="mt-8 grid gap-6">
        <div v-for="section in sections" :key="section.title" class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="text-sm font-semibold text-white">{{ section.title }}</div>
          <p class="mt-3 text-sm text-slate-300">{{ section.body }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const sections = [
  {
    title: '1. Objet',
    body: 'Les présentes CGV définissent les modalités de vente des produits proposés sur le site.'
  },
  {
    title: '2. Produits',
    body: 'Les caractéristiques essentielles des produits (consoles, accessoires, bundles) sont présentées dans le catalogue.'
  },
  {
    title: '3. Prix',
    body: 'Les prix sont indiqués en euros TTC. Les frais de livraison, lorsqu’ils s’appliquent, sont précisés avant validation de commande.'
  },
  {
    title: '4. Commande',
    body: 'La commande est validée après vérification du panier et confirmation du paiement selon le parcours indiqué.'
  },
  {
    title: '5. Livraison',
    body: 'Les délais de livraison dépendent de la disponibilité et du transporteur. Un suivi peut être communiqué.'
  },
  {
    title: '6. Rétractation & retours',
    body: 'Les modalités de rétractation, retours et remboursements doivent être précisées selon la réglementation applicable.'
  },
  {
    title: '7. Support',
    body: 'Le support client est joignable via la page Contact pour toute question sur une commande ou un produit.'
  }
]

useHead({
  title: 'CGV',
  meta: [{ name: 'description', content: 'Conditions Générales de Vente du site GodFatherGame.' }]
})
</script>
