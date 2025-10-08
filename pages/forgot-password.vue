<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">فراموشی رمز عبور</h1>
        <p class="mt-2 text-sm text-gray-600">ایمیل یا شماره تلفن خود را برای بازیابی رمز عبور وارد کنید.</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleForgotPassword">
        <div>
          <label for="identifier" class="block text-sm font-medium text-gray-700">ایمیل یا شماره تلفن</label>
          <InputText
            id="identifier"
            v-model="identifier"
            type="text"
            class="w-full mt-1"
            placeholder="example@mail.com یا 09123456789"
            required
          />
        </div>

        <Button
          type="submit"
          label="ارسال لینک بازیابی"
          class="w-full"
          :loading="loading"
        />
      </form>

      <div v-if="message" class="p-4 text-sm text-green-700 bg-green-100 border-l-4 border-green-500" role="alert">
        <p>{{ message }}</p>
      </div>
      <div v-if="error" class="p-4 text-sm text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
        <p>{{ error }}</p>
      </div>

       <div class="text-sm text-center">
        <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
          بازگشت به صفحه ورود
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import api from '~/services/api';

definePageMeta({
  layout: false, // No layout for the forgot password page
});
useHead({
  title: 'لویانا - فراموشی کلمه عبور'
});

const identifier = ref('');
const loading = ref(false);
const message = ref('');
const error = ref('');

const handleForgotPassword = async () => {
  loading.value = true;
  message.value = '';
  error.value = '';

  try {
    await api.forgotPassword(identifier.value);
    message.value = 'ایمیل خود را چک کنید. لینک بازیابی برای شما ارسال شد.';
  } catch (err: any) {
    if (err.response && err.response.data) {
      error.value = 'خطایی رخ داد. لطفا دوباره تلاش کنید.';
    } else {
      error.value = 'ارتباط با سرور برقرار نشد.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* You can add additional styles here if needed */
</style>
