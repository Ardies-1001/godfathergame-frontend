const parseAddresses = (raw?: string) =>
  (raw || '')
    .split('||')
    .map((s) => s.trim())
    .filter(Boolean)

const contactAddresses = [
  process.env.NUXT_PUBLIC_CONTACT_ADDRESS_PRINCIPAL,
  process.env.NUXT_PUBLIC_CONTACT_ADDRESS_SECONDAIRE
].filter(Boolean) as string[]

const contactMapLinks = [
  process.env.NUXT_PUBLIC_MAP_LINK_PRINCIPAL,
  process.env.NUXT_PUBLIC_MAP_LINK_SECONDAIRE
].filter(Boolean) as string[]

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxtjs/i18n'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      titleTemplate: `%s · ${process.env.NUXT_PUBLIC_SITE_NAME || 'GodFatherGame'}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#0B1020' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },

  i18n: {
    defaultLocale: 'fr',
    locales: [{ code: 'fr', language: 'fr-FR', name: 'Français' }]
  },

  runtimeConfig: {
    smtp: {
      host: process.env.NUXT_SMTP_HOST,
      port: process.env.NUXT_SMTP_PORT ? Number(process.env.NUXT_SMTP_PORT) : undefined,
      user: process.env.NUXT_SMTP_USER,
      pass: process.env.NUXT_SMTP_PASS
    },
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteName: process.env.NUXT_PUBLIC_SITE_NAME,
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL,
      contactPhone: process.env.NUXT_PUBLIC_CONTACT_PHONE,
      contactAddresses,
      contactMapLinks,
      contactAddress: contactAddresses[0],
      contactAddress2: contactAddresses[1],
      currencyLabel: process.env.NUXT_PUBLIC_CURRENCY_LABEL,
      currencyLocale: process.env.NUXT_PUBLIC_CURRENCY_LOCALE,
      currencyCode: process.env.NUXT_PUBLIC_CURRENCY_CODE,
      smtpFrom: process.env.NUXT_PUBLIC_SMTP_FROM
    }
  }
})
