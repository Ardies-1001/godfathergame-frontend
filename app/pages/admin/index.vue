<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-white">Tableau de bord</h1>
      <div class="text-sm text-slate-400">{{ new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Ventes totales</div>
        <div class="text-2xl font-bold text-white">0 FCFA</div>
        <div class="text-slate-500 text-xs mt-2 flex items-center gap-1">
          -
        </div>
      </div>

      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Commandes</div>
        <div class="text-2xl font-bold text-white">0</div>
        <div class="text-slate-500 text-xs mt-2 flex items-center gap-1">
          -
        </div>
      </div>

      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Clients</div>
        <div class="text-2xl font-bold text-white">0</div>
        <div class="text-slate-500 text-xs mt-2">Actifs ce mois</div>
      </div>

      <div class="gfg-surface p-6 rounded-xl relative overflow-hidden group">
        <div class="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
        </div>
        <div class="text-slate-400 text-sm font-medium mb-1">Produits</div>
        <div class="text-2xl font-bold text-white">0</div>
        <div class="text-blue-400 text-xs mt-2">En ligne</div>
      </div>
    </div>

    <!-- Recent Orders -->
    <div class="gfg-surface rounded-xl overflow-hidden">
      <div class="p-6 border-b border-white/10 flex items-center justify-between">
        <h2 class="font-bold text-lg text-white">Commandes récentes</h2>
        <NuxtLink to="/admin/orders" class="text-sm text-blue-400 hover:text-blue-300">Voir tout</NuxtLink>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm">
          <thead class="bg-slate-900/50 text-slate-400">
            <tr>
              <th class="px-6 py-4 font-medium">ID</th>
              <th class="px-6 py-4 font-medium">Client</th>
              <th class="px-6 py-4 font-medium">Date</th>
              <th class="px-6 py-4 font-medium">Statut</th>
              <th class="px-6 py-4 font-medium text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-white/5">
            <tr>
              <td colspan="5" class="px-6 py-12 text-center text-slate-400">
                Aucune commande récente
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
  layout: 'admin',
  middleware: 'auth'
})
</script>