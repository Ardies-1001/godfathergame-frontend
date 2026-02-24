export type Category = {
  slug: string
  name: string
  description: string
  image: string
}

export type Product = {
  id: string
  name: string
  brand: string
  badge: string
  category: string
  shortDescription: string
  description: string
  price: number
  image: string
  gallery?: string[]
  videos?: string[]
}

import heroBgUrl from '~/assets/images/photo_17_2024-11-11_22-45-11.jpg'
import catConsoleUrl from '~/assets/images/photo_12_2024-11-11_22-45-11.jpg'
import catRetroUrl from '~/assets/images/photo_16_2024-11-11_22-45-11.jpg'
import catAccessoryUrl from '~/assets/images/photo_14_2024-11-11_22-45-11.jpg'
import catSetupUrl from '~/assets/images/photo_10_2024-11-11_22-45-11.jpg'
import catAudioUrl from '~/assets/images/photo_11_2024-11-11_22-45-11.jpg'
import catBundleUrl from '~/assets/images/photo_15_2024-11-11_22-45-11.jpg'
import catGiftUrl from '~/assets/images/photo_13_2024-11-11_22-45-11.jpg'
import catRepairUrl from '~/assets/images/photo_9_2024-11-11_22-45-11.jpg'
import catStorageUrl from '~/assets/images/photo_8_2024-11-11_22-45-11.jpg'

import controller1Url from '~/assets/images/uploads/Controller_1_e9d02f089b.png'
import controller2Url from '~/assets/images/uploads/Controller_2_53077926ed.png'
import controller3Url from '~/assets/images/uploads/Controller_3_3db395e13d.png'
import controllerAltUrl from '~/assets/images/uploads/controller_95949b99d9.png'

export const categories: Category[] = []

export const products: Product[] = []


const currencyLabel = process.env.NUXT_PUBLIC_CURRENCY_LABEL || 'FCFA'
const currencyLocale = process.env.NUXT_PUBLIC_CURRENCY_LOCALE || 'fr-BJ'
const currencyCode = process.env.NUXT_PUBLIC_CURRENCY_CODE || 'XOF'

export const formatPrice = (value: number) => {
  if (currencyLabel === 'FCFA' || currencyCode === 'XOF') {
    const formatted = new Intl.NumberFormat(currencyLocale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
    return `${formatted} ${currencyLabel}`
  }

  if (currencyLabel && currencyLabel !== '€' && currencyLabel !== 'EUR') {
    const formatted = new Intl.NumberFormat(currencyLocale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
    return `${formatted} ${currencyLabel}`
  }

  return new Intl.NumberFormat(currencyLocale, { style: 'currency', currency: currencyCode }).format(value)
}

export const getProductById = (id: string) => products.find((p) => p.id === id)

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug)
