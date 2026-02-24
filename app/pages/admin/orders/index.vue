<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 class="text-2xl font-bold text-white">Commandes</h1>
      <div class="flex gap-2">
        <button @click="exportCSV" class="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Exporter
        </button>
        <button @click="showFilters = !showFilters" class="px-4 py-2 bg-slate-800 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors flex items-center gap-2" :class="{'bg-blue-500/10 text-blue-400': showFilters}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          Filtres
        </button>
      </div>
    </div>

    <!-- Filters Section -->
    <div v-if="showFilters" class="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-400">Recherche</label>
        <div class="relative">
          <input v-model="searchQuery" type="text" placeholder="ID, Client..." class="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 pl-9" />
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-3 top-2.5 text-slate-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-xs font-medium text-slate-400">Statut</label>
        <select v-model="statusFilter" class="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50">
          <option value="">Tous les statuts</option>
          <option value="pending">En attente</option>
          <option value="confirmed">Confirmée</option>
          <option value="shipped">En cours de livraison</option>
          <option value="delivered">Livré</option>
          <option value="cancelled">Annulé</option>
        </select>
      </div>
      <div class="flex items-end">
        <button @click="resetFilters" class="text-sm text-slate-400 hover:text-white underline decoration-dotted">Réinitialiser les filtres</button>
      </div>
    </div>

    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium">ID</th>
              <th class="px-6 py-4 font-medium">Client</th>
              <th class="px-6 py-4 font-medium">Date</th>
              <th class="px-6 py-4 font-medium">Articles</th>
              <th class="px-6 py-4 font-medium">Total</th>
              <th class="px-6 py-4 font-medium">Statut</th>
              <th class="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-white/5 transition-colors group">
              <td class="px-6 py-4 font-mono text-slate-500">#{{ order.code }}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-white">{{ order.customer.name }}</div>
                <div class="text-xs text-slate-500">{{ order.customer.email }}</div>
              </td>
              <td class="px-6 py-4 text-slate-400">{{ formatDate(order.date) }}</td>
              <td class="px-6 py-4 text-slate-300">{{ order.itemsCount }} articles</td>
              <td class="px-6 py-4 text-white font-bold">{{ order.total.toLocaleString() }} FCFA</td>
              <td class="px-6 py-4">
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusColor(order.status)"
                >
                  {{ getStatusLabel(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <NuxtLink :to="`/admin/orders/${order.id}`" class="text-blue-400 hover:text-blue-300 text-sm font-medium">Détails</NuxtLink>
              </td>
            </tr>
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500">
                Aucune commande trouvée
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination Mock -->
      <div class="p-4 border-t border-white/10 flex items-center justify-between text-sm text-slate-400">
        <div>Affichage de {{ filteredOrders.length }} sur {{ orders.length }} résultats</div>
        <!-- Simple pagination UI (visual only for now as we filter client side) -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

interface Order {
  id: string
  code: string
  customer: {
    name: string
    email: string
  }
  date: Date
  itemsCount: number
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
}

const showFilters = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')

const orders = ref<Order[]>([])
const loading = ref(false)

type ApiOrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
type ApiOrder = {
  id: string
  code: string
  customerName: string
  customerEmail: string
  status: ApiOrderStatus
  total: number | string
  createdAt: string
  items?: Array<{ quantity: number }>
}

const { public: config } = useRuntimeConfig()
const { token } = useAuth()
const toast = useToast()

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const searchLower = searchQuery.value.toLowerCase()
    const matchesSearch = 
      order.id.toLowerCase().includes(searchLower) ||
      order.code.toLowerCase().includes(searchLower) ||
      order.customer.name.toLowerCase().includes(searchLower) ||
      order.customer.email.toLowerCase().includes(searchLower)
      
    const matchesStatus = !statusFilter.value || order.status === statusFilter.value
    
    return matchesSearch && matchesStatus
  })
})

const resetFilters = () => {
  searchQuery.value = ''
  statusFilter.value = ''
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
    shipped: 'bg-blue-500/10 text-blue-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400'
  }
  return colors[status] || 'bg-slate-500/10 text-slate-400'
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const exportCSV = () => {
  // Define CSV headers
  const headers = ['ID', 'Client', 'Email', 'Date', 'Articles', 'Total', 'Statut']
  
  // Format data rows
  const rows = filteredOrders.value.map(order => [
    order.id,
    order.customer.name,
    order.customer.email,
    formatDate(order.date),
    order.itemsCount,
    order.total,
    getStatusLabel(order.status)
  ])
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n')
  
  // Create download link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `commandes_export_${new Date().toISOString().slice(0, 10)}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  toast.add({
    title: 'Export réussi',
    description: `${filteredOrders.value.length} commandes exportées avec succès`,
    color: 'green'
  })
}

const mapStatus = (status: ApiOrderStatus): Order['status'] => {
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
    const data = await $fetch<ApiOrder[]>(`${config.apiBase}/orders`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    orders.value = (data || []).map((o) => ({
      id: o.id,
      code: o.code,
      customer: { name: o.customerName, email: o.customerEmail },
      date: new Date(o.createdAt),
      itemsCount: (o.items || []).reduce((sum, i) => sum + (Number(i.quantity) || 0), 0),
      total: Number(o.total || 0),
      status: mapStatus(o.status)
    }))
  } catch (e) {
    console.error(e)
    toast.add({ title: 'Erreur', description: 'Impossible de charger les commandes.', color: 'red' })
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshOrders()
})
</script>
