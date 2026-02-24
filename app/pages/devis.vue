<template>
  <section class="space-y-8">
    <div class="gfg-surface p-8 sm:p-10">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-2xl font-bold tracking-tight text-white sm:text-3xl">Devis</h1>
          <p class="mt-3 max-w-3xl text-slate-300">
            Vérifiez le récapitulatif, puis terminez la commande via WhatsApp ou le formulaire de contact.
          </p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
          <span class="font-semibold text-white">{{ itemsCount }}</span> article(s)
        </div>
      </div>
    </div>

    <div v-if="!displayLines.length" class="gfg-surface p-8 sm:p-10">
      <div class="text-sm text-slate-200">Votre devis est vide.</div>
      <NuxtLink
        to="/panier"
        class="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100 transition-colors"
      >
        Retour au panier
      </NuxtLink>
    </div>

    <div v-else class="grid gap-8 lg:grid-cols-12">
      <div class="lg:col-span-8 space-y-4">
        <article v-for="line in displayLines" :key="line.key" class="gfg-surface overflow-hidden">
          <div class="grid gap-6 p-6 sm:grid-cols-12 sm:items-center">
            <div class="sm:col-span-4">
              <NuxtLink v-if="line.productId" :to="`/produits/${line.productId}`" class="block">
                <div class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                  <img :src="line.image" :alt="line.name" class="absolute inset-0 h-full w-full object-cover" />
                </div>
              </NuxtLink>
              <div v-else class="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-900"></div>
            </div>

            <div class="sm:col-span-8">
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ line.brand }}</div>
                  <div class="mt-2 text-lg font-bold text-white">{{ line.name }}</div>
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
      </div>

      <aside class="lg:col-span-4 space-y-4">
        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Récapitulatif</div>

          <div class="mt-5 space-y-3 text-sm">
            <div class="flex items-center justify-between text-slate-300">
              <span>Sous-total</span>
              <span class="font-semibold text-white">{{ formatPrice(displayTotal) }}</span>
            </div>
            <div class="flex items-center justify-between text-slate-300">
              <span>Livraison</span>
              <span class="text-slate-200">À confirmer</span>
            </div>
            <div class="h-px bg-white/10"></div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-semibold text-white">Total estimé</span>
              <span class="text-lg font-bold text-white">{{ formatPrice(displayTotal) }}</span>
            </div>
          </div>

          <div v-if="createdOrder?.code" class="mt-4 text-xs text-slate-400">
            Référence : <span class="font-semibold text-white">{{ createdOrder.code }}</span>
          </div>
        </div>

        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Terminer la commande</div>
          <div class="mt-3 text-sm text-slate-300">
            Choisissez comment envoyer le devis.
          </div>

          <button
            type="button"
            class="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
            @click="sendViaWhatsApp"
          >
            Envoyer via WhatsApp
          </button>

          <button
            type="button"
            class="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="loading"
            @click="goToContact"
          >
            Envoyer via formulaire
          </button>

          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <NuxtLink
              to="/commande"
              class="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              Modifier mes coordonnées
            </NuxtLink>
            <NuxtLink
              to="/panier"
              class="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              Modifier le panier
            </NuxtLink>
          </div>
        </div>

        <div class="gfg-surface p-6 sm:p-8">
          <div class="text-sm font-semibold text-white">Message du devis</div>
          <div class="mt-3 text-sm text-slate-300">Vous pouvez modifier le message avant l’envoi.</div>
          <textarea
            v-model="quoteText"
            rows="10"
            class="mt-4 w-full resize-none rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          ></textarea>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import { formatPrice } from '~/utils/price'

type ApiOrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'

type ApiOrderItem = {
  id: string
  productId: string
  quantity: number
  price: number | string
  product?: { id: string; name: string; brand?: string | null; image?: string | null; price?: number | string | null }
}

type ApiOrder = {
  id: string
  code: string
  customerName: string
  customerEmail: string
  customerPhone?: string | null
  customerAddress?: string | null
  status: ApiOrderStatus
  total: number | string
  createdAt: string
  items: ApiOrderItem[]
}

const { public: publicConfig } = useRuntimeConfig()
const toast = useToast()
const cart = useCart()

const checkout = useState('gfg-checkout', () => ({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: ''
}))

const createdOrderState = useState<ApiOrder | null>('gfg-created-order', () => null)
const createdOrder = computed(() => createdOrderState.value)

const itemsCount = computed(() => {
  if (createdOrder.value?.items?.length) {
    return createdOrder.value.items.reduce((sum, i) => sum + (Number(i.quantity) || 0), 0)
  }
  return cart.itemCount.value
})

type DisplayLine = {
  key: string
  productId?: string
  name: string
  brand: string
  image: string
  quantity: number
  lineTotal: number
}

const displayLines = computed<DisplayLine[]>(() => {
  if (createdOrder.value?.items?.length) {
    return createdOrder.value.items.map((item) => {
      const name = item.product?.name || `Produit ${item.productId}`
      const brand = String(item.product?.brand || 'GFG')
      const image = String(item.product?.image || '')
      const unitPrice = item.product?.price ?? item.price ?? 0
      const lineTotal = Number(unitPrice) * Number(item.quantity || 0)
      return {
        key: item.id || item.productId,
        productId: item.productId,
        name,
        brand,
        image,
        quantity: Number(item.quantity || 0),
        lineTotal
      }
    })
  }

  return cart.lines.value.map((l) => ({
    key: l.product.id,
    productId: l.product.id,
    name: l.product.name,
    brand: l.product.brand,
    image: l.product.image,
    quantity: l.quantity,
    lineTotal: l.lineTotal
  }))
})

const displayTotal = computed(() => {
  if (createdOrder.value) return Number(createdOrder.value.total || 0)
  return cart.subtotal.value
})

const loading = ref(false)
const quoteText = ref('')

const phoneDigits = computed(() => String(publicConfig.contactPhone || '').replace(/[^\d]/g, ''))

const baseQuoteText = computed(() => {
  const linesText = displayLines.value
    .map((l) => `- ${l.name} x${l.quantity} (${formatPrice(l.lineTotal)})`)
    .join('\n')

  return `Bonjour,\n\nJe souhaite passer une commande :\n${linesText}\n\nTotal : ${formatPrice(displayTotal.value)}\n\nMerci.`
})

const buildQuoteText = (order?: ApiOrder | null) => {
  const base = quoteText.value.trim() ? quoteText.value : baseQuoteText.value
  if (!order?.code) return base
  return base.includes(order.code) ? base : `${base}\n\nRéférence : ${order.code}`
}

watchEffect(() => {
  if (!quoteText.value.trim()) quoteText.value = baseQuoteText.value
})

watchEffect(async () => {
  if (!process.client) return
  if (createdOrderState.value?.items?.length) return
  if (!cart.lines.value.length) return navigateTo('/panier')
  if (!checkout.value.customerName || !checkout.value.customerEmail) return navigateTo('/commande')
})

const ensureOrderCreated = async () => {
  if (createdOrderState.value) return createdOrderState.value

  if (!checkout.value.customerName || !checkout.value.customerEmail) {
    toast.add({ title: 'Coordonnées manquantes', description: 'Veuillez compléter vos informations.', color: 'red' })
    await navigateTo('/commande')
    return null
  }

  const orderItems = cart.lines.value.map((l) => ({
    productId: l.product.id,
    quantity: l.quantity
  }))

  if (!orderItems.length) {
    toast.add({ title: 'Panier vide', color: 'red' })
    await navigateTo('/panier')
    return null
  }

  const order = await $fetch<ApiOrder>(`${publicConfig.apiBase}/orders`, {
    method: 'POST',
    body: {
      customerName: checkout.value.customerName,
      customerEmail: checkout.value.customerEmail,
      customerPhone: checkout.value.customerPhone || undefined,
      customerAddress: checkout.value.customerAddress || undefined,
      items: orderItems
    }
  })

  createdOrderState.value = order
  return order
}

const resetCheckout = () => {
  checkout.value = { customerName: '', customerEmail: '', customerPhone: '', customerAddress: '' }
  createdOrderState.value = null
}

const sendViaWhatsApp = async () => {
  if (loading.value) return
  const phone = phoneDigits.value
  if (!phone) {
    toast.add({ title: 'Numéro WhatsApp indisponible', color: 'red' })
    return
  }

  loading.value = true
  try {
    const order = await ensureOrderCreated()
    if (!order) return

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(buildQuoteText(order))}`
    cart.clear()
    resetCheckout()
    window.location.href = url
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible d’ouvrir WhatsApp.', color: 'red' })
  } finally {
    loading.value = false
  }
}

const goToContact = async () => {
  if (loading.value) return
  const message = buildQuoteText(createdOrder.value)
  await navigateTo({
    path: '/contact',
    query: {
      from: 'devis',
      subject: 'Devis',
      message
    }
  })
}

useHead({
  title: 'Devis',
  meta: [{ name: 'description', content: 'Récapitulatif de devis avant envoi.' }]
})
</script>
