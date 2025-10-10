<template>
    <div class="container">
        <Toast />
        <div class="login-section">
            <div class="logo">
                <div class="logo-icon">پ</div>
                <div class="logo-text">لویانا</div>
            </div>

            <h1 class="welcome-title">خوش آمدید</h1>
            <p class="welcome-subtitle">نام‌کاربری و کلمه‌عبور خود را وارد کنید تا به حساب کاربری خود دسترسی پیدا کنید.</p>

            <form @submit.prevent="login" class="space-y-6">
                <div class="flex flex-col gap-2">
                    <label for="credential" class="form-label">نام‌کاربری</label>
                    <InputText id="credential" v-model="username" class="w-full" dir="rtl" />
                </div>

                <div class="flex flex-col gap-2">
                    <label class="form-label" for="password">کلمه‌عبور</label>
                    <Password
                        id="password"
                        v-model="password"
                        class="w-full"
                        :feedback="false"
                        toggleMask
                        inputClass="w-full"
                        dir="rtl"
                    />
                    <div style="text-align: left; margin-top: 8px;">
                        <NuxtLink to="/forgot-password" class="forgot-password">رمز عبور را فراموش کرده‌اید؟</NuxtLink>
                    </div>
                </div>

                <div class="flex items-center">
                    <Checkbox inputId="remember" v-model="rememberMe" :binary="true" />
                    <label for="remember" class="mr-2 text-sm text-gray-600">مرا به خاطر بسپار</label>
                </div>

                <Button type="submit" class="w-full justify-center" :loading="loading" label="ورود" />
            </form>

            <div class="register-link">
                حساب کاربری ندارید؟ <NuxtLink to="/register">هم‌اکنون ثبت نام کنید.</NuxtLink>
            </div>
        </div>

        <div class="dashboard-section">
            <h2 class="dashboard-title" style="color: white;">کسب‌وکار خود را بدون زحمت مدیریت کنید.</h2>
            <p class="dashboard-subtitle">برای دسترسی به داشبورد مدیریت فروش خود وارد شوید.</p>

            <div class="dashboard-preview">
                <div class="dashboard-header">
                    <div class="dashboard-nav">
                        <div class="nav-item active">عملکرد فروش</div>
                        <div class="nav-item">بررسی فروش</div>
                    </div>
                    <div style="color: #9ca3af; font-size: 14px;">ماهانه</div>
                </div>

                <div class="stats-row">
                    <div class="stat-card">
                        <div class="stat-value">$189,374</div>
                        <div class="stat-label">کل فروش</div>
                    </div>
                    <div style="background: white; padding: 16px; border-radius: 12px; flex: 1; text-align: center;">
                        <div style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">00:01:30</div>
                        <div style="font-size: 12px; color: #6b7280;">زمان صرف شده</div>
                    </div>
                </div>

                <div class="chart-section">
                    <div class="chart-placeholder">
                        <div>
                            <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">$25,684</div>
                            <div style="font-size: 12px; color: #9ca3af;">تراکنش‌های اخیر</div>
                            <div style="margin-top: 16px;">
                                <div style="height: 2px; background: #4f46e5; width: 80%; margin-bottom: 8px;"></div>
                                <div style="height: 2px; background: #e5e7eb; width: 60%; margin-bottom: 8px;"></div>
                                <div style="height: 2px; background: #e5e7eb; width: 90%;"></div>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: center;">
                        <div class="donut-chart">
                            <div class="donut-center">
                                <div class="donut-value">6,248</div>
                                <div class="donut-label">واحد</div>
                            </div>
                        </div>
                        <div style="margin-top: 16px; font-size: 12px; color: #9ca3af;">دسته‌بندی فروش</div>
                    </div>
                </div>
            </div>

            <div class="footer">
                <div>حق نشر © ۱۴۰۴ لویانا شرکت تجاری.</div>
                <div>سیاست حریم خصوصی</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import api from '~/services/api';
import { encrypt } from '~/services/crypto';
import ProgressSpinner from 'primevue/progressspinner';
import Toast from 'primevue/toast';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

useHead({
  title: 'لویانا - صفحه ورود'
})
// Disable the default layout for this page
definePageMeta({
  layout: false,
});

const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const loading = ref(false);
const router = useRouter();
const toast = useToast();

const login = async () => {
  if (loading.value) return;

  loading.value = true;
  try {
    const response = await api.login({
      username: username.value,
      password: password.value,
    });

    if (response.data.access_token) {
      // Encrypt and store the access token
      localStorage.setItem('access_token', encrypt(response.data.access_token));

      // Fetch, encrypt, and store shop info
      try {
        const shopResponse = await api.getShop();
        localStorage.setItem('shopInfo', encrypt(shopResponse.data));
      } catch (shopError) {
        console.error('Failed to fetch shop info after login:', shopError);
        toast.add({ severity: 'warn', summary: 'هشدار', detail: 'ورود موفق بود اما اطلاعات فروشگاه دریافت نشد', life: 4000 });
      }

      toast.add({ severity: 'success', summary: 'موفق', detail: 'با موفقیت وارد شدید', life: 3000 });
      await router.push('/dashboard');
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail === 'Incorrect username or password') {
      toast.add({ severity: 'error', summary: 'خطا', detail: 'نام کاربری یا رمز عبور اشتباه است', life: 3000 });
    } else {
      toast.add({ severity: 'error', summary: 'خطا', detail: 'خطایی در ورود رخ داد', life: 3000 });
    }
    console.error('Login error:', error);
  } finally {
    loading.value = false;
  }
};
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
    min-height: 700px;
    margin-inline: auto;
}

.login-section {
    flex: 1;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.logo {
    display: flex;
    align-items: center;
    margin-bottom: 60px;
}

.logo-icon {
    width: 32px;
    height: 32px;
    background: #4f46e5;
    border-radius: 8px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
}

.logo-text {
    font-size: 20px;
    font-weight: 600;
    color: #1a1a1a;
}

.welcome-title {
    font-size: 32px;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 8px;
}

.welcome-subtitle {
    color: #6b7280;
    margin-bottom: 40px;
    font-size: 16px;
}

.form-group {
    margin-bottom: 20px;
}

.form-label {
    display: block;
    margin-bottom: 8px;
    color: #374151;
    font-weight: 500;
    font-size: 14px;
    text-align: right;
}


.forgot-password {
    color: #4f46e5;
    text-decoration: none;
    font-size: 14px;
}

.forgot-password:hover {
    text-decoration: underline;
}


.divider {
    text-align: center;
    margin-bottom: 20px;
    color: #9ca3af;
    font-size: 14px;
}

.social-login {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
}

.social-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border: 2px solid #e5e7eb;
    border-radius: 10px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    color: #374151;
}

.social-btn:hover {
    border-color: #d1d5db;
    background: #f9fafb;
}

.social-btn img {
    width: 20px;
    height: 20px;
    margin-left: 8px;
}

.register-link {
    text-align: center;
    color: #6b7280;
    font-size: 14px;
}

.register-link a {
    color: #4f46e5;
    text-decoration: none;
}

.register-link a:hover {
    text-decoration: underline;
}

.dashboard-section {
    flex: 1.2;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    position: relative;
}

.dashboard-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 16px;
    line-height: 1.2;
  text-align: start;
}

.dashboard-subtitle {
    font-size: 1rem;
    opacity: 0.9;
    margin-bottom: 40px;
}

.dashboard-preview {
    background: white;
    border-radius: 16px;
    padding: 30px;
    color: #1a1a1a;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
}

.dashboard-nav {
    display: flex;
    gap: 24px;
}

.nav-item {
    padding: 8px 16px;
    background: #f3f4f6;
    border-radius: 8px;
    font-size: 14px;
    color: #6b7280;
}

.nav-item.active {
    background: #4f46e5;
    color: white;
}

.stats-row {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background: #4f46e5;
    color: white;
    padding: 20px;
    border-radius: 12px;
    flex: 1;
}

.stat-value {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
}

.stat-label {
    font-size: 12px;
    opacity: 0.8;
}

.chart-section {
    display: flex;
    gap: 20px;
}

.chart-placeholder {
    flex: 1;
    height: 200px;
    background: #f8fafc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #9ca3af;
}

.donut-chart {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(#4f46e5 0deg 200deg, #e5e7eb 200deg 360deg);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.donut-center {
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.donut-value {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a1a;
}

.donut-label {
    font-size: 12px;
    color: #6b7280;
}

.footer {
    position: absolute;
    bottom: 30px;
    right: 50px;
    left: 50px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    opacity: 0.7;
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        margin: unset;
    }

    .dashboard-section {
        display: none;
    }

    .login-section {
        padding: 40px 30px;
    }
}
</style>
