<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Mentions légales</h1>
      <p class="mt-4 max-w-3xl text-slate-300">
        Ces informations sont des placeholders à compléter (raison sociale, SIRET, hébergeur, responsable de
        publication).
      </p>

      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="text-sm font-semibold text-white">Éditeur</div>
          <div class="mt-3 space-y-2 text-sm text-slate-300">
            <div><span class="text-slate-400">Site :</span> <span class="text-slate-200">{{ siteName }}</span></div>
            <div><span class="text-slate-400">Email :</span> <a class="gfg-link" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></div>
            <div><span class="text-slate-400">Téléphone :</span> <a class="gfg-link" :href="`tel:${contactPhone}`">{{ contactPhone }}</a></div>
            <div><span class="text-slate-400">Adresse :</span> <span class="text-slate-200">{{ contactAddress }}</span></div>
            <div><span class="text-slate-400">SIRET :</span> <span class="text-slate-200">À compléter</span></div>
          </div>
        </div>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div class="text-sm font-semibold text-white">Hébergement</div>
          <div class="mt-3 space-y-2 text-sm text-slate-300">
            <div><span class="text-slate-400">Hébergeur :</span> <span class="text-slate-200">À compléter</span></div>
            <div><span class="text-slate-400">Adresse :</span> <span class="text-slate-200">À compléter</span></div>
            <div><span class="text-slate-400">Téléphone :</span> <span class="text-slate-200">À compléter</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { public: publicConfig } = useRuntimeConfig()

const siteName = computed(() => publicConfig.siteName as string)
const contactEmail = computed(() => publicConfig.contactEmail as string)
const contactPhone = computed(() => publicConfig.contactPhone as string)
const contactAddress = computed(() => publicConfig.contactAddress as string)

useHead({
  title: 'Mentions légales',
  meta: [{ name: 'description', content: 'Mentions légales du site GodFatherGame.' }]
})
</script>
