<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <Toast />
    <div class="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800">پروفایل فروشگاه</h2>
        </div>
        <form @submit.prevent="saveProfile" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

            <!-- Store Name -->
            <div>
              <label for="store_name" class="block text-sm font-medium text-gray-700 mb-1">نام فروشگاه</label>
              <InputText id="store_name" v-model="form.store_name" class="w-full" />
            </div>

            <!-- Phone Number (Disabled) -->
            <div>
              <label for="phone_number" class="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
              <InputText id="phone_number" v-model="form.phone_number" disabled class="w-full bg-gray-100" />
            </div>

            <!-- Category -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-1">دسته بندی</label>
              <InputText id="category" v-model="form.category" class="w-full" />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
              <InputText id="email" v-model="form.email" type="email" class="w-full" />
            </div>

            <!-- Seller First Name -->
            <div>
              <label for="seller_first_name" class="block text-sm font-medium text-gray-700 mb-1">نام فروشنده</label>
              <InputText id="seller_first_name" v-model="form.seller_first_name" class="w-full" />
            </div>

            <!-- Seller Last Name -->
            <div>
              <label for="seller_last_name" class="block text-sm font-medium text-gray-700 mb-1">نام خانوادگی فروشنده</label>
              <InputText id="seller_last_name" v-model="form.seller_last_name" class="w-full" />
            </div>

            <!-- Province Dropdown -->
            <div>
              <label for="province" class="block text-sm font-medium text-gray-700 mb-1">استان</label>
              <Dropdown v-model="selectedProvince" :options="provinces" filter optionLabel="name" placeholder="استان را انتخاب کنید" @change="onProvinceChange" class="w-full" />
            </div>

            <!-- City Dropdown -->
            <div>
              <label for="city" class="block text-sm font-medium text-gray-700 mb-1">شهر</label>
              <Dropdown v-model="form.city" :options="cities" filter optionLabel="name" optionValue="name" placeholder="شهر را انتخاب کنید" :disabled="!selectedProvince" class="w-full" />
            </div>

            <!-- Address -->
            <div class="md:col-span-2">
              <label for="address" class="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
              <Textarea id="address" v-model="form.address" rows="3" class="w-full" autoResize />
            </div>

            <!-- Discount Section -->
            <div class="md:col-span-2 pt-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                <div>
                  <label for="first_purchase_discount" class="block text-sm font-medium text-gray-700 mb-1">تخفیف خرید اول(%)</label>
                  <InputNumber id="first_purchase_discount" v-model="form.first_purchase_discount" mode="decimal" showButtons :min="0" :max="100" class="w-full" />
                </div>
                <div>
                  <label for="purchase_discount" class="block text-sm font-medium text-gray-700 mb-1">تخفیف خریدهای بعدی(%)</label>
                  <InputNumber id="purchase_discount" v-model="form.purchase_discount" mode="decimal" showButtons :min="0" :max="100" class="w-full" />
                </div>
                <div>
                  <label for="birthday_discount" class="block text-sm font-medium text-gray-700 mb-1">تخفیف روز تولد(%)</label>
                  <InputNumber id="birthday_discount" v-model="form.birthday_discount" mode="decimal" showButtons :min="0" :max="100" class="w-full" />
                </div>
              </div>
            </div>
          </div>

          <!-- Footer with Save Button -->
          <div class="mt-8 pt-6 border-t border-gray-200 flex justify-end">
            <Button type="submit" label="ذخیره تغییرات" icon="pi pi-check" :loading="loading" />
          </div>
        </form>
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
import Toast from 'primevue/toast';
import Dropdown from 'primevue/dropdown';
import api from '~/services/api';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: 'vendor'
});

useHead({
  title: 'پاداشینو - ویرایش اطلاعات کاربری'
})

const toast = useToast();
const loading = ref(false);

const provinces = ref([]);
const cities = ref([]);
const selectedProvince = ref(null);

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

const onProvinceChange = async () => {
  if (selectedProvince.value) {
    form.value.city = ''; // Reset city on province change
    cities.value = [];
    try {
      // @ts-ignore
      const response = await api.getCities(selectedProvince.value.id);
      cities.value = response.data;
      // @ts-ignore
      form.value.province = selectedProvince.value.name;
    } catch (error) {
      toast.add({ severity: 'error', summary: 'خطا', detail: 'خطا در دریافت لیست شهرها', life: 3000 });
    }
  }
};

const loadProfile = async () => {
  loading.value = true;
  try {
    const [shopResponse, provincesResponse] = await Promise.all([
      api.getShop(),
      api.getProvinces()
    ]);

    provinces.value = provincesResponse.data;
    const shopData = shopResponse.data;

    const defaultData = {
      phone_number: '', store_name: '', category: '', email: '',
      seller_first_name: '', seller_last_name: '', city: '', province: '',
      address: '', first_purchase_discount: 0, purchase_discount: 0, birthday_discount: 0
    };
    form.value = { ...defaultData, ...shopData };

    if (form.value.province) {
      // @ts-ignore
      selectedProvince.value = provinces.value.find(p => p.name === form.value.province) || null;
      if (selectedProvince.value) {
        // Fetch cities for the pre-selected province
        // @ts-ignore
        const citiesResponse = await api.getCities(selectedProvince.value.id);
        cities.value = citiesResponse.data;
        // The city is already set in form.value from the shop data
      }
    }

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
:deep(.p-inputnumber-input) {
  width: 100%;
}
.profile-page {
  padding-top: 60px; /* To avoid overlap with fixed header */
}
</style>
