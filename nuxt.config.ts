export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  css: [
    '@/assets/css/dark.css',
    '@/assets/css/responsive.css',
  ],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        class: 'dark'
      },
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
    }
  }
})
