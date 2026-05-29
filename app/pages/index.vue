<template>
  <div class="font-sans text-gray-900 dark:text-white bg-white dark:bg-[#050505] overflow-x-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
    <!-- Placeholder Navbar -->
    <div class="h-20 border-b border-black/10 dark:border-white/10 flex items-center px-6">Navbar Placeholder</div>

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <img
          src="/v2/hero.png"
          alt="Novare Luxury"
          class="object-cover w-full h-full opacity-60 dark:opacity-40 grayscale-[0.2]"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white dark:via-black/10 dark:to-[#050505]" />
      </div>

      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto transform transition-all duration-1000">
        <div class="mb-12">
          <h1 class="text-7xl md:text-[10rem] font-black tracking-tighter uppercase italic leading-none opacity-10 blur-sm absolute -top-20 left-1/2 -translate-x-1/2 select-none">
            NOVARÉ
          </h1>
          <img
            src="/logo/novare-wordmark.svg"
            alt="NØVÁRE"
            class="w-full max-w-2xl mx-auto h-auto dark:invert transition-all duration-700 hover:scale-[1.02]"
          />
        </div>

        <p class="text-xs sm:text-sm tracking-[0.5em] uppercase font-black mb-12 opacity-60">
          NOTHING ORDINARY — ESTAB. MMXXIV
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <NuxtLink to="/shop">
            <button
              class="px-14 py-5 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black tracking-[0.4em] uppercase hover:shadow-2xl hover:shadow-black/20 dark:hover:shadow-white/10 transition-all duration-300 min-w-[220px] rounded-2xl hover:scale-105"
            >
              Explore Collection
            </button>
          </NuxtLink>

          <NuxtLink to="/about">
            <button
              class="px-14 py-5 border border-black dark:border-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 min-w-[220px] rounded-2xl backdrop-blur-sm hover:scale-105"
            >
              The Philosophy
            </button>
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-pulse">
        <span class="text-[8px] font-black tracking-[0.5em] uppercase text-gray-400 rotate-90 origin-left translate-x-1">
          Scroll
        </span>
        <div class="w-px h-16 bg-gradient-to-b from-black/20 to-transparent dark:from-white/20 dark:to-transparent" />
      </div>
    </section>

    <!-- Concept 01: The Fragments -->
    <section class="py-32 md:py-52 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="order-2 lg:order-1 transition-all duration-1000">
            <p class="text-[10px] font-black tracking-[0.5em] uppercase text-gray-400 mb-6 italic">
              01 / THE FRAGMENTS
            </p>
            <h2 class="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-[0.9] mb-10">
              Ready-to-wear <br />
              <span class="text-transparent border-text dark:text-white/10 italic">Architectural</span> Luxury
            </h2>
            <p class="text-sm md:text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed max-w-xl font-medium">
              Our base collections represent the foundation of Novaré aesthetics. 
              Each piece is a fragment of a larger vision—standardized luxury 
              crafted for immediate integration into your lifestyle.
            </p>
            <NuxtLink to="/shop" class="group flex items-center gap-4">
              <div class="w-12 h-12 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
              <span class="text-[10px] font-black tracking-[0.4em] uppercase">Browse Fragments</span>
            </NuxtLink>
          </div>

          <div class="relative aspect-[4/5] rounded-[3rem] overflow-hidden order-1 lg:order-2 shadow-3xl shadow-black/10">
            <img src="/v2/fragments.png" alt="Fragments Collection" class="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </section>

    <!-- Brand Statement / Philosophy -->
    <section class="py-48 px-6 bg-transparent relative overflow-hidden">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black italic opacity-[0.02] dark:opacity-[0.03] select-none whitespace-nowrap">
        NOTHING ORDINARY
      </div>
      <div class="max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000">
        <p class="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight text-gray-800 dark:text-gray-200">
          "Defying the ordinary through <br /> modern luxury and timeless design."
        </p>
        <div class="mt-12 w-20 h-px bg-black/10 dark:bg-white/10 mx-auto" />
        <p class="mt-8 text-[10px] font-black tracking-[0.5em] uppercase text-gray-400">
          Estab. MMXXIV — Lagos, NG
        </p>
      </div>
    </section>

    <!-- Placeholder Footer -->
    <div class="h-32 border-t border-black/10 dark:border-white/10 flex items-center justify-center px-6">Footer Placeholder</div>
  </div>
</template>

<script setup>
// Ported React logic would go here.
// Replaced Framer Motion with standard CSS/Tailwind transitions to avoid complex initial setup issues.
</script>

<style scoped>
.border-text {
  -webkit-text-stroke: 1px #000;
}
@media (prefers-color-scheme: dark) {
  .border-text {
    -webkit-text-stroke: 1px #fff;
  }
}
</style>
