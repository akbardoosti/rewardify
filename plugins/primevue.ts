import { defineNuxtPlugin } from '#app';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import {ConfirmationService} from 'primevue';

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(PrimeVue, { ripple: true });
    nuxtApp.vueApp.use(ToastService);
    nuxtApp.vueApp.use(ConfirmationService);
});
