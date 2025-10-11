<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">تنظیم مجدد رمز عبور</h1>
        <p class="mt-2 text-sm text-gray-600">رمز عبور جدید خود را وارد کنید.</p>
      </div>

      <form class="space-y-6" @submit.prevent="handleResetPassword">
        <div>
          <label for="new_password" class="block text-sm font-medium text-gray-700">رمز عبور جدید</label>
          <Password
            id="new_password"
            v-model="newPassword"
            class="w-full mt-1"
            :feedback="true"
            toggleMask
            required
            weakLabel="ضعیف"
            mediumLabel="متوسط"
            strongLabel="مستحکم"
            promptLabel="کلمه‌عبور را وارد کنید"
          >
            <template #header>
              میزان قدرت کلمه‌عبور
            </template>

          </Password>
        </div>

        <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700">تکرار رمز عبور جدید</label>
          <Password
            id="confirm_password"
            v-model="confirmPassword"
            class="w-full mt-1"
            :feedback="false"
            toggleMask
            required
            inputClass="w-full"
          />
        </div>

        <Button
          type="submit"
          label="تغییر رمز عبور"
          class="w-full"
          :loading="loading"
          :disabled="!passwordsMatch"
        />
      </form>

      <div v-if="!passwordsMatch && confirmPassword" class="p-4 text-sm text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
        <p>رمزهای عبور با یکدیگر مطابقت ندارند.</p>
      </div>
      <div v-if="error" class="p-4 text-sm text-red-700 bg-red-100 border-l-4 border-red-500" role="alert">
        <p>{{ error }}</p>
      </div>
       <div v-if="successMessage" class="p-4 text-sm text-green-700 bg-green-100 border-l-4 border-green-500" role="alert">
        <p>{{ successMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import api from '~/services/api';

definePageMeta({
  layout: false, // No layout for the reset password page
});

useHead({
  title: 'لویانا - بازنشانی کلمه عبور'
});

const route = useRoute();
const router = useRouter();

const token = ref<string | null>(null);
const newPassword = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const successMessage = ref('');

const passwordsMatch = computed(() => newPassword.value === confirmPassword.value);

onMounted(() => {
  const routeToken = route.query.token;
  if (typeof routeToken === 'string') {
    token.value = routeToken;
  } else {
    error.value = 'توکن بازیابی نامعتبر یا یافت نشد.';
  }
});

const handleResetPassword = async () => {
  if (!passwordsMatch.value || !token.value) {
    error.value = 'لطفا از تطابق رمزهای عبور اطمینان حاصل کنید.';
    return;
  }

  loading.value = true;
  error.value = '';
  successMessage.value = '';

  try {
    await api.resetPassword({
      token: token.value,
      new_password: newPassword.value,
    });

    successMessage.value = 'رمز عبور شما با موفقیت تغییر کرد. تا چند لحظه دیگر به صفحه ورود منتقل می‌شوید...';

    setTimeout(() => {
      router.push('/login');
    }, 3000);

  } catch (err: any) {
    if (err.response && err.response.data) {
       error.value = err.response.data.detail || 'خطایی در تغییر رمز عبور رخ داد. ممکن است توکن شما منقضی شده باشد.';
    } else {
      error.value = 'ارتباط با سرور برقرار نشد.';
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Scoped styles for the reset password page */
:deep(.p-password input) {
  width: 100%;
}
</style>
