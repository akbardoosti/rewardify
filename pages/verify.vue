<template>
  <div class="w-full max-w-[400px] bg-white p-8 rounded-[4px] shadow-md text-center">
    <h1 class="text-xl font-bold mb-4">تأیید شماره تلفن</h1>
    <p class="mb-6 text-gray-600">
      کد تأیید به شماره تلفن شما ارسال شد
    </p>
    <form @submit.prevent="verifyCode">
      <div class="mb-6 flex justify-center" dir="ltr">
        <InputOtp v-model="code" :length="6" integerOnly />
      </div>

      <div class="resend-container mb-4">
          <button @click="resendCode" :disabled="resendDisabled" type="button" class="resend-btn">
              ارسال مجدد کد
          </button>
          <span v-if="resendDisabled" class="timer"> ({{ timer }}s)</span>
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded-[4px] hover:bg-blue-700">
        تأیید
      </button>
    </form>
     <div class="text-center mt-4">
      <NuxtLink to="/login" class="text-sm text-blue-600 hover:underline">بازگشت به صفحه ورود</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import InputOtp from 'primevue/inputotp';

const code = ref('');
const router = useRouter();
const timer = ref(60);
const resendDisabled = ref(true);
let timerInterval = null;

const startTimer = () => {
  resendDisabled.value = true;
  timer.value = 60;
  timerInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(timerInterval);
      resendDisabled.value = false;
    }
  }, 1000);
};

const resendCode = () => {
  // Here you would implement logic to resend the code via API
  console.log('Resending code...');
  startTimer();
};

const verifyCode = () => {
  // Here you would implement the actual code verification logic
  console.log('Verifying code:', code.value);
  // On successful verification, you might navigate to a seller dashboard
  // For now, we'll just log it and maybe navigate back to login.
  alert('تأیید با موفقیت انجام شد!');
  router.push('/login');
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped>
.resend-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
}

.resend-btn {
    background: none;
    border: none;
    color: #2563eb;
    cursor: pointer;
    font-size: 0.875rem;
}

.resend-btn:disabled {
    color: #9ca3af;
    cursor: not-allowed;
}

.timer {
    font-size: 0.875rem;
    color: #6b7280;
    margin-right: 0.5rem;
}
</style>
