<template>
  <div class="min-h-screen bg-slate-950 text-white flex">
    <!-- Sidebar -->
    <aside class="w-64 border-r border-white/10 bg-slate-900/50 hidden md:flex flex-col md:fixed md:inset-y-0 md:left-0 md:h-screen md:overflow-y-auto md:z-30">
      <div class="p-6 border-b border-white/10">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div class="font-bold text-xl tracking-tight">GodFather<span class="text-blue-500">Game</span></div>
        </NuxtLink>
        <div class="mt-2 text-xs text-slate-400 uppercase tracking-wider font-semibold">Espace Client</div>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink 
          to="/client" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
          :class="$route.path === '/client' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
          Tableau de bord
        </NuxtLink>

        <NuxtLink 
          to="/" 
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors text-slate-400 hover:bg-white/5 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          Retour à la boutique
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-white/10 space-y-2">
        <button 
          @click="logout" 
          class="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          Déconnexion
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col min-w-0 overflow-hidden md:ml-64">
      <!-- Mobile Header -->
      <header class="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
        <div class="font-bold">Espace Client</div>
        <button class="p-2 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </header>

      <div class="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const { logout } = useAuth()
</script>
