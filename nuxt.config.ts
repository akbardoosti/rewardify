// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss",  'primevue/nuxt'],
  css: ['@/assets/css/global.css', 'primeicons/primeicons.css'],
  primevue: {
    options: {
      ripple: true,
    },
    components: {
      include: ['Toast']
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      }
    }
  }
})
