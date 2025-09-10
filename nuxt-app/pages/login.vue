<template>
  <div class="w-full max-w-[400px] bg-white p-8 rounded-[4px] shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">ورود فروشنده</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="credential" class="block text-right mb-2">نام کاربری یا شماره تلفن</label>
        <input type="text" id="credential" v-model="credential" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>

      <div class="mb-4">
        <div class="flex justify-between items-center mb-2">
          <label for="password" class="block text-right">
            {{ loginWithOtp ? 'رمز یکبار مصرف' : 'کلمه عبور' }}
          </label>
          <button type="button" @click="toggleLoginMethod" class="text-sm text-blue-600 hover:underline">
            {{ loginWithOtp ? 'ورود با کلمه عبور' : 'ورود با رمز یکبار مصرف' }}
          </button>
        </div>
        <input :type="loginWithOtp ? 'text' : 'password'" id="password" v-model="password" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded-[4px] hover:bg-blue-700">
        ورود
      </button>
    </form>
    <div class="text-center mt-4">
      <NuxtLink to="/register" class="text-sm text-blue-600 hover:underline">ثبت نام فروشنده</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const credential = ref('')
const password = ref('')
const loginWithOtp = ref(false)
const router = useRouter()

const toggleLoginMethod = () => {
  loginWithOtp.value = !loginWithOtp.value
  password.value = '' // Clear password field on toggle
}

const login = () => {
  // Here you would implement the actual login logic
  console.log('Logging in with:', credential.value, password.value)
  // On successful login, you would navigate the user
  // For now, we'll just log it.
}
</script>
