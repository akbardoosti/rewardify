import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    // The secret key is now only available on the server, not exposed to the public.
    cryptoSecretKey: process.env.CRYPTO_SECRET_KEY,
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss",  '@primevue/nuxt-module', '@vite-pwa/nuxt'],
  css: ['@/assets/css/global.css', 'primeicons/primeicons.css'],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: Aura
      }
    },
    components: {
      include: ['*']
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'fa',
        dir: 'rtl'
      }
    }
  },
  pwa: {
    manifest: {
      icons: [
        {
          src: '/icon.svg',  // مسیر آیکون منبع در public/
          sizes: '512x512',
          type: 'image/png'
        }
        // می‌توانید آیکون‌های اضافی برای اندازه‌های مختلف اضافه کنید، مثلاً:
        // { src: '/icon-192.png', sizes: '192x192', type: 'image/png' }
      ],
      // تنظیمات دیگر manifest (اختیاری)
      name: 'پاداشینو-سیستم مدیریت و پاداش دهی',
      short_name: 'پاداشینو',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone'
    },
    workbox: {
      // تنظیمات service worker (اختیاری، پیش‌فرض خوب است)
    },
    // فعال کردن تولید خودکار آیکون‌ها (اگر از PWA Assets Generator استفاده می‌کنید)
    // assetsGenerator: {
    //   icons: {
    //     source: '/icon.png',  // منبع آیکون
    //     favicon: true,  // تولید favicon
    //     iconsConfig: {
    //       // اندازه‌های دلخواه
    //       '192x192': true,
    //       '512x512': true
    //     }
    //   }
    // }
  }
})
