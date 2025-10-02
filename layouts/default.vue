<template>
  <div>
    <SpeedInsights/>
    <NuxtPwaManifest />  <!-- یا VitePwaManifest اگر از vite-pwa استفاده می‌کنید -->
    <Toast />
    <slot />
  </div>
</template>
<script setup>
import { SpeedInsights } from "@vercel/speed-insights/nuxt"
// useHead({
//   link: [
//     { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },  // آیکون iOS
//     { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
//     { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
//   ],
//   meta: [
//     { name: 'apple-mobile-web-app-capable', content: 'yes' },
//     { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
//     { name: 'apple-mobile-web-app-title', content: 'نام اپ' }
//   ]
// })
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');
html {
  font-family: 'Vazirmatn', sans-serif;
}
</style>
