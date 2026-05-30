export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  css: [
    '@/assets/css/dark.css',
    '@/assets/css/responsive.css'
  ],

  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        class: 'dark'
      }
    }
  }
})
