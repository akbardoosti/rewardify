<template>
  <div class="w-full max-w-[400px] bg-white p-8 rounded-[4px] shadow-md text-center">
    <h1 class="text-xl font-bold mb-4">تأیید شماره تلفن</h1>
    <p class="mb-6 text-gray-600">
      کد تأیید به شماره تلفن شما ارسال شد
    </p>
    <form @submit.prevent="verifyCode">
      <div class="mb-4">
        <label for="verificationCode" class="sr-only">کد تأیید</label>
        <input
          type="text"
          id="verificationCode"
          v-model="code"
          class="w-full p-3 border rounded-[4px] text-center tracking-[0.5em]"
          placeholder="------"
          maxlength="6"
          dir="ltr"
        >
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const code = ref('')
const router = useRouter()

const verifyCode = () => {
  // Here you would implement the actual code verification logic
  console.log('Verifying code:', code.value)
  // On successful verification, you might navigate to a seller dashboard
  // For now, we'll just log it and maybe navigate back to login.
  alert('تأیید با موفقیت انجام شد!')
  router.push('/login')
}
</script>
