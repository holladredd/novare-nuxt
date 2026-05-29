<template>
  <div
    class="group relative flex flex-col h-full bg-white dark:bg-[#0A0A0A] rounded-lg overflow-hidden transition-all duration-500 hover:shadow-2xl dark:hover:shadow-white/5 border border-black/5 dark:border-white/10"
    :class="{ 'opacity-70 grayscale-[0.5]': product.inStock <= 0 && !product.isConcept }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Image Container -->
    <div class="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-neutral-900 border-b border-black/5 dark:border-white/5">
      <NuxtLink :to="`/shop/${product.slug || product._id}`" class="block h-full">
        <img
          :src="currentImage"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-700"
          :class="isHovered ? 'scale-[1.02]' : 'scale-100'"
        />
      </NuxtLink>

      <!-- Wishlist Button Placeholder -->
      <button
        @click.stop="toggleWishlist"
        class="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md hover:scale-110 active:scale-90 transition-all duration-300 shadow-xl border border-white/20 dark:border-white/10"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" :fill="isInWishlist ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :class="isInWishlist ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>

      <!-- Badges -->
      <div class="absolute top-4 left-4 flex flex-col gap-2 z-10">
        <div v-if="product.isFeatured" class="bg-white/80 dark:bg-black/80 backdrop-blur-md text-black dark:text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full shadow-lg border border-black/5 dark:border-white/10">
          Featured
        </div>
        <div v-if="product.freeShipping" class="bg-emerald-500 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
          Free Delivery
        </div>
        <div v-if="onSale" class="flex flex-col gap-1.5">
          <div class="bg-amber-500 text-white text-[8px] font-black tracking-[0.3em] uppercase px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 border border-white/20">
            Sale
          </div>
        </div>
        <div v-if="product.inStock <= 0 && !product.isConcept" class="bg-black/90 dark:bg-white/90 text-white dark:text-black text-[8px] font-black tracking-[0.35em] uppercase px-4 py-2.5 rounded-full shadow-lg backdrop-blur-xl border border-white/10">
          Stock Depleted
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="p-2 flex flex-col flex-grow">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[9px] tracking-[0.4em] uppercase text-gray-400 font-black">
          {{ product.category || 'CONCEPT' }}
        </span>
        <div
          v-if="product.inStock > 0 && !product.isConcept"
          class="flex items-center gap-1.5 px-2 py-1 rounded-md border"
          :class="product.inStock <= 12 ? 'bg-red-500/5 border-red-500/10' : 'bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10'"
        >
          <div class="w-1 h-1 rounded-full" :class="product.inStock <= 12 ? 'bg-red-500 animate-pulse' : 'bg-black dark:bg-white'" />
          <span class="text-[9px] font-black tracking-widest uppercase" :class="product.inStock <= 12 ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'">
            {{ product.inStock }} {{ product.inStock <= 12 ? "Locked" : "In Stock" }}
          </span>
        </div>
      </div>

      <NuxtLink :to="`/shop/${product.slug || product._id}`">
        <h3 class="text-lg font-bold tracking-tighter text-gray-900 dark:text-white mb-2 uppercase italic group-hover:translate-x-1 transition-transform truncate">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <div class="flex items-center gap-3 mb-1">
        <div v-if="onSale" class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="font-black text-xl dark:text-amber-500 tracking-tighter text-amber-600">
              ₦{{ product.discountPrice?.toLocaleString() }}
            </span>
            <span class="text-[10px] text-gray-400 line-through font-bold opacity-60">
              ₦{{ product.price?.toLocaleString() }}
            </span>
          </div>
        </div>
        <span v-else class="font-black text-xl tracking-tighter text-black dark:text-white">
          ₦{{ product.price?.toLocaleString() }}
        </span>
      </div>

      <!-- Action Bar -->
      <div class="mt-auto flex items-center gap-1 pt-2 border-t border-black/5 dark:border-white/10">
        <button
          @click.stop="$emit('quick-view', product)"
          class="flex-1 flex items-center justify-center py-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:scale-[1.02] active:scale-95 transition-all duration-300"
          title="Quick View"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        </button>
        <button
          @click.stop="toggleCart"
          :disabled="isPending || (product.inStock <= 0 && !product.isConcept)"
          class="flex-[2] flex items-center justify-center py-3 rounded-lg transition-all duration-300 shadow-xl active:scale-[0.98]"
          :class="isInCart ? 'bg-red-500 text-white font-black uppercase text-[9px] tracking-[0.3em]' : (product.inStock <= 0 && !product.isConcept ? 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed border-transparent' : 'bg-black dark:bg-white text-white dark:text-black font-black uppercase text-[9px] tracking-[0.3em] hover:opacity-90')"
        >
          <div v-if="isPending" class="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
          <div v-else class="flex items-center gap-3">
             <span v-if="isInCart">REMOVE</span>
             <span v-else>ADD TO CART</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['quick-view'])

// State
const isHovered = ref(false)
const isInWishlist = ref(false)
const isInCart = ref(false)
const isPending = ref(false)

// Computed
const currentImage = computed(() => {
  if (isHovered.value && props.product.images?.[1]) {
    return props.product.images[1].url
  }
  return props.product.images?.[0]?.url || '/placeholder.png'
})

const onSale = computed(() => {
  return props.product.discountPrice && props.product.discountPrice < props.product.price
})

// Methods
const toggleWishlist = () => {
  isInWishlist.value = !isInWishlist.value
  // Simulate API Call
}

const toggleCart = () => {
  isPending.value = true
  setTimeout(() => {
    isInCart.value = !isInCart.value
    isPending.value = false
  }, 500)
}
</script>
