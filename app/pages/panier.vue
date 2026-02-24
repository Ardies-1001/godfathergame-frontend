<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Panier</h1>
          <p class="mt-3 max-w-3xl text-slate-300">
            Vérifiez vos articles, ajustez les quantités et préparez votre commande.
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
                  <NuxtLink
                    :to="`/produits/${line.product.id}`"
                    class="mt-2 inline-flex text-lg font-bold text-white hover:text-slate-200 transition-colors"
                  >
                    {{ line.product.name }}
                  </NuxtLink>
                  <div class="mt-2 text-sm text-slate-300">{{ line.product.shortDescription }}</div>
                </div>

                <div class="text-right">
                  <div class="text-sm font-bold text-white">{{ formatPrice(line.product.price) }}</div>
                  <div class="mt-1 text-xs text-slate-400">Prix unitaire</div>
                </div>
              </div>

              <div class="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div class="flex items-center gap-2">
                  <button
                    type="button"
                    class="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    :disabled="line.quantity <= 1"
                    :class="line.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''"
                    @click="setQuantity(line.product.id, line.quantity - 1)"
                  >
                    −
                  </button>
                  <input
                    :value="line.quantity"
                    type="number"
                    min="1"
                    class="h-10 w-20 rounded-xl border border-white/10 bg-slate-950/40 px-3 text-sm font-semibold text-white outline-none focus:border-blue-500/60"
                    @change="onQtyChange(line.product.id, $event)"
                  />
                  <button
                    type="button"
                    class="inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
                    @click="setQuantity(line.product.id, line.quantity + 1)"
                  >
                    +
                  </button>
                </div>

                <div class="flex items-center justify-between gap-4 sm:justify-end">
                  <div class="text-sm font-bold text-white">{{ formatPrice(line.lineTotal) }}</div>
                  <button
                    type="button"
                    class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                    @click="remove(line.product.id)"
                  >
                    Retirer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            @click="clear()"
          >
            Vider le panier
          </button>
          <NuxtLink
            to="/catalogue"
            class="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
          >
            Continuer mes achats
          </NuxtLink>
        </div>
      </div>

      <aside class="lg:col-span-4 space-y-4">
        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Récapitulatif</div>

          <div class="mt-5 space-y-3 text-sm">
            <div class="flex items-center justify-between text-slate-300">
              <span>Sous-total</span>
              <span class="font-semibold text-white">{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-slate-300">
              <span>Livraison</span>
              <span class="text-slate-200">À confirmer</span>
            </div>
            <div class="h-px bg-white/10"></div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-white">Total estimé</span>
              <span class="text-lg font-bold text-white">{{ formatPrice(subtotal) }}</span>
            </div>
          </div>

          <button
            type="button"
            class="mt-6 w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
            @click="goToQuote()"
          >
            Commander
          </button>

          <div class="mt-4 text-xs text-slate-400">
            La commande finale se confirme avec notre équipe (disponibilité, livraison, options).
          </div>
        </div>

        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Besoin d’un conseil ?</div>
          <div class="mt-3 text-sm text-slate-300">
            Dites-nous votre écran (TV/moniteur), vos jeux principaux et votre budget : on vous propose un bundle cohérent.
          </div>
          <NuxtLink
            to="/contact"
            class="mt-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
          >
            Contacter GodFatherGame
          </NuxtLink>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/price'

const { lines, itemCount, subtotal, setQuantity, remove, clear } = useCart()

const onQtyChange = (productId: string, event: Event) => {
  const value = Number((event.target as HTMLInputElement).value)
  setQuantity(productId, Number.isFinite(value) ? value : 1)
}

const goToQuote = async () => {
  await navigateTo('/commande')
}

useHead({
  title: 'Panier',
  meta: [{ name: 'description', content: 'Panier GodFatherGame : quantités, total et commande.' }]
})
</script>
