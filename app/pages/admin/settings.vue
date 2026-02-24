<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Paramètres</h1>
        <p class="text-slate-400 text-sm mt-1">Configurez les paramètres globaux de l'application.</p>
      </div>
      <div class="flex gap-3">
        <button 
          @click="resetSettings"
          class="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-sm font-medium rounded-xl transition-colors"
        >
          Rétablir
        </button>
        <button 
          @click="saveSettings" 
          :disabled="isLoading"
          class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Enregistrement...' : 'Enregistrer' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Navigation/Sidebar for Settings -->
      <div class="lg:col-span-1 space-y-4">
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
          <nav class="space-y-1">
            <button 
              @click="activeTab = 'general'"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="activeTab === 'general' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              Général
            </button>
            <button 
              @click="activeTab = 'store'"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="activeTab === 'store' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              Boutique
            </button>
            <button 
              @click="activeTab = 'notifications'"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="activeTab === 'notifications' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              Notifications
            </button>
            <button 
              @click="activeTab = 'security'"
              class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              :class="activeTab === 'security' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Sécurité
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Informations Générales</h2>
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Nom du site</label>
                <input v-model="settings.siteName" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Description</label>
                <textarea v-model="settings.siteDescription" rows="3" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"></textarea>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Email de contact</label>
                <input v-model="settings.contactEmail" type="email" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
            </div>
          </div>

          <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
            <h2 class="text-lg font-semibold text-white mb-6">Maintenance</h2>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium text-white">Mode Maintenance</div>
                <div class="text-sm text-slate-400">Désactive l'accès au site pour les visiteurs</div>
              </div>
              <button 
                @click="settings.maintenanceMode = !settings.maintenanceMode"
                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                :class="settings.maintenanceMode ? 'bg-blue-500' : 'bg-slate-700'"
              >
                <span 
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                  :class="settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Store Settings -->
        <div v-if="activeTab === 'store'" class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6">Configuration Boutique</h2>
          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Devise</label>
                <select v-model="settings.currency" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none">
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                  <option value="GBP">Livre Sterling (£)</option>
                </select>
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Taux de TVA (%)</label>
                <input v-model="settings.taxRate" type="number" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Seuil livraison gratuite</label>
              <div class="relative">
                <input v-model="settings.freeShippingThreshold" type="number" class="w-full rounded-lg border border-white/10 bg-slate-950/50 pl-3 pr-8 py-2 text-white focus:border-blue-500/50 focus:outline-none" />
                <span class="absolute right-3 top-2 text-slate-500">€</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeTab === 'notifications'" class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6">Notifications</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div class="font-medium text-white">Nouvelle commande</div>
                <div class="text-sm text-slate-400">Recevoir un email pour chaque nouvelle commande</div>
              </div>
              <input type="checkbox" v-model="settings.notifications.newOrder" class="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50" />
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div class="font-medium text-white">Stock faible</div>
                <div class="text-sm text-slate-400">Alerte quand un produit est presque épuisé</div>
              </div>
              <input type="checkbox" v-model="settings.notifications.lowStock" class="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50" />
            </div>
            <div class="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
              <div>
                <div class="font-medium text-white">Nouveau client</div>
                <div class="text-sm text-slate-400">Notification lors d'une nouvelle inscription</div>
              </div>
              <input type="checkbox" v-model="settings.notifications.newCustomer" class="w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500/50" />
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6">Sécurité</h2>
          <div class="space-y-6">
            <div class="space-y-4">
              <h3 class="text-sm font-medium text-slate-400 uppercase tracking-wider">Changer le mot de passe</h3>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Mot de passe actuel</label>
                <input 
                  v-model="passwordForm.currentPassword" 
                  type="password" 
                  class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" 
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Nouveau mot de passe</label>
                <input 
                  v-model="passwordForm.newPassword" 
                  type="password" 
                  class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" 
                />
              </div>

              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Confirmer le nouveau mot de passe</label>
                <input 
                  v-model="passwordForm.confirmPassword" 
                  type="password" 
                  class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const toast = useToast()
const activeTab = ref('general')
const isLoading = ref(false)

const defaultSettings = {
  siteName: 'GodFather Game',
  siteDescription: 'La meilleure boutique de jeux de société',
  contactEmail: 'contact@godfather.game',
  maintenanceMode: false,
  currency: 'EUR',
  taxRate: 20,
  freeShippingThreshold: 50,
  notifications: {
    newOrder: true,
    lowStock: true,
    newCustomer: false
  }
}

const settings = ref(JSON.parse(JSON.stringify(defaultSettings)))

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const saveSettings = () => {
  isLoading.value = true
  
  // Validation mot de passe si on est dans l'onglet sécurité
  if (activeTab.value === 'security') {
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.add({
        title: 'Erreur',
        description: 'Veuillez remplir tous les champs du mot de passe',
        color: 'red'
      })
      isLoading.value = false
      return
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.add({
        title: 'Erreur',
        description: 'Les nouveaux mots de passe ne correspondent pas',
        color: 'red'
      })
      isLoading.value = false
      return
    }

    // Simulation changement mot de passe
    setTimeout(() => {
      isLoading.value = false
      toast.add({
        title: 'Succès',
        description: 'Le mot de passe a été modifié avec succès',
        color: 'green'
      })
      // Reset form
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    }, 1000)
    return
  }

  // Simulate API call for other settings
  setTimeout(() => {
    isLoading.value = false
    toast.add({
      title: 'Paramètres enregistrés',
      description: 'Vos modifications ont été prises en compte',
      color: 'green'
    })
  }, 1000)
}

const resetSettings = () => {
  settings.value = JSON.parse(JSON.stringify(defaultSettings))
  toast.add({
    title: 'Paramètres rétablis',
    description: 'Les paramètres par défaut ont été restaurés',
    color: 'blue'
  })
}
</script>