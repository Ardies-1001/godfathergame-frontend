<template>
  <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/60 backdrop-blur">
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">
        <NuxtLink to="/" class="flex items-center gap-3">
          <div
            class="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-white shadow-[0_0_40px_rgba(59,130,246,0.22)]"
            aria-hidden="true"
          >
            <img :src="logoUrl" :alt="siteName" class="h-6 w-auto" />
          </div>
          <div class="leading-tight">
            <div class="text-sm font-semibold text-white">{{ siteName }}</div>
            <div class="text-xs text-slate-300">Consoles & gaming</div>
          </div>
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="link in mainLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium transition-colors"
            :class="isActive(link.to) ? 'text-white' : 'text-slate-300 hover:text-white'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-3">
          <NuxtLink
            to="/catalogue"
            class="hidden sm:inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Voir le catalogue
          </NuxtLink>

          <NuxtLink
            to="/panier"
            class="relative inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
            aria-label="Panier"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6.3 7.4H21l-1.6 8.2a2 2 0 0 1-2 1.6H9a2 2 0 0 1-2-1.5L5.3 3.8A1 1 0 0 0 4.3 3H2"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM17.5 21a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span
              v-if="cart.itemCount"
              class="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-blue-500 px-1.5 py-0.5 text-[11px] font-bold text-white"
            >
              {{ cart.itemCount }}
            </span>
          </NuxtLink>

          <button
            type="button"
            class="md:hidden inline-flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors"
            :aria-expanded="menuOpen ? 'true' : 'false'"
            aria-label="Ouvrir le menu"
            @click="toggleMenu"
          >
            <span class="sr-only">Menu</span>
            <div class="flex flex-col gap-1.5">
              <span class="h-0.5 w-5 bg-white"></span>
              <span class="h-0.5 w-5 bg-white"></span>
              <span class="h-0.5 w-5 bg-white"></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <div v-if="menuOpen" class="md:hidden border-t border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <nav class="flex flex-col gap-3">
          <NuxtLink
            v-for="link in mainLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
type NavLink = { label: string; to: string }

import logoUrl from '~/assets/images/uploads/logo_9d5c28a705.svg'

const { public: publicConfig } = useRuntimeConfig()
const siteName = computed(() => publicConfig.siteName as string)

const cart = useCart()

const route = useRoute()
const menuOpen = ref(false)

const mainLinks: NavLink[] = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Services', to: '/services' },
  { label: 'Catalogue', to: '/catalogue' },
  { label: 'Contact', to: '/contact' }
]

const isActive = (to: string) => route.path === to
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>
