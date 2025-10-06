<template>
  <div class="profile-page">
    <Toast />
    <div class="card">
      <h2 class="card-header">پروفایل فروشگاه</h2>
      <div class="p-fluid grid">
        <div class="field col-12 md:col-6">
          <label for="store_name">نام فروشگاه</label>
          <InputText id="store_name" v-model="form.store_name" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="phone_number">شماره تلفن</label>
          <InputText id="phone_number" v-model="form.phone_number" disabled />
        </div>
        <div class="field col-12 md:col-6">
          <label for="category">دسته بندی</label>
          <InputText id="category" v-model="form.category" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="email">ایمیل</label>
          <InputText id="email" v-model="form.email" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="seller_first_name">نام فروشنده</label>
          <InputText id="seller_first_name" v-model="form.seller_first_name" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="seller_last_name">نام خانوادگی فروشنده</label>
          <InputText id="seller_last_name" v-model="form.seller_last_name" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="province">استان</label>
          <InputText id="province" v-model="form.province" />
        </div>
        <div class="field col-12 md:col-6">
          <label for="city">شهر</label>
          <InputText id="city" v-model="form.city" />
        </div>
        <div class="field col-12">
          <label for="address">آدرس</label>
          <Textarea id="address" v-model="form.address" rows="3" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="first_purchase_discount">تخفیف خرید اول (درصد)</label>
          <InputNumber id="first_purchase_discount" v-model="form.first_purchase_discount" mode="decimal" showButtons :min="0" :max="100" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="purchase_discount">تخفیف خرید (درصد)</label>
          <InputNumber id="purchase_discount" v-model="form.purchase_discount" mode="decimal" showButtons :min="0" :max="100" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="birthday_discount">تخفیف تولد (درصد)</label>
          <InputNumber id="birthday_discount" v-model="form.birthday_discount" mode="decimal" showButtons :min="0" :max="100" />
        </div>
      </div>
      <div class="card-footer">
        <Button label="ذخیره تغییرات" icon="pi pi-check" @click="saveProfile" :loading="loading" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import api from '~/services/api';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: 'vendor'
});

const toast = useToast();
const form = ref({
  phone_number: '',
  store_name: '',
  category: '',
  email: '',
  seller_first_name: '',
  seller_last_name: '',
  city: '',
  province: '',
  address: '',
  first_purchase_discount: 0,
  purchase_discount: 0,
  birthday_discount: 0,
});
const loading = ref(false);

const loadProfile = async () => {
  loading.value = true;
  try {
    const response = await api.getShop();
    form.value = response.data;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'دریافت اطلاعات پروفایل با خطا مواجه شد', life: 3000 });
  } finally {
    loading.value = false;
  }
};

const saveProfile = async () => {
  loading.value = true;
  try {
    await api.updateShop(form.value);
    toast.add({ severity: 'success', summary: 'موفق', detail: 'پروفایل با موفقیت به‌روزرسانی شد', life: 3000 });
    // Optionally, refresh local storage data
    const response = await api.getShop();
    localStorage.setItem('shopInfo', JSON.stringify(response.data));
  } catch (error) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'ذخیره اطلاعات پروفایل با خطا مواجه شد', life: 3000 });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadProfile();
});
</script>

<style scoped>
.profile-page {
  padding: 2rem;
  padding-top: 80px; /* To avoid overlap with fixed header */
}

.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.card-header {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 1rem;
}

.card-footer {
  margin-top: 1.5rem;
  text-align: left;
}
</style>