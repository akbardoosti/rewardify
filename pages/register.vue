<template>
    <div class="container">
        <div class="left-section">
            <div class="logo">لویانا</div>
            <div class="welcome-text">
                <h1>به لویانا بپیوندید<br>و فروش خود را<br>افزایش دهید</h1>
            </div>
            <div class="illustration">
                <div class="floating-elements">
                    <div class="floating-rect rect1"></div>
                    <div class="floating-rect rect2"></div>
                    <div class="floating-rect rect3"></div>
                </div>
                <div class="plant">
                    <div class="plant-pot"></div>
                    <div class="plant-leaves"></div>
                </div>
                <div class="table"></div>
                <div class="phone"></div>
                <div class="cup"></div>
                <div class="chair"></div>
                <div class="person"></div>
            </div>
        </div>

        <div class="right-section">
            <div class="form-header">
                <h2>ثبت نام فروشنده در لویانا</h2>
            </div>

            <form @submit.prevent="register" style="overflow-y: auto;max-height: 80vh;">
                <div class="form-row">
                    <div class="form-group">
                        <label for="firstName">نام فروشنده (اختیاری)</label>
                        <input type="text" id="firstName" v-model="form.firstName" placeholder="مثال: علی">
                    </div>
                    <div class="form-group">
                        <label for="lastName">نام خانوادگی (اختیاری)</label>
                        <input type="text" id="lastName" v-model="form.lastName" placeholder="مثال: محمدی">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="storeName">نام فروشگاه (اجباری)</label>
                        <input type="text" id="storeName" v-model="form.storeName" placeholder="مثال: فروشگاه بزرگ لویانا" required>
                    </div>
                    <div class="form-group">
                        <label for="salesArea">حوزه فروش (اجباری)</label>
                        <input type="text" id="salesArea" v-model="form.salesArea" placeholder="مثال: سوپرمارکت" required>
                    </div>
                </div>

                <div class="form-group full-width">
                    <label for="storeAddress">آدرس فروشگاه</label>
                    <input type="text" id="storeAddress" v-model="form.storeAddress" placeholder="مثال: خیابان اصلی، کوچه فرعی، پلاک ۱۰">
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="province">استان</label>
                        <Dropdown v-model="selectedProvince" :options="provinces" filter optionLabel="name" placeholder="استان خود را انتخاب کنید" @change="onProvinceChange" style="width: 100%;" />
                    </div>
                    <div class="form-group">
                        <label for="city">شهر</label>
                        <Dropdown v-model="form.city" :options="cities" filter optionLabel="name" optionValue="name" placeholder="شهر خود را انتخاب کنید" :disabled="!selectedProvince" style="width: 100%;" />
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="username">نام کاربری (اجباری)</label>
                        <input type="text" id="username" v-model="form.username" placeholder="مثال: yakaboo_store" required>
                    </div>
                    <div class="form-group">
                        <label for="email">ایمیل (اجباری)</label>
                        <input type="email" id="email" v-model="form.email" placeholder="test@test.com" required>
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="phoneNumber">شماره تلفن (اجباری)</label>
                        <input type="tel" id="phoneNumber" v-model="form.phoneNumber" placeholder="۰۹۱۲۳۴۵۶۷۸۹" required>
                    </div>
                </div>

                <div class="form-group full-width password-field">
                    <label for="password">رمز عبور (اجباری)</label>
                    <input type="password" id="password" v-model="form.password" required>
                </div>

                <div class="form-group full-width password-field">
                    <label for="confirmPassword">تایید رمز عبور (اجباری)</label>
                    <input type="password" id="confirmPassword" v-model="form.confirmPassword" required>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="first_purchase_discount">تخفیف اولین خرید(%)</label>
                        <input type="number" id="first_purchase_discount" v-model.number="form.first_purchase_discount" placeholder="مثال: 10000">
                    </div>
                    <div class="form-group">
                        <label for="purchase_discount">تخفیف خریدهای بعدی(%)</label>
                        <input type="number" id="purchase_discount" v-model.number="form.purchase_discount" placeholder="مثال: 15">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label for="birthday_discount">تخفیف روز تولد(%)</label>
                        <input type="number" id="birthday_discount" v-model.number="form.birthday_discount" placeholder="مثال: 20">
                    </div>
                </div>

                <div class="checkbox-group">
                    <input type="checkbox" id="terms" name="terms" required>
                    <label for="terms">
                        موافقم با <a href="#">شرایط استفاده</a><br>
                        با ثبت نام، شما موافقت می‌کنید که اطلاعات و داده‌های شخصی خود را
                        برای اهداف تجاری ارائه دهید.
                    </label>
                </div>

                <button type="submit" class="submit-btn">تکمیل ثبت نام</button>

                <div class="login-link">
                    قبلاً حساب کاربری دارید؟ <NuxtLink to="/login">وارد شوید</NuxtLink>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'لویانا - صفحه ثبت‌نام'
})

const router = useRouter()
const toast = useToast()
const provinces = ref([]);
const cities = ref([]);
const selectedProvince = ref(null);

const form = reactive({
  firstName: '',
  lastName: '',
  storeName: '',
  salesArea: '',
  storeAddress: '',
  province: '',
  city: '',
  username: '',
  phoneNumber: '',
  password: '',
  email: '',
  confirmPassword: '',
  first_purchase_discount: null,
  purchase_discount: null,
  birthday_discount: null,
})

onMounted(async () => {
  try {
    const response = await api.getProvinces();
    provinces.value = response.data;
  } catch (error) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'خطا در دریافت لیست استان‌ها', life: 3000 });
  }
});

const onProvinceChange = async () => {
  if (selectedProvince.value) {
    form.city = '';
    cities.value = [];
    try {
      const response = await api.getCities(selectedProvince.value.id);
      cities.value = response.data;
      form.province = selectedProvince.value.name;
    } catch (error) {
      toast.add({ severity: 'error', summary: 'خطا', detail: 'خطا در دریافت لیست شهرها', life: 3000 });
    }
  }
};

const register = async () => {
  if (form.password !== form.confirmPassword) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'رمز عبور و تایید آن یکسان نیستند.', life: 3000 });
    return
  }

  const userData = {
    username: form.username,
    password: form.password,
    phone_number: form.phoneNumber,
    store_name: form.storeName,
    category: form.salesArea,
    email: form.email,
    seller_first_name: form.firstName,
    seller_last_name: form.lastName,
    city: form.city,
    province: form.province,
    address: form.storeAddress,
    first_purchase_discount: form.first_purchase_discount,
    purchase_discount: form.purchase_discount,
    birthday_discount: form.birthday_discount,
  }

  try {
    await api.registerShop(userData);
    toast.add({ severity: 'success', summary: 'موفقیت', detail: 'ثبت نام با موفقیت انجام شد', life: 3000 });
    router.push('/login');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'خطا در ثبت نام', life: 3000 });
  }
}
</script>

<style>


.left-section {
    flex: 1;
    background: linear-gradient(135deg, #a8d8ea 0%, #7fb3d3 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.welcome-text {
    text-align: center;
    color: #4a6741;
    margin-bottom: 40px;
    z-index: 2;
}

.welcome-text h1 {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 10px;
}

.illustration {
    position: relative;
    width: 300px;
    height: 300px;
}

.person {
    position: absolute;
    bottom: 50px;
    right: 50px;
    width: 120px;
    height: 140px;
    background: #4472c4;
    border-radius: 60px 60px 20px 20px;
    z-index: 3;
}

.person::before {
    content: '';
    position: absolute;
    top: -30px;
    right: 20px;
    width: 80px;
    height: 80px;
    background: #ffd6cc;
    border-radius: 50%;
}

.person::after {
    content: '';
    position: absolute;
    top: -20px;
    right: 30px;
    width: 60px;
    height: 40px;
    background: #ff6b4a;
    border-radius: 30px;
}

.chair {
    position: absolute;
    bottom: 20px;
    right: 80px;
    width: 60px;
    height: 80px;
    background: #ffffff;
    border-radius: 10px;
    z-index: 2;
}

.table {
    position: absolute;
    bottom: 40px;
    right: 120px;
    width: 80px;
    height: 8px;
    background: #ffffff;
    border-radius: 4px;
    z-index: 1;
}

.phone {
    position: absolute;
    bottom: 48px;
    right: 140px;
    width: 20px;
    height: 35px;
    background: #ff6b4a;
    border-radius: 8px;
    z-index: 2;
}

.cup {
    position: absolute;
    bottom: 48px;
    right: 170px;
    width: 15px;
    height: 20px;
    background: #87ceeb;
    border-radius: 0 0 8px 8px;
    z-index: 2;
}

.plant {
    position: absolute;
    bottom: 20px;
    left: 60px;
    width: 40px;
    height: 60px;
}

.plant-pot {
    position: absolute;
    bottom: 0;
    width: 40px;
    height: 20px;
    background: #ffffff;
    border-radius: 0 0 20px 20px;
}

.plant-leaves {
    position: absolute;
    bottom: 15px;
    right: 10px;
    width: 20px;
    height: 30px;
    background: #4472c4;
    border-radius: 10px 10px 0 0;
}

.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.floating-rect {
    position: absolute;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    animation: float 3s ease-in-out infinite;
}

.rect1 {
    top: 60px;
    right: 80px;
    width: 60px;
    height: 40px;
    animation-delay: 0s;
}

.rect2 {
    top: 80px;
    right: 150px;
    width: 50px;
    height: 35px;
    animation-delay: 1s;
}

.rect3 {
    top: 120px;
    right: 200px;
    width: 45px;
    height: 30px;
    animation-delay: 2s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.right-section {
    flex: 1;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form-header {
    text-align: center;
}

.form-header h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
}

.social-buttons {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.social-btn {
    flex: 1;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
    color: #666;
    transition: all 0.3s ease;
}

.social-btn:hover {
    background: #f8f9fa;
    border-color: #4285f4;
}

.google-btn {
    color: #4285f4;
}

.facebook-btn {
    color: #1877f2;
}

.form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
}

.form-group {
    flex: 1;
}

.form-group.full-width {
    flex: none;
    width: 100%;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #666;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 14px;
    background: #fafafa;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #4285f4;
    background: white;
    box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.1);
}

.password-field {
    position: relative;
}


.checkbox-group {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin: 25px 0;
    font-size: 13px;
    line-height: 1.4;
}

.checkbox-group input[type="checkbox"] {
    width: 18px;
    height: 18px;
    margin: 0;
    cursor: pointer;
    accent-color: #4285f4;
}

.checkbox-group label {
    margin: 0;
    cursor: pointer;
    color: #666;
}

.checkbox-group a {
    color: #4285f4;
    text-decoration: none;
}

.checkbox-group a:hover {
    text-decoration: underline;
}

.submit-btn {
    width: 100%;
    padding: 15px;
    background: #4285f4;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: background-color 0.3s ease;
}

.submit-btn:hover {
    background: #3367d6;
}

.login-link {
    text-align: center;
    color: #666;
    font-size: 14px;
}

.login-link a {
    color: #4285f4;
    text-decoration: none;
}

.login-link a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
    }

    .left-section {
        min-height: 300px;
    }

    .form-row {
        flex-direction: column;
    }

    .social-buttons {
        flex-direction: column;
    }
}
</style>
