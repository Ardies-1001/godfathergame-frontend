<template>
  <footer class="border-t border-white/10 bg-slate-950/40 backdrop-blur">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid gap-10 md:grid-cols-12">
        <div class="md:col-span-5">
          <div class="flex items-center gap-3">
            <div class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white">
              <img :src="logoUrl" :alt="siteName" class="h-6 w-auto" />
            </div>
            <div class="leading-tight">
              <div class="text-sm font-semibold text-white">{{ siteName }}</div>
              <div class="text-xs text-slate-300">Vente de consoles et accessoires</div>
            </div>
          </div>

          <div class="mt-5 space-y-2 text-sm text-slate-300">
            <div>
              <span class="text-slate-400">Email :</span>
              <a class="gfg-link" :href="`mailto:${contactEmail}`">{{ contactEmail }}</a>
            </div>
            <div>
              <span class="text-slate-400">Téléphone :</span>
              <a class="gfg-link" :href="`tel:${contactPhone}`">{{ contactPhone }}</a>
            </div>
            <div>
              <span class="text-slate-400">Adresse :</span>
              <div class="mt-1 space-y-3">
                <div v-for="(loc, idx) in locations" :key="idx" class="flex flex-col items-start gap-1">
                  <span class="text-slate-200 leading-snug">{{ loc.address }}</span>
                  <a
                    :href="loc.mapLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-xs text-blue-400 hover:text-blue-300 hover:underline inline-flex items-center gap-1"
                  >
                    Voir sur la carte
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:col-span-7">
          <div class="grid gap-8 sm:grid-cols-3">
            <div>
              <div class="text-sm font-semibold text-white">Navigation</div>
              <div class="mt-3 flex flex-col gap-2 text-sm">
                <NuxtLink v-for="link in mainLinks" :key="link.to" :to="link.to" class="gfg-link">
                  {{ link.label }}
                </NuxtLink>
              </div>
            </div>

            <div>
              <div class="text-sm font-semibold text-white">Informations</div>
              <div class="mt-3 flex flex-col gap-2 text-sm">
                <NuxtLink v-for="link in extraLinks" :key="link.to" :to="link.to" class="gfg-link">
                  {{ link.label }}
                </NuxtLink>
              </div>
            </div>

            <div>
              <div class="text-sm font-semibold text-white">Newsletter</div>
              <p class="mt-3 text-sm text-slate-300">
                Recevez nos nouveautés, restocks et offres gaming directement par email.
              </p>

              <form class="mt-4 flex flex-col gap-3" @submit.prevent="onNewsletterSubmit">
                <input
                  v-model.trim="newsletterEmail"
                  type="email"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  placeholder="email@exemple.com"
                  autocomplete="email"
                  required
                />
                <button
                  type="submit"
                  class="inline-flex items-center justify-center rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-400 transition-colors"
                >
                  S’inscrire
                </button>
              </form>

              <div v-if="newsletterSubscribed" class="mt-3 text-xs text-slate-200">
                Merci, vous êtes inscrit à la newsletter.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>© {{ year }} {{ siteName }}. Tous droits réservés.</div>
        <div class="flex items-center gap-4">
          <NuxtLink to="/#faq" class="hover:text-slate-200 transition-colors">FAQ</NuxtLink>
          <NuxtLink to="/mentions-legales" class="hover:text-slate-200 transition-colors">Mentions légales</NuxtLink>
          <NuxtLink to="/cgv" class="hover:text-slate-200 transition-colors">CGV</NuxtLink>
          <NuxtLink to="/admin/login" class="hover:text-slate-200 transition-colors opacity-50 hover:opacity-100">Administration</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
type NavLink = { label: string; to: string }

import logoUrl from '~/assets/images/uploads/logo_9d5c28a705.svg'

const { public: publicConfig } = useRuntimeConfig()

const siteName = computed(() => publicConfig.siteName as string)
const contactEmail = computed(() => publicConfig.contactEmail as string)
const contactPhone = computed(() => publicConfig.contactPhone as string)
const contactAddress = computed(() => publicConfig.contactAddress as string)
const contactAddress2 = computed(() => (publicConfig.contactAddress2 as string) || '')
const contactAddresses = computed(() => {
  const addresses = publicConfig.contactAddresses as string[] | undefined
  if (Array.isArray(addresses) && addresses.length) return addresses
  return [contactAddress.value, contactAddress2.value].filter(Boolean)
})

const locations = computed(() => {
  const addrs = contactAddresses.value
  const maps = (publicConfig.contactMapLinks as string[]) || []
  return addrs.map((addr, i) => ({
    address: addr,
    mapLink: maps[i] || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`
  }))
})

const newsletterEmail = ref('')
const newsletterSubscribed = ref(false)

const route = useRoute()
watch(
  () => route.fullPath,
  () => {
    newsletterSubscribed.value = false
  }
)

const onNewsletterSubmit = () => {
  newsletterSubscribed.value = true
  newsletterEmail.value = ''
}

const year = new Date().getFullYear()

const mainLinks: NavLink[] = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Services', to: '/services' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Contact', to: '/contact' }
]

const extraLinks: NavLink[] = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'CGV', to: '/cgv' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Témoignages', to: '/temoignages' }
]
</script>
