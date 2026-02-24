<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Commande</h1>
          <p class="mt-3 max-w-3xl text-slate-300">
            Remplissez vos coordonnées pour valider la commande. Nous vous recontacterons pour le paiement et la livraison.
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <span class="font-semibold text-white">{{ itemCount }}</span> article(s)
        </div>
      </div>
    </div>

    <div v-if="!lines.length" class="gfg-surface p-8 sm:p-10">
      <div class="text-sm text-slate-200">Votre panier est vide.</div>
      <NuxtLink
        to="/catalogue"
        class="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
      >
        Parcourir le catalogue
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-8 space-y-4">
        <article v-for="line in lines" :key="line.product.id" class="gfg-surface overflow-hidden">
          <div class="grid gap-6 p-6 sm:grid-cols-12 sm:items-center">
            <div class="sm:col-span-4">
              <NuxtLink :to="`/produits/${line.product.id}`" class="block">
                <div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <img :src="line.product.image" :alt="line.product.name" class="absolute inset-0 h-full w-full object-cover" />
                </div>
              </NuxtLink>
            </div>

            <div class="sm:col-span-8">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ line.product.brand }}</div>
                  <div class="mt-2 text-lg font-bold text-white">{{ line.product.name }}</div>
                  <div class="mt-2 text-sm text-slate-300">Quantité : {{ line.quantity }}</div>
                </div>
                <div class="text-right">
                  <div class="text-sm font-bold text-white">{{ formatPrice(line.lineTotal) }}</div>
                  <div class="mt-1 text-xs text-slate-400">Sous-total</div>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="gfg-surface p-6 sm:p-8">
          <h2 class="text-xl font-bold text-white mb-6">Vos coordonnées</h2>
          <form @submit.prevent="submitOrder" class="space-y-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Nom complet <span class="text-red-500">*</span></span>
                <input
                  v-model="form.customerName"
                  required
                  type="text"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="John Doe"
                />
              </label>
              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Email <span class="text-red-500">*</span></span>
                <input
                  v-model="form.customerEmail"
                  required
                  type="email"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="john@example.com"
                />
              </label>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Téléphone</span>
                <input
                  v-model="form.customerPhone"
                  type="tel"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="+229 ..."
                />
              </label>
              <label class="block space-y-2">
                <span class="text-sm text-slate-300">Adresse de livraison</span>
                <input
                  v-model="form.customerAddress"
                  type="text"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="Cotonou, Quartier..."
                />
              </label>
            </div>
          </form>
        </div>
      </div>

      <aside class="lg:col-span-4 space-y-4">
        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Total à payer</div>
          <div class="mt-4 text-2xl font-bold text-white">{{ formatPrice(subtotal) }}</div>
          <div class="mt-2 text-xs text-slate-400">Paiement à la livraison ou via Mobile Money (à confirmer).</div>

          <button
            type="button"
            class="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading || !form.customerName || !form.customerEmail"
            @click="submitOrder"
          >
            {{ loading ? 'Validation...' : 'Valider la commande' }}
          </button>

          <NuxtLink
            to="/panier"
            class="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
          >
            Modifier le panier
          </NuxtLink>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { formatPrice } from '~/utils/price'

const { lines, itemCount, subtotal } = useCart()
const toast = useToast()
const checkout = useState('gfg-checkout', () => ({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: ''
}))

const form = reactive({
  customerName: checkout.value.customerName || '',
  customerEmail: checkout.value.customerEmail || '',
  customerPhone: checkout.value.customerPhone || '',
  customerAddress: checkout.value.customerAddress || ''
})

const loading = ref(false)

const submitOrder = async () => {
  if (loading.value) return
  if (!form.customerName || !form.customerEmail) {
    toast.add({ title: 'Veuillez remplir les champs obligatoires', color: 'red' })
    return
  }
  
  loading.value = true

  try {
    checkout.value = { ...checkout.value, ...form }
    await navigateTo('/devis')
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Veuillez réessayer plus tard.', color: 'red' })
  } finally {
    loading.value = false
  }
}

useHead({
  title: 'Commande',
  meta: [{ name: 'description', content: 'Finaliser votre commande GodFatherGame.' }]
})
</script>
