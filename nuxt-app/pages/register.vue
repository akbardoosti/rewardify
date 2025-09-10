<template>
  <div class="w-full max-w-[400px] bg-white p-8 rounded-[4px] shadow-md">
    <h1 class="text-2xl font-bold text-center mb-6">ثبت نام فروشنده</h1>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="firstName" class="block text-right mb-2">نام فروشنده</label>
        <input type="text" id="firstName" v-model="form.firstName" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>
      <div class="mb-4">
        <label for="lastName" class="block text-right mb-2">نام خانوادگی فروشنده</label>
        <input type="text" id="lastName" v-model="form.lastName" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>
      <div class="mb-4">
        <label for="storeName" class="block text-right mb-2">نام فروشگاه</label>
        <input type="text" id="storeName" v-model="form.storeName" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>
      <div class="mb-4">
        <label for="phoneNumber" class="block text-right mb-2">شماره تلفن</label>
        <input type="tel" id="phoneNumber" v-model="form.phoneNumber" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>
      <div class="mb-4">
        <label for="username" class="block text-right mb-2">نام کاربری</label>
        <input type="text" id="username" v-model="form.username" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>
      <div class="mb-4">
        <label for="password" class="block text-right mb-2">کلمه عبور</label>
        <input type="password" id="password" v-model="form.password" class="w-full p-2 border rounded-[4px] text-right" dir="rtl">
      </div>

      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded-[4px] hover:bg-blue-700">
        ثبت نام
      </button>
    </form>
    <div class="text-center mt-4">
      <NuxtLink to="/login" class="text-sm text-blue-600 hover:underline">بازگشت به صفحه ورود</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({
  firstName: '',
  lastName: '',
  storeName: '',
  phoneNumber: '',
  username: '',
  password: '',
})

const register = () => {
  // Here you would implement the actual registration logic
  console.log('Registering with:', form)
  // On successful registration, navigate to the verification page
  router.push('/verify')
}
</script>
