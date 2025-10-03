<template>
  <div class="rewardify-dashboard">
    <div class="bg-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>
    <header class="header">
        <div class="logo">
            <div class="logo-icon">🎁</div>
            <span>Rewardify</span>
        </div>

        <div class="tagline">پاداش وفاداری شما با Rewardify</div>

        <div class="dropdown" @click="toggleDropdown">
            <button class="dropdown-btn">
                <span>👤</span>
                <span>منو</span>
                <span>▼</span>
            </button>
            <div class="dropdown-content">
                <a href="#" class="dropdown-item">
                    <span class="icon">⚙️</span>
                    <span>ویرایش حساب کاربری</span>
                </a>
                <a href="#" class="dropdown-item">
                    <span class="icon">🚪</span>
                    <span>خروج از سیستم</span>
                </a>
            </div>
        </div>
    </header>
    <div id="birthday-effect" style="display:none;"></div>
    <main class="main-content">
    <!-- Phone Check Page -->
    <section id="phone-check-section" v-if="currentSection === 'phone-check'">
        <div class="card">
            <div class="security-badge">🔒 امن</div>

            <div class="card-icon">📱</div>

            <h1 class="card-title">بررسی شماره موبایل</h1>
            <p class="card-subtitle">برای دریافت پاداش‌های ویژه، شماره موبایل خود را وارد کنید</p>

            <form @submit.prevent="checkPhoneNumber">
                <div class="form-group">
                    <label class="form-label" for="mobile">شماره موبایل:</label>
                    <input
                        type="tel"
                        id="mobile"
                        class="form-input"
                        placeholder="09123456789"
                        maxlength="11"
                        pattern="[0-9]{11}"
                        v-model="phoneNumber"
                        :class="{ invalid: isPhoneNumberInvalid }"
                        @input="isPhoneNumberInvalid = false"
                    >
                </div>

                <button type="submit" class="submit-btn" :disabled="isPhoneChecking">
                    🔍 بررسی
                </button>
            </form>

            <div class="features">
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">بررسی سریع</div>
                    <div class="feature-desc">در کمتر از 5 ثانیه</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔐</div>
                    <div class="feature-title">کاملاً امن</div>
                    <div class="feature-desc">حریم خصوصی محفوظ</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎯</div>
                    <div class="feature-title">پاداش‌های ویژه</div>
                    <div class="feature-desc">تخفیف‌های اختصاصی</div>
                </div>
            </div>
        </div>
    </section>

    <!-- Signup Page -->
    <section id="signup-section" v-if="currentSection === 'signup'">
        <h2>ثبت‌نام مشتری جدید</h2>
        <form id="signup-form" @submit.prevent="signup">
            <label for="signup_full_name">نام و نام خانوادگی:</label>
            <input type="text" id="signup_full_name" name="full_name" required placeholder="مثلاً علی رضایی" v-model="signupFullName"
                   :class="{ invalid: isSignupFullNameInvalid }" @input="isSignupFullNameInvalid = false">

            <label for="signup_phone_number">شماره موبایل:</label>
            <input type="text" id="signup_phone_number" name="phone_number" readonly v-model="signupPhoneNumber">

            <label for="signup_birth_date">تاریخ تولد:</label>
            <date-picker
                v-model="signupBirthDate"
                id="signup_birth_date"
                name="birth_date"
                class="persian-date-input"
                placeholder="مثلاً 1370/01/01"
                required
                :class="{ invalid: isSignupBirthDateInvalid }"
                @input="isSignupBirthDateInvalid = false"
                format="jYYYY/jMM/jDD"
                display-format="jYYYY/jMM/jDD"
                :auto-submit="true"
                :show-gregorian="true"
                :column="1"
                mode="single"
            ></date-picker>
            <div id="birth-date-preview"
                 style="margin-top: 0.5rem; font-size: 0.9rem; color: #388e3c; text-align: center;" v-if="birthDatePreview">
                 {{ birthDatePreview }}
            </div>


            <label for="signup_first_purchase_amount">مبلغ اولین خرید:</label>
            <div class="input-with-unit">
                <input type="number" id="signup_first_purchase_amount" name="first_purchase_amount" min="0" required
                       placeholder="مثلاً 100000" v-model="signupFirstPurchaseAmount"
                       :class="{ invalid: isSignupFirstPurchaseAmountInvalid }" @input="isSignupFirstPurchaseAmountInvalid = false">
                <span class="unit">تومان</span>
            </div>

            <button type="submit" id="signup-btn" :disabled="isSigningUp">
                {{ isSigningUp ? 'در حال ثبت‌نام...' : 'ثبت‌نام' }}
            </button>
        </form>
        <div id="signup-message" class="message">{{ signupMessage }}</div>
    </section>

    <!-- Purchase Page -->
    <section id="purchase-section" v-if="currentSection === 'purchase'">
        <h2>ثبت خرید</h2>
        <form id="purchase-form" @submit.prevent="purchase">
            <div id="customer-name"
                 style="margin-bottom: 1rem; color: #6366f1; font-weight: 600; font-size: 1.08rem;" v-if="customerNameToDisplay">
                مشتری: {{ customerNameToDisplay }}
            </div>
            <label for="purchase_amount">مبلغ خرید:</label>
            <div class="input-with-unit">
                <input type="number" id="purchase_amount" name="amount" min="0" required placeholder="مثلاً 50000" v-model.number="purchaseAmount">
                <span class="unit">تومان</span>
            </div>

            <div id="discount-container" style="display: flex; align-items: center; gap: 0.7rem;">
                <input type="checkbox" id="use_discount" name="use_discount" v-model="useDiscount">
                <label for="use_discount">استفاده از تخفیف (<span id="available_discount">{{ totalDiscount }}</span>)</label>
                <span class="unit">تومان</span>
            </div>
            <div id="birthday-discount-message" v-if="isBirthday" style="color: #ff4081; text-align: center; margin-top: 1rem; font-weight: bold;">
                {{ birthdayDiscountMessage }}
            </div>
            <div id="final-price-container"
                 style="margin-top:0.7rem; color:#388e3c; font-weight:600; font-size:1.08rem;" v-if="purchaseAmount">
                قیمت بعد از اعمال تخفیف: <span id="final-price">{{ finalPrice }}</span> تومان
            </div>

            <button type="submit" id="purchase-btn" :disabled="isPurchasing">
                {{ isPurchasing ? 'در حال ثبت...' : 'ثبت خرید' }}
            </button>
        </form>
        <div id="purchase-message" class="message">{{ purchaseMessage }}</div>
    </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import DatePicker from '@alireza-ab/vue3-persian-datepicker';
import moment from 'moment-jalaali';
import api from '~/services/api'; // Import the centralized API service

// Dropdown functionality
const toggleDropdown = () => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown) {
        dropdown.classList.toggle('active');
    }
};

const closeDropdownOnClickOutside = (e) => {
    const dropdown = document.querySelector('.dropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
    }
};

onMounted(() => {
    document.addEventListener('click', closeDropdownOnClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdownOnClickOutside);
});

// State for the current view
const currentSection = ref('phone-check'); // 'phone-check', 'signup', or 'purchase'
const customerId = ref(null); // To store the ID of the customer

// Phone Check section
const phoneNumber = ref('');
const phoneCheckMessage = ref('');
const isPhoneNumberInvalid = ref(false);
const isPhoneChecking = ref(false);

watch(phoneNumber, (newValue) => {
    let value = newValue.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    if (value !== newValue) {
      phoneNumber.value = value;
    }
});

const checkPhoneNumber = async () => {
  isPhoneChecking.value = true;
  phoneCheckMessage.value = '';
  try {
    // Basic validation
    if (!/^09\d{9}$/.test(phoneNumber.value)) {
      phoneCheckMessage.value = 'شماره موبایل وارد شده معتبر نیست.';
      isPhoneNumberInvalid.value = true;
      return;
    }
    isPhoneNumberInvalid.value = false;

    const response = await api.verifyPhone(phoneNumber.value);

    // User found, now get their discount info
    const customer = response.data;
    customerId.value = customer.id;

    // Fetch discount information
    const discountResponse = await api.getCustomerDiscount(customer.id);
    const discountData = discountResponse.data;

    customerNameToDisplay.value = discountData.full_name;
    availableDiscount.value = discountData.available_discount || 0;
    isBirthday.value = discountData.is_birthday || false;
    birthdayDiscount.value = discountData.birthday_discount || 0;

    if (isBirthday.value) {
        birthdayDiscountMessage.value = 'تولدت مبارک! یک تخفیف ویژه برای شما داریم.';
        triggerConfetti();
    } else {
        birthdayDiscountMessage.value = '';
    }

    currentSection.value = 'purchase';
    phoneCheckMessage.value = '';

  } catch (error) {
    if (error.response && (error.response.status === 404 || (error.response.data && error.response.data.detail && error.response.data.detail.includes("Not Found")))) {
      // New user, go to signup page
      signupPhoneNumber.value = phoneNumber.value;
      currentSection.value = 'signup';
      phoneCheckMessage.value = '';
    } else {
      console.error('Error checking phone number:', error);
      // Detailed logging for debugging
      if (error.response) {
        console.error('API Error Response:', error.response.data);
        console.error('API Error Status:', error.response.status);
      }
      phoneCheckMessage.value = 'خطا در برقراری ارتباط با سرور. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    isPhoneChecking.value = false;
  }
};

// Signup section
const signupFullName = ref('');
const signupPhoneNumber = ref('');
const signupBirthDate = ref('');
const signupFirstPurchaseAmount = ref('');
const signupMessage = ref('');
const birthDatePreview = ref('');
const isSignupFullNameInvalid = ref(false);
const isSignupBirthDateInvalid = ref(false);
const isSignupFirstPurchaseAmountInvalid = ref(false);

watch(signupBirthDate, () => {
    isSignupBirthDateInvalid.value = false;
});

const isSigningUp = ref(false);

const signup = async () => {
  isSigningUp.value = true;
  signupMessage.value = '';
  try {
    // Basic validation
    isSignupFullNameInvalid.value = !signupFullName.value;
    isSignupBirthDateInvalid.value = !signupBirthDate.value;
    isSignupFirstPurchaseAmountInvalid.value = !signupFirstPurchaseAmount.value;

    if (isSignupFullNameInvalid.value || isSignupBirthDateInvalid.value
      || isSignupFirstPurchaseAmountInvalid.value) {
      signupMessage.value = 'لطفاً تمام فیلدها را پر کنید.';
      return;
    }

    const birthDateForAPI = moment(signupBirthDate.value, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');

    const payload = {
      full_name: signupFullName.value,
      phone_number: signupPhoneNumber.value,
      birth_date: birthDateForAPI,
      first_purchase_amount: signupFirstPurchaseAmount.value
    };

    const response = await api.registerCustomer(payload);

    // Handle successful registration
    const newCustomer = response.data;
    customerId.value = newCustomer.id;

    signupMessage.value = 'ثبت‌نام با موفقیت انجام شد!';

    // After signup, move to the purchase section
    customerNameToDisplay.value = newCustomer.full_name;
    purchaseAmount.value = signupFirstPurchaseAmount.value;
    availableDiscount.value = 0;
    currentSection.value = 'purchase';

  } catch (error) {
    console.error('Error during signup:', error);
    if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data).flat();
        signupMessage.value = `خطا: ${errorMessages.join(' ')}`;
    } else {
        signupMessage.value = 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    isSigningUp.value = false;
  }
};

// Purchase section
const customerNameToDisplay = ref('');
const purchaseAmount = ref(null);
const useDiscount = ref(false);
const availableDiscount = ref(0);
const birthdayDiscount = ref(0);
const purchaseMessage = ref('');

const totalDiscount = computed(() => {
    let total = availableDiscount.value || 0;
    if (isBirthday.value && birthdayDiscount.value) {
        total += birthdayDiscount.value;
    }
    return total;
});

const finalPrice = computed(() => {
  if (useDiscount.value) {
    const price = (purchaseAmount.value || 0) - totalDiscount.value;
    return price > 0 ? price : 0;
  }
  return purchaseAmount.value;
});

const isPurchasing = ref(false);
const isBirthday = ref(false);
const birthdayDiscountMessage = ref('');

const triggerConfetti = () => {
    const birthdayEffectContainer = document.getElementById('birthday-effect');
    if (!birthdayEffectContainer) return;
    birthdayEffectContainer.style.display = 'block';
    const message = document.createElement('div');
    message.className = 'birthday-message';
    message.textContent = 'تولدت مبارک!';
    birthdayEffectContainer.appendChild(message);
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        birthdayEffectContainer.appendChild(confetti);
    }
    setTimeout(() => {
        birthdayEffectContainer.innerHTML = '';
        birthdayEffectContainer.style.display = 'none';
    }, 4000);
};

const purchase = async () => {
  isPurchasing.value = true;
  purchaseMessage.value = '';
  try {
    if (!purchaseAmount.value || purchaseAmount.value <= 0) {
      purchaseMessage.value = 'لطفاً مبلغ خرید معتبری را وارد کنید.';
      return;
    }

    const payload = {
      customer_id: customerId.value,
      amount: purchaseAmount.value,
      use_discount: useDiscount.value
    };

    await api.createPurchase(payload);

    purchaseMessage.value = `خرید با موفقیت ثبت شد! مبلغ نهایی: ${finalPrice.value} تومان`;

    setTimeout(() => {
      currentSection.value = 'phone-check';
      phoneNumber.value = '';
      phoneCheckMessage.value = '';
      signupFullName.value = '';
      signupPhoneNumber.value = '';
      signupBirthDate.value = '';
      signupFirstPurchaseAmount.value = '';
      signupMessage.value = '';
      customerNameToDisplay.value = '';
      purchaseAmount.value = null;
      useDiscount.value = false;
      purchaseMessage.value = '';
      birthDatePreview.value = '';
      isBirthday.value = false;
      birthdayDiscountMessage.value = '';
      customerId.value = null;
    }, 2500);
  } catch (error) {
    console.error('Error during purchase:', error);
    if (error.response && error.response.data) {
        const errors = Object.values(error.response.data).flat().join(' ');
        purchaseMessage.value = `خطا در ثبت خرید: ${errors}`;
    } else {
        purchaseMessage.value = 'خطا در ثبت خرید. لطفاً دوباره تلاش کنید.';
    }
  } finally {
    setTimeout(() => { isPurchasing.value = false; }, 2500);
  }
};

</script>

<style scoped>
.rewardify-dashboard {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-x: hidden;
}

/* Animated background elements */
.bg-shapes {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.shape {
    position: absolute;
    opacity: 0.1;
    animation: float 6s ease-in-out infinite;
}

.shape-1 {
    top: 10%;
    right: 10%;
    width: 100px;
    height: 100px;
    background: white;
    border-radius: 50%;
    animation-delay: 0s;
}

.shape-2 {
    top: 60%;
    left: 5%;
    width: 80px;
    height: 80px;
    background: white;
    border-radius: 20px;
    animation-delay: 2s;
}

.shape-3 {
    top: 30%;
    left: 15%;
    width: 60px;
    height: 60px;
    background: white;
    transform: rotate(45deg);
    animation-delay: 4s;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

/* Header */
.header {
    padding: 20px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 10;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 24px;
    font-weight: bold;
}

.logo-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
}

.tagline {
    color: rgba(255, 255, 255, 0.9);
    font-size: 16px;
    font-weight: 500;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 25px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Dropdown Menu */
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-btn {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 10px 15px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
}

.dropdown-btn:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.dropdown-content {
    display: none;
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 5px;
    background: white;
    min-width: 200px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 12px;
    z-index: 1000;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.dropdown.active .dropdown-content {
    display: block;
    animation: dropdownFade 0.3s ease;
}

@keyframes dropdownFade {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.dropdown-item {
    display: block;
    padding: 15px 20px;
    color: #2d3748;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    border-bottom: 1px solid #f1f5f9;
    display: flex;
    align-items: center;
    gap: 10px;
}

.dropdown-item:last-child {
    border-bottom: none;
}

.dropdown-item:hover {
    background: #f8fafc;
    color: #667eea;
    transform: translateX(5px);
}

.dropdown-item .icon {
    font-size: 16px;
}

/* Main Content */
.main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    position: relative;
    z-index: 10;
}

/* Responsive Design */
@media (max-width: 768px) {
    .header {
        padding: 15px 20px;
        flex-wrap: wrap;
        gap: 10px;
    }

    .tagline {
        position: static;
        transform: none;
        order: 3;
        width: 100%;
        text-align: center;
        font-size: 14px;
        margin-top: 10px;
    }

    .dropdown-content {
        left: auto;
        right: 0;
        min-width: 180px;
    }

    #phone-check-section .card {
        padding: 30px 20px;
        margin: 10px;
    }

    #phone-check-section .card-title {
        font-size: 24px;
    }

    #phone-check-section .features {
        grid-template-columns: 1fr;
        gap: 15px;
    }
}

#phone-check-section {
    background: transparent;
    border: none;
    box-shadow: none;
}

#phone-check-section .card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 450px;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.2);
    position: relative;
    overflow: hidden;
}

#phone-check-section .card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #ff6b6b, #4ecdc4);
    background-size: 400% 400%;
    animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

#phone-check-section .card-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    color: white;
    font-size: 36px;
}

#phone-check-section .card-title {
    font-size: 28px;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 10px;
}

#phone-check-section .card-subtitle {
    color: #718096;
    margin-bottom: 30px;
    font-size: 16px;
}

#phone-check-section .form-group {
    margin-bottom: 30px;
    text-align: right;
}

#phone-check-section .form-label {
    display: block;
    margin-bottom: 8px;
    color: #4a5568;
    font-weight: 600;
}

#phone-check-section .form-input {
    width: 100%;
    padding: 16px 20px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 16px;
    font-family: inherit;
    background: #f7fafc;
    transition: all 0.3s ease;
    direction: ltr;
    text-align: center;
}

#phone-check-section .form-input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.2);
}

#phone-check-section .submit-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

#phone-check-section .submit-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s ease;
}

#phone-check-section .submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
}

#phone-check-section .submit-btn:hover::before {
    left: 100%;
}

#phone-check-section .submit-btn:active {
    transform: translateY(-1px);
}

/* Features Section */
#phone-check-section .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 40px;
    padding: 20px 0;
    border-top: 1px solid #e2e8f0;
}

#phone-check-section .feature {
    text-align: center;
    padding: 20px;
}

#phone-check-section .feature-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ff6b6b, #4ecdc4);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 15px;
    color: white;
    font-size: 20px;
}

#phone-check-section .feature-title {
    font-size: 16px;
    font-weight: bold;
    color: #2d3748;
    margin-bottom: 8px;
}

#phone-check-section .feature-desc {
    font-size: 14px;
    color: #718096;
    line-height: 1.5;
}

#phone-check-section .security-badge {
    position: absolute;
    top: -10px;
    left: 20px;
    background: linear-gradient(45deg, #10b981, #059669);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    box-shadow: 0 5px 15px rgba(16, 185, 129, 0.3);
}

section {
    background: #ffffff;
    padding: 2.2rem 1.8rem 1.5rem 1.8rem;
    margin: 2.5rem 0;
    border-radius: 28px;
    box-shadow: 0 12px 40px rgba(80, 80, 160, 0.13), 0 2px 8px rgba(80, 80, 160, 0.10);
    min-width: 390px;
    max-width: 480px;
    direction: rtl;
    transition: box-shadow 0.2s;
    border: 1.5px solid #e0e7ff;
    position: relative;
}

section:hover {
    box-shadow: 0 18px 48px rgba(80, 80, 160, 0.17), 0 4px 16px rgba(80, 80, 160, 0.13);
}

h2 {
    margin-top: 0;
    color: #3b3b6d;
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.5px;
    font-size: 1.6rem;
}

form {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}

label {
    font-weight: 500;
    margin-bottom: 0.2rem;
    color: #444;
    font-size: 1.07rem;
}

input[type="text"],
input[type="number"],
input[type="date"] {
    padding: 0.7rem 0.9rem;
    border: 1.5px solid #bfc7d1;
    border-radius: 8px;
    font-size: 1.13rem;
    text-align: right;
    background: #f6f8fa;
    transition: border 0.2s, box-shadow 0.2s;
    font-family: inherit;
    color: #2d3137;
}

input:focus {
    border: 2px solid #6366f1;
    outline: none;
    background: #fff;
    box-shadow: 0 0 0 2px #e0e7ff;
}

input.invalid {
    border: 2.2px solid #e53935 !important;
    background: #fff0f0;
    animation: shake 0.18s 1;
    color: #b71c1c;
}

input.invalid::placeholder {
    color: #e53935 !important;
    opacity: 0.85;
}

@keyframes shake {
    0% {
        transform: translateX(0);
    }
    25% {
        transform: translateX(-4px);
    }
    50% {
        transform: translateX(4px);
    }
    75% {
        transform: translateX(-2px);
    }
    100% {
        transform: translateX(0);
    }
}

button {
    padding: 0.9rem;
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 1.15rem;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
    font-family: inherit;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
    margin-top: 0.7rem;
}

button:disabled {
    background: #b3bcf6;
    cursor: not-allowed;
    color: #f3f4f6;
}

button:hover:not(:disabled) {
    background: linear-gradient(90deg, #4f46e5 0%, #6366f1 100%);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.13);
}

.message {
    margin-top: 1.2rem;
    min-height: 1.2em;
    color: #d32f2f;
    font-size: 1.08rem;
    text-align: center;
    font-weight: 500;
    letter-spacing: -0.2px;
    transition: color 0.2s;
}

.message:not(:empty) {
    animation: fadeIn 0.5s;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.pdp-icon.pdp-pointer {
  display: none;
}

#discount-container {
    margin-bottom: 1.2rem;
    background: #f1f5ff;
    border-radius: 7px;
    padding: 0.7rem 1rem;
    color: #3b3b6d;
    font-size: 1.05rem;
    display: flex;
    align-items: center;
    gap: 0.7rem;
}

input[type="checkbox"] {
    accent-color: #6366f1;
    width: 1.2em;
    height: 1.2em;
}

::-webkit-input-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

::-moz-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

:-ms-input-placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

::placeholder {
    color: #b0b3c6;
    font-size: 1.05rem;
}

@keyframes calendarPop {
    0% {
        transform: scale(0.85) translateY(30px);
        opacity: 0;
    }
    100% {
        transform: scale(1) translateY(0);
        opacity: 1;
    }
}

#signup_birth_date.persian-date-input {
    background-image: url('data:image/svg+xml;utf8,<svg fill="%236366f1" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zm0-13H5V6h14v1zm-7 5h5v5h-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: left 0.7rem center;
    background-size: 1.2em 1.2em;
    padding-left: 2.2em;
  width: 100%;
}

.input-with-unit {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.1rem;
}

.input-with-unit input {
    flex: 1 1 0;
}

.unit {
    color: #6366f1;
    font-size: 1.01rem;
    font-weight: 500;
    opacity: 0.85;
    white-space: nowrap;
}

@media (max-width: 600px) {
    section {
        min-width: 90vw;
        max-width: 98vw;
        padding: 2rem 0.5rem 1.5rem 0.5rem;
    }

    .input-with-unit {
        gap: 0.2rem;
    }

    .unit {
        font-size: 0.93rem;
    }
}

#customer-name {
    font-size: 1.22rem;
    color: #4f46e5;
    font-weight: bold;
    margin-bottom: 1.3rem;
    background: linear-gradient(90deg, #6366f1 0%, #4f46e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
}

#birthday-effect {
    display: none;
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2147483647 !important;
    pointer-events: none;
    overflow: visible !important;
    background: transparent !important;
    border: 2px solid red !important;
}

#birthday-effect .birthday-message {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2.2rem;
    font-weight: bold;
    background: linear-gradient(90deg, #ffb300 0%, #ff4081 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    text-shadow: 0 4px 24px rgba(99, 102, 241, 0.18);
    white-space: nowrap;
    user-select: none;
    letter-spacing: 1px;
    opacity: 0.97;
}

.confetti {
    position: absolute;
    width: 12px;
    height: 18px;
    border-radius: 3px;
    opacity: 0.85;
    animation: confetti-fall 1.8s linear forwards;
}

@keyframes confetti-fall {
    0% {
        transform: translateY(-40px) rotateZ(0deg);
        opacity: 1;
    }
    80% {
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0.2;
    }
}

#purchase-btn {
    font-size: 1.32rem;
    font-weight: bold;
    letter-spacing: 0.08em;
}
</style>
