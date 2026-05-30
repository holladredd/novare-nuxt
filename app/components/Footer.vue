<template>
  <footer class="bg-white dark:bg-[#050505] text-gray-900 dark:text-white border-t border-black/5 dark:border-white/5 transition-colors duration-500 py-20 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        <!-- About Section -->
        <div class="space-y-6">
          <h3 class="text-xl font-light tracking-[0.4em] uppercase">
            NØVÁRE
          </h3>
          <p class="text-sm text-gray-400 font-light leading-relaxed tracking-widest max-w-xs">
            DEFINING MODERN LUXURY THROUGH TIMELESS ESSENTIALS. NOTHING ORDINARY.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h3 class="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">
            Collections
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/shop" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Shop All</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/lookbook" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Lookbook</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Company -->
        <div class="space-y-6">
          <h3 class="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">
            The Brand
          </h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/terms" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Terms</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/return-policy" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Returns</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/profile" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">My Profile</NuxtLink>
            </li>
            <li>
              <a href="mailto:novarewear.com@gmail.com" class="text-sm tracking-widest font-light text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">Contact Us</a>
            </li>
          </ul>
        </div>

        <!-- Social Media Placeholder (Raw SVGs can be replaced with lucide-vue later) -->
        <div class="space-y-6">
          <h3 class="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-400">
            Connect
          </h3>
          <div class="flex space-x-6">
             <a href="#" class="text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
             </a>
             <a href="#" class="text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
             </a>
             <a href="#" class="text-gray-400 hover:text-black dark:hover:text-white transition-all transform hover:scale-110">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
             </a>
          </div>
          <div class="pt-4">
            <p class="text-[10px] tracking-widest text-gray-500 uppercase">
              Lagos, Nigeria
            </p>
          </div>
        </div>
      </div>

      <div class="mt-20 pt-10 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p class="text-[10px] tracking-[0.3em] text-gray-500 uppercase">
          &copy; {{ new Date().getFullYear() }} NØVÁRE APPAREL. ALL RIGHTS RESERVED.
        </p>
        <div class="flex gap-8">
          <NuxtLink to="/terms" class="text-[10px] tracking-widest text-gray-500 hover:text-black dark:hover:text-white uppercase transition-colors">Terms</NuxtLink>
          <NuxtLink to="/return-policy" class="text-[10px] tracking-widest text-gray-500 hover:text-black dark:hover:text-white uppercase transition-colors">Returns</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
