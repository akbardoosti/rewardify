<template>
    <div class="container">
        <div class="left-section">
            <div class="logo">لویانا</div>
            <div class="welcome-text">
                <h1>به لویانا بپیوندید<br>و فروش خود را<br>افزایش دهید</h1>
            </div>
        </div>

        <div class="right-section">
            <div class="form-header">
                <h2>ثبت نام فروشنده در لویانا</h2>
            </div>

            <form @submit.prevent="register" style="overflow-y: auto;max-height: 80vh;padding: 1rem;">
                <ClientOnly>
                    <Stepper v-model:value="activeStep">
                        <StepList>
                            <Step :value="1">اطلاعات کسب و کار</Step>
                            <Step :value="2">اطلاعات مالک</Step>
                            <Step :value="3">تنظیمات</Step>
                        </StepList>
                        <StepPanels>
                            <StepPanel v-slot="{ activateCallback }" :value="1">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="storeName">نام کسب و کار <span class="required-star">*</span></label>
                                        <input type="text" id="storeName" v-model="form.storeName" placeholder="مثال: فروشگاه بزرگ لویانا">
                                    </div>
                                    <div class="form-group">
                                        <label for="salesArea">حوزه فروش <span class="required-star">*</span></label>
                                        <input type="text" id="salesArea" v-model="form.salesArea" placeholder="مثال: سوپرمارکت">
                                    </div>
                                </div>
                                <div class="form-group full-width">
                                    <label for="storeAddress">آدرس مجموعه</label>
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
                                <div class="stepper-buttons">
                                    <button type="button" @click="() => validateAndGoToNext(activateCallback, 2)" class="submit-btn" style="width: auto; padding: 10px 20px;">بعدی</button>
                                </div>
                            </StepPanel>
                            <StepPanel v-slot="{ activateCallback }" :value="2">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="firstName">نام</label>
                                        <input type="text" id="firstName" v-model="form.firstName" placeholder="مثال: علی">
                                    </div>
                                    <div class="form-group">
                                        <label for="lastName">نام خانوادگی</label>
                                        <input type="text" id="lastName" v-model="form.lastName" placeholder="مثال: محمدی">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="username">نام کاربری <span class="required-star">*</span></label>
                                        <input type="text" id="username" v-model="form.username" placeholder="مثال: yakaboo_store">
                                    </div>
                                    <div class="form-group">
                                        <label for="email">ایمیل <span class="required-star">*</span></label>
                                        <input type="email" id="email" v-model="form.email" placeholder="test@test.com">
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="phoneNumber">شماره تلفن <span class="required-star">*</span></label>
                                        <input type="tel" id="phoneNumber" v-model="form.phoneNumber" placeholder="۰۹۱۲۳۴۵۶۷۸۹">
                                    </div>
                                </div>
                                <div class="form-group full-width password-field">
                                    <label for="password">رمز عبور <span class="required-star">*</span></label>
                                    <input type="password" id="password" v-model="form.password">
                                </div>
                                <div class="form-group full-width password-field">
                                    <label for="confirmPassword">تایید رمز عبور <span class="required-star">*</span></label>
                                    <input type="password" id="confirmPassword" v-model="form.confirmPassword">
                                </div>
                                <div class="stepper-buttons">
                                    <button type="button" @click="activateCallback(1)" class="submit-btn secondary-btn">قبلی</button>
                                    <button type="button" @click="() => validateAndGoToNext(activateCallback, 3)" class="submit-btn">بعدی</button>
                                </div>
                            </StepPanel>
                            <StepPanel v-slot="{ activateCallback }" :value="3">
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
                                    <input type="checkbox" id="terms" name="terms" v-model="form.terms">
                                    <label for="terms">
                                        موافقم با <a href="#">شرایط استفاده</a><br>
                                        با ثبت نام، شما موافقت می‌کنید که اطلاعات و داده‌های شخصی خود را
                                        برای اهداف تجاری ارائه دهید.
                                    </label>
                                </div>
                                <div class="stepper-buttons">
                                    <button type="button" @click="activateCallback(2)" class="submit-btn secondary-btn">قبلی</button>
                                    <button type="submit" class="submit-btn">تکمیل ثبت نام</button>
                                </div>
                            </StepPanel>
                        </StepPanels>
                    </Stepper>
                </ClientOnly>
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
import Stepper from 'primevue/stepper';
import StepPanel from 'primevue/steppanel';
import StepList from 'primevue/steplist';
import Step from 'primevue/step';
import StepPanels from 'primevue/steppanels';

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
const activeStep = ref(1);

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
  terms: false,
})

const validateAndGoToNext = (callback, nextStep) => {
    if (activeStep.value === 1) {
        if (!form.storeName) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً نام کسب و کار را وارد کنید.', life: 3000 });
            return;
        }
        if (!form.salesArea) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً حوزه فروش را وارد کنید.', life: 3000 });
            return;
        }
    } else if (activeStep.value === 2) {
        if (!form.username) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً نام کاربری را وارد کنید.', life: 3000 });
            return;
        }
        if (!form.email) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً ایمیل را وارد کنید.', life: 3000 });
            return;
        }
        if (!form.phoneNumber) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً شماره تلفن را وارد کنید.', life: 3000 });
            return;
        }
        if (!form.password) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً رمز عبور را وارد کنید.', life: 3000 });
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.add({ severity: 'error', summary: 'خطا', detail: 'رمز عبور و تایید آن یکسان نیستند.', life: 3000 });
            return;
        }
    }
    callback(nextStep);
};

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
  if (!form.terms) {
    toast.add({ severity: 'error', summary: 'خطا', detail: 'لطفاً با شرایط استفاده موافقت کنید.', life: 3000 });
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

<style scoped>
.container {
  display: flex;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-width: 1200px;
  width: 100%;
  margin-inline: auto;
}
.required-star {
    color: red;
    margin-right: 2px;
}

.left-section {
    flex: 1;
    background: linear-gradient(135deg, #a8d8ea 0%, #7fb3d3 100%);
    padding: 60px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
  flex-basis: 30%;
}

.welcome-text {
    text-align: center;
    color: #4a6741;
    margin-bottom: 40px;
    z-index: 2;
  font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
}

.welcome-text h1 {
    font-size: 32px;
    font-weight: 300;
    line-height: 1.3;
    margin-bottom: 10px;
}

.right-section {
    flex: 1;
    padding: 25px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  flex-basis: 70%;
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

.stepper-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
}

.stepper-buttons .submit-btn {
    width: auto;
    padding: 12px 24px;
}

.secondary-btn {
    background-color: #f8f9fa;
    color: #343a40;
    border: 1px solid #dee2e6;
}

.secondary-btn:hover {
    background-color: #e9ecef;
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
