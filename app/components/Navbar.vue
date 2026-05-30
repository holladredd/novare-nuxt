<template>
  <div
    class="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-black/5 dark:border-white/10 transition-colors duration-500"
  >
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <NuxtLink to="/" class="font-bold text-xl flex items-center">
        <img
          src="/novare-wordmark.svg"
          alt="NØVÁRE Logo"
          class="w-[120px] h-auto dark:invert transition-all duration-300"
        />
      </NuxtLink>

      <!-- Desktop Links -->
      <div
        class="hidden md:flex items-center gap-10 text-sm tracking-widest uppercase font-semibold"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="hover:opacity-60 transition-all duration-200 relative group"
        >
          {{ link.name }}
          <span
            class="absolute left-0 -bottom-1 w-0 h-[2px] bg-black dark:bg-white transition-all group-hover:w-full"
          ></span>
        </NuxtLink>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-6">
        <!-- Auth / Profile -->
        <button class="hover:opacity-60 transition flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>

        <!-- Cart -->
        <button
          class="p-2 relative hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span
            class="absolute top-0 right-0 bg-black dark:bg-white text-white dark:text-black text-[8px] rounded-full w-4 h-4 flex items-center justify-center font-bold"
          >
            0
          </span>
        </button>

        <!-- Mobile Menu Toggle -->
        <button class="md:hidden p-2" @click="mobileOpen = !mobileOpen">
          <svg
            v-if="!mobileOpen"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12"></line>
            <line x1="4" x2="20" y1="6" y2="6"></line>
            <line x1="4" x2="20" y1="18" y2="18"></line>
          </svg>
          <svg
            v-else
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-if="mobileOpen"
      class="md:hidden bg-white dark:bg-[#050505] backdrop-blur-md border-t border-black/5 dark:border-white/10"
    >
      <div class="flex flex-col gap-4 p-6 text-center">
        <NuxtLink
          v-for="link in links"
          :key="link.name"
          :to="link.href"
          class="text-lg font-light tracking-[0.2em] text-gray-900 dark:text-white hover:opacity-60 transition"
          @click="mobileOpen = false"
        >
          {{ link.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const mobileOpen = ref(false);

const links = [
  { name: "SHOP", href: "/shop" },
  { name: "CONCEPTS", href: "/concepts" },
  { name: "LOOKBOOK", href: "/lookbook" },
  { name: "ABOUT", href: "/about" },
];
</script>
