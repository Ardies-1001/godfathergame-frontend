<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Tableau de bord</h1>
        <div class="mt-1 text-sm text-slate-400">{{ user?.email }}</div>
      </div>
      <div class="text-sm text-slate-400">{{ new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Commandes</div>
        <div class="text-2xl font-bold text-white">{{ orders.length }}</div>
        <div class="text-slate-500 text-xs mt-2">Historique lié à votre email</div>
      </div>

      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Total estimé</div>
        <div class="text-2xl font-bold text-white">{{ totalAmount.toLocaleString() }} FCFA</div>
        <div class="text-slate-500 text-xs mt-2">Somme des commandes</div>
      </div>

      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Dernière commande</div>
        <div class="text-2xl font-bold text-white">{{ lastOrderLabel }}</div>
        <div class="text-slate-500 text-xs mt-2">Date de la plus récente</div>
      </div>
    </div>

    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-lg text-white">Mes commandes</h2>
        <button
          type="button"
          class="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors"
          :disabled="loading"
          @click="refreshOrders"
        >
          Actualiser
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium">Référence</th>
              <th class="px-6 py-4 font-medium">Date</th>
              <th class="px-6 py-4 font-medium">Articles</th>
              <th class="px-6 py-4 font-medium">Total</th>
              <th class="px-6 py-4 font-medium">Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-white/5 transition-colors">
              <td class="px-6 py-4 font-mono text-slate-300">#{{ order.code }}</td>
              <td class="px-6 py-4 text-slate-400">{{ formatDate(order.date) }}</td>
              <td class="px-6 py-4 text-slate-300">{{ order.itemsCount }} articles</td>
              <td class="px-6 py-4 text-white font-bold">{{ order.total.toLocaleString() }} FCFA</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" :class="getStatusColor(order.status)">
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
            </tr>
            <tr v-if="!loading && orders.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500">
                Aucune commande trouvée
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'client',
  middleware: 'client-auth'
})

type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
type ApiOrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
type ApiOrder = {
  id: string
  code: string
  status: ApiOrderStatus
  total: number | string
  createdAt: string
  items?: Array<{ quantity: number }>
}

type Order = {
  id: string
  code: string
  date: Date
  itemsCount: number
  total: number
  status: OrderStatus
}

const { user, token } = useAuth()
const { public: config } = useRuntimeConfig()
const toast = useToast()

const orders = ref<Order[]>([])
const loading = ref(false)

const mapStatus = (status: ApiOrderStatus): OrderStatus => {
  const normalized = String(status || '').toLowerCase()
  if (normalized === 'confirmed') return 'confirmed'
  if (normalized === 'shipped') return 'shipped'
  if (normalized === 'delivered') return 'delivered'
  if (normalized === 'cancelled') return 'cancelled'
  return 'pending'
}

const refreshOrders = async () => {
  if (!token.value) return
  loading.value = true
  try {
    const data = await $fetch<ApiOrder[]>(`${config.apiBase}/orders/me`, {
      headers: { Authorization: `Bearer ${token.value}` }
    })

    orders.value = (data || []).map((o) => ({
      id: o.id,
      code: o.code,
      date: new Date(o.createdAt),
      itemsCount: (o.items || []).reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
      total: Number(o.total || 0),
      status: mapStatus(o.status)
    }))
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible de charger vos commandes.', color: 'red' })
  } finally {
    loading.value = false
  }
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const getStatusLabel = (status: OrderStatus) => {
  const labels: Record<OrderStatus, string> = {
    pending: 'En attente',
    confirmed: 'Confirmée',
    shipped: 'Expédié',
    delivered: 'Livré',
    cancelled: 'Annulé'
  }
  return labels[status]
}

const getStatusColor = (status: OrderStatus) => {
  const colors: Record<OrderStatus, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-blue-500/10 text-blue-400',
    shipped: 'bg-blue-500/10 text-blue-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400'
  }
  return colors[status]
}

const totalAmount = computed(() => orders.value.reduce((sum, o) => sum + (Number(o.total) || 0), 0))
const lastOrderLabel = computed(() => (orders.value[0]?.date ? formatDate(orders.value[0].date) : '-'))

onMounted(() => {
  refreshOrders()
})
</script>
