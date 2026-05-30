import { ref } from 'vue'

/**
 * Simple composable to fetch shop products via the GraphQL endpoint.
 * Uses Nuxt's $fetch which automatically handles the base URL and Nitro.
 */
export function useShop() {
  const products = ref([] as any[])
  const total = ref(0)
  const loading = ref(false)

  const fetchProducts = async () => {
    loading.value = true
    try {
      const response = await $fetch('/api/graphql', {
        method: 'POST',
        body: {
          query: `
            query {
              products {
                _id
                name
                price
                category
                images { url }
              }
            }
          `
        }
      })
      if (response?.data?.products) {
        products.value = response.data.products
        total.value = products.value.length
      }
    } catch (e) {
      console.error('[Shop GraphQL] fetch error', e)
    } finally {
      loading.value = false
    }
  }

  return { products, total, loading, fetchProducts }
}
