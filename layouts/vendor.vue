<template>
  <header class="brand-header-bar">
    <Menubar :model="items">
      <template #start>
        <div class="brand-logo">
          <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="48" height="48" rx="14" fill="#6366f1"/>
            <path d="M24 14c-2.5 0-4.5 2-4.5 4.5S21.5 23 24 23s4.5-2 4.5-4.5S26.5 14 24 14zm0 2c1.4 0 2.5 1.1 2.5 2.5S25.4 21 24 21s-2.5-1.1-2.5-2.5S22.6 16 24 16zm-8 7c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2H16zm0 2h16v7H16v-7z"
                  fill="#fff"/>
          </svg>
          <div class="flex flex-col">
            <span class="brand-title">پاداشینو</span>
            <span class="text-xs text-violet-500">پاداش وفاداری شما</span>
          </div>
        </div>
        <div class="p-3"></div>
      </template>
      <template #item="{ item, props }">
        <a class="flex items-center p-2 cursor-pointer" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" id="overlay_menu" :model="userMenuItems" :popup="true" />
        </div>
      </template>
    </Menubar>
  </header>

  <slot />
</template>
<style>
.brand-header-bar {
  position: fixed;
  top: 0;
  width: 100%;
  right: 0;
}

.brand-header-bar .p-menubar {
  background-color: #f7f5f2 !important;
  border-radius: 0;
  border: none;
  height: 60px;
}
@media (max-width: 600px) {
  .brand-header-bar .p-menubar {
    height: 55px !important;
  }
}
</style>
<script setup lang="ts">
import Menu from "primevue/menu";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import {ref} from "vue";
const menu = ref();
const items = ref([
  {
    label: 'خانه',
    icon: 'pi pi-home'
  },
  {
    label: 'گزارشات',
    icon: 'pi pi-chart-bar'
  }
]);
const userMenuItems = ref([
  {
    label: 'پروفایل',
    icon: 'pi pi-user'
  },
  {
    label: 'خروج',
    icon: 'pi pi-power-off'
  }
]);
const toggle = (event) => {
  menu.value.toggle(event);
};
</script>
