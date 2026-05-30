import { ref } from "vue";

/**
 * Simple composable to fetch shop products via the GraphQL endpoint.
 * Uses Nuxt's $fetch which automatically handles the base URL and Nitro.
 */
export function useShop() {
  const products = ref([] as any[]);
  const totalProducts = ref(0);
  const isLoading = ref(false);

  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      const response = await $fetch("/api/graphql", {
        method: "POST",
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
          `,
        },
      });
      if (response?.data?.products) {
        products.value = response.data.products;
        totalProducts.value = products.value.length;
      }
    } catch (e) {
      console.error("[Shop GraphQL] fetch error", e);
    } finally {
      isLoading.value = false;
    }
  };

  return { products, totalProducts, isLoading, fetchProducts };
}
