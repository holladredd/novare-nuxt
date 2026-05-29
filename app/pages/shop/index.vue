<template>
  <div class="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500 overflow-x-hidden">
    <Navbar />

    <main class="max-w-screen-2xl mx-auto px-4 lg:px-12 py-12 mt-20 md:mt-24">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-black/5 dark:border-white/5 pb-10">
        <div class="mb-6 md:mb-0">
          <h1 class="text-4xl md:text-6xl font-light tracking-[0.15em] text-gray-900 dark:text-white mb-4">
            COLLECTIONS
          </h1>
          <p class="text-sm font-medium tracking-[0.2em] text-gray-500 uppercase">
            Curated pieces for the modern aesthetic
          </p>
        </div>
        
        <!-- Controls -->
        <div class="flex items-center gap-4">
          <div class="text-[10px] font-black tracking-[0.3em] uppercase text-gray-400">
            <!-- Simulated Loading State -->
            <span v-if="isLoading" class="animate-pulse">Syncing...</span>
            <span v-else>Viewing {{ totalProducts }} Concepts</span>
          </div>

          <!-- Sort Select Placeholder -->
          <div class="relative ml-4">
            <select
              v-model="filters.sort"
              class="appearance-none bg-transparent border border-black/10 dark:border-white/10 text-gray-900 dark:text-white text-[10px] font-black tracking-[0.2em] uppercase py-3 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white rounded-none cursor-pointer"
            >
              <option value="newest">Latest Releases</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
          
          <!-- Filter Toggle Button -->
          <button
            @click="isSidebarOpen = !isSidebarOpen"
            class="md:hidden flex items-center gap-2 px-4 py-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-[0.2em] uppercase rounded-none"
          >
            Filters
          </button>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex flex-col md:flex-row gap-12 relative">
        <!-- Sidebar Placeholder -->
        <div class="hidden md:block w-64 flex-shrink-0">
          <div class="sticky top-32 p-4 border border-black/10 dark:border-white/10 rounded-xl">
             <p class="text-xs font-bold tracking-widest text-gray-500 mb-4 uppercase">Filter Sidebar</p>
             <!-- Simplified Search -->
             <input 
               v-model="filters.search" 
               type="text" 
               placeholder="Search..." 
               class="w-full bg-transparent border-b border-black/20 dark:border-white/20 py-2 text-sm outline-none mb-6"
             />
             <div class="space-y-2">
               <label class="flex items-center gap-2 text-sm cursor-pointer">
                 <input type="checkbox" v-model="filters.isFeatured" /> Featured Only
               </label>
             </div>
          </div>
        </div>

        <!-- Product Grid -->
        <div class="flex-1 min-h-[50vh]">
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            <!-- Skeleton Loading Placeholder -->
            <div v-for="n in 8" :key="n" class="aspect-[3/4] bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>
          </div>
          
          <div v-else-if="products.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
            <p class="text-sm font-black tracking-[0.2em] uppercase text-gray-400 mb-4">No concepts found</p>
            <button @click="resetFilters" class="text-xs underline tracking-widest">Clear Filters</button>
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            <!-- Product Card Component -->
            <ShopProductCard
              v-for="product in products" 
              :key="product._id" 
              :product="product"
              @quick-view="handleQuickView"
            />
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const isLoading = ref(true)
const products = ref([])
const totalProducts = ref(0)
const isSidebarOpen = ref(false)

const filters = reactive({
  search: '',
  category: '',
  sizes: [],
  price: 100000,
  isFeatured: false,
  sort: 'newest',
  page: 1
})

const handleQuickView = (product) => {
  console.log("Quick view opened for:", product.name)
}

const fetchProducts = async () => {
  isLoading.value = true
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
              inStock
              isFeatured
              freeShipping
              discountPrice
              isConcept
              images {
                url
              }
            }
          }
        `
      }
    })
    
    if (response.data && response.data.products) {
      products.value = response.data.products
      totalProducts.value = products.value.length
    }
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

const resetFilters = () => {
  filters.search = ''
  filters.isFeatured = false
  filters.sort = 'newest'
}

onMounted(() => {
  fetchProducts()
})
</script>
