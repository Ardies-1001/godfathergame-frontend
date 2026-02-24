import { computed } from 'vue'
import { useCatalogue } from './useCatalogue'
import type { Product } from '~/types/shop'

export type CartItem = {
  productId: string
  quantity: number
}

const clampQty = (value: number) => {
  if (!Number.isFinite(value)) return 1
  return Math.max(1, Math.floor(value))
}

export const useCart = () => {
  const items = useState<CartItem[]>('gfg-cart-items', () => [])
  const toast = process.client ? useToast() : null
  const { products, init } = useCatalogue()

  // Initialiser le catalogue si nécessaire (côté client)
  if (process.client && products.value.length === 0) {
    init()
  }

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const lines = computed(() => {
    return items.value
      .map((item) => {
        const product = products.value.find(p => p.id === item.productId)
        if (!product) return null
        return {
          product,
          quantity: item.quantity,
          lineTotal: Number(product.price) * item.quantity
        }
      })
      .filter(Boolean) as Array<{ product: Product; quantity: number; lineTotal: number }>
  })

  const subtotal = computed(() => lines.value.reduce((sum, line) => sum + line.lineTotal, 0))

  const clear = () => {
    items.value = []
  }

  const remove = (productId: string) => {
    items.value = items.value.filter(item => item.productId !== productId)
    if (toast) {
      const product = products.value.find(p => p.id === productId)
      toast.add({
        title: 'Retiré du panier',
        description: product?.name || 'Article retiré'
      })
    }
  }

  const setQuantity = (productId: string, quantity: number) => {
    const nextQty = clampQty(quantity)
    const existing = items.value.find(item => item.productId === productId)
    if (!existing) {
      items.value = [...items.value, { productId, quantity: nextQty }]
      return
    }
    items.value = items.value.map(item => (item.productId === productId ? { ...item, quantity: nextQty } : item))
  }

  const add = (productId: string, quantity = 1) => {
    const nextQty = clampQty(quantity)
    const existing = items.value.find(item => item.productId === productId)
    if (!existing) {
      items.value = [...items.value, { productId, quantity: nextQty }]
      if (toast) {
        const product = products.value.find(p => p.id === productId)
        toast.add({
          title: 'Ajouté au panier',
          description: product?.name || 'Article ajouté',
          icon: 'i-heroicons-check-circle',
          color: 'green'
        })
      }
      return
    }
    items.value = items.value.map(item =>
      item.productId === productId ? { ...item, quantity: item.quantity + nextQty } : item
    )
    if (toast) {
      const product = products.value.find(p => p.id === productId)
      toast.add({
        title: 'Ajouté au panier',
        description: product?.name || 'Article ajouté',
        icon: 'i-heroicons-check-circle',
        color: 'green'
      })
    }
  }

  return {
    items,
    lines,
    itemCount,
    subtotal,
    add,
    setQuantity,
    remove,
    clear
  }
}
