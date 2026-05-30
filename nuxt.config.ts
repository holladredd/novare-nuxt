export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },

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
