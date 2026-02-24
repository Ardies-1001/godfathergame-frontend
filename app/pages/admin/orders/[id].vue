<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center gap-4">
      <NuxtLink to="/admin/orders" class="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-bold text-white">Commande #{{ order?.code || route.params.id }}</h1>
        <div class="text-sm text-slate-400" v-if="order">{{ formatDateTime(order.createdAt) }}</div>
      </div>
      <div class="ml-auto flex items-center gap-3">
        <span 
          class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
          :class="getStatusColor(currentStatus)"
        >
          {{ getStatusLabel(currentStatus) }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Détails de la commande -->
      <div class="lg:col-span-2 space-y-6">
        <div class="gfg-surface p-6 rounded-xl space-y-4">
          <h2 class="text-lg font-semibold text-white border-b border-white/10 pb-4">Articles commandés</h2>
          
          <div class="space-y-4">
            <div v-for="item in orderItems" :key="item.id" class="flex items-start gap-4">
              <div class="size-16 rounded-lg bg-slate-800 flex-shrink-0 overflow-hidden">
                <img v-if="item.product?.image" :src="item.product.image" :alt="item.product?.name || 'Produit'" class="h-full w-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="text-white font-medium">{{ item.product?.name || item.productId }}</div>
                <div class="text-sm text-slate-400">Quantité: {{ item.quantity }}</div>
              </div>
              <div class="text-white font-bold">{{ formatPrice(itemLineTotal(item)) }}</div>
            </div>
          </div>

          <div class="border-t border-white/10 pt-4 space-y-2">
            <div class="flex justify-between text-sm text-slate-400">
              <span>Sous-total</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-white pt-2 border-t border-white/5">
              <span>Total</span>
              <span>{{ formatPrice(total) }}</span>
            </div>
          </div>
        </div>

        <div class="gfg-surface p-6 rounded-xl">
          <h2 class="text-lg font-semibold text-white mb-4">Mise à jour du statut</h2>
          <div class="flex flex-wrap gap-3">
            <button 
              @click="updateStatus('PENDING')"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="currentStatus === 'pending' ? 'bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              En attente
            </button>
            <button 
              @click="updateStatus('CONFIRMED')"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="currentStatus === 'confirmed' ? 'bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              Confirmée
            </button>
            <button 
              @click="updateStatus('SHIPPED')"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="currentStatus === 'shipped' ? 'bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              Expédié
            </button>
            <button 
              @click="updateStatus('DELIVERED')"
              class="px-4 py-2 rounded-lg transition-colors"
              :class="currentStatus === 'delivered' ? 'bg-blue-500 text-white font-medium shadow-lg shadow-blue-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'"
            >
              Livré
            </button>
            <button 
              @click="updateStatus('CANCELLED')"
              class="px-4 py-2 rounded-lg transition-colors ml-auto"
              :class="currentStatus === 'cancelled' ? 'bg-red-500 text-white font-medium shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-300 hover:bg-red-500/20 hover:text-red-400'"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>

      <!-- Info Client -->
      <div class="space-y-6">
        <div class="gfg-surface p-6 rounded-xl space-y-4">
          <h2 class="text-lg font-semibold text-white border-b border-white/10 pb-4">Client</h2>
          
          <div class="flex items-center gap-3">
            <div class="size-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">{{ initials }}</div>
            <div>
              <div class="text-white font-medium">{{ order?.customerName || '-' }}</div>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <div class="flex items-center gap-3 text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              {{ order?.customerEmail || '-' }}
            </div>
            <div class="flex items-center gap-3 text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {{ order?.customerPhone || '-' }}
            </div>
            <div v-if="order?.customerAddress" class="flex items-start gap-3 text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div class="flex-1">{{ order.customerAddress }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from '~/utils/price'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const route = useRoute()
const toast = useToast()
const { public: config } = useRuntimeConfig()
const { token } = useAuth()

type ApiOrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
type ApiOrderItem = {
  id: string
  productId: string
  quantity: number
  price: number | string
  product?: { id: string; name: string; image?: string | null; price?: number | string | null }
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

const order = ref<ApiOrder | null>(null)
const loading = ref(false)

const normalizeStatus = (s: ApiOrderStatus | string) => String(s || '').toLowerCase()
const currentStatus = computed(() => normalizeStatus(order.value?.status || 'PENDING'))

const orderItems = computed(() => order.value?.items || [])

const itemLineTotal = (item: ApiOrderItem) => {
  const unit = item.product?.price ?? item.price ?? 0
  return Number(unit) * Number(item.quantity || 0)
}

const subtotal = computed(() => orderItems.value.reduce((sum, i) => sum + itemLineTotal(i), 0))
const total = computed(() => Number(order.value?.total || subtotal.value || 0))

const initials = computed(() => {
  const name = String(order.value?.customerName || '').trim()
  if (!name) return '?'
  const parts = name.split(/\s+/).filter(Boolean)
  return parts.slice(0, 2).map(p => p[0]?.toUpperCase()).join('')
})

const fetchOrder = async () => {
  if (!token.value) return
  loading.value = true
  try {
    order.value = await $fetch<ApiOrder>(`${config.apiBase}/orders/${route.params.id}`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible de charger la commande.', color: 'red' })
  } finally {
    loading.value = false
  }
}

const updateStatus = async (status: ApiOrderStatus) => {
  if (!token.value) return
  if (!order.value) return
  loading.value = true
  try {
    const updated = await $fetch<ApiOrder>(`${config.apiBase}/orders/${order.value.id}/status`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: { status }
    })
    order.value = updated
    toast.add({
      title: 'Statut mis à jour',
      description: `La commande est maintenant : ${getStatusLabel(normalizeStatus(status))}`,
      color: 'green'
    })
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible de mettre à jour le statut.', color: 'red' })
  } finally {
    loading.value = false
  }
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    shipped: 'Expédié',
    delivered: 'Livré',
    cancelled: 'Annulé'
  }
  return labels[status] || status
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-blue-500/10 text-blue-400',
    shipped: 'bg-purple-500/10 text-purple-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400'
  }
  return colors[status] || 'bg-slate-500/10 text-slate-400'
}

const formatDateTime = (raw: string) => {
  const date = new Date(raw)
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

onMounted(() => {
  fetchOrder()
})
</script>
