<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white tracking-tight">Mon Profil</h1>
        <p class="text-slate-400 text-sm mt-1">Gérez vos informations personnelles et vos préférences.</p>
      </div>
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white text-sm font-medium rounded-xl transition-colors">
          Annuler
        </button>
        <button @click="saveProfile" class="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors shadow-lg shadow-blue-500/20">
          Enregistrer
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column: Avatar & Basic Info -->
      <div class="lg:col-span-1 space-y-6">
        <!-- Avatar Card -->
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center">
          <div class="relative group cursor-pointer" @click="triggerAvatarUpload">
            <input type="file" ref="avatarInput" class="hidden" @change="handleAvatarChange" accept="image/*" />
            <div class="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-900 overflow-hidden flex items-center justify-center relative">
              <img v-if="form.avatar" :src="form.avatar" class="w-full h-full object-cover" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              </div>
            </div>
            <button class="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-lg border-2 border-slate-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
          </div>
          <h3 class="mt-4 text-lg font-bold text-white">{{ form.firstName }} {{ form.lastName }}</h3>
          <p class="text-slate-400 text-sm">Administrateur</p>
        </div>

        <!-- Contact Info -->
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 class="text-lg font-semibold text-white">Contact</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span class="text-sm truncate">{{ form.email }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="text-sm">+33 6 12 34 56 78</span>
            </div>
            <div class="flex items-center gap-3 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span class="text-sm">Paris, France</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Edit Forms -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Personal Information -->
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Informations personnelles
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Prénom</label>
              <input v-model="form.firstName" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Nom</label>
              <input v-model="form.lastName" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Email</label>
              <input v-model="form.email" type="email" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Téléphone</label>
              <input v-model="form.phone" type="tel" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
            </div>
            <div class="col-span-full space-y-2">
              <label class="text-sm font-medium text-slate-300">Bio</label>
              <textarea v-model="form.bio" rows="3" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"></textarea>
            </div>
          </div>
        </div>

        <!-- Addresses -->
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            Adresses
          </h2>
          
          <div class="space-y-8">
            <!-- Shipping Address -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Adresse de livraison</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-full space-y-2">
                  <label class="text-sm font-medium text-slate-300">Rue</label>
                  <input v-model="form.shippingAddress.street" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Ville</label>
                  <input v-model="form.shippingAddress.city" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Code Postal</label>
                  <input v-model="form.shippingAddress.zipCode" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="col-span-full space-y-2">
                  <label class="text-sm font-medium text-slate-300">Pays</label>
                  <input v-model="form.shippingAddress.country" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
              </div>
            </div>

            <div class="border-t border-white/10"></div>

            <!-- Billing Address -->
            <div class="space-y-4">
              <h3 class="text-sm font-semibold text-slate-400 uppercase tracking-wider">Adresse de facturation</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="col-span-full space-y-2">
                  <label class="text-sm font-medium text-slate-300">Rue</label>
                  <input v-model="form.billingAddress.street" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Ville</label>
                  <input v-model="form.billingAddress.city" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="space-y-2">
                  <label class="text-sm font-medium text-slate-300">Code Postal</label>
                  <input v-model="form.billingAddress.zipCode" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
                <div class="col-span-full space-y-2">
                  <label class="text-sm font-medium text-slate-300">Pays</label>
                  <input v-model="form.billingAddress.country" type="text" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="bg-slate-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Sécurité
          </h2>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-slate-300">Mot de passe actuel</label>
              <input type="password" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Nouveau mot de passe</label>
                <input type="password" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-slate-300">Confirmer le mot de passe</label>
                <input type="password" class="w-full rounded-lg border border-white/10 bg-slate-950/50 px-3 py-2 text-white focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all" />
              </div>
            </div>
            <div class="pt-2">
              <button class="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Se déconnecter de tous les autres appareils
              </button>
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

interface Address {
  street: string
  city: string
  zipCode: string
  country: string
}

const toast = useToast()
const avatarInput = ref<HTMLInputElement | null>(null)

const form = ref({
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@godfather.game',
  phone: '+33 6 12 34 56 78',
  bio: 'Super Administrator',
  avatar: '',
  shippingAddress: {
    street: '123 Rue de Rivoli',
    city: 'Paris',
    zipCode: '75001',
    country: 'France'
  } as Address,
  billingAddress: {
    street: '123 Rue de Rivoli',
    city: 'Paris',
    zipCode: '75001',
    country: 'France'
  } as Address
})

const triggerAvatarUpload = () => {
  avatarInput.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast.add({
        title: 'Format invalide',
        description: 'Veuillez sélectionner une image',
        color: 'red'
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.avatar = e.target?.result as string
      toast.add({
        title: 'Avatar mis à jour',
        description: "N'oubliez pas d'enregistrer pour valider les changements",
        color: 'blue'
      })
    }
    reader.readAsDataURL(file)
  }
}

const saveProfile = () => {
  // Simulate API call
  setTimeout(() => {
    toast.add({
      title: 'Profil mis à jour',
      description: 'Vos informations ont été enregistrées avec succès',
      color: 'green'
    })
  }, 500)
}
</script>