export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  image?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand?: string
  badge?: string
  shortDescription?: string
  description?: string
  price: number
  image?: string
  gallery?: string[]
  videos?: string[]
  isActive: boolean
  categoryId: string
  category?: Category
}

export interface OrderItem {
  id: string
  productId: string
  quantity: number
  price: number
  product?: Product
}

export interface Order {
  id: string
  code: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerAddress?: string
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  total: number
  items: OrderItem[]
  createdAt: string
}
