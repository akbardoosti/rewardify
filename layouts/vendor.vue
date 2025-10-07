<template>
  <header class="brand-header-bar">
    <!-- Desktop Menu -->
    <Menubar :model="items" v-if="!isMobile">
      <template #start>
        <div class="brand-logo">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="14" fill="#6366f1"/>
            <path d="M24 14c-2.5 0-4.5 2-4.5 4.5S21.5 23 24 23s4.5-2 4.5-4.5S26.5 14 24 14zm0 2c1.4 0 2.5 1.1 2.5 2.5S25.4 21 24 21s-2.5-1.1-2.5-2.5S22.6 16 24 16zm-8 7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2H16zm0 2h16v7H16v-7z"
                  fill="#fff"/>
          </svg>
          <div class="flex flex-col">
            <span class="brand-title">لویانا</span>
            <span class="text-xs text-violet-500">پاداش وفاداری شما</span>
          </div>
        </div>
        <div class="p-3"></div>
      </template>
      <template #item="{ item }">
        <NuxtLink v-if="item.to" :to="item.to" class="flex items-center p-2 cursor-pointer">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </NuxtLink>
        <a v-else-if="item.command" @click="item.command" class="flex items-center p-2 cursor-pointer">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" id="overlay_menu" :model="userMenuItems" :popup="true" >
            <template #item="{ item, props }">
              <router-link v-if="item.to" v-slot="{ href, navigate }" :to="item.to" custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
                </a>
              </router-link>
              <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </template>
          </Menu>
        </div>
      </template>
    </Menubar>

    <!-- Mobile Header -->
    <div v-if="isMobile" class="mobile-header">
      <div class="brand-logo">
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="14" fill="#6366f1"/>
            <path d="M24 14c-2.5 0-4.5 2-4.5 4.5S21.5 23 24 23s4.5-2 4.5-4.5S26.5 14 24 14zm0 2c1.4 0 2.5 1.1 2.5 2.5S25.4 21 24 21s-2.5-1.1-2.5-2.5S22.6 16 24 16zm-8 7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2H16zm0 2h16v7H16v-7z"
                  fill="#fff"/>
          </svg>
        <div class="flex flex-col">
          <span class="brand-title">لویانا</span>
          <span class="text-xs text-violet-500">پاداش وفاداری شما</span>
        </div>
      </div>
      <Button icon="pi pi-bars" @click="drawerVisible = true" text rounded aria-label="Open menu" />
    </div>
  </header>

  <!-- Headless Drawer for Mobile -->
  <Drawer v-model:visible="drawerVisible" position="left" >
    <template #container="{ closeCallback }">
      <div class="flex flex-col h-full bg-white text-gray-700">
        <!-- Header -->
        <div class="flex items-center justify-between px-4 pt-4 shrink-0">
          <span class="font-bold text-lg">منو</span>
          <Button type="button" @click="closeCallback" icon="pi pi-times" rounded text class="h-8 w-8"></Button>
        </div>
        <!-- Content -->
        <div class="p-4 overflow-y-auto">
            <!-- Profile Section -->
            <div class="flex flex-col items-center py-4">
                <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" size="large" shape="circle" />
                <span class="font-bold mt-2">{{ sellerName }}</span>
            </div>
            <hr class="my-4" />
            <!-- Navigation Links -->
            <ul class="list-none p-0 m-0">
              <li v-for="item in items" :key="item.label">
                <NuxtLink v-if="item.to" :to="item.to" class="flex items-center p-3 rounded-md hover:bg-gray-100" @click="drawerVisible = false">
                  <span :class="item.icon" class="text-xl"></span>
                  <span class="ml-3 font-medium">{{ item.label }}</span>
                </NuxtLink>
                <button v-else-if="item.command" @click="item.command(); drawerVisible = false" class="flex items-center p-3 rounded-md hover:bg-gray-100 w-full text-right">
                  <span :class="item.icon" class="text-xl"></span>
                  <span class="ml-3 font-medium">{{ item.label }}</span>
                </button>
              </li>
            </ul>
            <hr class="my-4" />
            <!-- User Menu Items -->
            <ul class="list-none p-0 m-0">
              <li v-for="item in userMenuItems" :key="item.label">
                <NuxtLink v-if="item.to" :to="item.to" class="flex items-center p-3 rounded-md hover:bg-gray-100 w-full text-right" @click="drawerVisible = false">
                  <span :class="item.icon" class="text-xl"></span>
                  <span class="ml-3 font-medium">{{ item.label }}</span>
                </NuxtLink>
                <button v-else-if="item.command" @click="item.command" class="flex items-center p-3 rounded-md hover:bg-gray-100 w-full text-right">
                  <span :class="item.icon" class="text-xl"></span>
                  <span class="ml-3 font-medium">{{ item.label }}</span>
                </button>
              </li>
            </ul>
        </div>
      </div>
    </template>
  </Drawer>

  <slot />
</template>
<style>
.brand-header-bar {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
  z-index: 1000;
}

.brand-header-bar .p-menubar {
  background-color: #f7f5f2 !important;
  border-radius: 0;
  border: none;
  height: 60px;
}
@media (max-width: 600px) {
  .brand-header-bar .p-menubar {
    display: none; /* Hide desktop menubar on mobile */
  }
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  height: 55px;
  background-color: #f7f5f2;
}

.drawer-nav a {
    text-decoration: none;
    color: #4b5563;
    transition: background-color 0.2s;
    border-radius: 8px;
}

.drawer-nav a:hover {
    background-color: #f3f4f6;
}

.router-link-exact-active {
  background-color: #eef2ff;
  color: #4f46e5 !important;
  font-weight: 600;
  border-radius: 6px;
}
</style>
<script setup lang="ts">
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Drawer from "primevue/drawer";
import Button from "primevue/button";
import {ref, onMounted, onUnmounted, computed} from "vue";
import api from '~/services/api';
import { decrypt } from '~/services/crypto';
import { useRouter } from 'vue-router';

const router = useRouter();
const menu = ref();
const drawerVisible = ref(false);
const isMobile = ref(false);
const shopInfo = ref(null);

const sellerName = computed(() => {
  if (shopInfo.value && shopInfo.value.seller_first_name) {
    return `${shopInfo.value.seller_first_name} ${shopInfo.value.seller_last_name || ''}`;
  }
  return 'کاربر'; // Default name
});

const handleLogout = async () => {
  try {
    await api.logout();
  } catch (error) {
    console.error("Failed to logout from server:", error);
  } finally {
    localStorage.removeItem('access_token');
    localStorage.removeItem('shopInfo');
    // Redirect directly to the login page to avoid intermediate routes.
    await router.push('/login');
  }
};

const handleDownloadReports = async () => {
  try {
    const response = await api.downloadReports();
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'reports.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading the report:', error);
  }
};

const checkScreenSize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 600;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const encryptedShopInfo = localStorage.getItem('shopInfo');
    if (encryptedShopInfo) {
      shopInfo.value = decrypt(encryptedShopInfo);
    }
  }
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

const items = ref([
  {
    label: 'خانه',
    icon: 'pi pi-home',
    to: '/dashboard'
  },
  {
    label: 'تعرفه ها',
    icon: 'pi pi-dollar',
    to: '/tariffs'
  },
  {
    label: 'دانلود گزارشات',
    icon: 'pi pi-download',
    command: handleDownloadReports
  }
]);
const userMenuItems = ref([
  {
    label: 'پروفایل',
    icon: 'pi pi-user',
    to: '/profile'
  },
  {
    label: 'خروج',
    icon: 'pi pi-power-off',
    command: handleLogout
  }
]);
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
