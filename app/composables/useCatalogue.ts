import type { Category, Product } from '~/types/shop'

export const useCatalogue = () => {
  const config = useRuntimeConfig()
  
  // State global pour éviter de re-fetcher à chaque fois
  const categories = useState<Category[]>('shop-categories', () => [])
  const products = useState<Product[]>('shop-products', () => [])
  const loading = useState('shop-loading', () => false)

  const fetchCategories = async () => {
    try {
      const data = await $fetch<Category[]>(`${config.public.apiBase}/categories`)
      categories.value = data
    } catch (e) {
      console.error('Failed to fetch categories', e)
    }
  }

  const fetchProducts = async () => {
    try {
      const data = await $fetch<any[]>(`${config.public.apiBase}/products`)
      products.value = data.map(p => ({
        ...p,
        price: Number(p.price)
      }))
    } catch (e) {
      console.error('Failed to fetch products', e)
    }
  }

  const init = async () => {
    if (loading.value) return
    loading.value = true
    
    // Charger en parallèle
    await Promise.all([
      categories.value.length ? Promise.resolve() : fetchCategories(),
      products.value.length ? Promise.resolve() : fetchProducts()
    ])
    
    loading.value = false
  }

  // Helpers
  const getCategoryBySlug = (slug: string) => categories.value.find(c => c.slug === slug)
  const getProductById = (id: string) => products.value.find(p => p.id === id)
  const getProductBySlug = (slug: string) => products.value.find(p => p.slug === slug)
  
  const getProductsByCategory = (categorySlug: string) => {
    return products.value.filter(p => p.category?.slug === categorySlug)
  }

  return {
    categories,
    products,
    loading,
    init,
    fetchCategories,
    fetchProducts,
    getCategoryBySlug,
    getProductById,
    getProductBySlug,
    getProductsByCategory
  }
}
