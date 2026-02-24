<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="relative overflow-hidden rounded-3xl bg-slate-900">
      <div class="absolute inset-0">
        <img :src="heroImage" alt="Contact Background" class="h-full w-full object-cover opacity-30" />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"></div>
      </div>
      <div class="relative px-8 py-12 sm:px-10 sm:py-16">
        <h1 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Contactez-nous</h1>
        <p class="mt-4 max-w-2xl text-lg text-slate-300">
          Une question sur une console, un bundle ou une compatibilité ?
          Notre équipe est là pour vous répondre rapidement et clairement.
        </p>
      </div>
    </div>

    <div class="grid gap-8 lg:grid-cols-12">
      <!-- Contact Info -->
      <div class="space-y-6 lg:col-span-5">
        <div class="gfg-surface overflow-hidden p-6 sm:p-8">
          <h3 class="mb-6 text-lg font-semibold text-white">Nos coordonnées</h3>
          <div class="space-y-6 text-sm">
            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div>
                <div class="font-medium text-slate-400">Email</div>
                <a :href="`mailto:${contactEmail}`" class="mt-1 block text-base font-semibold text-white hover:text-blue-400 transition-colors">{{ contactEmail }}</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <div class="font-medium text-slate-400">WhatsApp / Téléphone</div>
                <a :href="whatsAppUrl" target="_blank" rel="noopener noreferrer" class="mt-1 block text-base font-semibold text-white hover:text-green-400 transition-colors">{{ contactPhone }}</a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <div class="font-medium text-slate-400">Adresse</div>
                <div class="mt-2 space-y-4">
                  <div v-for="(loc, idx) in locations" :key="idx" class="flex flex-col gap-1">
                    <div class="text-base text-white font-medium">{{ loc.address }}</div>
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
        </div>

        <!-- Info Cards -->
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div class="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-yellow-400"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              <h4 class="font-semibold text-white text-sm uppercase tracking-wider">Support Commande</h4>
            </div>
            <p class="text-sm text-slate-300 leading-relaxed">
              Indiquez le produit, la quantité, votre ville et le mode de livraison souhaité pour un traitement rapide.
            </p>
          </div>

          <div class="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div class="flex items-center gap-3 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <h4 class="font-semibold text-white text-sm uppercase tracking-wider">Disponibilité</h4>
            </div>
            <p class="text-sm text-slate-300 leading-relaxed">
              Réponse sous 24h. Pour les urgences, privilégiez le téléphone ou WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="lg:col-span-7">
        <div class="gfg-surface p-6 sm:p-8 h-full">
          <h3 class="mb-6 text-lg font-semibold text-white">Envoyez-nous un message</h3>
          <form class="space-y-5" @submit.prevent="onSubmit">
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="space-y-2">
                <label for="name" class="text-sm font-medium text-slate-300">Nom</label>
                <input
                  id="name"
                  v-model.trim="form.name"
                  type="text"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="Votre nom"
                  required
                />
              </div>
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-slate-300">Email</label>
                <input
                  id="email"
                  v-model.trim="form.email"
                  type="email"
                  class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                  placeholder="vous@exemple.com"
                  required
                />
              </div>
            </div>

            <div class="space-y-2">
              <label for="subject" class="text-sm font-medium text-slate-300">Sujet</label>
              <input
                id="subject"
                v-model.trim="form.subject"
                type="text"
                class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                placeholder="Commande, disponibilité, conseil…"
                required
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-slate-300">Message</label>
              <textarea
                id="message"
                v-model.trim="form.message"
                rows="6"
                class="w-full rounded-xl border border-white/10 bg-slate-950/50 px-4 py-3 text-white placeholder:text-slate-600 focus:border-blue-500/50 focus:bg-slate-950 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                placeholder="Expliquez votre besoin en détails..."
                required
              ></textarea>
            </div>

            <div class="pt-2">
              <button
                type="submit"
                class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-8 py-3.5 text-sm font-bold text-white hover:bg-blue-400 active:scale-[0.98] transition-all"
                :disabled="submitting"
                :class="submitting ? 'opacity-70 cursor-not-allowed' : ''"
              >
                <svg v-if="submitting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                {{ submitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </div>

            <div v-if="submitted" class="rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-400 text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Merci, votre message a bien été envoyé. Nous vous répondrons très vite.
            </div>
            <div v-else-if="submitError" class="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-red-400 text-sm flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
              {{ submitError }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import heroImage from '~/assets/images/photo_12_2024-11-11_22-45-11.jpg'

const route = useRoute()
const { public: publicConfig } = useRuntimeConfig()

const contactEmail = computed(() => publicConfig.contactEmail as string)
const contactPhone = computed(() => publicConfig.contactPhone as string)
const contactAddress = computed(() => publicConfig.contactAddress as string)
const contactAddress2 = computed(() => (publicConfig.contactAddress2 as string) || '')
const contactAddresses = computed(() => {
  const addresses = publicConfig.contactAddresses as string[] | undefined
  if (Array.isArray(addresses) && addresses.length) return addresses
  return [contactAddress.value, contactAddress2.value].filter(Boolean)
})
const whatsAppUrl = computed(() => {
  const digits = String(contactPhone.value || '').replace(/[^\d]/g, '')
  if (!digits) return `tel:${contactPhone.value}`
  return `https://wa.me/${digits}`
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

type ApiOrder = {
  id: string
  code: string
}

const cart = useCart()
const checkout = useState('gfg-checkout', () => ({
  customerName: '',
  customerEmail: '',
  customerPhone: '',
  customerAddress: ''
}))
const createdOrderState = useState<ApiOrder | null>('gfg-created-order', () => null)

const submitted = ref(false)
const submitting = ref(false)
const submitError = ref('')

const onSubmit = async () => {
  submitted.value = false
  submitError.value = ''
  submitting.value = true
  try {
    const from = Array.isArray(route.query.from) ? route.query.from[0] : route.query.from
    const fromDevis = from === 'devis'

    const orderCustomerName = checkout.value.customerName || form.name
    const orderCustomerEmail = checkout.value.customerEmail || form.email

    let order: ApiOrder | null = createdOrderState.value
    if (fromDevis && !order && cart.lines.value.length && orderCustomerName && orderCustomerEmail) {
      const orderItems = cart.lines.value.map((l) => ({
        productId: l.product.id,
        quantity: l.quantity
      }))

      order = await $fetch<ApiOrder>(`${publicConfig.apiBase}/orders`, {
        method: 'POST',
        body: {
          customerName: orderCustomerName,
          customerEmail: orderCustomerEmail,
          customerPhone: checkout.value.customerPhone || undefined,
          customerAddress: checkout.value.customerAddress || undefined,
          items: orderItems
        }
      })
      createdOrderState.value = order
    }

    const finalSubject = order?.code ? `Devis ${order.code}` : form.subject
    const finalMessage =
      order?.code && !form.message.includes(order.code) ? `${form.message}\n\nRéférence : ${order.code}` : form.message

    await $fetch(`${publicConfig.apiBase}/contact`, {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        subject: finalSubject,
        message: finalMessage
      }
    })
    submitted.value = true
    form.subject = ''
    form.message = ''

    if (fromDevis) {
      cart.clear()
      checkout.value = { customerName: '', customerEmail: '', customerPhone: '', customerAddress: '' }
      createdOrderState.value = null
    }
  } catch (err: any) {
    submitError.value = err?.data?.message || err?.statusMessage || "Erreur lors de l'envoi. Réessayez."
  } finally {
    submitting.value = false
  }
}

const locations = computed(() => {
  const links = (publicConfig.contactMapLinks as string[]) || []
  return contactAddresses.value.map((address, i) => ({
    address,
    mapLink: links[i] || '#'
  }))
})

onMounted(() => {
  const from = Array.isArray(route.query.from) ? route.query.from[0] : route.query.from
  const subject = Array.isArray(route.query.subject) ? route.query.subject[0] : route.query.subject
  const message = Array.isArray(route.query.message) ? route.query.message[0] : route.query.message
  if (typeof subject === 'string' && subject.trim()) form.subject = subject
  if (typeof message === 'string' && message.trim()) form.message = message

  if (from === 'devis') {
    if (!form.name && checkout.value.customerName) form.name = checkout.value.customerName
    if (!form.email && checkout.value.customerEmail) form.email = checkout.value.customerEmail
    if (!form.subject) form.subject = 'Devis'
  }
})

useHead({
  title: 'Contact',
  meta: [{ name: 'description', content: 'Contactez GodFatherGame pour toute demande ou devis.' }]
})
</script>
